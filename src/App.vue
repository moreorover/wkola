<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
</script>

<template>
  <Navbar> </Navbar>
  <div class="p-4">
    <div class="surface-card" style="min-height: 20rem">
      <router-view />
    </div>
  </div>
</template>

<style></style>
