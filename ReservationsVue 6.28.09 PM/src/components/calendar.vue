<template lang="html">

  <section class="calendar">
    <div id="calendar_container">
        <full-calendar :events="events"></full-calendar>
    </div>
  </section>

</template>

<script lang="js">
  import FullCalendar from "vue-full-calendar";
  import "fullcalendar/dist/fullcalendar.min.css";
  import firebase from 'firebase';

  export default  {
    name: 'calendar',
    props: [],
    mounted() {

    },
    data() {
      return {
        events: []
      }
    },
    methods: {
      updateCalendar: function(){
        var vm = this;
        var auth = firebase.auth().currentUser;
        var rootRef = firebase.database().ref('restaurants/' + auth.uid);
        rootRef.once("value").then(function(snapshot) {
          snapshot.child("events").forEach(function(val){
            console.log(val.child('title').val());
            vm.$data.events.push({
              title : val.child('title').val(),
              start : val.child('start').val(),
              end : val.child('end').val(),
              editable : val.child('editable').val(),
              allDay : val.child('allDay').val()
            });
          });
        });
      }
    },
    computed: {

    },
    beforeMount(){
      this.updateCalendar();
    }
}
</script>

<style scoped lang="scss">
  .calendar {

  }
  #calendar_container{
    padding-left: 10%;
    padding-right: 10%;
    padding-top: 5%;
  }
</style>
