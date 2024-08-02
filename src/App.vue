<script >
  import AddTodo from './components/addTodo/AddTodo.vue';
  import TodoList from './components/todoList/TodoList.vue';


  export default {
    data() {
      return {
        todos: [],
      }
    },
    components: {
      AddTodo,
      TodoList
    },
    methods :{

      addTodo(val) {
        this.todos.push(val)

        this.saveToLocalStorage()
      },

      deleteTodo(val) {
        this.todos = this.todos.filter(e => e.id != val) 
        this.saveToLocalStorage()
      },

      changeText(val) {
        const oldTodo = this.todos.find(e => e.id === val.id)
        Object.assign(oldTodo, val)
        this.saveToLocalStorage()
      },

      changeCheckbox(val){

        console.log(val);
        const oldTodo = this.todos.find(e => e.id === val.id)
        Object.assign(oldTodo, val)
        this.saveToLocalStorage()
      },

      saveToLocalStorage() {
        localStorage.setItem('data', JSON.stringify(this.todos))
      },

      loadFromLocalStorage() {
        const savedTodos = localStorage.getItem('data')

        if(savedTodos) {
          this.todos = JSON.parse(savedTodos)
        }
      }
      
    },
    mounted() {
      this.loadFromLocalStorage()
    }
  }

</script>

<template>

    <main class="main">
      <div class="container">

        <div class="header">
          <AddTodo  :addTodo="addTodo"/>
        </div>

        <div class="content">
          <TodoList :data="todos" :deleteTodo="deleteTodo" :changeText="changeText" :changeCheckbox="changeCheckbox"/>
        </div>
        
      </div>
    </main>  

</template>

<style scoped>

</style>
