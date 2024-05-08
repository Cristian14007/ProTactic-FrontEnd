<script setup lang="ts">
import { ref } from 'vue';
import router from '../router';
import { useFunctionStore } from '../stores/FunctionStore';

const email = ref('');
const password = ref('');
const errorMessage = ref('');

const functionStore = useFunctionStore();

async function handleLogin() {
  const user = await functionStore.fetchUser(email.value, password.value);
  if (user) {
    router.push('/home');
  } else {
    errorMessage.value = 'Usuario incorrecto o no encontrado';
  }
}
</script>

<template>
  <div class="container">
    <img src="../assets/silbato-fondo.jpg" class="image" />
    <h1 class="title">Pro-Tactic</h1>
    <input v-model="email" type="email" placeholder="Email">
    <input v-model="password" type="password" placeholder="Contraseña">
    <div class="container-error">
      <p v-if="errorMessage" class="texto-error">Email o contraseña incorrectos</p>
    </div>
    <p class="subtitle">¿Olvidaste tu contraseña?</p>
    <button class="button" @click="handleLogin"><span class="button-text">Login</span></button>
    <!-- <button @click="handleLogin">Login</button> -->
    <p class="subtitle">
      ¿Nuevo en ProTactic?
      <span class="subtitle-yellow" >Crea una cuenta</span>
    </p>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  padding: 0 30px;
  flex: 1;
}
.image {
  height: 220px;
  width: 120%;
  margin-bottom: 60px;
}
.title {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 20px;
}
.texto-error {
  font-size: 15px;
  color: red;
  font-weight: bold;
  text-align: left;
}
.subtitle {
  font-size: 12px;
  font-weight: bold;
  text-align: right;
}
.subtitle-yellow {
  font-size: 14px;
  font-weight: bold;
  color: #FAC710;
}
.container-error {
  width: 100%;
  height: 40px;
  margin-top: -10px;
}
.input {
  width: 100%;
  height: 50px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 0 10px;
  margin-bottom: 20px;
}
.input-error {
  border: 3px solid red;
  background-color: #FFCCCC;
}
.button {
  width: 100%;
  height: 50px;
  background-color: #FAC710;
  border-radius: 5px;
  margin-top: 30px;
  margin-bottom: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.button-text {
  font-size: 18px;
  font-weight: bold;
  color: #000000;
}
</style>
