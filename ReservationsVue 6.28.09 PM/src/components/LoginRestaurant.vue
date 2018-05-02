<template>
<div class="login">
  <h3>Restaurant</h3>
<div class="container">
    <div class="box">
      <div class="nav">
          <ul class ="links">
       <li class="signin-active"><a class="btn">Sign in</a></li>
       <li class="signup-inactive"><a class="btn">Sign up </a></li>
     </ul>
      </div>
      <form class="form-signin" action="" method="post" name="form">
         <label for="username">EMAIL</label>
        <input type="text" v-model="email" placeholder="">
         <label for="password">Password</label>
          <input type="password" v-model="password" placeholder="">
         <div class="btn-animate">
           <a class="btn-signin" v-on:click="signIn">Sign in</a>
         </div>
                </form>
               <form class="form-signup" action="" method="post" name="form">
         <label for="fullname">Name</label>
         <input type="text" v-model="name" placeholder="">
         <label for="fullname">Address</label>
          <input type="text" v-model="address" placeholder="">
         <label for="email">Email</label>
          <input type="text" v-model="email" placeholder="">
         <label for="password">Password</label>
        <input type="password" v-model="password" placeholder="Password">
         <a  v-on:click="signUp" class="btn-signup">Sign Up</a>
                </form>
    </div>
</div>
    
  </div>
</template>

<script>
$(function() {
  $(".btn").click(function() {
    $(".form-signin").toggleClass("form-signin-left");
   $(".form-signup").toggleClass("form-signup-left");
   $(".frame").toggleClass("frame-long");
   $(".signup-inactive").toggleClass("signup-active");
   $(".signin-active").toggleClass("signin-inactive");
   $(".forgot").toggleClass("forgot-left");  
   $(this).removeClass("idle").addClass("active");
  });
});
  import firebase from 'firebase'

  export default {
     name: 'signUpRestaurant',
    data: function() {
      return {
        email: '',
        password: ''
      }
    },
    name: 'loginRestaurant',
    data: function() {
      return {
        email: '',
        password: '',
        fbSignInParams: {
        scope: 'email,user_likes',
        return_scopes: true
        }
      }
    },
    methods: {
      signUpRestaurant: function() {
        var data = {
          email: this.email,
          name: this.name, // get firstName
          address: this.address, // get lastName
          events: [] //for calendar
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
      },
      signIn: function() {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
          (user) => {
            this.$router.replace('helloRestaurant')
          },
          (err) => {
            alert('Oops. ' + err.message)
          }
        );
      }
    },
    onSignInError (error) {
      console.log('OH NOES', error)
      }
  }
</script>

<style scoped>  /* "scoped" attribute limit the CSS to this component only */
  .login {
    margin-top: 40px;
    padding-left: 10%;
    padding-right: 10%;

  }
  input {
    margin: 10px 0;
    width: 20%;
    padding: 15px;
  }
  button {
    margin-top: 20px;
    width: 10%;
    cursor: pointer;
  }
  p {
    margin-top: 40px;
    font-size: 13px;
  }
  p a {
    text-decoration: underline;
    cursor: pointer;
  }
   .fb-signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #4267b2;
  color: #fff;
  }

  @import url('https://fonts.googleapis.com/css?family=Pacifico');
.brand-logo{
 font-family: 'Pacifico', cursive;
 font-size: 35px;
 color: #ffa023;
}
.btn-container{
  margin-bottom: -45px;
}
.fas fa-utensils{
  size: 35px !important;
}

.button{
  background-color:#ffa023 !important; 
}

.bottom {
 display: inline-block;
 width: 4em;
 height: 4em;
 border: 0.5em solid #566472;
 border-radius: 50%;
 margin-left: 0.75em;
 margin-top: -100px;
}

