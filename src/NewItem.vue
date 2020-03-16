<template>
  <div>
  <input
    class="input"
    type="text"
    :value="value"
    placeholder="What needs to be done?"
    v-on="listeners"  
  /> <br> 
</div>
</template>



<script>
export default {

  props: {
    value: {
      type: String,
      default: ''
    }
  },
  computed: {
    listeners () {
      return {
        // Pass all component listeners directly to input
        ...this.$listeners,
        // Override input listener to work with v-model
        input: event => this.$emit('input', event.target.value)
      }
    }
  },

}
</script>