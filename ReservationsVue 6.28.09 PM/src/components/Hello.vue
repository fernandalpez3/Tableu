<template>
  <div class="hello">

    <br>
    <a id="see_restaurant" v-on:click="change_page" class="waves-effect waves-light btn-large">
      See Tables
    </a>

  <div class="cards">
    <div id="restaurant_list">
      <!-- Cards HERE -->
      <template v-for="restaurant in restaurants_names">
        <restaurantCard :key='restaurant.id' :name="restaurant.name" v-bind='restaurant'></restaurantCard>
      </template>

    </div>
  </div>

</div>

</template>

<script>
document.getElementById('log_out').innerHTML += "Log Out";
function a(){
  console.log("a");
}
</script>

<script>
import firebase from 'firebase';
import restaurantCard from './restaurantCard.vue';
//firebase.app().initializeApp()

export default {
  name: 'hello',
  components: {
    restaurantCard
  },
  data () {
    return {
      msg: 'Tableu',
      restaurants_names: [],
      isModalVisible: false,
    }
  },
  methods: {
    logout: function() {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    },
    change_page: function(){
      this.$parent.$router.replace('clientReservationTable');
    },
    show_cards: function(){
      // The view model.
      var vm = this;
      var rootRef = firebase.database().ref();
      rootRef.once("value").then(function(snapshot) {
        snapshot.child("restaurants").forEach(function(val){
          vm.$data.restaurants_names.push({name : val.child("name").val(), id: val.key});
        });
      });
    }
  },
  beforeMount(){
    this.show_cards();
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
