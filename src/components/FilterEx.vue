<template>
  <div class="filter-container">
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

    <button @click="applyFilters">Aplicar Filtros</button>
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
</style>
