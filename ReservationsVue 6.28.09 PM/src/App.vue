<template>
  <div id="app">
    <nav id="nav-bar">
      <div class="nav-wrapper" id="nav-bar">
        <a href="#" class="brand-logo center">Tableu</a>
        <ul id="nav-mobile" class="left hide-on-med-and-down">
          <!-- Botones -->
          <li><a id="log_out" v-on:click="logout"> Log Out </a></li>
        </ul>
      </div>
    </nav>
    <!-- <img src="./assets/logo.png"> -->
    <router-view></router-view>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'app',
  methods: {
    logout: function() {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
        //this.$App.$emit('myEvent', 'new message!');
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav-bar{
  background-color: #FFA023;
}
</style>
