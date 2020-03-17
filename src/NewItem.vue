<template>
  <div>
  <input v-model="newTodo" placeholder="Write your task here" @keyup.enter="$emit('addNew', newTodo)">
</div>
</template>



<script>
export default {
  data(){
    return {
      newTodo: ''
    }
  }
}
</script>