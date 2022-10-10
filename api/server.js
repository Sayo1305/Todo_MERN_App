const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Todo = require('./models/Todo');
const { json } = require('express');
const app = express();
const PORT = 3001

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/test' ,{
      useNewUrlParser: true ,
      useUnifiedTopology: true
}).then(()=> console.log("connected to DB"))
.catch(console.error);

app.get('/' , (req , res)=>{
      res.send("hello world")
})

app.get('/todos' , async(req , res)=>{
      const todo = await Todo.find();
      res.json(todo);
})

app.post('/todos/new' , async(req , res)=>{
      const todo = new Todo({
            text : req.body.text
      });
      todo.save();
      res.json(todo);
})

app.delete('/todos/delete/:id' , async(req , res) => {
      const result = await Todo.findByIdAndDelete(req.params.id);
      res.json(result);
});

app.get('/todos/complete/:id' , async(req , res)=>{
      const todo = await Todo.findById(req.params.id);
      todo.complete = !todo.complete;
      todo.save();
      res.json(todo);
})

app.listen(PORT , ()=>{console.log("server started")})