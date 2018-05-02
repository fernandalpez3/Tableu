<template>
 <div id="app">
   <nav id="nav-bar">
     <div class="nav-wrapper" id="nav-bar">
       <a href="#" class="brand-logo center">Tableu!</a>
        <i class="fas fa-utensils"></i>
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
@import url('https://fonts.googleapis.com/css?family=Pacifico');
.brand-logo{
 font-family: 'Pacifico', cursive;
}
nav .brand-logo.center {
   left: 50%;
   -webkit-transform: translateX(-50%);
   transform: translateX(-50%);
   padding-right: 46px;
}
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
#log_out{
   font-family: 'Pacifico', cursive;
   background-color: #fdac36;

}
#log_out:hover{
   font-family: 'Pacifico', cursive;
   background-color: #fdac36;
   color: white;

}
</style>


