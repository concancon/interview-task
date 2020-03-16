<template>
  <li :class="{ inactive: todo.inactive }">
  <input type="checkbox" @change="$emit('finishTask', todo.id)">
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
