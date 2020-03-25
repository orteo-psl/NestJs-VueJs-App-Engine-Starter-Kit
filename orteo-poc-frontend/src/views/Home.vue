<template>
  <div class="container-fluid">
    <div class="text-center">
      <h1>Users List</h1>
      <p>Built with Nest.js, Vue.js, Postgress and Redis</p>
      <div v-if="users.length === 0">
        <h2>No Users found at the moment</h2>
      </div>
    </div>

    <div class>
      <table class="table table-bordered">
        <thead class="thead-dark">
          <tr>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Role</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.firstName }}</td>
            <td>{{ user.lastName }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.phone }}</td>
            <td>{{ user.role }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import { server } from "../helper";
import axios from "axios";
export default {
  data() {
    return {
      users: []
    };
  },
  created() {
    this.fetchCustomers();
  },
  methods: {
  async  fetchCustomers() {
      const response = await axios(`${server.API_URL}/users/users`)
        console.log(response);
        this.users = response.data.data;
    }
  }
};
</script>