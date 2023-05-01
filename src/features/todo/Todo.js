import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createTask, isCompleted, editTask, deleteTask } from './todoSlice'
import { useState } from 'react'

export default function Todo() {
    const [discription, setDiscribtion] = useState('')
    const [editText, setEditText] = useState('')
    const [isTaskToEdit, setIsTaskToEdit] = useState(-1)
    const dispatch = useDispatch()
    const todo = useSelector(state => state.todo)

    console.log(todo)
    
    const handleSubmit = (e)=> {
        e.preventDefault();
        dispatch(createTask(discription))
        setDiscribtion('')
    }
    const handleDelete =(id) => () =>{
        dispatch(deleteTask(id))
    }
    const handleComplet = id => () =>{
        dispatch(isCompleted(id))
    }
    const handleEdit = (id, description) => () =>{
       setEditText(description) 
       setIsTaskToEdit(id)

    }
    const handleupdate = e => () => {
        e.preventDefault();
        
        dispatch(editTask({id: isTaskToEdit, describtion: editText}))
        setIsTaskToEdit(-1)
        setEditText('')
    }


  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input onChange={(e)=> setDiscribtion(e.target.value)} value={discription}/>
            <button type='submit'>add task</button>    
        </form>
        {todo.map((task)=>(
            <div key={task.id}>
                
               if(isTaskToEdit == task.id){
                <form onSubmit={handleupdate()}>
                    <input onChange={e => setEditText(e.target.value)} value={editText}/>
                    <button type='submit'>update</button>
                </form>
               }else{<>
               {task.describtion} {task.isCompleted ? 'done' : ''}
               <button onClick={handleDelete(task.id)}> Delete</button>
               <button onClick={handleComplet(task.id)}>toggle</button>
               <button onclick={handleEdit(task.id, task.description)}>Edit</button>
               </>}
               
            </div>
        ))}
    </div>
   
  )
}
