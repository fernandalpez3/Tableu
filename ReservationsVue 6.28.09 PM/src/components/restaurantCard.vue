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
      console.log(this.name + " : " + this.id);
      this.$parent.$router.push({ name: 'selectTable', params: {id: this.id }});
      //modify component:

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
