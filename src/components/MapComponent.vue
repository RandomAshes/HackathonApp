<template>
  <div class="map-container">
    <gmap-map class="map" :center="center" :zoom="10">

      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        @click="center=m.position" />

      <!--Polyline for routes-->
      <gmap-polyline
        :draggable="false"
        :editable="false"
        :options="polylines.routeOptions" />

      <!--Polyline for track-->
      <gmap-polyline
        :draggable="false"
        :editable="false"
        :options="polylines.trackOptions" />

    </gmap-map>
  </div>
</template>
<script>
  import Vue from 'vue'
  import * as VueGoogleMaps from 'vue2-google-maps'
  // Vue Google Maps Plugin: https://www.npmjs.com/package/vue2-google-maps
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
    name: 'dwmc-map',
    components: {
      VueGoogleMaps
    },
    data() {
      let coordinates = {
        cdOffice : {lat: 42.2383894, lng: -83.7320719},
        kalamazoo : {lat: 42.2741366,lng: -85.6671881},
        provingGrounds : {lat: 42.271529470695356, lng: -84.05141830444336},
        provingGroundsLoop : [
          {lat: 42.26759161968885,  lng: -84.04515266418457},
          {lat: 42.27737228012331,  lng: -84.04317855834961},
          {lat: 42.27883289784298,  lng: -84.04317855834961},
          {lat: 42.28092850761039,  lng: -84.04360771179199},
          {lat: 42.28175403171639,  lng: -84.04412269592285},
          {lat: 42.28283354691986,  lng: -84.04515266418457},
          {lat: 42.28365904606614,  lng: -84.04609680175781},
          {lat: 42.28429403804946,  lng: -84.04772758483887},
          {lat: 42.28454803305081,  lng: -84.04927253723145},
          {lat: 42.28448453439648,  lng: -84.05098915100098},
          {lat: 42.28423053913913,  lng: -84.05253410339355},
          {lat: 42.28359554651579,  lng: -84.05390739440918},
          {lat: 42.28238904289957,  lng: -84.05553817749023},
          {lat: 42.28118251617961,  lng: -84.05648231506348},
          {lat: 42.279340930853145, lng: -84.0575122833252},
          {lat: 42.27622916437951,  lng: -84.05828475952148},
          {lat: 42.26378056190804,  lng: -84.06051635742188},
          {lat: 42.26193846806108,  lng: -84.06051635742188},
          {lat: 42.260668027153905, lng: -84.06017303466797},
          {lat: 42.25952460845128,  lng: -84.05965805053711},
          {lat: 42.258381169014406, lng: -84.05871391296387},
          {lat: 42.257491812895466, lng: -84.05759811401367},
          {lat: 42.256983603767466, lng: -84.056396484375},
          {lat: 42.25672949766761,  lng: -84.0549373626709},
          {lat: 42.256665970982645, lng: -84.05322074890137},
          {lat: 42.25685655084551,  lng: -84.05167579650879},
          {lat: 42.257491812895466, lng: -84.05021667480469},
          {lat: 42.25819059375912,  lng: -84.04910087585449},
          {lat: 42.25927051259046,  lng: -84.04781341552734},
          {lat: 42.260858594921864, lng: -84.04678344726562},
          {lat: 42.26320888337027,  lng: -84.04609680175781},
          {lat: 42.26759161968885,  lng: -84.04515266418457},
          {lat: 42.26759161968885,  lng: -84.04515266418457}
        ]
      };

      let lineSymbol = {
//        path: google.maps.SymbolPath.CIRCLE,
        scale: 8,
        strokeColor: '#393'
      };

      return {
        center: coordinates.cdOffice,
        markers: [
          {position: coordinates.cdOffice},
          {position: coordinates.kalamazoo},
          {position: coordinates.provingGrounds}
        ],
        polylines: {
          trackOptions: {
            path: coordinates.provingGroundsLoop,
            strokeColor: "#FF0000",
            strokeOpacity: 1.0,
            strokeWeight: 2,
            icons: [{
              icon: lineSymbol,
              offset: '100%'
            }],
          },
          routeOptions: {
            path: [
              coordinates.cdOffice,
              coordinates.kalamazoo
            ],
            strokeColor: "#FF0000",
            strokeOpacity: 1.0,
            strokeWeight: 2,
            icons: [{
              icon: lineSymbol,
              offset: '100%'
            }]
          }
        }
      }
    }
  }
</script>
<style scoped>
  .map {
    height: 70vw;
    width: 70vw;
  }
</style>
