<template>
  <div id="app">
    <dwmc-map />
    <div class="info-bar">

      <img class="logo" src="./assets/DWMC.svg">

    </div>
  </div>
</template>

<script>
  import DWMCMap from './components/MapComponent.vue'
  import Data from './lib/data'
  export default {
    name: 'app',
    components: {
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
    background-color: gainsboro;
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
    background-color: rgb(102,102,102);
    width: 100%;
    height: 70vw;
    padding: 3rem;
    border-left: .5rem solid rgb(19,131,179);
  }

  .logo {
    width: 100%;
  }

</style>
