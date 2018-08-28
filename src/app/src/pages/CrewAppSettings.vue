<template>
  <div class="hello">
    <h1>{{ $route.params.userId }}</h1>
  </div>
</template>

<script>
export default {
  name: 'CrewAppSettings',
  created () {
    var self = this
    document.addEventListener('message', function (message) {
      self.msg = message
    })
  },
  data () {
    return {
      msg: 'Crew Settings'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
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
