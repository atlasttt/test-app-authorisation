<script setup lang="ts">
import { useAuthStore } from "@/modules/auth";
import { UiCard, UiInput, UiCardHeader, UiButton } from "@/shared/components";
import UiCardActions from "@/shared/components/card/ui-card-actions.vue";
import { computed, nextTick, ref } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";

const authStore = useAuthStore();
const router = useRouter();

const username = ref("");

username.value = authStore.user?.username || "";

const disabled = computed(() => username.value === authStore.user?.username);

const onEditProfile = async () => {
  try {
    await authStore.updateProfile(username.value);
    toast.success("Профиль обновлен");
  } catch (error) {
    toast.error((error as any).response.data.message);
    username.value = authStore.user?.username || "";
  }
};

const onDeleteProfile = async () => {
  try {
    if (!confirm("Вы уверены, что хотите удалить профиль?")) return;
    await authStore.deleteProfile();
    toast.success("Профиль удален");
    await nextTick();
    router.push("/auth");
  } catch (error) {}
};
</script>

<template>
  <div>
    <UiCard>
      <router-link to="/">На главную</router-link>

      <h2>Изменить профиль</h2>
      <form>
        <label for="username">Имя</label>
        <UiInput id="username" v-model="username" placeholder="Имя" />
        <UiCardActions class="card__action">
          <UiButton :disabled="disabled" @click.prevent="onEditProfile"
            >Сохранить
          </UiButton>
          <UiButton color="danger" @click.prevent="onDeleteProfile">
            Удалить аккаунт</UiButton
          >
        </UiCardActions>
      </form>
    </UiCard>
  </div>
</template>

<style scoped>
.card__action {
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  margin-top: 1em;
}
</style>
