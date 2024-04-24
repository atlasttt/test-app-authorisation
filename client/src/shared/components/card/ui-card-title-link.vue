<script setup lang="ts">
defineProps<{ isActive?: boolean }>();
</script>
<template>
  <div class="link" :class="isActive ? 'active__link' : 'not-active__link'">
    <slot />
  </div>
</template>

<style scoped>
.link {
  cursor: pointer;
}
.active__link {
  opacity: 1;
}
.not-active__link {
  opacity: 0.3;
}
</style>
