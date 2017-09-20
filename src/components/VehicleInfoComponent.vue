<template>
  <div class="vehicle-comp" v-bind:class="{active: isActive}">
    <div class="circle-column">
      <div class="circle" :style="{ 'background-color': circleColor}"></div>
    </div>

    <div class="text-column">
      <span class="car">{{ vehicle.name }}</span>
      <span class="driver">{{ vehicle.user }}</span>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'vehicle-info',
    props: {
      vehicle: {
        type: Object,
        default: {}
      },
      circleColor: {
        type: String,
        default: '#dd4b4b'
      },
      activeId: {
        type: Number,
        default: 0
      }
    },
    computed: {
      isActive: function() {
        console.log(this.activeId)
        console.log(this.vehicle.id)
        return this.activeId === this.vehicle.id;
      }
    }
  }
</script>
<style scoped>
  .vehicle-comp {
    display: flex;
    flex-direction: row;
    font-size: 16px;
    margin: 1rem 0;
  }

  .circle {
    border-radius: 50%;
    width: 1rem;
    height: 1rem;
  }

  .circle-column,
  .text-column {
    display: flex;
    text-align: left;
  }

  .circle-column {
    align-items: center;
    padding-right: 1rem;
  }

  .text-column {
    flex-direction: column;
    align-items: left;
  }

  .car {
    font-weight: bold;
    font-size: 16px;
  }

  .driver {
    font-weight: lighter;
    font-size: 14px;
  }

  .active {
    border: black solid 4px;
    padding: 16px;
    font-size: 24px;
  }

  .active .car {
    font-size: 24px;
  }

  .active .driver {
    font-size: 20px;
  }
</style>
