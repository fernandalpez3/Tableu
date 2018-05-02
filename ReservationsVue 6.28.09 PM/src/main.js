// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'
import FBSignInButton from 'vue-facebook-signin-button'
import FullCalendar from 'vue-full-calendar'
import DatePicker from 'vuejs-datepicker'

Vue.config.productionTip = false
Vue.use(FBSignInButton)
Vue.use(FullCalendar)
Vue.use(DatePicker)

window.fbAsyncInit = function() {
  FB.init({
    appId      : '207363733335482',
    cookie     : true,  // enable cookies to allow the server to access the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.8' // use graph api version 2.8
  });
};
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


let app;
let config = {
  apiKey: "AIzaSyCZKKTulhgDz_t4p_2QDA_QJ-3jHVJzmHI",
    authDomain: "reservations-2b9f1.firebaseapp.com",
    databaseURL: "https://reservations-2b9f1.firebaseio.com",
    projectId: "reservations-2b9f1",
    storageBucket: "",
    messagingSenderId: "852642616641"
};

firebase.initializeApp(config)
firebase.auth().onAuthStateChanged(function(user) {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      el: '#app',
      template: '<App/>',
      components: { App },
      router
    })
  }
});

export const db = firebase.database();
export const restaurant_db = db.ref('restaurants');
