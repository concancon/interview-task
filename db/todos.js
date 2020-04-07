const Joi = require('@hapi/joi');
const db = require('./connection');
 

const schema = Joi.object().keys({
    text: Joi.string().required(),
    active: Joi.bool(),
    inactive: Joi.bool()
});
 
const todos = db.get('todos');
 
function getAll() {
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
 
module.exports = {
    create,
    getAll
};