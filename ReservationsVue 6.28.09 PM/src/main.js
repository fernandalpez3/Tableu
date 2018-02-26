// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'

Vue.config.productionTip = false

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
