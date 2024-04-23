<script setup lang="ts">
import { ref } from "vue";
import uiCard from "@/shared/components/ui-card.vue";
import UiInput from "@/shared/components/ui-input.vue";
import UiButton from "@/shared/components/ui-button.vue";
import { useAuthStore } from "@/modules/auth";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { useRouter } from "vue-router";

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
  console.log(email.value, password.value, username.value);

  try {
    await authStore.registration(email.value, password.value, username.value);
    router.push("/");
  } catch (error) {
    toast.error((error as any).response.data.message);
  }
};
</script>

<template>
  <div>
    <ui-card>
      <div class="card__title">
        <div
          class="link"
          :class="isLoginmode ? 'active__link' : 'not-active__link'"
          @click="isLoginmode = true"
        >
          Вход
        </div>
        <div
          :class="isLoginmode ? 'not-active__link' : 'active__link'"
          @click="isLoginmode = false"
        >
          Регистрация
        </div>
      </div>
      <form class="form">
        <UiInput placeholder="Имя" v-model="username" v-if="!isLoginmode" />
        <UiInput placeholder="Email" v-model="email" />
        <UiInput placeholder="Пароль" type="password" v-model="password" />

        <div class="card__action">
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
        </div>
      </form>
    </ui-card>
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
  cursor: pointer;
}

.active__link {
  opacity: 1;
}
.not-active__link {
  opacity: 0.3;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.card__action {
  display: flex;
  gap: 16px;
  justify-content: center;
}
</style>
