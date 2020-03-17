<style>
 .item {
  border: 1px solid;
  padding: 1px ;
  box-shadow: 1px 3px grey;
}
</style>
<template>
  <li class= "item" :class="{ inactive: todo.inactive }">
  <input type="checkbox" @change="$emit('finishTask', todo.id)" v-model="todo.checked" :disabled="todo.disabled">
     {{todo.text}}
  <button @click="$emit('remove', todo.id)">
      X
    </button>
  </li> 
</template>

<script>
export default {
  props: {
    todo: {
      type: Object,
      required: true
     }
    }

}
</script>
