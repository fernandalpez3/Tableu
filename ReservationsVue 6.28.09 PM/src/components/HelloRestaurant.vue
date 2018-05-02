<template>
  <div class="helloRestaurant">

    <br>
    <a id="see_restaurant" v-on:click="addTable" class="waves-effect waves-light btn-large">
      Add Table
    </a>

    <a id="see_restaurant" v-on:click="goToCalendar" class="waves-effect waves-light btn-large">
      See Reservation
    </a>

    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>

    <a id="see_restaurant" v-on:click="deleteRestaurant" class="waves-effect waves-light btn-large">
      Delete Restaurant
    </a>

  </div>
</template>

<script>
import { database } from "firebase";

  document.getElementById('log_out').innerHTML += "Log Out";
</script>

<script>
import firebase from 'firebase';
//firebase.app().initializeApp()

export default {
  name: 'helloRestaurant',
  data () {
    return {
      msg: 'Tableu'
    }
  },
  methods: {
    logout: function() {
      firebase.auth().signOut().then(() => {
        this.$router.replace('loginRestaurant')
      })
    },
    addTable: function(){
        this.$router.push('addTable')
    },
    goToCalendar: function(){
      this.$router.push('calendar')
    },
    deleteRestaurant: function(){
      var vm = this;
      var rootRef = firebase.database().ref();
      var res = rootRef.child("restaurants");
      var auth = firebase.auth().currentUser.uid;
      var toDelete = res.child(auth);
      toDelete.remove();

      console.log(auth);

      var user = firebase.auth().currentUser;
      console.log(user);

      user.delete().then(response => {
        firebase.auth().signOut().then(() => {
          this.$router.replace('login');
        })
      }).catch(function(error) {
        // An error happened.
      });
      
    }
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello{
  padding-left: 2%;
  padding-right: 2%;
  text-align: left;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

#see_restaurant{
  color: white;
}

.card{
  padding: 2%;
}
</style>
