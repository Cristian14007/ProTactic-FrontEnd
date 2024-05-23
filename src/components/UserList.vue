<template>
  <div class="container-general">
    <div class="contenedor">
      <h1 class="title">USUARIOS</h1>
      <div v-for="usuario in filteredUsers" :key="usuario.email" class="info-con-foto">
        <div class="foto-container">
          <img src="../assets/usuario.png" class="foto" />
        </div>
        <div class="info-tarjeta">
          <div class="nombre-container">
            <p class="nombre">{{ usuario.name }}</p>
          </div>
          <div class="frase-container">
            <p class="descripcion">{{ usuario.frase }}</p>
          </div>
        </div>
        <div class="boton-container">
          <button v-if="isFriend(usuario.email)" @click="confirmDejarDeSeguir(usuario.email)" class="button-siguiendo">
            <span class="button-seguir-text">Siguiendo</span>
          </button>
          <button v-else @click="seguir(usuario.email)" class="button-seguir">
            <span class="button-seguir-text">Seguir</span>
          </button>
        </div>
      </div>
    </div>
    <div v-if="showOverlay" class="overlay-container">
      <div class="overlay-content">
        <p class="overlay-text">¿Seguro que quieres dejar de seguir a {{ amigoDejarSeguir }}?</p>
        <div class="botones">
          <button @click="borrarDefinitivo" class="button-pop-up">
            <span class="button-text-pop-up">ACEPTAR</span>
          </button>
          <button @click="cancelar" class="button-pop-up">
            <span class="button-text-pop-up">CANCELAR</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useFunctionStore } from '../stores/FunctionStore';

const store = useFunctionStore();

const showOverlay = ref(false);
const amigoDejarSeguir = ref('');

onMounted(() => {
  store.fetchUsers();
  store.fetchAmigos();
});

const filteredUsers = computed(() => {
  return store.users.filter(user => user.email !== store.user?.email);
});

function isFriend(email: string) {
  return store.amigos.some(amigo => amigo.amigos === email);
}

async function seguir(email: string) {
  await store.seguir(email);
  store.fetchAmigos();  // Actualizar lista de amigos después de seguir
}

async function confirmDejarDeSeguir(email: string) {
  amigoDejarSeguir.value = email;
  showOverlay.value = true;
}

async function borrarDefinitivo() {
  await store.dejarDeSeguir(amigoDejarSeguir.value);
  store.fetchAmigos();  // Actualizar lista de amigos después de dejar de seguir
  showOverlay.value = false;
}

function cancelar() {
  showOverlay.value = false;
}
</script>

<style scoped>
.container-general {
  padding: 20px;
}

.contenedor {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.info-con-foto {
  display: flex;
  align-items: center;
  gap: 20px;
}

.foto-container {
  flex-shrink: 0;
}

.foto {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.info-tarjeta {
  flex: 1;
}

.nombre-container {
  font-weight: bold;
}

.frase-container {
  color: gray;
}

.boton-container {
  display: flex;
  flex-direction: column;
}

.button-siguiendo {
  background-color: #FAC710;
  color: black;
  border: none;
  padding: 10px;
  cursor: pointer;
}

.button-seguir {
  background-color: blue;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
}

.button-siguiendo:hover, .button-seguir:hover {
  opacity: 0.8;
}

.overlay-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.overlay-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
}

.button-pop-up {
  background-color: #FAC710;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-weight: bold;
}

.button-pop-up:hover {
  background-color: #e5b500;
}
</style>
