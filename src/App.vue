<template>
  <div id="app">
    <dwmc-map ref="map" :currentLocation="locations[activeLocation]" :vehicles="vehicles" :currentZoom="currentZoom" />
    <div class="info-bar">

      <img class="logo" src="./assets/CDLogoDK.svg">

      <div class="vehicles">
        <div class="locations">

        </div>
        <h2>{{locations[activeLocation].name}}</h2>
        <h3>{{locations[activeLocation].geoName}}</h3>
        <vehicle-info
          v-for="(vehicle, i) in vehiclesInActiveLocation"
          :key="vehicle.id"
          :circleColor="vehicle.iconColor"
          :vehicle="vehicle">
        </vehicle-info>
      </div>
    </div>
  </div>
</template>

<script>
  import DWMCMap from './components/MapComponent.vue'
  import Data from './lib/data'
  import VehicleInfo from "./components/VehicleInfoComponent.vue";
  import MapData from './lib/mapData.js'

  let vehicleCycleInterval;

  export default {
    name: 'app',
    components: {
      VehicleInfo,
      'dwmc-map': DWMCMap
    },
    data: function() {
     const black = '#444444'
     const red = '#E84343'
     const green = '#79A720'
     const yellow = '#EAC515'
	 const blue = '#0D5A7B'
	 const teal = '#50E3C2'

      return {
        vehicles: [
          {
            id: 1,
            name: '2018 Mercedes-Benz C300 Cabriolet 10Best',
            type: 'Test Track Vehicle',
            user: 'Track Testers Digital',
            location: 'provingGrounds',
            iconColor: black,
            offset: '100%'
          },
          {
            id: 2,
            name: '2017 Chevrolet Camaro V6 6MT 1LE Coupe',
            type: 'Test Track Vehicle',
            user: 'Track Testers Digital',
            location: 'provingGrounds',
            iconColor: green,
            offset: '50%'
          },
          {
            id: 3,
            name: '2018 Honda Fit Sport 6MT 10Best',
            type: 'Lift-over / Step-in Height',
            user: 'Zeb Sadiq',
            location: 'cdOffice',
            iconColor: yellow,
            offset: '75%'
          },
          {
            id: 4,
            name: '2017 Mercedes-AMG E63 Sedan 4Matict',
            type: 'HFE',
            user: 'Max Mortimer',
            location: 'hfe',
            iconColor: red,
            offset: '25%'
          },
          {
            id: 5,
            name: '2016 Mazda CX-9 Project',
            type: 'Lift-over / Step-in Height',
            user: 'Tech Assistants',
            location: 'cdOffice',
            iconColor: green,
            offset: '25%'
          },
          {
            id: 6,
            name: '2018 Honda Accord 1.5T 10Best Project',
            type: 'HFE',
            user: 'Dani Safi',
            location: 'hfe',
            iconColor: black,
            offset: '50%'
          },
          {
            id: 6,
            name: '2018 Honda Accord 2.0T 10AT 10Best Home',
            type: 'Test Track Vehicle',
            user: 'Track Testers Digital',
            location: 'provingGrounds',
            iconColor: red,
            offset: '75%'
          }
        ],
        activeId: 4,
        activeLocation: 2,
        currentZoom: 15,
        locations: [
          {
            place: 'cdOffice',
            name: 'Car and Driver HQ',
            geoName: 'Ann Arbor, Michigan',
            types: ['Lift-over / Step-in Height'],
            zoomLevel: 19
          },
          {
            place: 'hfe',
            name: 'I-94 Fuel Economy Tests',
            geoName: 'South Michigan',
            types: ['HFE'],
            zoomLevel: 9
          },
          {
            place: 'provingGrounds',
            name: 'Chrysler Proving Grounds Test',
            geoName: 'Chelsea, Michigan',
            types: ['Test Track Vehicle'],
            zoomLevel: 15
          }
        ]
      }
    },
    computed: {
      vehiclesInActiveLocation() {
        return this.vehicles.filter((vehicle) => {
          if (this.locations[this.activeLocation].types.indexOf(vehicle.type) > -1) {
            return true;
          }
        });
      }
    },
    methods: {
      queryChromeTrim(string) {
        const queryObj = {
          fields: {
            name: true
          },
          where: {
            name: {
              like: `^${string}.*`,
              options: "i"
            }
          }
        }

//        Data.getChromeTrims(queryObj)
//        .then((data) => {
//          console.log(data)
//        })
      },
      changeActiveLocation() {
        if (this.activeLocation >= this.locations.length-1) {
          this.activeLocation = 0;
		}
		else {
	      this.activeLocation++;
		}

		// if the map ref is defined, lets move stuff!
		if(typeof this.$refs.map.$children[0] !== undefined){
        	// define map object
			var $mapObject = this.$refs.map.$children[0].$mapObject;

			// Zoom out really far and then call the pan method
			this.smoothZoom($mapObject, 9, $mapObject.zoom);
        }
	  },
	  smoothPan(map) {
		var _this = this;

		// Lets pan the screen to the correct location, and then after the panning we'll zoom it.
      	map.panTo(MapData.coordinates[this.locations[this.activeLocation].place]);
		  setTimeout(function(){
		  	  // Zoom back into the current location
			  _this.smoothZoom(map, _this.locations[_this.activeLocation].zoomLevel, map.zoom);
		  }, 500);
      },
	  smoothZoom(map, target, current) {
	    var zoomingIn = target > current;
	    var incrementer = zoomingIn ? 1 : -1;
	    var _this = this;

		//console.log('target zoom:  ', target)
	    //console.log('current zoom: ', current)

        // Check to see if we are fully zoomed in/out
	    if ((zoomingIn && (current >= target)) || (!zoomingIn && (current <= target))) {

	    	// If we zoomed out lets pan as needed
	    	if(!zoomingIn) {
				setTimeout(function(){
					console.log('current zoom:', current);
					_this.smoothPan(map);
				}, 400);
            }

            // Exit
			return;
        }
        else {
	      // We are in the middle of zooming, lets update zoom level as needed.
		  var z = google.maps.event.addListener(map, 'zoom_changed', (event) => {
		    google.maps.event.removeListener(z);
		    this.smoothZoom(map, target, zoomingIn ? current + 1 : current -1);
		  });

		  // Set timeout and zoom
          setTimeout(() => {
            map.setZoom(current);
          }, 200);
		}
      }
    },
    created() {
      this.queryChromeTrim('Venture')
    },
    mounted() {
      vehicleCycleInterval = setInterval(() => {
        this.changeActiveLocation();
      }, 15000)
    }
  }
