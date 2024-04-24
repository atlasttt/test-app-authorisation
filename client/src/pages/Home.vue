<script setup lang="ts">
import { useRouter } from "vue-router";
import { useAuthStore } from "@/modules/auth";
import { UiCard, UiButton, UiCardActions } from "@/shared/components";

const router = useRouter();
const authStore = useAuthStore();

const onLogout = async () => {
  try {
    await authStore.logout();
    router.push("/auth");
  } catch (error) {
    console.log(error);
  }
};

const onEdit = () => {
  router.push("/profile");
};
</script>

<template>
  <div>
    <UiCard>
      <h2>Привет, {{ authStore.user?.username }}!</h2>
      <p>Ваш email: {{ authStore.user?.email }}</p>

      <UiCardActions>
        <div class="card__action">
          <UiButton @click="onEdit">Редактировать</UiButton>
          <UiButton @click="onLogout" color="danger">Выйти</UiButton>
        </div>
      </UiCardActions>
    </UiCard>
  </div>
</template>

<style scoped>
.card__action {
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  margin-top: 18px;
}
</style>
