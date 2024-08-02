<script>

  export default {
    data() {
      return {
        defaultTodo: {},
        currentTodo: {},
        tempText: '',
        error: ''
      }
    },
    props: {
      data: {
        type: Array,
        required: true
      },
      deleteTodo: {
        type: Function,
        requird: true
      },
      changeText: {
        type: Function,
        requird: true
      },
      changeCheckbox: {
        type: Function,
        requird: true
      }
    },
    methods: {

      openAdjustPanel(val) {
        this.currentTodo = val
        this.tempText = val.text
      },

      handleText(e) {
        e.preventDefault()

        if(this.tempText.trim() === ''){
          this.error = 'Please write something'
          return
        }

        this.currentTodo.text = this.tempText.trim().replace(/\s+/g, ' ')
        this.changeText(this.currentTodo)
        this.currentTodo = {}
        this.error = ''
      },

      handleCheckbox(val) {

        this.changeCheckbox({
          text: val.text,
          id: val.id,
          checkbox: !val.checkbox
        })

      }
    }
  }
  
  
</script>

<template>

  <div 
    v-for="val of data" 
    class="todo" 
    :key="val.id"
    :class="val.checkbox? 'active': ''"
  >

    <div @click="handleCheckbox(val)" class="todo__text">{{ val.text }}</div>

    <div class="todo__btns">
      <input type="checkbox" v-model="val.checkbox" @click="handleCheckbox(val)">
      <button @click="openAdjustPanel(val)">Change Text</button>
      <button @click="deleteTodo(val.id)">remove</button>
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
