<template lang="html">

  <div>
    <div class="col-lg-3 col-md-3 col-xs-6 card">
      <a href="#" class="d-block mb-4 h-100" v-on:click="click_restaurant">
        <h4> {{name}}</h4>
      </a>
    </div>
  </div>

</template>

<script lang="js">
  export default  {
    name: 'restaurant-card',
    props: ['name', 'id'],
    mounted() {

    },
    data() {
      return {

      }
    },
    methods: {
      click_restaurant: function(){
        console.log(this.name);
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
