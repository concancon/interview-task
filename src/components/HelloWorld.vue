<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2 >{{counter}}</h2>
    <button @click="addOne">++</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data(){
    return {
      counter: 0
    };

  },
  props: {
    msg: String
  },
  methods: {
    addOne(){
      this.counter++;
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
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
