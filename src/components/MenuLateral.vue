<template>
  <div class="contenedor-menu-lateral">
    <div class="menu-lateral">
      <h1 class="titulo">Pro-Tactic</h1>
      <button class="boton-menu-lateral" @click="navigateTo">
        <img src="../assets/futbol.png" class="imagen-boton-menu-lateral" />
        <span class="texto-menu-lateral">Futbol</span>
      </button>
      <button class="boton-menu-lateral" @click="navigateTo1">
        <img src="../assets/basket.png" class="imagen-boton-menu-lateral" />
        <span class="texto-menu-lateral">Baloncesto</span>
      </button>
      <button class="boton-menu-lateral" @click="navigateTo2">
        <img src="../assets/change.png" class="imagen-boton-menu-lateral" />
        <span class="texto-menu-lateral">Cambiar plan</span>
      </button>
      <button class="boton-menu-lateral" @click="navigateTo3">
        <img src="../assets/usuario.png" class="imagen-boton-menu-lateral" />
        <span class="texto-menu-lateral">Amigos</span>
      </button>
      <button class="boton-menu-lateral" @click="navigateTo4">
        <img src="../assets/nuevo.png" class="imagen-boton-menu-lateral" />
        <span class="texto-menu-lateral">Crear ejercicio</span>
      </button>
      <button class="button-cerrar-sesion" @click="logout">
        <span class="button-cerrar-sesion-text">CERRAR SESIÓN</span>
      </button>
    </div>
    <div class="linea-lateral"></div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

function logout() {
  localStorage.removeItem('usuario');  // Usando localStorage en lugar de AsyncStorage
  console.log('Sesión cerrada correctamente');
  router.push({ name: 'login' });
}

const navigateTo = () => {
  router.push({ name: 'filter' });
};
const navigateTo1 = () => {
  router.push({ name: 'filter' });
};
const navigateTo2 = () => {
  router.push({ name: 'plan' });
};
const navigateTo3 = () => {
  router.push({ name: 'users' });
};
const navigateTo4 = () => {
  router.push({ name: 'create' });
};
</script>

<style scoped>
.contenedor-menu-lateral {
  width: 60%;
  display: flex;
  flex-direction: column;
  background-color: #000;
  padding-top: 5%;
}

.menu-lateral {
  width: 60%;
  display: flex;
  flex-direction: column;
  background-color: #000;
  padding-top: 5%;
}

.titulo {
  color: white;
  font-size: 30px;
  font-weight: bold;
  margin-left: 5%;
  margin-top: 5%;
}

.texto-menu-lateral {
  color: #FAC710;
  font-size: 18px;
  font-weight: bold;
  margin-left: 5%;
}

.linea-lateral {
  width: 6px;
  background-color: #FAC710;
}

.boton-menu-lateral {
  display: flex;
  align-items: center;
  padding: 10px;
  margin: 10px 15px;
  flex-direction: row;
  border: none;
  background: none;
  cursor: pointer;
}

.imagen-boton-menu-lateral {
  width: 30px;
  height: 30px;
}

.button-cerrar-sesion {
  width: 90%;
  margin: 20px auto;
  height: 40px;
  text-align: center;
  background-color: #FAC710;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.button-cerrar-sesion-text {
  font-size: 17px;
  font-weight: bold;
  color: #000;
}
</style>