.bottom:after {
 content: '';
  display: inline-block;
 margin-top: 0.6em;
 width: 1.4em;
 height: 1.4em;
 border-top: 0.5em solid #566472;
 border-right: 0.5em solid #566472;
 -moz-transform: rotate(135deg);
 -webkit-transform: rotate(135deg);
 transform: rotate(135deg);
}
h3{
  -webkit-transform-style: preserve-3d !important;
 -moz-transform-style: preserve-3d !important;
 transform-style: preserve-3d !important;
 -webkit-transform: translate3d(0,0,0) !important;
 -moz-transform: translate3d(0,0,0) !important;
 transform: translate3d(0,0,0) !important;
 opacity: 0;
 -webkit-animation: anim 3.2s ease-out forwards 1s !important;
 animation: anim 3.2s ease-out forwards 1s !important;
}
@-webkit-keyframes anim {
 0% {
   text-shadow: 0 0 50px #fff;
   letter-spacing: 80px;
   opacity: 0;
   -webkit-transform: rotateY(-90deg);
 }
 50% {
   text-shadow: 0 0 1px #fff;
   opacity: 0.8;
   -webkit-transform: rotateY(0deg);
 }
 75% {
   text-shadow: 0 0 1px #fff;
   opacity: 0.8;
   -webkit-transform: rotateY(0deg) translateZ(60px);
 }
 100% {
   text-shadow: 0 0 1px #fff;
   opacity: 0.8;
   letter-spacing: 8px;
   -webkit-transform: rotateY(0deg) translateZ(100px);
 }

}
@keyframes anim {
 0% {
   text-shadow: 0 0 50px #fff;
   letter-spacing: 80px;
   opacity: 0;
   -moz-transform: rotateY(-90deg);
 }
 50% {
   text-shadow: 0 0 1px #fff;
   opacity: 0.8;
   -moz-transform: rotateY(0deg);
 }
 75% {
   text-shadow: 0 0 1px #fff;
   opacity: 0.8;
   -moz-transform: rotateY(0deg) translateZ(60px);
 }
 100% {
   text-shadow: 0 0 1px #fff;
   opacity: 0.8;
   letter-spacing: 8px;
   -moz-transform: rotateY(0deg) translateZ(100px);
 }

}
 .login {
   margin-top: 40px;
   padding-left: 10%;
   padding-right: 10%;

 }
 input {
   margin: 10px 0;
   width: 20%;
   padding: 15px;
 }
 button {
   margin-top: 20px;
   width: 10%;
   cursor: pointer;
 }
 p {
   margin-top: 40px;
   font-size: 13px;
 }
 p a {
   text-decoration: underline;
   cursor: pointer;
 }
  .fb-signin-button {
 /* This is where you control how the button looks. Be creative! */
 display: inline-block;
 padding: 4px 8px;
 border-radius: 3px;
 background-color: #4267b2;
 color: #fff;
 }
 .container{
   width: 100%;
 padding-top: 60px;
 padding-bottom: 47px;
 }

 .nav{
   width: 100%;
 height: 100px;
 padding-top: 40px;
 opacity: 1;
 transition: all .5s ease;
 }

 .nav-up {
 transform: translateY(-100px);
 opacity: 0;
}

li {
 padding-left: 10px;
 font-size: 18px;
 display: inline;
 text-align: left;
 text-transform: uppercase;
 padding-right: 10px;
 color: #ffffff;
}

.signin-active a {
 padding-bottom: 10px;
 color: #ffffff;
 text-decoration: none;
 border-bottom: solid 2px #FFFFFF;
 transition: all .25s ease;
 cursor: pointer;
}

.signin-inactive a {
 padding-bottom: 0;
 color: rgba(255,255,255,.3);
 text-decoration: none;
 border-bottom: none;
 cursor: pointer;
}

.signup-active a {
 cursor: pointer;
 color: #ffffff !important;
 text-decoration: none;
 border-bottom: solid 2px  #FFFFFF;
 padding-bottom: 10px;
}

.signup-inactive a {
 cursor: pointer;
 color: rgba(255,255,255,.3);
 text-decoration: none;
 transition: all .25s ease;
}

.form-signin {
 width: 430px;
 height: 375px;
  font-size: 16px;
  font-weight: 300;
 padding-left: 37px;
 padding-right: 37px;
 padding-top: 55px;
 transition: opacity .5s ease, transform .5s ease;
}

.form-signin-left {
 transform: translateX(-400px);
 opacity: .0;
}

