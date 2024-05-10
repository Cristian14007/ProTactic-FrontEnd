<script setup lang="ts">
import { ref } from 'vue';
import { useFunctionStore } from '../stores/FunctionStore';
import { useRouter } from 'vue-router';

const name = ref('');
const apellidos = ref('');
const email = ref('');
const password = ref('');
const frase = ref('');
const errorMessage = ref('');

    const nameError = ref(false);
    const apellido1Error = ref(false);

    const emailError = ref(false);
    const emailErrorExistente = ref(false);
    const passwordError = ref(false);


    const navigateToLogin = () => {
        router.push({ name: 'login' });
    };

const router = useRouter();
const store = useFunctionStore();

async function registerUser() {
    const userData = { name: name.value, apellidos: apellidos.value, email: email.value, password: password.value, frase: frase.value };

    try {
        const user = await store.createUser(userData);
        if (user) {
            // Si el usuario se crea correctamente, redirigir al login
            router.push('/');
        } else {
            // Manejar el caso de que la creación sea exitosa pero la respuesta esté vacía
            errorMessage.value = 'User created but no data returned';
            router.push('/');
        }
    } catch (error) {
        if (error instanceof Error) {
            errorMessage.value = error.message;
        } else {
            errorMessage.value = 'An unexpected error occurred';
        }
    }
}


</script>

<template>
<div>
    <div class="container">
        <img src="../assets/silbato-fondo.jpg" class="image" />
    <h1 class="title">Pro-Tactic</h1>

    <input
      class="input"
      :class="{'input-error': nameError}"
      type="text"
      placeholder="Nombre"
      v-model="name"
    />
    <div v-if="nameError" class="container-error">
      <p class="texto-error">Introduce un nombre válido</p>
    </div>

    <input
      class="input"
      :class="{'input-error': apellido1Error}"
      type="text"
      placeholder="Primer apellido"
      v-model="apellidos"
    />
    <div v-if="apellido1Error" class="container-error">
      <p class="texto-error">Introduce un apellido válido</p>
    </div>

    <input
      class="input"
      :class="{'input-error': emailError || emailErrorExistente}"
      type="email"
      placeholder="Correo electrónico"
      v-model="email"
    />
    <div v-if="emailError || emailErrorExistente" class="container-error">
      <p class="texto-error">
        {{ emailErrorExistente ? 'Correo existente en la base de datos' : 'Introduce un correo válido' }}
      </p>
    </div>

    <input
      class="input"
      :class="{'input-error': passwordError}"
      type="password"
      placeholder="Contraseña"
      v-model="password"
    />
    <div v-if="passwordError" class="container-error">
      <p class="texto-error">Introduce una contraseña válida</p>
    </div>

    <input
      class="input"
      :class="{'input-error': apellido1Error}"
      type="text"
      placeholder="Frase"
      v-model="frase"
    />
    <div v-if="apellido1Error" class="container-error">
      <p class="texto-error">Introduce un apellido válido</p>
    </div>
    <button class="button" @click="registerUser">
      <span class="button-text">Registrarse</span>
    </button>
    <p v-if="errorMessage">{{ errorMessage }}</p>
  </div>
  <p class="subtitle">
      ¿Ya tienes cuenta?
      <span class="subtitle-yellow" @click="navigateToLogin">Inicia sesión</span>
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
  margin-bottom: 10px;
}
.title, .button-text, .texto-error {
  font-weight: bold;
}
.title {
  font-size: 32px;
  margin-bottom: 20px;
}
.subtitle, .texto-error {
  font-size: 12px;
}
.subtitle {
  font-size: 12px;
  font-weight: bold;
  text-align: center;
}
.subtitle-yellow {
  font-size: 14px;
  color: #FAC710;
  font-weight: bold;
  cursor: pointer;
}
.input, .button {
  width: 100%;
  height: 50px;
  border-radius: 5px;
  padding: 0 10px;
}
.input {
  border: 1px solid #ccc;
}
.input-error {
  border: 3px solid red;
  background-color: #FFCCCC;
}
.container-error {
  width: 100%;
  height: 25px;
}
.button {
  background-color: #FAC710;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.button-text {
  font-size: 18px;
  color: #000000;
}
</style>