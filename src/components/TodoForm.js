import React, { useState } from 'react'

export default function TodoForm({addTodo}) {
  let [title , setTitle] = useState('');
    let handleSubmit=(e)=>{
      e.preventDefault();
      let todo = {
        id : Math.random(),
        title , //same key and value, use once( title : title)
        completed : false

      }
      addTodo(todo);//add todo
      setTitle('');//clear
    };
  return (
    <form action="#" onSubmit={handleSubmit}>
      {title}
          <input
            type="text"
            className="todo-input"
            placeholder="What do you need to do?"
            onChange={ e => setTitle(e.target.value)}
            value={title} />
    </form>
  )
}
