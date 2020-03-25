import { Injectable } from '@nestjs/common';
import { ConfigService } from './config.service';
import * as redis from 'redis';
import * as util from 'util';

@Injectable()
export class RedisService {
    client: redis.RedisClient;
    constructor(
        public configService: ConfigService,
    ) {
        this.initializeClient();
    }
    initializeClient(enableOffline: boolean = true) {
        this.client = redis.createClient({
            host: this.configService.redisConfig.redisHost,
            port: this.configService.redisConfig.redisPort,
            enable_offline_queue: enableOffline,
        });
        return this.client;
    }
    async set(key: string, value: any): Promise<any> {
        const setAsync = util.promisify(this.client.set).bind(this.client);
        return await setAsync(key, value);
    }

    async setEx(key: string, seconds: number, value: any): Promise<any> {
        const setAsync = util.promisify(this.client.setex).bind(this.client);
        return await setAsync(key, seconds, value);
    }

    async get(key: string) {
        const getAsync = util.promisify(this.client.get).bind(this.client);
        const results = await getAsync(key);
        return results;
    }

}
