<script lang="ts">
  import AddTodo from './components/addTodo/AddTodo.vue';
  import TodoList from './components/todoList/TodoList.vue';
  import {useTodoStore} from './stores/todoStore';
  import {todoTypes} from './types/todoTypes'

  

  export default {
    data() {
      return {
        todos: [] as todoTypes[],
        
      }
    },
    created() {
      this.todoStore = useTodoStore()
      this.todos = this.todoStore.todos
    },
    components: {
      AddTodo,
      TodoList
    },
  }

</script>

<template>

    <main class="main">
      <div class="container">
        <div class="header">
          <AddTodo  /> <!-- :addTodo="addTodo" -->
        </div>

        <div class="content">
          <TodoList/>
        </div>
        
      </div>
    </main>  

</template>

<style scoped>

</style>
