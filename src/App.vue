<template>
  <div id="app">
    {{message}}
    <br />
    <br />
    <TodoList/>
  </div>
</template>
<script>


import TodoList from "./TodoList.vue"

export default {
  data() {
    return {
      message: "TO-DO List",
  
    };
  },

  components: {
    TodoList
  }
};
</script>

<style>
#app {
  font-family: "Avenir", "Times New Roman", Times, serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #8da9ac;
  margin-top: 60px;
}
</style>
