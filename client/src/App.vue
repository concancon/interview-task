<template>
  <div id="app">
    <TodoList />
  </div>
</template>
<script>
import TodoList from "@/components/TodoList.vue";

export default {
  data() {
    return {
      message: "TO-DO List"
    };
  },

  components: {
    TodoList
  }
};
</script>

<style>
</style>
