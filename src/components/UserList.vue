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
}

async function confirmDejarDeSeguir(email: string) {
  amigoDejarSeguir.value = email;
  showOverlay.value = true;
}

async function borrarDefinitivo() {
  await store.dejarDeSeguir(amigoDejarSeguir.value);
  showOverlay.value = false;
}

function cancelar() {
  showOverlay.value = false;
}
</script>
  
  <style scoped>
  .container-general {
    flex: 1;
    width: 100%;
    align-self: center;
  }
  .contenedor {
    flex: 1;
    width: 95%;
    margin-vertical: 10px;
    align-self: center;
    align-items: center;
    margin-bottom: 85px;
  }
  .title {
    font-size: 30px;
    font-weight: bold;
    text-shadow: 2px 2px 5px #fac710;
    margin-vertical: 10px;
  }
  .info-con-foto {
    display: flex;
    flex-direction: row;
    margin: 3% 0;
  }
  .foto-container {
    width: 25%;
  }
  .foto {
    width: 70px;
    height: 70px;
    border-radius: 35px;
  }
  .info-tarjeta {
    width: 50%;
  }
  .nombre-container, .frase-container {
    height: 50%;
  }
  .nombre, .descripcion {
    font-weight: bold;
    font-size: 20px;
    color: rgb(20, 3, 3);
  }
  .boton-container {
    width: 25%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .button-seguir, .button-siguiendo {
    width: 90%;
    height: 50px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .button-seguir {
    background-color: #fac710;
  }
  .button-siguiendo {
    background-color: white;
    border: 2px solid grey;
  }
  .button-seguir-text {
    font-size: 15px;
    font-weight: bold;
    color: black;
  }
  .overlay-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.6);
  }
  .overlay-content {
    background-color: white;
    width: 80%;
    border-radius: 8px;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }
  .overlay-text {
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    margin: 5% 0 2.5%;
  }
  .botones {
    width: 100%;
    margin: 2.5% 0 5%;
    display: flex;
    justify-content: flex-end;
  }
  .button-pop-up {
    width: 90%;
    height: 50px;
    background-color: #fac710;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .button-text-pop-up {
    font-size: 18px;
    font-weight: bold;
    color: black;
  }
  </style>
  