<template>
  <Suspense>
    <template #default>
      <Book />
    </template>

    <template #fallback>
      <div class="flex mx-auto p-10">Loading...</div>
    </template>
  </Suspense>
</template>
<script setup lang="ts">
import Book from "./Book.vue";
</script>
