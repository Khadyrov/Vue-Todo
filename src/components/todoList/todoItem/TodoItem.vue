<script lang="ts" setup>
  import { ref, watch } from 'vue';
  import { useTodoStore } from '../../../stores/todoStore';
  import { TodoTypes } from '../../../types/TodoTypes';
  // import TodoItem from './todoItem/TodoItem.vue';

  const defaultTodo = ref({} as TodoTypes)
  const currentTodo = ref({} as Partial<TodoTypes>)
  const tempText = ref('' as string)
  const error = ref('' as string)
  const todoStore = ref(useTodoStore())
  
  const openEditPanel = (val : TodoTypes) => {
    currentTodo.value = val
    tempText.value = val.text
  }

  const handleText = (e: Event) => {
    e.preventDefault()
  

    if(tempText.value.trim() === ''){
      error.value = 'Please write something'
      return
    }        

    currentTodo.value.text = tempText.value.trim().replace(/\s+/g, ' ')
    
    todoStore.value.changeTodo(currentTodo.value as TodoTypes)
    currentTodo.value = {}
    error.value = ''
  }

  const handleCheckbox = (val : TodoTypes) => {
    
    todoStore.value.changeCheckbox({
      text: val.text,
      id: val.id,
      isCompleted: !val.isCompleted
    })
  }

  watch(tempText, (newValue:string) => {
    if(newValue.length > 0 || error.value !== '') {
      error.value = ''
    }
  })

</script>

<template>
  <div v-if="todoStore.todos.length === 0">There are no tasks</div>

  <div 
    v-for="val of todoStore.todos" 
    class="todo" 
    :key="val.id"
    :class="val.isCompleted? 'completed': ''"
  > 
    <div class="todo__leftPanel">
      <input class="todo__isactive" type="checkbox" v-model="val.isCompleted" @click="handleCheckbox(val)">
    
      <div @click="handleCheckbox(val)" class="todo__text">
        {{ val.text }}
      </div>
    </div>

    <div class="todo__btns">
      <button class="todo__EditBtn" @click="openEditPanel(val)">
        <img src="../../../assets/images/icons/edit.png" alt="delete Icon">
      </button>

      <button class="todo__deleteBtn" @click="todoStore.deleteTodo(val.id)">
        <img src="../../../assets/images/icons/bin.png" alt="delete Icon">
      </button>
    </div>
  </div>

  <div v-if="Object.keys(currentTodo).length !== 0" class="changeTodo">
    
    <form class="changeTodo__content">
      <input v-model="tempText" type="text">
      <div v-if="error !== ''"> {{ error }}</div>
      <button class="" @click="e => handleText(e)" type="submit">Submit</button>
    </form>

    <div class="currentText__background" @click="currentTodo = {}" ></div>
  </div>
</template>

<style >
@import url(./todoItem.scss);

</style>
