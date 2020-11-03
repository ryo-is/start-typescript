<template>
  <div class="m-4 px-3 py-2 bg-gray-700 rounded-md shadow">
    <div class="flex flex-wrap content-center h-12">
      <div class="flex-grow-3 text-left">
        {{ todo.title }}
      </div>
    </div>
    <div class="flex flex-wrap content-center text-center h-12">
      <div
        class="flex flex-wrap content-center py-1 rounded-md cursor-pointer flex-grow-3 font-bold justify-center bg-gray-100"
      >
        <p class="text-gray-700">{{ todo.status }}</p>
      </div>
      <div
        class="py-1 mx-2 text-green-500 rounded-md cursor-pointer flex-grow-1 hover:text-green-700 bg-gray-200 font-bold border-2 border-green-500"
        @click="$emit('update', todo)"
      >
        Update
      </div>
      <div
        class="py-1 text-red-500 rounded-md cursor-pointer flex-grow-1 hover:text-red-700 bg-gray-200 font-bold border-2 border-red-500"
        @click="$emit('delete', todo)"
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
});
</script>
