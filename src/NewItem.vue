<template>
  <div>
  <input v-model="newTodo" placeholder="Write your task here" @keyup.enter="$emit('addNew', newTodo)">
  <br>
   <button type="button" v-on:click="$emit('addNew', newTodo)" class="button1">
             Add task 
        </button>
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