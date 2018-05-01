<template>
  <div class="helloRestaurant">

    <br>
    <a id="see_restaurant" v-on:click="addTable" class="waves-effect waves-light btn-large">
      Add Table
    </a>

    <a id="see_restaurant" v-on:click="goToCalendar" class="waves-effect waves-light btn-large">
      See Reservation
    </a>

    <div class="cards">
      <div id="restaurant_list">
        <!-- Cards HERE -->
      </div>
    </div>

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
        this.$router.replace('addTable')
    },
    goToCalendar: function(){
      this.$router.replace('calendar')
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
