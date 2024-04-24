<script setup lang="ts"></script>

<template>
  <div class="card__action">
    <slot />
  </div>
</template>

<style scoped>
.card__action {
  display: flex;
  gap: 16px;
  justify-content: center;
}
</style>
