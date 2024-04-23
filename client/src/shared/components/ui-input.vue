<script setup lang="ts">
defineProps<{ modelValue: string }>();
defineEmits(["update:modelValue"]);
</script>

<template>
  <input
    type="text"
    class="input"
    @input="
      $emit('update:modelValue', ($event.target as HTMLInputElement).value)
    "
  />
</template>

<style scoped>
.input {
  box-sizing: border-box;
  display: block;
  width: 100%;
  border-width: 1px;
  border-style: solid;
  border-radius: 4px;
  padding: 16px;
  outline-color: #9a9da1;

  font-size: 0.95em;
  transition: outline-width 0.7s ease-out;
  &:focus {
    outline-color: #51585f;
    outline-style: solid;
    outline-width: 1px;
  }
}
</style>