.form-signup {
 width: 430px;
 height: 375px;
  font-size: 16px;
  font-weight: 300;
 padding-left: 37px;
 padding-right: 37px;
 padding-top: 55px;
 position: relative;
 top: -375px;
 left: 400px;
 opacity: 0;
 transition: all .5s ease;
}

.form-signup-left {
 transform: translateX(-399px);
 opacity: 1;
}

.form-signup-down {
 top: 0px;
 opacity: 0;
}
.form-signin input, .form-signup input {
 color: #ffffff;
 font-size: 13px;
}

.form-styling {
 width: 100%;
 height: 35px;
  padding-left: 15px;
  border: none;
  border-radius: 20px;
 margin-bottom: 20px;
 background: rgba(255,255,255,.2);
}

label {
 font-weight: 400;
 text-transform: uppercase;
 font-size: 15px;
 padding-left: 15px;
 padding-bottom: 10px;
 color: rgba(255,255,255,.7);
 display: block;
}

.btn-signup {
 float: left;
 font-weight: 700;
 text-transform: uppercase;
 font-size: 13px;
 text-align: center;
 color: #ffffff;
 padding-top: 8px;
 width: 100%;
 height: 35px;
 border: 2px solid #ffffff;
  border-radius: 20px;
 margin-top: 23px;
 background-color: none;
}
.btn{
  background-color:#f6d47b !important;
}

.btn-signin {
  float: left;
 font-weight: 700;
 text-transform: uppercase;
 font-size: 13px;
 text-align: center;
 color: #ffffff;
 padding-top: 8px;
 width: 100%;
 height: 35px;
 border: 2px solid #ffffff;
  border-radius: 20px;
 margin-top: 23px;
 background-color: none;
}



a.btn-signup:hover, a.btn-signin:hover {
   cursor: pointer;
   background-color: #f6d378;
   transition: background-color .5s;
}


.welcome {
 width: 100%;
 height: 50px;
 position: relative;
 color: rgba(35,43,85,0.75);
 opacity: 0;
 transition: transform 1.5s ease .25s, opacity .1s ease 1s;
}

.welcome-left {
 transform: translateY(-780px);
 opacity: 1;
}

h1 {
 color: #ffffff;
 font-size: 35px;
  font-weight: 300;
 text-align: center;
}

.btn-goback {
 position: relative;
 margin-right: auto;
 top: -400px;
 float: left;
 padding: 8px;
 width: 83%;
 margin-left: 37px;
 margin-right: 37px;
 height: 35px;
  border-radius: 20px;
 font-weight: 700;
 text-transform: uppercase;
 font-size: 13px;
 text-align: center;
 color: #1059FF;
 margin-top: -8px;
 border: solid 1px #1059FF;
 opacity: 0;
 transition: top 1.5s ease 0.35s, opacity .75s ease .5s;
}

.btn-goback-up {
 top: -1080px;
 opacity: 1;
}

a.btn-goback:hover {
   cursor: pointer;
   background-color: #0F4FE6;
   transition: all .5s;
   color: #ffffff;
}

/* refresh button styling */

#refresh {
   position: fixed;
   bottom: 20px;
   right: 20px;
   background-color: #ffffff;
   width: 50px;
   height: 50px;
   border-radius: 25px;
   box-shadow: 0px 2px 7px rgba(0,0,0,0.1);
   padding: 13px 0 0 13px;
}

.refreshicon {
   fill: #d3d3d3;
   transform: rotate(0deg);
   transition: fill .25s ease, transform .25s ease;
}

.refreshicon:hover {
 cursor: pointer;
 fill: #1059FF;
 transform: rotate(180deg);
}

 .box{
   height: 670px;
 width: 430px;
 background:
   linear-gradient(
  rgb(245, 217, 131),
   rgb(255, 160, 35)),
   url(https://dl.dropboxusercontent.com/u/22006283/preview/codepen/clouds-cloudy-forest-mountain.jpg) no-repeat center center;
 background-size: cover;
 margin-left: auto;
 margin-right: auto;
 border-top: solid 1px rgba(255,255,255,.5);
 border-radius: 5px;
 box-shadow: 0px 2px 7px rgba(0,0,0,0.2);
 overflow: hidden;
 transition: all .5s ease;
 }
</style>
