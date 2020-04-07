<template>
  <!-- List item component to represent a todo task. This task can be in one of two states: Not finished or finished. -->
  <li class="item">
    <div class="pretty p-icon">
      <!-- Input element with binding to checked property of a todo. This allows us to check off any items we have completed-->
      <!-- disabled class allows us to disable clicks on checkbox and text input elements via css-->
      <!-- on change we emit the finishtask event to the parent element with the id of the element that we clicked on-->
      <input
        type="checkbox"
        class="checkboxStyle"
        :checked= "todo.inactive"
        @change="$emit('finishTask', todo.id)"
      />
      <div class="state">
        <i class="icon mdi mdi-check"></i>
        <!-- inactive class changes text color to grey for an item in our todo list-->
        <label :class="{inactive: todo.inactive, active: todo.active}">{{todo.text}}</label>
      </div>
    </div>
    <!--button to remove an item from either list. -->
    <!--clicking on this button emits the remove event to the parent element with the id of the element we clicked the x on -->
    <!--The disabled class allows us to change the color of the x element -->
    <button
      class="close"
      :class="{disabledDelete: todo.inactive}"
      @click="$emit('remove', todo.id)"
    >X</button>
  </li>
</template>

<script>
//to-do property allows parametrization from the parent component. In other words we use this to list all entries in out todo array (see ToList.vue) 
export default {
  props: {
    todo: {
      type: Object,
      required: true
    }
  }
};
</script>
