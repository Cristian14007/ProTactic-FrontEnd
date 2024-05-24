<template>
  <div class="contenedor-menu-inferior">
    <div class="linea-inferior"></div>
    <div class="menu-inferior">
      <button class="boton-menu-inferior" @click="navigate">
        <img src="../assets/lupa.png" class="imagen-boton-menu-inferior" />
      </button>
      <button class="boton-menu-inferior" @click="navigate2">
        <img src="../assets/casa.png" class="imagen-boton-menu-inferior" />
      </button>
      <button class="boton-menu-inferior" @click="navigate3">
        <img src="../assets/usuario.png" class="imagen-boton-menu-inferior" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const navigate = () => {
  router.push({ name: 'filter' });
};
const navigate2 = () => {
  router.push({ name: 'home' });
};
const navigate3 = () => {
  router.push({ name: 'users' });
};
</script>

<style scoped>
.contenedor-menu-inferior {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
}

.linea-inferior {
  height: 6px;
  background-color: #FAC710;
}

.menu-inferior {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #000;
  height: 80px;
  padding: 0 20px;
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

.imagen-boton-menu-inferior {
  width: 30px;
  height: 30px;
}

.barra-amarilla {
  height: 4px;
  background-color: #FAC710;
  width: 100%;
}
</style>
