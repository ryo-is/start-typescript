<template>
  <div class="todos">
    <div v-for="todo in todos" :key="todo.uuid">
      <div class="title">title: {{ todo.title }}</div>
      <div class="status">status: {{ todo.status }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent, ref } from 'vue';

const baseURL = 'http://localhost:3000/';

export default defineComponent({
  async setup() {
    const todos = ref(null);
    const getTodos = await axios.get(baseURL);
    if (getTodos && getTodos.data) {
      todos.value = getTodos.data.resBody;
    }
    return { todos };
  },
});
</script>
