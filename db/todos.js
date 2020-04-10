const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi)
const db = require('./connection');
 

const schema = Joi.object().keys({
    _id: Joi.objectId,
    text: Joi.string().required(),
    active: Joi.bool(),
    inactive: Joi.bool()
});
 
const todos = db.get('todos');

 
function getAllTodos() {
    return todos.find();
}


function create(todo) {
    
    const result = schema.validate(todo);
    if (result.error == null) {
        todo.created = new Date();
        return todos.insert(todo);
    } else {
        return Promise.reject(result.error);
    }
}

 function update(todo){

    const result = schema.validate(todo);  
    if (result.error == null) {
    
        console.log('trying to update todo with id ' + todo._id + 'isactive: ' + todo.active);
        if(todo.active == false){
         return todos.update({_id: todo._id}, {$set: {inactive: true, active: false}})
        
        }
        else if (todo.active== true){
         return todos.update({_id: todo._id}, {$set: {inactive: false, active: true}})
        }
         
       
    } else {
        console.log('trying to update todo failed')
        return Promise.reject(result.error);
    }

}

function remove(todo){
    console.log('remove called');
    const result= schema.validate(todo)
    if (result.error == null) {
        console.log('trying to delete todo with id ' + todo._id + 'isactive: ' + todo.active);
       return todos.remove({_id: todo._id})
          
        
    }
     else {
            console.log('trying to delete todo failed')
            return Promise.reject(result.error);
     }
}
module.exports = {
    create,
    getAllTodos,
    update, 
    remove
};