<template>
  <div class="addTable">
    <p>Let's add a table!</p>
    <input type="text" v-model="tableNumber" placeholder="Table Number"><br>
    <input type="text" v-model="numberOfSeats" placeholder="Number of Seats"><br>
    <button v-on:click="createTable">Create it</button>
    <span>or go back to <router-link to="/helloRestaurant">home</router-link>.</span>
  </div>
</template>

<script>
  import firebase from 'firebase'

  export default {
    name: 'addTable',
    data: function() {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      createTable: function() {
        var auth = firebase.auth().currentUser;
        var tableRef = firebase.database().ref('restaurants/' + auth.uid + '/tables');
        console.log(this.numberOfSeats);
        if( auth != null ){
            if( this.tableNumber != '' && this.numberOfSeats != '' ){
                tableRef.push({
                    table: this.tableNumber ,
                    numberSeats: this.numberOfSeats,
                })
            } else {
            alert('Please fill at-least name or email!');
             }
        } else {
            //inform user to login
        }
        this.$router.replace('helloRestaurant')
      }
    }
  }
</script>

<style scoped>
  .signUp {
    margin-top: 40px;
  }
  input {
    margin: 10px 0;
    width: 20%;
    padding: 15px;
  }
  button {
    margin-top: 10px;
    width: 10%;
    cursor: pointer;
  }
  span {
    display: block;
    margin-top: 20px;
    font-size: 11px;
  }
</style>
