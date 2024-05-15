<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useFunctionStore } from '../stores/FunctionStore';

const functionStore = useFunctionStore();

onMounted(() => {
  functionStore.fetchEjercicios();
});

const entrenamientosIndividual = computed(() => functionStore.ejercicios);

function getClass(dificultadOrIntensidad: string) {
  // Suponiendo que se clasifica por nivel, ajusta según sea necesario
  return {
    'baja': 'text-green-500',
    'media': 'text-yellow-500',
    'alta': 'text-red-500'
  }[dificultadOrIntensidad] || 'text-gray-500';
}
</script>

<template>
  <div class="container-general">
    <div class="contenedor">
      <div v-for="(entrenamiento, index) in entrenamientosIndividual" :key="index">
        <div class="titulo-container">
          <p class="titulo-texto">{{ entrenamiento.nombre }}</p>
        </div>
        <div class="foto-container">
          <img :src="entrenamiento.img" class="foto" />
        </div>
        <div class="descripcion-container">
          <p class="titulo-descripcion">Atributos</p>
          <div class="caracteristicas-container">
            <div class="caracteristicas-container-individual">
              <div class="prueba">
                <p class="prueba2">Dificultad</p>
              </div>
              <p :class="getClass(entrenamiento.dificultad)">{{ entrenamiento.dificultad }}</p>
            </div>
            <div class="caracteristicas-container-individual">
              <div class="prueba">
                <p class="prueba2">Intensidad</p>
              </div>
              <p :class="getClass(entrenamiento.intensidad)">{{ entrenamiento.intensidad }}</p>
            </div>
            <div class="caracteristicas-container-individual">
              <div class="prueba">
                <p class="prueba2">Edad mínima:</p>
              </div>
              <p class="texto-caracteristicas">{{ entrenamiento.edad }}</p>
            </div>
          </div>
          <p class="titulo-descripcion">Descripción</p>
          <p class="descripcion-texto">{{ entrenamiento.descripcion }}</p>
        </div>
      </div>
      <button class="button">
        <span class="button-text">VOLVER</span>
      </button>
    </div>
  </div>
</template>
<style scoped>
.container-general {
  flex: 1;
}
.contenedor {
  flex: 1;
  width: 90%;
  margin-bottom: 110px;
  align-self: center;
}
.titulo-container {
  align-items: center;
  margin-bottom: 8px;
  justify-content: center;
}
.titulo-texto {
  font-size: 40px;
  text-align: center;
  font-weight: bold;
  text-shadow: 2px 2px 5px #FAC710;
}
.foto-container {
  align-items: center;
  justify-content: center;
  border-radius: 50px;
}
.foto {
  height: 230px;
  width: 100%;
  border-radius: 15px;
}
.descripcion-container {
  flex: 1;
}
.titulo-descripcion {
  font-weight: bold;
  font-size: 30px;
  margin-vertical: 10px;
}
.caracteristicas-container {
  flex: 1;
  flex-direction: row;
}
.caracteristicas-container-individual {
  flex: 1;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
}
.prueba {
  height: 50px;
  text-align: center;
  justify-content: center;
}
.prueba2 {
  font-weight: 600;
  font-size: 18px;
  text-align: center;
}
.texto-caracteristicas {
  font-size: 25px;
  color: green;
}
.descripcion-texto {
  text-align: justify;
  font-size: 15px;
  padding-horizontal: 20px;
}
.button {
  width: 100%;
  height: 50px;
  position: relative;
  bottom: 0;
  margin-top: 3%;
  background-color: #FAC710;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
}
.button-text {
  font-size: 20px;
  font-weight: bold;
  color: #000000;
}
</style>