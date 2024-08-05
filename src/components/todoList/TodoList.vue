<script lang="ts">

  import { useTodoStore } from '@/stores/todoStore';
  import { todoTypes } from '@/types/todoTypes';

  export default {
    data() {
      return {
        defaultTodo: {} as todoTypes,
        currentTodo: {} as todoTypes || {},
        tempText: '' as string,
        error: '' as string,
        todoStore: useTodoStore()
      }
    },
    methods: {

      openAdjustPanel(val : todoTypes) {
        this.currentTodo = val
        this.tempText = val.text
      },

      handleText(e: Event) {
        e.preventDefault()

        if(this.tempText.trim() === ''){
          this.error = 'Please write something'
          return
        }
        console.log(this.todoStore.todos);
        

        this.currentTodo.text = this.tempText.trim().replace(/\s+/g, ' ')
        this.todoStore.changeTodo(this.currentTodo)
        this.currentTodo = {}
        this.error = ''
      },

      handleCheckbox(val : todoTypes) {

        this.todoStore.changeCheckbox({
          text: val.text,
          id: val.id,
          checkbox: !val.checkbox
        })

      }
    },

    watch: {
      tempText(newValue :string) {
        if(newValue.length > 0 || this.error !== '') {

          this.error = ''
        }
      }
    }
  }
  
  
</script>

<template>

  <div 
    v-for="val of todoStore.todos" 
    class="todo" 
    :key="val.id"
    :class="val.checkbox? 'active': ''"
  >

    <div @click="handleCheckbox(val)" class="todo__text">{{ val.text }}</div>

    <div class="todo__btns">
      <input type="checkbox" v-model="val.checkbox" @click="handleCheckbox(val)">
      <button @click="openAdjustPanel(val)">Change Text</button>
      <button @click="todoStore.deleteTodo(val.id)">remove</button>
    </div>

  </div>

  <div v-if="Object.keys(currentTodo).length !== 0" class="changeTodo">

    <form class="changeTodo__content">
      <input v-model="tempText" type="text">
      <div v-if="error !== ''"> {{ error }}</div>
      <button @click="e => handleText(e)" type="submit">Submit</button>
    </form>

    <div class="currentText__background" @click="currentTodo = {}" ></div>

  </div>

</template>

<style >
@import url(./todoList.css);

</style>
