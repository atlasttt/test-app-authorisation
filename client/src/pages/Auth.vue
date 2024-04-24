<script setup lang="ts">
import { ref } from "vue";
import { toast } from "vue3-toastify";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/modules/auth";
import {
  UiCard,
  UiCardHeader,
  UiCardTitleLink,
  UiCardActions,
  UiButton,
  UiInput,
} from "@/shared/components";

const email = ref("");
const password = ref("");
const username = ref("");
const isLoginmode = ref(true);

const authStore = useAuthStore();
const router = useRouter();

const onLogin = async () => {
  try {
    await authStore.login(email.value, password.value);
    router.push("/");
  } catch (error) {
    toast.error((error as any).response.data.message);
  }
};

const onRegister = async () => {
  try {
    await authStore.registration(email.value, password.value, username.value);
    router.push("/");
  } catch (error) {
    toast.error((error as any).response?.data.message);
  }
};
</script>

<template>
  <div>
    <UiCard>
      <UiCardHeader>
        <UiCardTitleLink :is-active="isLoginmode" @click="isLoginmode = true"
          >Вход</UiCardTitleLink
        >
        <UiCardTitleLink :is-active="!isLoginmode" @click="isLoginmode = false"
          >Регистрация</UiCardTitleLink
        >
      </UiCardHeader>

      <form class="form">
        <UiInput placeholder="Имя" v-model="username" v-if="!isLoginmode" />
        <UiInput placeholder="Email" v-model="email" />
        <UiInput placeholder="Пароль" type="password" v-model="password" />

        <UiCardActions>
          <UiButton
            v-if="isLoginmode"
            class="button"
            color="primary"
            @click.prevent="onLogin"
            >Войти</UiButton
          >
          <UiButton
            v-else
            class="button"
            color="primary"
            @click.prevent="onRegister"
            >Зарегестрироваться</UiButton
          >
        </UiCardActions>
      </form>
    </UiCard>
  </div>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
