<script setup lang="ts">
const variants = {
  primary: "#3d3d38",
  danger: "#ec3333",
};

type Color = keyof typeof variants;

const props = defineProps<{ color?: Color }>();

const color = variants[props.color || "primary"];
</script>
<template>
  <button class="button button--variant"><slot /></button>
</template>

<style scoped>
button {
  width: 100%;
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;
  color: #fff;
  &:hover {
    opacity: 0.9;
  }
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
}
.button--variant {
  background-color: v-bind(color);
}
</style>
