<template>
  <div class="map-container">
    <gmap-map class="map"
      :center="coordinates[currentLocation.place]"
      :zoom="currentLocation.zoomLevel"
      :options="{styles: mapStyles}" >

      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        @click="center=m.position" />

      <!--Polyline for routes-->
      <gmap-polyline
        :editable="false"
        :animate="true"
        :options="polylines.hfeOptions" />

      <!--Polyline for track-->
      <gmap-polyline
        :editable="false"
        :animate="true"
        :options="polylines.provingGroundsOptions" />

      <!--Polyline for office-->
      <gmap-polyline
        :editable="false"
        :animate="true"
        :options="polylines.cdOfficeOptions" />

    </gmap-map>
  </div>
</template>
<script>
  import MapData from '../lib/mapData.js'
  import Vue from 'vue'
  import * as VueGoogleMaps from 'vue2-google-maps'
  // Vue Google Maps Plugin: https://www.npmjs.com/package/vue2-google-maps
  Vue.use(VueGoogleMaps, {
    load: {
      key: 'AIzaSyAcz63j0H3P3zD6UqKlghlRbHLXBWsQzjM',
      libraries: 'places', // This is required if you use the Autocomplete plugin
    }
  })
  export default {
    name: 'dwmc-map',
    components: {
      VueGoogleMaps
    },
    props: {
      currentLocation: {
        type: Object,
        default: {
          place: 'cdOffice',
          zoomLevel: 10
        }
      },
      vehicles: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        coordinates: MapData.coordinates,
        markers: [
          {position: MapData.coordinates.cdOffice},
          {position: MapData.coordinates.hfe},
          {position: MapData.coordinates.provingGrounds}
        ],
        polylines: {
          provingGroundsOptions: this.setOptions('provingGroundsLoop'),
          hfeOptions: this.setOptions('hfeStretch'),
          cdOfficeOptions: this.setOptions('cdOfficeLoop')
        },
        mapStyles: MapData.styles
      }
    },
    methods: {
      setOptions(type) {
        return {
          path: MapData.coordinates[type],
          strokeColor: '#1383b3',
          strokeOpacity: 1.0,
          strokeWeight: 4,
          icons: []
        }
      }
    },
    mounted() {
      this.vehicles.forEach((data) => {
        let iconObj = {
          offset: data.offset,
          icon: {
            path: MapData.carIconPath,
            strokeColor: data.iconColor,
            fillColor: data.iconColor,
            fillOpacity: .9,
            strokeWeight: 0,
            scale: .4,
            anchor: {x: 16, y:16},
	          rotation: 270
          }
        };

        if (data.location === 'provingGrounds') {
          this.polylines.provingGroundsOptions.icons.push(iconObj)
        } else if (data.location === 'hfe') {
          this.polylines.hfeOptions.icons.push(iconObj)
        } else if (data.location === 'cdOffice') {
          this.polylines.cdOfficeOptions.icons.push(iconObj)
        }
      })
    }
  }
</script>
<style scoped>
  .map {
    height: 100vh;
    width: 75vw;
  }

  @media screen and (max-width: 100rem) {
    .map {
      height: 100vh;
      width: 65vw;
    }
  }

  @media screen and (max-width: 53.125rem) {
    .map {
      height: 100vh;
      width: 100vw;
    }
  }
</style>
