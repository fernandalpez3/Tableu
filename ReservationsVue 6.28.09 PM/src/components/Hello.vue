<template>
  <div class="hello">

    <br>
    <a id="see_restaurant" v-on:click="show_cards" class="waves-effect waves-light btn-large">
      See Restaurants
    </a>

    <div class="cards">
      <div id="restaurant_list">
        <!-- Cards HERE -->
      </div>
    </div>

  </div>

</template>

<script>
document.getElementById('log_out').innerHTML += "Log Out";
</script>

<script>
import firebase from 'firebase';
//firebase.app().initializeApp()

export default {
  name: 'hello',
  data () {
    return {
      msg: 'Tableu'
    }
  },
  methods: {
    logout: function() {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    },
    click_restaurant: function() {
      console.log("hola");
      /*
      if (event) {
        targetId = event.currentTarget.id;
        console.log(targetId);
        alert(targetId);
      }*/
    },
    show_cards: function(){

      var rootRef = firebase.database().ref();
      rootRef.once("value").then(function(snapshot) {
        snapshot.child("restaurants").forEach(function(val){
          $('#restaurant_list').append('<div><div class="col-lg-3 col-md-3 col-xs-6 card"><a href="#" class="d-block mb-4 h-100" id="'+ val.key +'" v-on:click="click_restaurant"><h4>' + val.child("name").val() + '</h4></a></div></div>');
          //<div id="restaurant_list"><div class="col-lg-3 col-md-3 col-xs-6 card"><a href="#" class="d-block mb-4 h-100"><img class="img-fluid img-thumbnail" src="' + val.child("image").val() + '" alt=""><h4>' + val.child("name").val() + '</h4></a> </div></div>
        });
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
