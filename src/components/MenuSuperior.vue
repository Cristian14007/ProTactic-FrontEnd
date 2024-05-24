<template>
   <div class="contenedor">
    <div class="menu-superior">
      <button class="boton-menu-inferior" @click="abrirMenu">
        <img src="../assets/tres-puntos.png" class="imagen-menu-superior" />
      </button>
      <span class="texto-menu-superior">PRO-TACTIC</span>
      <button class="boton-menu-inferior" @click="handlePress">
        <img src="../assets/usuario.png" class="imagen-menu-superior" />
      </button>
    </div>
    <div class="linea-superior"></div>
  </div>
  </template>
  
  <script setup lang="ts">
  import { defineEmits } from 'vue';

import { useRouter } from 'vue-router';

const router = useRouter();
const emits = defineEmits(['menu-press'])

function abrirMenu() {
  emits('menu-press', true)
}

function handlePress() {
  router.push({ name: 'profile' })
}
  </script>
  
  <style scoped>
  .contenedor {
    position: relative;
  }
  .menu-superior {
    display: flex;
    justify-content: space-between;
    background-color: #000;
    padding: 20px 15px;
  }
  .linea-superior {
    height: 6px;
    background-color: #FAC710;
  }
  .imagen-menu-superior {
    width: 40px;
    height: 40px;
    margin: 20px 10px;
  }
  .texto-menu-superior {
    height: 40px;
    margin: 28px 10px;
    font-size: 20px;
    font-weight: bold;
    color: #FFF;
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
  