<template>
  <div class="m-4 px-3 py-2 bg-gray-700 rounded-md shadow">
    <div class="flex flex-wrap content-center h-12">
      <div class="flex-grow-3 text-left">
        <div class="text-left flex-grow-1">
          <input
            v-model="state.task.title"
            type="text"
            class="w-full px-2 py-1 bg-gray-700 border border-gray-400 rounded-md focus:outline-none"
            placeholder="Title"
          />
        </div>
      </div>
    </div>
    <div class="flex flex-wrap content-center text-center h-12">
      <select
        class="rounded-md flex-grow-3 font-bold justify-center bg-gray-100 text-gray-700 focus:outline-none"
        v-model="state.task.status"
      >
        <option value="todo">todo</option>
        <option value="wip">wip</option>
        <option value="done">done</option>
      </select>
      <div
        class="py-1 mx-2 text-green-500 rounded-md cursor-pointer flex-grow-1 hover:text-green-700 bg-gray-200 font-bold border-2 border-green-500"
        @click="$emit('update', state.task)"
      >
        Update
      </div>
      <div
        class="py-1 text-red-500 rounded-md cursor-pointer flex-grow-1 hover:text-red-700 bg-gray-200 font-bold border-2 border-red-500"
        @click="$emit('delete', state.task)"
      >
        Delete
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

type Todo = {
  uuid: string;
  title: string;
  status: 'todo' | 'wip' | 'done';
};

export default defineComponent({
  props: {
    todo: {
      type: Object as PropType<Todo>,
      default: null,
    },
  },
  setup(props) {
    const state = {
      task: JSON.parse(JSON.stringify(props.todo)),
    };

    return {
      state,
    };
  },
});
</script>
