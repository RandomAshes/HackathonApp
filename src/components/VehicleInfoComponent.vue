<template>
  <div class="vehicle-comp">
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
      }
    },
    computed: {}
  }
</script>
<style scoped>
  .vehicle-comp {
    display: flex;
    flex-direction: row;
    font-size: 16px;
    margin: 1.6rem 0;
  }

  .circle {
    border-radius: 50%;
    width: 1.2rem;
    height: 1.2rem;
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
    padding: 8px 0;
  }

  .driver {
    font-weight: lighter;
    font-size: 16px;
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
