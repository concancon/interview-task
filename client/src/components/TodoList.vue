<template>
  <!--container component which brings together all our other components to make a todo list -->
  <!-- use flex container to center layout -->
  <div class="flex-container">
    <h1 class="pageTitle">TO-DO List</h1>
    <!-- fire addTodo event on pressing enter key or pressing the button below-->
    <NewItem v-model="newTodoText" @keydown.enter="addTodo" />
    <button type="button" v-on:click="addTodo" class="button1">Add task</button>
    <!-- conditionally rendered title and todo list -->
    <div >
      <h3 v-if="todos.length" class="TodoListTitle">Not finished tasks</h3>
    </div>
    <ul class = "unfinishedTasks" v-if="todos.length">
      <!-- we use ListItem to display the contents of our todos array. The key binding allows us to address each element in the array individually -->
      <!-- we also map the events we defined in ListItem component to JS methdos defined below-->
      <ListItem
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
        @finishTask="moveItem"
        @remove="removeTask"
      />
    </ul>
    <!-- display this message if nothing is left in the todo list-->
    <p v-else class="warning">Nothing left in the list.</p>

    <div >
      <!-- same as above but for finished tasks. Only remove functionality is left -->
      <h3 v-if="finishedTasks.length" class="TodoListTitle">Finished tasks</h3>
    </div>
    <ul class= "finishedTasks" v-if="finishedTasks.length">
      <ListItem
        v-for="finishedTask in finishedTasks"
        :key="finishedTask.id"
        :todo="finishedTask"
        @finishTask="moveItem"
        @remove="removeTask"
      />
    </ul>
  </div>
</template>

<script>
import NewItem from './NewItem.vue';
import ListItem from './ListItem.vue';

let nextTodoId = 0;
export default {
  name: 'TodoList',
  components: {
    NewItem,
    ListItem,
  },
  data() {
    // default data in our application and data structures to hold user input
    return {
      emitted: false,
      newTodoText: '',
      todos: [
        {
          id: nextTodoId++,
          text: 'Call Adam',
          active: true,
        },
        {
          id: nextTodoId++,
          text: 'Buy flowers',
          active: true,
        },
        {
          id: nextTodoId++,
          text: 'Send email to John',
          active: true,
        },
      ],
      finishedTasks: [
        {
          id: 3,
          text: 'Buy concert tickets',
          inactive: true,
        },
        {
          id: 4,
          text: 'Call dad',
          inactive: true,

        },
      ],
    };
  },
  methods: {

    // method to add a new item to our list of todos
    addTodo() {
      const trimmedText = this.newTodoText.trim();
      if (trimmedText) {
        this.todos.push({
          id: nextTodoId++,
          text: trimmedText,
          active: true,
        });
        this.newTodoText = '';
      }
    },
    // method to move a user selected item from our todo list to our finished list.
    // this method restyles our items accordingly
    moveItem(idToMove) {
      const finished = this.todos.find((todo) => todo.id === idToMove);

      const unfinished = this.finishedTasks.find((todo) => todo.id === idToMove);


      if (finished) {
        this.finishedTasks.push({
          id: finished.id,
          text: finished.text,
          inactive: true,
        });
        this.todos = this.todos.filter((todo) => todo.id !== idToMove);
      } else if (unfinished) {
        this.todos.push({
          id: unfinished.id,
          text: unfinished.text,
          active: true,
        });

        this.finishedTasks = this.finishedTasks.filter((todo) => todo.id !== idToMove);
      }
    },
    // method to remove a user selected task from either list
    removeTask(idToMove) {
      this.todos = this.todos.filter((todo) => todo.id !== idToMove);
      this.finishedTasks = this.finishedTasks.filter((todo) => todo.id !== idToMove);
    },
  },
};
</script>
