<template>
  <!--container component which brings together all our other components to make a todo list -->
  <!-- use flex container to center layout -->
  <div class="flex-container">
    <h1 class="pageTitle">TO-DO List</h1>
    <!-- fire addTodo event on pressing enter key or pressing the button below-->
    <NewItem v-model="newTodoText" @keydown.enter="addTodo" />
    <button type="button" v-on:click="addTodo" class="button1">Add task</button>
    <!-- conditionally rendered title and todo list -->
    <div>
      <h3 v-if="todos.length" class="TodoListTitle">Not finished tasks</h3>
    </div>
    <ul v-if="todos.length">
      <!-- we use ListItem to display the contents of our todos array. The key binding allows us to address each element in the array individually -->
      <!-- we also map the events we defined in ListItem component to JS methdos defined below-->
      <ListItem
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
        @finishTask="moveToDone"
        @remove="removeTask"
      />
    </ul>
    <!-- display this message if nothing is left in the todo list-->
    <p v-else class="warning">Nothing left in the list.</p>

    <div>
      <!-- same as above but for finished tasks. Only remove functionality is left -->
      <h3 v-if="finishedTasks.length" class="TodoListTitle">Finished tasks</h3>
    </div>
    <ul v-if="finishedTasks.length">
      <ListItem
        v-for="finishedTask in finishedTasks"
        :key="finishedTask.id"
        :todo="finishedTask"
        @remove="removeTask"
      />
    </ul>
  </div>
</template>

<script>
import NewItem from "./NewItem.vue";
import ListItem from "./ListItem.vue";
let nextTodoId = 0;
export default {
  components: {
    NewItem,
    ListItem
  },
  data() {
    //default data in our application and data structures to hold user input
    return {
      newTodoText: "",
      todos: [
        {
          id: nextTodoId++,
          text: "Call Adam",
          active: true
        },
        {
          id: nextTodoId++,
          text: "Buy flowers",
          active: true
        },
        {
          id: nextTodoId++,
          text: "Send email to John",
          active: true
        }
      ],
      finishedTasks: [
        {
          id: 4,
          text: "Buy concert tickets",
          inactive: true,
          checked: true,
          disabled: true,
          disabledDelete: true
        },
        {
          id: 5,
          text: "Call dad",
          inactive: true,
          checked: true,
          disabled: true,
          disabledDelete: true
        }
      ]
    };
  },
  methods: {
    //method to add a new item to our list of todos
    addTodo() {
      const trimmedText = this.newTodoText.trim();
      if (trimmedText) {
        this.todos.push({
          id: nextTodoId++,
          text: trimmedText,
          active: true
        });
        this.newTodoText = "";
      }
    },
    //method to move a user selected item from our todo list to our finished list.
    //this method restyles our items accordingly
    moveToDone(idToRemove) {
      const finished = this.todos.find(todo => {
        return todo.id === idToRemove;
      });
      if (finished) {
        this.finishedTasks.push({
          id: finished.id,
          text: finished.text,
          inactive: true,
          checked: true,
          disabled: true,
          disabledDelete: true
        });
      }
      this.todos = this.todos.filter(todo => {
        return todo.id !== idToRemove;
      });
    },
    //method to remove a user selected task from either list
    removeTask(idToRemove) {
      this.todos = this.todos.filter(todo => {
        return todo.id !== idToRemove;
      });
      this.finishedTasks = this.finishedTasks.filter(todo => {
        return todo.id !== idToRemove;
      });
    }
  }
};
</script>