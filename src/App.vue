<template>
  <div id="app">
    <h1>Dude, where's my</h1>
    <img src="http://www.vw.com/content/dam/vwcom/modelImages/blockquotes_logos/CARandDRIVER_logo.png">
    <div class="question-mark">?</div>

    <gmap-map
      class="map-container"
      :center="center"
      :zoom="10">
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        @click="center=m.position" />
    </gmap-map>

  </div>
</template>

<script>
  import Vue from 'vue'
  import * as VueGoogleMaps from 'vue2-google-maps'

  Vue.use(VueGoogleMaps, {
    load: {
      key: 'AIzaSyAcz63j0H3P3zD6UqKlghlRbHLXBWsQzjM',
      libraries: 'places', // This is required if you use the Autocomplete plugin
      // OR: libraries: 'places,drawing'
      // OR: libraries: 'places,drawing,visualization'
      // (as you require)
    }
  })
  export default {
    name: 'app',
    components: {
      VueGoogleMaps
    },
    data: function() {
      return {
        center: {lat: 42.238389, lng: -83.729883},
        markers: [
          {position: {lat: 42.238389, lng: -83.729883}}
        ]
      }
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
    padding: 60px;
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

  .map-container {
    height: 500px;
    width: 500px;
    margin: 2rem auto;
  }
</style>
