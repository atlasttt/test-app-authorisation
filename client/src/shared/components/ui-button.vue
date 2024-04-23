<script setup lang="ts">
import { computed } from "vue";

type Color = "primary" | "danger";

const props = defineProps<{ color?: Color }>();

const color = computed(() => {
  switch (props.color) {
    case "primary":
      return "#3d3d38";
    case "danger":
      return "#ec3333";
    default:
      return "#3d3d38";
  }
});
</script>
<template>
  <button class="button button--variant"><slot /></button>
</template>

<style scoped>
.button--variant {
  background-color: v-bind(color);
  color: #fff;
  border-radius: 4px;
  font-size: 0.95em;
  text-align: center;
}
</style>
