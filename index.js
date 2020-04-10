const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const todos = require('./db/todos');
//const finishedTasks = require('.db/finishedTasks')


const app = express();
 
app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());
 
app.get('/', (req, res) => {
    res.json({
        message: 'Behold The MEVN Stack!'
    });
});
 

app.get('/todos', (req, res) => {
    todos.getAllTodos().then((todos) => {
        res.json(todos);
    });
});


app.post('/todos', (req, res) => {
    console.log(req.body);
    todos.create(req.body).then((todo) => {
        res.json(todo);
    }).catch((error) => {
        res.status(500);
        res.json(error);
    });
});

app.put('/todos', (req, res) =>{
    console.log(req.body);
    todos.update(req.body).then((todos)=> { 
        res.json(todos);
    }).catch((error) => {
        res.status(500);
        res.json(error);
    });

})

app.delete('/todos', (req, res) =>{
    console.log(req.body);
    todos.remove(req.body).then((todos)=> { 
        res.json(todos);
    }).catch((error) => {
        res.status(500);
        res.json(error);
    });

})


const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});