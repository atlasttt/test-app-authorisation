<template>
  <div class="card__title">
    <slot />
  </div>
</template>

<style scoped>
.card__title {
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 24px;
  display: flex;
  justify-content: center;
  gap: 16px;
}
</style>
