<template>
  <div class="home">
    <img class="m-auto" alt="Vue logo" src="../assets/logo.png" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { hello } from '@/graphql';

export default defineComponent({
  name: 'Home',
  components: {},
  setup() {
    hello();
  },
});
</script>