</script>

<style>
  body {
    padding: 0;
    margin: 0;
    color: #fff;
    background: linear-gradient(130deg, #E0E4E7, #000, #1383b3);
    background-size: 400% 400%;
    -webkit-animation: Gradient 30s ease-in-out infinite;
    -moz-animation: Gradient 30s ease-in-out infinite;
    animation: Gradient 30s ease-in-out infinite;
  }

  @-webkit-keyframes Gradient {
    0% {
      background-position: 0% 50%
    }
    50% {
      background-position: 100% 50%
    }
    100% {
      background-position: 0% 50%
    }
  }

  @-moz-keyframes Gradient {
    0% {
      background-position: 0% 50%
    }
    50% {
      background-position: 100% 50%
    }
    100% {
      background-position: 0% 50%
    }
  }

  @keyframes Gradient {
    0% {
      background-position: 0% 50%
    }
    50% {
      background-position: 100% 50%
    }
    100% {
      background-position: 0% 50%
    }
  }

  #app {
    font-family: Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    display: flex;
    flex-direction: row;
  }

  .info-bar {
    color: white;
    height: 100%;
    width: 100%;
    padding: 3rem;
  }

  .logo {
    width: 60%;
  }

  .vehicles {
    margin-top: 3rem;
  }

  h1,
  .question-mark {
    font-weight: bold;
    font-size: x-large;
  }

  h2 {
    font-weight: 100;
    text-align: left;
    font-size: 32px;
    padding: 48px 0 0 0;
    border-top: 1px solid rgba(255, 255, 255, 0.10);
    margin: 0
  }

  h3 {
    padding: 0;
    margin: 0;
    text-align: left;
    font-style: italic;
    color: lightgray;
    font-variant-caps: all-small-caps;
    font-size: 24px;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  @media screen and (max-width: 53.125rem) {
    #app {
      flex-direction: column-reverse;
    }

    .logo {
      width: 25%;
      margin-right: 3rem;
    }

    .info-bar {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: 1rem;
    }

    .vehicles {
      margin: 0;
    }
  }
</style>
