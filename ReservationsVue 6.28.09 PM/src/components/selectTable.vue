<template lang="html">

  <section class="select-table">

    <div id="my_form">

      <div class="row">
       <div class="col s12 l12 m12">
         Date:
         <div class="input-field inline">
           <datepicker format="yyyy-MM-dd" v-on:selected="getDate" ></datepicker>
           <!-- <span class="helper-text" data-error="wrong" data-success="right">Date of reservation.</span> -->
         </div>
       </div>
     </div>

     <div class="row">
       <div class="col s4 l4 m4" style="text-align: right;">
         Table:
        </div>
        <div class="col s6 l6 m6">
          <select v-model="selectedTable">
            <option disabled value="">Please select one table:</option>
            <option v-for="table in tables" :value="table.table">Table: {{table.table}} ({{table.numberSeats}} seat(s))</option>
          </select>
        </div>
        <!--
        <div class="col s12 l12 m12">
          <span>Selected: {{ selectedTable }}</span>
        </div>
        -->
      </div>

     <div class="row">
       <div class="col s12 l12 m12">
         Time of reservation:
           <br>
           <input type="radio" id="eight" value="8" v-model="timeSelected" v-on:change="setTime">
           <label for="eight">08:00am to 11:00am</label>
           <br>
           <input type="radio" id="twelve" value="12" v-model="timeSelected" v-on:change="setTime">
           <label for="twelve">12:00am to 03:00pm</label>
           <br>
           <input type="radio" id="three" value="3" v-model="timeSelected" v-on:change="setTime">
           <label for="three">03:00pm to 05:00pm</label>
           <br>
           <input type="radio" id="six" value="6" v-model="timeSelected" v-on:change="setTime">
           <label for="six">06:00pm to 09:00pm</label>
           <br>
       </div>
     </div>

     <div class="row">
       <div class="col s12 l12 m12">
         <button name="reservationButton" v-on:click="makeReservation">Make reservation</button>
         <button name="reservationButton" v-on:click="goBack">Cancel</button>
       </div>
     </div>

    </div>

  </section>

</template>

<script lang="js">
import Datepicker from 'vuejs-datepicker';
import firebase from 'firebase';
  export default  {
    name: 'select-table',
    components: {
      Datepicker
    },
    props: ["id"],
    mounted() {

    },
    data() {
      return {
        day: "",
        startTime: "",
        endTime: "",
        timeSelected: "",
        selectedTable: "",
        tables: []
      }
    },
    methods: {
      getDate: function(event){
        this.day = event.toISOString().split('T')[0];
        console.log(this.day);
      },
      setTime: function(){
        switch(this.timeSelected){
          case "8":
            this.startTime = "T08:00:00";
            this.endTime = "T11:00:00";
            break;
          case "12":
            this.startTime = "T12:00:00";
            this.endTime = "T15:00:00";
            break;
          case "3":
            this.startTime = "T15:00:00";
            this.endTime = "T18:00:00";
            break;
          case "6":
            this.startTime = "T18:00:00";
            this.endTime = "T21:00:00";
            break;
          default:
            break;
        }
        console.log("Start: " + this.startTime + " end: " + this.endTime);

      },
      showTablesToSelect: function(){
        var vm = this;
        console.log("TS id: " + this.id);
        var the_id = this.id + "";
        var rootRef = firebase.database().ref();
        rootRef.once("value").then(function(snapshot) {
          snapshot.child("restaurants/" + the_id + "/tables").forEach(function(val){
            vm.$data.tables.push({table : val.child("table").val(), numberSeats: val.child("numberSeats").val()});
          });
        });
      },
      goBack(){
        this.$router.go(-1);
      },
      makeReservation: function(){
        //var auth = firebase.auth().currentUser;
        var vm = this;
        var the_id = this.id + "";
        var tableRef = firebase.database().ref('restaurants/' + the_id + '/events');
        if((vm.$data.day != "") && (vm.$data.startTime != "") && (vm.$data.endTime != "") && (vm.$data.selectedTable != "")){
          tableRef.push({
            title : "table " + vm.$data.selectedTable,
            start : vm.$data.day + vm.$data.startTime,
            end : vm.$data.day + vm.$data.endTime,
            editable : false,
            allDay : false
          });
          alert("Reservation time: "+ this.startTime + " on " + this.day);
          this.goBack();
          
          //send email here:
          //send alert about cost here:
        }else{
          alert("Please complete form.");
        }
      }

    },
    computed: {

    },
    beforeMount(){
      this.showTablesToSelect();
    }
}
</script>


<style scoped lang="scss">
  .select-table {

  }
  #my_form{
    padding-left: 10%;
    padding-right: 10%;
    padding-top: 5%;
    font-size: 145%;
  }

  select{
    display: block;
  }

</style>
