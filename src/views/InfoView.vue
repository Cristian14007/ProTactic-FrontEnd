<template>
    <div class="contenedor">
      <div class="menu-superior">
        <button class="boton-menu-inferior" @click="toggleMenu">
          <img src="../assets/tres-puntos.png" class="imagen-menu-superior" />
        </button>
        <h1 class="texto-menu-superior" @click="ahuevo2">PRO-TACTIC</h1>
        <button class="boton-menu-inferior" @click="ahuevo">
          <img src="../assets/usuario.png" class="imagen-menu-superior" />
        </button>
      </div>
      <div class="linea-superior"></div>
  
      <div class="contenido">
        <ExerciseCard />
      </div>
  
      <!-- Overlay and Side Menu -->
      <div v-if="menuVisible" class="overlay" @click="toggleMenu">
        <MenuLateral class="menu-lateral" />
      </div>
  
      <MenuInferior />
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import ExerciseCard from '../components/ExerciseCard.vue';
  import MenuLateral from '../components/MenuLateral.vue';
  import MenuInferior from '../components/MenuInferior.vue';
  import { useFunctionStore } from '../stores/FunctionStore';
  
  const router = useRouter();
  const menuVisible = ref(false);
  const store = useFunctionStore();
  
  function toggleMenu() {
    menuVisible.value = !menuVisible.value;
  }
  
  function ahuevo() {
    router.push({ name: 'profile' });
  }
  function ahuevo2() {
  const userEmail = store.user?.email;
  if (userEmail === 'admin@gmail.com') {
    router.push({ name: 'admin' });
  } 
  }
  </script>
  
  <style scoped>
  .contenedor {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .menu-superior {
    display: flex;
    justify-content: space-between;
    background-color: #000000;
    padding: 20px 15px;
  }
  .linea-superior {
    height: 6px;
    margin-bottom: 10px;
    background-color: #FAC710;
  }
  .imagen-menu-superior {
    width: 40px;
    height: 40px;
  }
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 1;
  }
  .menu-lateral {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 70%;
    background-color: #000000;
  }
  .texto-menu-superior {
    font-size: 20px;
    font-weight: bold;
    color: #FFFFFF;
    line-height: 40px; /* Center vertically */
  }
  .contenido {
    flex: 1;
    margin-bottom: 10%;
  }
  .boton-menu-inferior {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: none;
  cursor: pointer;
}
  </style>
  