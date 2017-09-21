<template>
  <div id="app">
    <dwmc-map :currentLocation="locations[activeLocation]" :vehicles="vehicles" />
    <div class="info-bar">

      <img class="logo" src="./assets/DWMC.svg">

      <div class="vehicles">
        <div class="locations">

        </div>
        <h2>{{locations[activeLocation].name}}</h2>
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
            name: 'VLST-P-2018 Mercedes-Benz C300 Cabriolet 10Best',
            type: 'Test Track Vehicle',
            user: 'Track Testers Digital',
            location: 'provingGrounds',
            iconColor: black,
            offset: '100%'
          },
          {
            id: 2,
            name: 'VLST-P-2017 Chevrolet Camaro V6 6MT 1LE Coupe',
            type: 'Test Track Vehicle',
            user: 'Track Testers Digital',
            location: 'provingGrounds',
            iconColor: green,
            offset: '50%'
          },
          {
            id: 3,
            name: 'VLST-P-2018 Honda Fit Sport 6MT 10Best',
            type: 'Lift-over / Step-in Height',
            user: 'Zeb Sadiq',
            location: 'cdOffice',
            iconColor: yellow,
            offset: '75%'
          },
          {
            id: 4,
            name: 'VLST-D-2017 Mercedes-AMG E63 Sedan 4Matict',
            type: 'HFE',
            user: 'Track Testers Digital',
            location: 'hfe',
            iconColor: red,
            offset: '25%'
          }
        ],
        activeId: 4,
        activeLocation: 2,
        locations: [
          {
            place: 'cdOffice',
            name: 'Car and Driver HQ - Ann Arbor, MI',
            types: ['Lift-over / Step-in Height'],
            zoomLevel: 18
          },
          {
            place: 'hfe',
            name: 'I-94 Fuel Economy Tests',
            types: ['HFE'],
            zoomLevel: 10
          },
          {
            place: 'provingGrounds',
            name: 'Chrysler Proving Grounds Test',
            types: ['Test Track Vehicle'],
            zoomLevel: 14
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
        if (this.activeLocation >= this.locations.length) {
          this.activeLocation = 0;
          return;
        }

        this.activeLocation++;
      }
    },
    created() {
      this.queryChromeTrim('Venture')
    },
    mounted() {
      vehicleCycleInterval = setInterval(() => {
        this.changeActiveLocation()
      }, 5000)
    }
  }
</script>

<style>
  body {
    padding: 0;
    margin: 0;
    background-color: #666;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .info-bar {
    color: white;
    width: auto;
    height: 100%;
    padding: 3rem;
  }

  .logo {
    width: 100%;
  }

  .vehicles {
    margin-top: 6rem;
  }

  .map-container {
    border-right: .5rem solid #0083b3;
  }

  h1,
  .question-mark {
    font-weight: bold;
    font-size: x-large;
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
