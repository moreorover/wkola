<template>
  <Suspense>
    <template #default>
      <Topics />
    </template>

    <template #fallback>
      <div class="flex mx-auto p-10">Loading...</div>
    </template>
  </Suspense>
</template>
<script setup lang="ts">
import Topics from "./Topics.vue";
</script>
