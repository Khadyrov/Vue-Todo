<script>


  export default {
    data() {
      return {
        currentText: '',
        error: ''
      }
      
    },
    props :{
      addTodo: {
        type: Function,
        required: true
      }
    },
    methods :{
      currentTodo (e) {

        e.preventDefault()

        if(this.currentText.trim() === '') {
          this.error = 'Please write something'
          return
        }
        this.addTodo({
          text: this.currentText.trim(),
          checkbox: false,
          id: Date.now()
        })

        this.currentText = ''
      }
    }
  }

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
  @import url(./addTodo.css);

</style>
