<script lang="ts" setup>
  import { ref, watch } from 'vue';
  import { useTodoStore } from '../../stores/todoStore';
  import { TodoTypes } from '../../types/TodoTypes';  

  const currentText = ref('' as string)
  const error =  ref('' as string )
  const todoStore = ref(useTodoStore())


  const currentTodo = (e: Event) => {
    e.preventDefault()

    if(currentText.value.trim() === '') {
      error.value = 'Please write something'
      return
    }
    
    todoStore.value.addTodo({
      text: currentText.value.trim().replace(/\s+/g, ' '),
      isCompleted: false,
      id: Date.now()
    } as TodoTypes) 

    currentText.value = ''
  }


  watch(currentText, (newValue: string) => {
    if(newValue.length > 0 || error.value !== '') {
      error.value = ''
    }
  })
  
</script>

<template>
  <div class="addTodo">

    <form class="addTodo__content">
      <input
        type="search" 
        v-model="currentText" 
        placeholder="Enter text" 
      >

      <button
        type="submit"
        @click="(e) => currentTodo(e)"
      > 
        Add Todo 
      </button>
    </form>

    <div class="addTodo__error" v-if="error != ''">{{ error }}</div>

  </div>
  
  
</template>

<style>
  @import url(./addTodo.scss);

</style>
