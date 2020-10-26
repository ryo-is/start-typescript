<template>
  <div class="todo">
    <h1>TODO APP</h1>
    <div class="create">
      <div class="title">
        <label>title:</label>
        <input v-model="state.title" />
        <button @click="create">Create</button>
      </div>
    </div>
    <Suspense>
      <template #default>
        <async-todos />
      </template>
      <template #fallback> loading... </template>
    </Suspense>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import axios from 'axios';
import AsyncTodos from '../components/AsyncTodos.vue';

const baseURL = 'http://localhost:3000/';

export default defineComponent({
  name: 'Todo',
  components: { AsyncTodos },
  setup() {
    const state = reactive({
      title: '',
    });

    const create = async () => {
      await axios.put(baseURL, { title: state.title });
    };

    return {
      state,
      create,
    };
  },
});
</script>
