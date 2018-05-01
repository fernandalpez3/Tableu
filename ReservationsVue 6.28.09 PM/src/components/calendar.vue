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

  export default  {
    name: 'calendar',
    props: [],
    mounted() {

    },
    data() {
      return {
        events: [
        {
            title  : 'event1',
            start  : '2018-04-30T12:30:00',
            end    : '2018-04-30T15:30:00',
            editable : false,
        },
        {
            title  : 'event2',
            start  : '2010-01-05',
            end    : '2010-01-07',
        },
        {
            title  : 'event3',
            start  : '2010-01-09T12:30:00',
            allDay : false,
        },
      ]

      }
    },
    methods: {

    },
    computed: {

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
