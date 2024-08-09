import { defineStore } from "pinia";
import { TodoTypes } from "../types/TodoTypes";
import { ref } from "vue";

export const useTodoStore = defineStore('todoStore', () => {
  const todos = ref(JSON.parse(localStorage.getItem('todos') || '[]'))

  const addTodo = (val: TodoTypes) => {
    todos.value.push(val)
      
    saveToLocalStorage()
  }

  const changeTodo = (val: TodoTypes) => {
    const oldTodo = todos.value.find((e: TodoTypes) => e.id === val.id) as TodoTypes
    Object.assign(oldTodo, val)

    saveToLocalStorage()
  }

  const deleteTodo = (val: number) => {      
    todos.value = todos.value.filter((e: TodoTypes) => e.id !== val)

    saveToLocalStorage()
  }
    
  const changeCheckbox = (val: TodoTypes) => {
    const oldTodo = todos.value.find((e: TodoTypes) => e.id === val.id) as TodoTypes
    oldTodo.isCompleted = val.isCompleted

    saveToLocalStorage()
  }
    
  const saveToLocalStorage = () => {
    localStorage.setItem('todos', JSON.stringify(todos.value))
  }

  return {
    todos, addTodo, changeTodo, deleteTodo,changeCheckbox
  }
})


