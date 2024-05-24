<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useExerciseStore } from '../stores/ExerciseStore';
import { useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const store = useExerciseStore();

const ejercicio = computed(() => {
  const exerciseId = Array.isArray(route.params.exerciseId)
    ? route.params.exerciseId[0]
    : route.params.exerciseId;
  return store.ejercicios.find(e => e.exerciseId === parseInt(exerciseId));
});

function getClass(dificultadOrIntensidad: string) {
  return {
    'Low': 'text-green',
    'Medium': 'text-yellow',
    'Hard': 'text-red'
  }[dificultadOrIntensidad] || 'text-gray';
}

function goBack() {
  router.push({ name: 'exercises' });
}
</script>

<template>
  <div class="container-general" v-if="ejercicio">
    <div class="contenedor">
      <div class="titulo-container">
        <p class="titulo-texto">{{ ejercicio.nombre }}</p>
      </div>
      <div class="foto-container">
        <img :src="'src/assets/ejes/' + ejercicio.imagen" class="foto" />
      </div>
      <div class="caracteristicas-container">
        <div class="caracteristica">
          <p class="caracteristica-label">Dificultad</p>
          <p :class="getClass(ejercicio.dificultad)" class="caracteristica-valor">{{ ejercicio.dificultad }}</p>
        </div>
        <div class="caracteristica">
          <p class="caracteristica-label">Intensidad</p>
          <p :class="getClass(ejercicio.intensidad)" class="caracteristica-valor">{{ ejercicio.intensidad }}</p>
        </div>
        <div class="caracteristica">
          <p class="caracteristica-label">Edad Recomendada</p>
          <p class="caracteristica-valor">{{ ejercicio.edad }}</p>
        </div>
      </div>
      <div class="descripcion-container">
        <p class="titulo-descripcion">Descripción</p>
        <p class="descripcion-texto">{{ ejercicio.descripcion }}</p>
      </div>
      <button class="button" @click="goBack">
        <span class="button-text">VOLVER</span>
      </button>
    </div>
  </div>
  <div v-else>
    <p>Ejercicio no encontrado.</p>
  </div>
</template>

<style scoped>
.container-general {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.contenedor {
  width: 100%;
  max-width: 600px;
  margin-bottom: 110px;
  text-align: center;
}

.titulo-container {
  margin-bottom: 20px;
}

.titulo-texto {
  font-size: 30px;
  font-weight: bold;
  text-shadow: 2px 2px 5px #FAC710;
}

.foto-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.foto {
  width: 100%;
  max-width: 400px;
  border-radius: 15px;
}

.caracteristicas-container {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.caracteristica {
  text-align: center;
}

.caracteristica-label {
  font-weight: bold;
  font-size: 16px;
}

.caracteristica-valor {
  font-size: 16px;
}

.text-green {
  color: green;
}

.text-yellow {
  color: yellow;
}

.text-red {
  color: red;
}

.text-gray {
  color: gray;
}

.descripcion-container {
  text-align: left;
  margin-bottom: 20px;
}

.titulo-descripcion {
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 10px;
}

.descripcion-texto {
  font-size: 16px;
  text-align: justify;
}

.button {
  width: 100%;
  height: 50px;
  background-color: #FAC710;
  border-radius: 5px;
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
