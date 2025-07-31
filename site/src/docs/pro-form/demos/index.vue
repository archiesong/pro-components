<template>
  <demo-sort :cols="1">
    <basic />
  </demo-sort>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CN from '../index.zh-CN.md';
import US from '../index.en-US.md';
import Basic from './basic.vue';

export default defineComponent({
  CN,
  US,
  components: {
    Basic,
  },
});
</script>
