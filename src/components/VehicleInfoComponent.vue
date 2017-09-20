<template>
  <div class="vehicle-comp">

    <div class="circle-column">
      <div class="circle" :style="{ 'background-color': circleColor}"></div>
    </div>

    <div class="text-column">
      <span class="car">{{ car }}</span>
      <span class="driver">{{ driver }}</span>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'vehicle-info',
    props: {
      car: {
        type: String,
        default: 'Vehicle'
      },
      driver: {
        type: String,
        default: 'Name'
      },
      circleColor: {
        type: String,
        default: '#dd4b4b'
      }
    }
  }
</script>
<style scoped>
  .vehicle-comp {
    display: flex;
    flex-direction: row;
    font-size: 24px;
    margin: 3rem 0;
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
    font-size: 20px;
  }

  .driver {
    font-weight: lighter;
    font-size: 16px;
  }
</style>
