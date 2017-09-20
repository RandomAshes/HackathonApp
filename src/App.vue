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
  export default {
    name: 'app',
    components: {
      'dwmc-map': DWMCMap
    },
    data: function() {
      return {}
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
