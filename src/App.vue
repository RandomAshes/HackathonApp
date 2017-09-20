<template>
  <div id="app">
    <h1>Dude, where's my</h1>
    <img src="http://www.vw.com/content/dam/vwcom/modelImages/blockquotes_logos/CARandDRIVER_logo.png">
    <div class="question-mark">?</div>
  </div>
</template>

<script>
export default {
  name: 'app',
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
</style>
