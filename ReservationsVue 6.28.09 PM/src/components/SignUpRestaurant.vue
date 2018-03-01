<template>
  <div class="signUpRestaurant">
    <p>Let's create a new account!</p>
    <input type="text" v-model="email" placeholder="Email"><br>
    <input type="password" v-model="password" placeholder="Password"><br>
    <input type="text" v-model="name" placeholder="Name"><br>
    <input type="text" v-model="address" placeholder="Address"><br>
    <button v-on:click="signUpRestaurant">Sign Up</button>
    <span>or go back to <router-link to="/loginRestaurant">login</router-link>.</span>
  </div>
</template>

<script>
  import firebase from 'firebase'

  export default {
    name: 'signUpRestaurant',
    data: function() {
      return {
        email: '',
        password: ''
      }
    },

    methods: {
      signUpRestaurant: function() {
        var data = {
          email: this.email,
          name: this.name, // get firstName
          address: this.address, // get lastName
        };

        firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
          (user) => {
            var usersRef = firebase.database().ref('restaurants');
            usersRef
                .child(user.uid)
                .set(data)
                .then(function(){
                  console.log("User Information Saved:", user.uid);
                })
            this.$router.replace('helloRestaurant')
          },
          (err) => {
            alert('Oops. ' + err.message)
          }
        );
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
