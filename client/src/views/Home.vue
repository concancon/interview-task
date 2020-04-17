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
import NewItem from "@/components/NewItem.vue";
import ListItem from "@/components/ListItem.vue";

const API_URL = "http://192.168.0.3:4000/todos";

export default {
  name: "home",
  components: {
    NewItem,
    ListItem
  },
  data() {
    // default data in our application and data structures to hold user input
    return {
      newTodoText: "",
      todos: [],
      finishedTasks: []
    };
  },
  mounted() {
    fetch(API_URL)
      .then(response => response.json())
      .then(result => {
        result.forEach(element => {
          if (element.active == true) {
            this.todos.push(element);
          } else if (element.inactive == true) {
            this.finishedTasks.push(element);
          }
          // else if(element.inactive== true){
          //   this.finishedTasks.push(element);
          // }
        });
        console.log("finishedTasks");
        console.log(this.finishedTasks);
        console.log("todos");
        console.log(this.todos);
        // this.finishedTasks = result;
      });
  },
  methods: {
    // method to add a new item to our list of todos
    addTodo() {
      const trimmedText = this.newTodoText.trim();
      let newTodo = {
        text: trimmedText,
        active: true
      };
      if (newTodo) {
        fetch(API_URL, {
          method: "POST",
          body: JSON.stringify(newTodo),
          headers: {
            "content-type": "application/json"
          }
        })
          .then(response => response.json())
          .then(result => {
            if (result.details) {
              // there was an error...
              console.log("there was indeed an error");
              const error = result.details
                .map(detail => detail.todo)
                .join(". ");
              this.error = error;
            } else {
              this.error = "";
              this.showMessageForm = false;
              console.log("result from add");
              console.log(result);
              this.todos.push(result);
            }
          });

        this.newTodoText = "";
      }
    },
    // method to move a user selected item from our todo list to our finished list.
    // this method restyles our items accordingly
    moveItem(idToMove) {
      //find whether this id is in the already finished tasks or in the outstanding tasks
      const finished = this.todos.find(todo => todo._id === idToMove);
      const unfinished = this.finishedTasks.find(todo => todo._id === idToMove);
      let newTodo;

      if (typeof finished != "undefined") {
        newTodo = {
          _id: finished._id,
          text: finished.text,
          active: false,
          inactive: true,
          
        
        };
      } else if (typeof unfinished != "undefined") {
        newTodo = {
          _id: unfinished._id,
          text: unfinished.text,
          active: true,
          inactive: false,
          
         
        };
      }
  if (newTodo) {
        //if the task is in the outstanding todo list: call the Http put to update add an inactive : true attribute and remove active: true
        fetch(API_URL, {
          method: "PUT",
          body: JSON.stringify(newTodo),
          headers: {
            "content-type": "application/json"
          }
        })
          .then(response => response.json())
          .then(result => {
            if (result.details) {
              // there was an error...
              console.log("there was indeed an error here");
              const error = result.details
                .map(detail => detail.todo)
                .join(". ");
              this.error = error;
            } else {
              this.error = "";
              this.showMessageForm = false;
              if( typeof finished != "undefined") { 
                this.finishedTasks.push(newTodo);
                this.todos = this.todos.filter(todo => todo._id != newTodo._id) 
              }
                else if( typeof unfinished != "undefined") { 
                this.todos.push(newTodo);
                this.finishedTasks = this.finishedTasks.filter(todo => todo._id != newTodo._id) 
              }
            
            }
          });
      }
    },
    // method to remove a user selected task from either list
    removeTask(idToMove) {  
          
          let newTodo = {
           _id: idToMove,
          text: "test",
          active: true,
          inactive: false,
         
        };
      
      fetch(API_URL, {
          method: "DELETE",
          body: JSON.stringify(newTodo),
          headers: {
            "content-type": "application/json"
          }
        })
         .then(result => {
            if (result.details) {
              // there was an error...
              console.log("there was indeed an error here");
              const error = result.details
                .map(detail => detail.todo)
                .join(". ");
              this.error = error;
            } else {
              this.error = "";
              this.showMessageForm = false;
              console.log(result);
              this.finishedTasks = this.finishedTasks.filter(todo => {
               return todo._id !== idToMove;
              });
              this.todos = this.todos.filter(todo => {
               return todo._id !== idToMove;
              });
              
          
            }
          });
    }
  }
};
</script>
