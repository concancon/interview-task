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
    <ul class="unfinishedTasks" v-if="todos.length">
      <!-- we use ListItem to display the contents of our todos array. The key binding allows us to address each element in the array individually -->
      <!-- we also map the events we defined in ListItem component to JS methdos defined below-->
      <ListItem
        v-for="todo in todos"
        :key="todo._id"
        :todo="todo"
        @finishTask="moveItem"
        @remove="removeTask"
      />
    </ul>
    <!-- display this message if nothing is left in the todo list-->
    <p v-else class="warning">Nothing left in the list.</p>

    <div>
      <!-- same as above but for finished tasks. Only remove functionality is left -->
      <h3 v-if="finishedTasks.length" class="TodoListTitle">Finished tasks</h3>
    </div>
    <ul class="finishedTasks" v-if="finishedTasks.length">
      <ListItem
        v-for="finishedTask in finishedTasks"
        :key="finishedTask._id"
        :todo="finishedTask"
        @finishTask="moveItem"
        @remove="removeTask"
      />
    </ul>
  </div>
</template>

<script>
import NewItem from '@/components/NewItem.vue';
import ListItem from '@/components/ListItem.vue';

const API_URL = 'http://localhost:4000/todos';


export default {
  name: 'home',
  components: {
    NewItem,
    ListItem,
  },
  data() {
    // default data in our application and data structures to hold user input
    return {
      newTodoText: '',
      todos: [],
      finishedTasks: [],
    };
  },
  mounted() {
    fetch(API_URL)
      .then((response) => response.json())
      .then((result) => {
        this.todos = result;
      });
  },
  methods: {
    // method to add a new item to our list of todos
    addTodo() {
      const trimmedText = this.newTodoText.trim();
      console.log(trimmedText);
      let newTodo = {
         "text": trimmedText,
         "active" : "true"
       
      }
      if (newTodo) {
        fetch(API_URL, {
          method: 'POST',
          body: JSON.stringify(newTodo),
          headers: {
            'content-type': 'application/json',
          },
        })
          .then((response) => response.json())
          .then((result) => {
            if (result.details) {
              // there was an error...
              console.log('there was indeed an error');
              const error = result.details
                .map((detail) => detail.todo)
                .join('. ');
              this.error = error;
            } else {
              this.error = '';
              this.showMessageForm = false;
              this.todos.push(result);
            }
          });

        this.newTodoText = '';
      }
    },
    // method to move a user selected item from our todo list to our finished list.
    // this method restyles our items accordingly
    moveItem(idToMove) {
   

      const finished = this.todos.find((todo) => todo._id === idToMove);

      const unfinished = this.finishedTasks.find((todo) => todo._id === idToMove);

      if (finished) {
        this.finishedTasks.push({
          _id: finished._id,
          text: finished.text,
          inactive: true,
        });
        this.todos = this.todos.filter((todo) => todo._id !== idToMove);
      } else if (unfinished) {
        this.todos.push({
          _id: unfinished._id,
          text: unfinished.text,
          active: true,
        });

        this.finishedTasks = this.finishedTasks.filter(
          (todo) => todo._id !== idToMove,
        );
      }
    },
    // method to remove a user selected task from either list
    removeTask(idToMove) {
      this.todos = this.todos.filter((todo) => todo.id !== idToMove);
      this.finishedTasks = this.finishedTasks.filter(
        (todo) => todo.id !== idToMove,
      );
    },
  },
};
</script>
