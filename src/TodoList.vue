<template>
	<div>
		<NewItem
			v-model="newTodoText"
			@keydown.enter="addTodo"
		/>
        <button type="button" v-on:click="addTodo">
             Add 
        </button>
		<ul v-if="todos.length" style="list-style-type:none">
			<ListItem 
				v-for="todo in todos"
				:key="todo.id"
				:todo="todo"
				@finishTask="moveToDone" 
                @remove="removeTask"
			/>
		</ul>
        <p v-else>
			Nothing left in the list. Add a new todo in the input above.
		</p>
        <ul v-if="finishedTasks.length" style="list-style-type:none">
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
import NewItem from './NewItem.vue'
import ListItem from './ListItem.vue'


let nextTodoId = 1

export default {
	components: {
		NewItem, ListItem
	},
  data () {
    return {
			newTodoText: '',
      todos: [
				
				{
					id: nextTodoId++,
                    text: 'Learn about single-file components'   
				},
				{
					id: nextTodoId++,
                    text: 'Fall in love'
				}
            ],
    finishedTasks: [ 
                
            ]       
    }
  },
	methods: {
		addTodo () {
			const trimmedText = this.newTodoText.trim()
			if (trimmedText) {
				this.todos.push({
					id: nextTodoId++,
                    text: trimmedText,
				})
				this.newTodoText = ''
			}
        },
		moveToDone (idToRemove) {

            const finished = this.todos.find(todo => {return todo.id === idToRemove});
            if(finished){
            this.finishedTasks.push({ 
                id: finished.id,
                text: finished.text, 
                inactive: true,
                checked: true,
                disabled: true
            });
            }
            this.todos =  this.todos.filter(todo => {
				return todo.id !== idToRemove
			})
   
        
        },
        removeTask(idToRemove){
          this.todos =  this.todos.filter(todo => {
				return todo.id !== idToRemove
            })

          this.finishedTasks=  this.finishedTasks.filter(todo=> {
				return todo.id !== idToRemove
            })

        }
	}
}
</script>