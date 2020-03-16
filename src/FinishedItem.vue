<template>
 
  <li v-bind:style="{color: color, fontSize:fontSize, textDecoration:textDecoration }">
    <input type="checkbox" checked disabled>
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
  },
    data () {
    return  {
    color: 'grey',
    fontSize: '13px',
    textDecoration: 'line-through'
  }
}
}
</script>
