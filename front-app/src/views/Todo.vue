<template>
  <div class="todo">
    <h1>TODO APP</h1>

    <div class="w-2/3 m-auto">
      <div class="grid grid-flow-row grid-cols-3">
        <div class="m-4 px-3 py-2 bg-gray-700 rounded-md shadow">
          <div class="flex flex-wrap content-center h-12">
            <div class="text-left flex-grow-3">
              <input
                v-model="state.title"
                type="text"
                class="w-full px-2 py-1 bg-gray-700 border border-gray-400 rounded-md focus:outline-none"
                placeholder="Title"
              />
            </div>
          </div>
          <div class="flex flex-wrap content-center justify-end h-12">
            <div
              class="w-1/4 py-1 text-blue-500 rounded-md cursor-pointer hover:text-blue-700 bg-gray-200 font-bold border-2 border-blue-500"
              @click="createTodo"
            >
              Create
            </div>
          </div>
        </div>
        <div
          class="m-4 px-3 py-2 bg-gray-700 rounded-md shadow"
          v-for="item in state.todos"
          :key="item.uuid"
        >
          <div class="flex flex-wrap content-center h-12">
            <div class="flex-grow-3 text-left">
              {{ item.title }}
            </div>
          </div>
          <div class="flex flex-wrap content-center text-center h-12">
            <div
              class="flex flex-wrap content-center py-1 rounded-md cursor-pointer flex-grow-3 text-gray-100 font-bold justify-center"
              :class="{
                'bg-red-500 hover:bg-red-700': item.status === 'todo',
                'bg-yellow-500 hover:bg-yellow-700': item.status === 'doing',
                'bg-green-500 hover:bg-green-700': item.status === 'done',
              }"
            >
              {{ item.status }}
            </div>
            <div
              class="py-1 mx-2 text-green-500 rounded-md cursor-pointer flex-grow-1 hover:text-green-700 bg-gray-200 font-bold border-2 border-green-500"
              @click="updateTodo(item)"
            >
              Update
            </div>
            <div
              class="py-1 text-red-500 rounded-md cursor-pointer flex-grow-1 hover:text-red-700 bg-gray-200 font-bold border-2 border-red-500"
              @click="deleteTodo(item)"
            >
              Delete
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import axios from 'axios';

const baseURL = 'http://localhost:3000/';

type Todo = {
  uuid: string;
  title: string;
  status: 'todo' | 'wip' | 'done';
};

export default defineComponent({
  name: 'Todo',
  setup() {
    const state = reactive({
      title: '',
      todos: [],
    });

    const getTodos = () => {
      axios.get(baseURL).then((res) => {
        if (res && res.data) {
          console.log(res);
          state.todos = res.data.resBody;
        }
      });
    };

    getTodos();

    const createTodo = async () => {
      await axios.put(baseURL, { title: state.title });
      getTodos();
    };

    const updateTodo = async (todo: Todo) => {
      await axios.post(baseURL + todo.uuid, {
        title: todo.title,
        status: todo.status,
      });
      getTodos();
    };

    const deleteTodo = async (todo: Todo) => {
      await axios.delete(baseURL + todo.uuid);
      getTodos();
    };

    return {
      state,
      createTodo,
      updateTodo,
      deleteTodo,
    };
  },
});
</script>

<style lang="scss" scoped></style>
