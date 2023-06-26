import './reset.css';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import TodoFilter from './components/TodoFilter';
import TodoCheckallAndReamining from './components/TodoCheckallAndReamining';
import ClearCompletedBtn from './components/ClearCompletedBtn';
import { useCallback, useEffect, useState } from 'react';

function App() {
  let [todos,setTodos]=useState([]);
  let [filteredTodos,setFilteredTodos] = useState(todos);
  useEffect(()=>{
  fetch('http://localhost:3001/todos')
  .then(res=>res.json())
  .then((todos)=>{
    setTodos(todos)
    setFilteredTodos(todos);
  })
  },[])

  let filterBy = useCallback(
    (filter) =>{
      if(filter== 'All'){
        setFilteredTodos(todos);
      }
      if(filter== 'Active'){
        setFilteredTodos(todos.filter(t => !t.completed))
      }
      if(filter== 'Completed'){
        setFilteredTodos(todos.filter(t => t.completed))
      }
    },[todos])


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
    fetch(`http://localhost:3001/todos/${todo.id}`,{
    method : "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo)
  })//server

    setTodos(prevState => {
      return prevState.map(td => {
        if(td.id == todo.id){
        return todo
        }
        return td
      });
    })//client
  }
  let checkAll = () => {
    todos.forEach(t => {
      t.completed = true;
      updateTodo(t);
    }

    )//server
    setTodos((prevState) => {
      return prevState.map(t => {
        return {...t, completed : true}
      })//client
    })
  }
  let  remainingCount= todos.filter(t => !t.completed).length;

  // let clearCompleted= () =>{
  //   todos.forEach(t => {
  //     t.completed = false;
  //     updateTodo(t);
  //   }

  //   )//server
  //   setTodos((prevState) => {
  //     return prevState.map(t => {
  //       return {...t, completed : false}
  //     })//client
  //   })
  // }
  let clearCompleted = () =>{
    todos.forEach(t => {
      if(t.completed){
        return deleteTodo(t.id);
      }
    })//server
    setTodos(prevState => {
      return prevState.filter(t => t.completed == false);//(t=>!t.completed) lel tu tu pel
    })//client
  }
  return (
    
    <div className="todo-app-container">
      <div className="todo-app">
        <h2>Todo App</h2>
          <TodoForm addTodo={addTodo}></TodoForm>
        <TodoList todos={filteredTodos} deleteTodo={deleteTodo} updateTodo={updateTodo}></TodoList>
        <TodoCheckallAndReamining remainingCount={remainingCount} checkAll={checkAll}></TodoCheckallAndReamining>
        <div className="other-buttons-container">
          <TodoFilter filterBy={filterBy}></TodoFilter>
          <ClearCompletedBtn clearCompleted={clearCompleted}></ClearCompletedBtn>          
        </div>
      </div>
    </div>
  );
}

export default App;
