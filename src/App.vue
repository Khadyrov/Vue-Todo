<script lang="ts" setup>

  import AddTodo from './components/addTodo/AddTodo.vue';
  import TodoList from './components/todoList/TodoList.vue';
  import {useTodoStore} from './stores/todoStore';
  import {TodoTypes} from './types/TodoTypes';
  import { onMounted , ref } from "vue";

  
  const todos = ref([] as TodoTypes[])
  const todoStore = ref(useTodoStore())

  onMounted(() => {
    todos.value = todoStore.value.todos
  })

</script>

<template>
    <main class="main">
      <div class="container">
        <h1 class="title"> Todo</h1>

        <div class="header">
          <AddTodo  />
        </div>

        <div class="content">
          <TodoList/>
        </div>
      </div>
    </main>  
</template>
