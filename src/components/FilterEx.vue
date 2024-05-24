<template>
  <div class="filter-container">
    <div class="titulo-container">
        <p class="titulo-texto">Buscar Ejercicios</p>
      </div>
    <select v-model="selectedDeporte">
      <option disabled value="">Seleccione Deporte</option>
      <option>Futbol</option>
      <option>Basket</option>
    </select>
    <select v-model="selectedDificultad">
      <option disabled value="">Seleccione Dificultad</option>
      <option>Low</option>
      <option>Medium</option>
      <option>Hard</option>
    </select>
    <select v-model="selectedIntensity">
      <option disabled value="">Seleccione Intensidad</option>
      <option>Low</option>
      <option>Medium</option>
      <option>Hard</option>
    </select>
    <select v-model="selectedPersonas">
      <option disabled value="">Seleccione Personas</option>
      <option>Individual</option>
      <option>Parejas</option>
      <option>Grupos</option>
    </select>
    <select v-model="selectedAge">
      <option disabled value="">Seleccione Edad Mínima</option>
      <option>7</option>
      <option>14</option>
      <option>18</option>
    </select>
    <select v-model="selectedObjetivo">
      <option disabled value="">Seleccione Objetivo</option>
      <option>Calentamiento</option>
      <option>Fisico</option>
      <option>Estiramiento</option>
    </select>
    <button class="button" @click="applyFilters">
        <span class="button-text">Aplicar Filtros</span>
      </button>
  
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useExerciseStore } from '../stores/ExerciseStore';

const selectedIntensity = ref('');
const selectedAge = ref('');
const selectedDeporte = ref('');
const selectedDificultad = ref('');
const selectedObjetivo = ref('');
const selectedPersonas = ref('');
const router = useRouter();
const store = useExerciseStore();

function applyFilters() {
  store.setFilters({
    intensidad: selectedIntensity.value,
    edad: parseInt(selectedAge.value, 10),
    deporte: selectedDeporte.value,
    objetivo: selectedObjetivo.value,
    personas: selectedPersonas.value,
    dificultad: selectedDificultad.value
  });
  router.push({ name: 'exercises' });
}
</script>


<style scoped>
.filter-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 20px;
}
.titulo-container {
  text-align: center; /* Centrar el título */
  padding: 8px 0; /* Padding para espacio vertical */
  color: black;
}

.titulo-texto {
  font-size: 24px; /* Tamaño más adecuado para el título */
  font-weight: bold;
  text-shadow: 1px 1px 3px #fac710;
}
.button {
  width: 100%;
  height: 50px;
  background-color: #FAC710;
  border-radius: 5px;
  margin-bottom: 10px;
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
