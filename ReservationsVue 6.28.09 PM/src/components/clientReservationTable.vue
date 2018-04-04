<template lang="html">
  <div>
    <div class="wrapper">
      <div class="container">
        <h1 style="text-align:center;">{{restaurant_name}}</h1>
        <h4 style="text-align:center;">Maximum people per Table : 4</h4>
        <div id="seat-map">
          <div class="front-indicator">Front</div>
        </div>
        <div class="booking-details">
          <h2>Booking Details</h2>
          <h3> Selected Tables (<span id="counter">0</span>):</h3>
          <ul id="selected-seats">
          </ul>
          Total: <b>$<span id="total">0</span></b>
          <br>
          <button class="checkout-button">Checkout &raquo;</button>
          <button class="checkout-button" v-on:click="change_page" style="background-color: red; color: white">Cancel &raquo;</button>
          <div id="legend"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- Table Script start -->
<script>
var firstSeatLabel = 1;

$(document).ready(function() {
	var $cart = $('#selected-seats'),
	$counter = $('#counter'),
	$total = $('#total'),
	sc = $('#seat-map').seatCharts({
		map: [
			'ee_ee',
			'ee_ee',
			'_____',
			'ee_ee',
			'ee_ee',
			'_____',
			'ee_ee',
			'ee_ee',
			'ee_ee',
		],
		seats: {
			f: {
				price   : 100,
				classes : 'first-class', //your custom CSS class
				category: 'First Class'
			},
			e: {
				price   : 10,
				classes : 'economy-class', //your custom CSS class
				category: 'Reservation'
			}

		},
		naming : {
			top : false,
			getLabel : function (character, row, column) {
				return firstSeatLabel++;
			},
		},
		legend : {
			node : $('#legend'),
			items : [
				[ 'e', 'available',   'Tables Available'],
				[ 'f', 'unavailable', 'Tables Booked']
			]
		},
		click: function () {
			if (this.status() == 'available') {
				//let's create a new <li> which we'll add to the cart items
				$('<li>'+this.data().category+' Table # '+this.settings.label+': <b>$'+this.data().price+'</b> <a href="#" class="cancel-cart-item">[cancel]</a></li>')
				.attr('id', 'cart-item-'+this.settings.id)
				.data('seatId', this.settings.id)
				.appendTo($cart);

				/*
				* Lets update the counter and total
				*
				* .find function will not find the current seat, because it will change its stauts only after return
				* 'selected'. This is why we have to add 1 to the length and the current seat price to the total.
				*/
				$counter.text(sc.find('selected').length+1);
				$total.text(recalculateTotal(sc)+this.data().price);

				return 'selected';
			} else if (this.status() == 'selected') {
				//update the counter
				$counter.text(sc.find('selected').length-1);
				//and total
				$total.text(recalculateTotal(sc)-this.data().price);

				//remove the item from our cart
				$('#cart-item-'+this.settings.id).remove();

				//seat has been vacated
				return 'available';
			} else if (this.status() == 'unavailable') {
				//seat has been already booked
				return 'unavailable';
			} else {
				return this.style();
			}
		}
	});

	//this will handle "[cancel]" link clicks
	$('#selected-seats').on('click', '.cancel-cart-item', function () {
		//let's just trigger Click event on the appropriate seat, so we don't have to repeat the logic here
		sc.get($(this).parents('li:first').data('seatId')).click();
	});

	//let's pretend some seats have already been booked
	sc.get(['1_2', '4_1', '7_1', '7_2']).status('unavailable');

});

function recalculateTotal(sc) {
	var total = 0;

	//basically find every selected seat and sum its price
	sc.find('selected').each(function () {
		total += this.data().price;
	});

	return total;
}

</script>
<script type="text/javascript">

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-36251023-1']);
_gaq.push(['_setDomainName', 'jqueryscript.net']);
_gaq.push(['_trackPageview']);

(function() {
	var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

</script>
<!-- Table Script End -->

<script lang="js">
export default  {
  name: 'client-reservation-table',
  props: ['restaurant_name'],
  mounted() {

  },
  data() {
    return {
      showModal: false
    }
  },
  methods: {
    close() {
        this.$emit('close');
      },
      change_page: function(){
        this.$parent.$router.replace('hello');
      }
  },
  computed: {

  }
}
</script>

<style scoped lang="scss">
.client-reservation-table {
  font-family: 'Roboto', sans-serif;
}
.front-indicator {
  width: 145px;
  margin: 5px 32px 15px 32px;
  background-color: #f6f6f6;
  color: #adadad;
  text-align: center;
  padding: 3px;
  border-radius: 5px;
}
.wrapper {
  width: 100%;
  text-align: center;
  margin-top:150px;
}
.container {
  margin: 0 auto;
  width: 500px;
  text-align: left;
}
.booking-details {
  float: left;
  text-align: left;
  margin-left: 35px;
  font-size: 12px;
  position: relative;
  height: 401px;
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
  color: #182C4E;
  height: 25px;
  width: 25px;
  line-height: 25px;
}
.checkout-button{
  font-size: 14px;
}
</style>
