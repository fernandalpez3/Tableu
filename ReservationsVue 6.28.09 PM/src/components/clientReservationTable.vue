<template>
		<div class="wrapper">
			<div>
        <div class="seat-chart-wrapper">
          <div id="seat-map">
            <div class="front-indicator">Front</div>
          </div>
        </div>
        <br/>
        <div class='seat-stat-wrapper'>
          <div id="legend"></div>
          <div class="booking-details">
            <h2>Booking Details</h2>

            <h3> Selected Seats (<span id="counter">0</span>):</h3>
            <ul id="selected-seats"></ul>

            <h4>Total: Rs.<span id="total">0</span></h4>

            <button class="checkout-button" v-on:click="addTable">Checkout &raquo;</button>
          </div>
        </div>
			</div>
		</div>
</template>

<script>
export default {
  data() {
    return {
      seatChartOpts : null,
      tablesMap: []
    };
  },
  mounted() {
    var firstSeatLabel = 1;

    require("../../jquery-seat-charts.min.js");

    $(document).ready(function() {
      var firstSeatLabel = 1;

      this.tablesMap = [
        "ee_ee",
        "ee_ee",
        "___",
        "ee_ee",
        "ee_ee",
        "___",
        "ee_ee",
        "ee_ee",
        "ee_ee"
      ];

      this.seatChartOpts = {
        map: this.tablesMap,
        seats: {
          f: {
            price: 100,
            classes: "first-class", //your custom CSS class
            category: "First Class"
          },
          e: {
            price: 10,
            classes: "economy-class", //your custom CSS class
            category: "Reservation"
          }
        },
        naming: {
          top: false,
          getLabel: function(character, row, column) {
            return firstSeatLabel++;
          }
        },
        legend: {
          node: $("#legend"),
          items: [
            ["e", "available", "Tables Available"],
            ["f", "unavailable", "Tables Booked"]
          ]
        },
        click: function() {
          if (this.status() == "available") {
            //let's create a new <li> which we'll add to the cart items
            $(
              "<li>" +
                this.data().category +
                " Table # " +
                this.settings.label +
                ": <b>$" +
                this.data().price +
                '</b> <a href="#" class="cancel-cart-item">[cancel]</a></li>'
            )
              .attr("id", "cart-item-" + this.settings.id)
              .data("seatId", this.settings.id)
              .appendTo($cart);

            /*
					 * Lets update the counter and total
					 *
					 * .find function will not find the current seat, because it will change its stauts only after return
					 * 'selected'. This is why we have to add 1 to the length and the current seat price to the total.
					 */
            $counter.text(sc.find("selected").length + 1);
            $total.text(recalculateTotal(sc) + this.data().price);

            return "selected";
          } else if (this.status() == "selected") {
            //update the counter
            $counter.text(sc.find("selected").length - 1);
            //and total
            $total.text(recalculateTotal(sc) - this.data().price);

            //remove the item from our cart
            $("#cart-item-" + this.settings.id).remove();

            //seat has been vacated
            return "available";
          } else if (this.status() == "unavailable") {
            //seat has been already booked
            return "unavailable";
          } else {
            return this.style();
          }
        }
      };

      var $cart = $("#selected-seats"),
        $counter = $("#counter"),
        $total = $("#total"),
        sc = $("#seat-map").seatCharts(this.seatChartOpts);

      //this will handle "[cancel]" link clicks
      $("#selected-seats").on("click", ".cancel-cart-item", function() {
        //let's just trigger Click event on the appropriate seat, so we don't have to repeat the logic here
        sc
          .get(
            $(this)
              .parents("li:first")
              .data("seatId")
          )
          .click();
      });

      //let's pretend some seats have already been booked
      //sc.get(['1_2', '4_1', '7_1', '7_2']).status('unavailable');

      function recalculateTotal(sc) {
        var total = 0;

        //basically find every selected seat and sum its price
        sc.find("selected").each(function() {
          total += this.data().price;
        });

        return total;
      }
    });
  },
  methods: {
    addTable: function() {
      $(".seatCharts-row").remove();
      $(".seatCharts-legendItem").remove();
      $("#seat-map,#seat-map *")
        .unbind()
        .removeData();

      var firstSeatLabel = 1;
      this.tablesMap.push("ee_ee");
      this.seatChartOpts.map = tablesMap;
      this.seatChartOpts.naming = {
        top: false,
        getLabel: function(character, row, column) {
          return firstSeatLabel++;
        }
      };
      $("#seat-map").seatCharts(seatChartOpts);
    }
  }
};
</script>

<style scoped>
@import url("../../jquery-seat-charts.css");
/* "scoped" attribute limit the CSS to this component only */
body {
  font-family: "Lato", sans-serif;
}
a {
  color: #b71a4c;
}
.front-indicator {
  width: 100%;
  margin: 5px 32px 15px 32px;
  background-color: #f6f6f6;
  color: #adadad;
  text-align: center;
  padding: 3px;
  border-radius: 5px;
}
.wrapper {
  /* 	width: 400px; */
}
.container {
  margin: 0 auto;
  /* 	width: 500px; */
  text-align: left;
}
.seat-stat-wrapper {
  width: 100%;
}
#legend {
  width: 49%;
  margin: 0 auto;
  float: left;
}
.booking-details {
  display: inline-block;
  text-align: right;
  font-size: 12px;
  width: 49%;
  margin: 0 auto;
}
@media screen and (max-width: 550px) {
  #legend {
    width: 100%;
  }
  .booking-details {
    width: 100%;
    text-align: left;
  }
}
.booking-details h2 {
  margin: 25px 0 20px 0;
  font-size: 17px;
}
.booking-details h3 {
  margin: 5px 5px 0 0;
  font-size: 14px;
}
div.seatCharts-cell {
  color: #182c4e;
  height: 25px;
  width: 25px;
  line-height: 25px;
}
div.seatCharts-seat {
  color: #ffffff;
  cursor: pointer;
}
div.seatCharts-row {
  height: 35px;
}
div.seatCharts-seat.available {
  background-color: #b9dea0;
}
div.seatCharts-seat.available.vip-class {
  background-color: #3a78c3;
}
div.seatCharts-seat.available.standard-ground-class {
  background-color: orange;
}
div.seatCharts-seat.available.standard-balcony-class {
  background-color: purple;
}
div.seatCharts-seat.available.student-class {
  background-color: blue;
}
div.seatCharts-seat.focused {
  background-color: #76b474;
}
div.seatCharts-seat.selected {
  background-color: #e6cac4;
}
div.seatCharts-seat.unavailable {
  background-color: #472b34;
}
.seat-chart-wrapper {
  /*   width: 600px; */
  overflow: scroll;
}
div.seatCharts-container {
  border-right: 1px dotted #adadad;
  width: 1767px;
  padding: 20px;

  /* 	float: left; */
}
div.seatCharts-legend {
  display: inline-block;
}

div.seatCharts-legend li {
  text-align: left;
}

ul.seatCharts-legendList {
  padding-left: 0px;
}
span.seatCharts-legendDescription {
  margin-left: 5px;
  line-height: 30px;
}
.checkout-button {
  /* 	display: block; */
  margin: 10px 0;
  font-size: 14px;
}
#selected-seats {
  overflow-y: scroll;
  overflow-x: none;
}
</style>
