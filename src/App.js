import './reset.css';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import TodoFilter from './components/TodoFilter';
import TodoCheckallAndReamining from './components/TodoCheckallAndReamining';
import ClearCompletedBtn from './components/ClearCompletedBtn';
import { useEffect, useState } from 'react';

function App() {
  let [todos,setTodos]=useState([]);
  useEffect(()=>{
  fetch('http://localhost:3001/todos')
  .then(res=>res.json())
  .then((todos)=>{
    setTodos(todos);
  })
  },[])

  let addTodo = (todo) => {
  fetch('http://localhost:3001/todos',{
    method : "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo)
  })//upd server

    setTodos(prevState =>[...prevState,todo]) //upd client
  }
  let deleteTodo = (todoId)=>{
    fetch(`http://localhost:3001/todos/${todoId}`,{
      method : "DELETE",
    })

    //server
    setTodos(prevState => {
      return prevState.filter(todo => {
        return todo.id !== todoId
      });
    })//client
  }

  let updateTodo = (todo)=>{
    console.log('hit here',todo)
    //server
    setTodos(prevState => {
      return prevState.map(td => {
        if(td.id !== todo.id){
        return todo
        }
        return td
      });
    })//client
  }
  return (
    
    <div className="todo-app-container">
      <div className="todo-app">
        <h2>Todo App</h2>
          <TodoForm addTodo={addTodo}></TodoForm>
        <TodoList todos={todos} deleteTodo={deleteTodo} updateTodo={updateTodo}></TodoList>
        <TodoCheckallAndReamining></TodoCheckallAndReamining>
        <div className="other-buttons-container">
          <TodoFilter></TodoFilter>
          <ClearCompletedBtn></ClearCompletedBtn>          
        </div>
      </div>
    </div>
  );
}

export default App;
