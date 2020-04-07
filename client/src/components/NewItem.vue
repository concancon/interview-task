<template>
 <!--Component to represent an text input element -->
 <!--fully transparent wrapper as described in docuemntation:https://vuejs.org/v2/guide/components-custom-events.html -->

  <div>
    <input
      class="input"
      type="text"
      :value="value"
      placeholder="Write your task here"
      v-on="listeners"
    />
    <br />
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  computed: {
    listeners() {
      return {
        // Pass all component listeners directly to input
        ...this.$listeners,
        // Override input listener to work with v-model
        input: (event) => this.$emit('input', event.target.value),
      };
    },
  },
};
</script>
