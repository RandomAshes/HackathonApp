<template>
  <div id="app">
    <dwmc-map />
    <div class="info-bar">

      <img class="logo" src="./assets/DWMC.svg">

      <div class="vehicles">

        <vehicle-info
          v-for="(vehicle, i) in vehicles"
          :circleColor="carColors[i]"
          :car="vehicle.name"
          :driver="vehicle.user">
        </vehicle-info>

      </div>

    </div>
  </div>
</template>

<script>
  import DWMCMap from './components/MapComponent.vue'
  import Data from './lib/data'
  import VehicleInfo from "./components/VehicleInfoComponent.vue";
  export default {
    name: 'app',
    components: {
      VehicleInfo,
      'dwmc-map': DWMCMap
    },
    data: function() {
      return {
        vehicles: [
          {
            name: 'VLST-P-2018 Mercedes-Benz C300 Cabriolet 10Best',
            type: 'Test Track Vehicle',
            user: 'Track Testers Digital'
          },
          {
            name: 'VLST-P-2017 Chevrolet Camaro V6 6MT 1LE Coupe',
            type: 'Test Track Vehicle',
            user: 'Track Testers Digital'
          },
          {
            name: 'VLST-P-2018 Honda Fit Sport 6MT 10Best',
            type: 'Lift-over / Step-in Height',
            user: 'Zeb Sadiq'
          },
          {
            name: 'VLST-D-2017 Mercedes-AMG E63 Sedan 4Matict',
            type: 'HFE',
            user: 'Track Testers Digital'
          }
        ],
        carColors: [
          '#444444',
          '#dd4b4b',
          '#a6e726',
          '#f0c517'
        ]
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

        Data.getChromeTrims(queryObj)
        .then((data) => {
          console.log(data)
        })
      }
    },
    created() {
      this.queryChromeTrim('Venture')
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

  .info-bar {
    color: white;
    width: 100%;
    height: 100%;
    padding: 3rem;
  }

  .logo {
    width: 100%;
  }

  .vehicles {
    margin-top: 6rem;
  }

</style>
