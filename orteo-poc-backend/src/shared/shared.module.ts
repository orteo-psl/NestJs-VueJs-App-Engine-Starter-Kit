import { Module, Global, HttpModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AwsS3Service } from './services/aws-s3.service';
import { ConfigService } from './services/config.service';
import { GeneratorService } from './services/generator.service';
import { ValidatorService } from './services/validator.service';
import { RedisService } from './services/redis.service';

const providers = [
    ConfigService,
    ValidatorService,
    AwsS3Service,
    GeneratorService,
    RedisService
];

@Global()
@Module({
    providers,
    imports: [
        HttpModule,
        JwtModule.registerAsync({
            imports: [SharedModule],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get('JWT_SECRET_KEY'),
                signOptions: {
                    expiresIn: configService.getNumber('JWT_EXPIRATION_TIME'),
                },
            }),
            inject: [ConfigService],
        }),
    ],
    exports: [...providers, HttpModule, JwtModule],
})
export class SharedModule { }
