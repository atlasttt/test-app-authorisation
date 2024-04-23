<template>
  <div class="layout-empty">
    <router-view />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.layout-empty {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
