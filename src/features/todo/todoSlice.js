import { createSlice } from "@reduxjs/toolkit";

let todoId = 1

const slice = createSlice({
    name: 'todo',
    initialState: [],
    reducers : {
        createTask: (state, action)=>{
            state.push({
                describtion: action.payload,
                id: todoId,
                isCompleted: false
            })
            todoId++
        },
        isCompleted: (state, action)=>{
            const {payload} = action
            const todoToToggle = state.find(task => task.id === payload)
            if (todoToToggle) {
                todoToToggle.isCompleted = !todoToToggle.isCompleted
            }
        },
        editTask: (state, action)=>{
            const {payload} = action
            const taskToEdit = state.find(task => task.id === payload)
            if(taskToEdit){
                taskToEdit.describtion = action.payload.describtion
            }
        },
        deleteTask: (state, action)=>{
            const {payload} = action
            const index = state.findIndex(task => task.id === payload)
            if (index !== 1){
                state.splice(index, 1)
            }
        }
    }
})

export const {createTask, isCompleted, editTask, deleteTask} = slice.actions
export default slice.reducer