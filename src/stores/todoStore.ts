import { defineStore } from "pinia";
import { todoTypes } from "@/types/todoTypes";


export const useTodoStore = defineStore('todoStore', {
  state :() => ({
    todos : JSON.parse(localStorage.getItem('todos')) as todoTypes[] || [] as todoTypes[]
    
  }),
  actions: {
    addTodo(val: todoTypes) {
      
      this.todos.push(val)
      
      this.saveToLocalStorage()

    },
    changeTodo(val: todoTypes) {
      const oldTodo = this.todos.find(e => e.id === val.id)

      Object.assign(oldTodo, val)

      this.saveToLocalStorage()
    },
    deleteTodo(val: number) {      
      this.todos = this.todos.filter(e => e.id !== val)

      this.saveToLocalStorage()
    },
    changeCheckbox(val: todoTypes) {
      const oldTodo = this.todos.find(e => e.id === val.id)

      oldTodo.checkbox = val.checkbox


      this.saveToLocalStorage()
    },
    saveToLocalStorage() {
      localStorage.setItem('todos', JSON.stringify(this.todos))
    },
  }
})