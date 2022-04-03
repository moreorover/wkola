<template>
  <Suspense>
    <template #default>
      <Topic />
    </template>

    <template #fallback>
      <div class="flex mx-auto p-10">Loading...</div>
    </template>
  </Suspense>
</template>
<script setup lang="ts">
import Topic from "./Topic.vue";
</script>
