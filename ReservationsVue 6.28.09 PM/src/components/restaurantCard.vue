<template lang="html">

  <div>
    <div class="col-lg-3 col-md-3 col-xs-6 card">
      <a class="d-block mb-4 h-100" v-on:click="click_restaurant">
        <h4> {{name}}</h4>
      </a>
    </div>
  </div>

</template>

<script lang="js">
import firebase from 'firebase';

export default  {
  name: 'restaurant-card',
  props: ['name', 'id'],
  components: {

  },
  mounted() {

  },
  data() {
    return {

    }
  },
  methods: {
    click_restaurant: function(){
      this.$parent.$router.replace('clientReservationTable');
      console.log(this.name + ": " + this.id);
      var id = this.id;

      var vm = this;
      var rootRef = firebase.database().ref('tables');
      rootRef.once("value").then(function(snapshot) {
        snapshot.child(id).forEach(function(val){
          console.log("Number of table: " + val.child("table").val());
          console.log("Number of seats: " + val.child("numberSeats").val());
        });
      });
    }
  },
  computed: {

  }
}
</script>

<style scoped lang="scss">
.restaurant-card {

}
</style>
