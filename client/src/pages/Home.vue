<script setup lang="ts">
import { UserService } from "@/shared/services/user-service";
import { User } from "@/shared/types";
import { onMounted, ref } from "vue";

const users = ref<User[]>([]);
onMounted(async () => {
  try {
    const res = await UserService.getUsers();
    users.value = res.data;
  } catch (error) {}
});
</script>

<template>
  <div>{{ users }}</div>
</template>

<style scoped></style>
