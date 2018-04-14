<template>
  <div class="sign-up">
    <p>Let's create a new account !</p>
    <input type="text" v-model="email" placeholder="Email"><br>
    <input type="password" v-model="password" placeholder="Password"><br>
    <input type="text" v-model="name" placeholder="Name"><br>
    <input type="text" v-model="lastName" placeholder="Last Name"><br>
    <button v-on:click="signUp">Sign Up</button>
    <span>or go back to <router-link to="/login">login</router-link>.</span>
  </div>
</template>

<script>
  import firebase from 'firebase'

  export default {
    name: 'signUp',
    data: function() {
      return {
        email: '',
        password: ''
      }
    },

    methods: {
      signUp: function() {
        var data = {
          email: this.email,
          firstName: this.name, // get firstName
          lastName: this.lastName, // get lastName
        };

        firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
          (user) => {
            var usersRef = firebase.database().ref('users');
            usersRef
                .child(user.uid)
                .set(data)
                .then(function(){
                  console.log("User Information Saved:", user.uid);
                })
            this.$router.replace('hello')
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
