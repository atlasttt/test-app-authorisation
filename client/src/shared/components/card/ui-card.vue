<script setup lang="ts"></script>

<template>
  <div class="card">
    <slot />
  </div>
</template>

<style scoped>
.card {
  background-color: #fff;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.1);
  width: 300px;
}
</style>
