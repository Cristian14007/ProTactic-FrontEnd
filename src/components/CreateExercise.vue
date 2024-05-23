<template>
  <div v-if="user && user.plan === 'Pro'" class="create-exercise-container">
    <h2>Crear Nuevo Ejercicio</h2>
    
    <input v-model="nombre" type="text" placeholder="Nombre del ejercicio" />
    <input v-model="descripcion" type="text" placeholder="Descripción del ejercicio" />
    
    <select v-model="deporte">
      <option disabled value="">Seleccione Deporte</option>
      <option>Futbol</option>
      <option>Basket</option>
    </select>
    
    <select v-model="dificultad">
      <option disabled value="">Seleccione Dificultad</option>
      <option>Low</option>
      <option>Medium</option>
      <option>Hard</option>
    </select>
    
    <select v-model="intensidad">
      <option disabled value="">Seleccione Intensidad</option>
      <option>Low</option>
      <option>Medium</option>
      <option>Hard</option>
    </select>
    
    <select v-model="personas">
      <option disabled value="">Seleccione Personas</option>
      <option>Individual</option>
      <option>Parejas</option>
      <option>Grupos</option>
    </select>
    
    <select v-model="edad">
      <option disabled value="">Seleccione Edad Mínima</option>
      <option>7</option>
      <option>14</option>
      <option>18</option>
    </select>
    
    <select v-model="objetivo">
      <option disabled value="">Seleccione Objetivo</option>
      <option>Calentamiento</option>
      <option>Fisico</option>
      <option>Estiramiento</option>
    </select>
    <input v-model="material" type="text" placeholder="Material necesario" />
    
    
    <button class="button" @click="createNewExercise">
      <span class="button-text">Crear Ejercicio</span>
    </button>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>

  <div v-else class="modal-container">
    <div class="modal-content">
      <p>Para crear ejercicios, necesitas el plan Pro.</p>
      <button class="button" @click="goToPlan">
        <span class="button-text">Cambiar a Pro</span>
      </button>
    </div>
  </div>

  <div v-if="exerciseCreated" class="overlay-container">
    <div class="overlay-content">
      <p class="overlay-text">
        ¡Ejercicio Creado correctamente! Gracias por confiar en nosotros 😊
      </p>
      <div class="botones">
        <button class="button-pop-up" @click="goToHome">
          <span class="button-text-pop-up">VOLVER AL INICIO</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useExerciseStore } from '../stores/ExerciseStore';
import { useFunctionStore } from '../stores/FunctionStore';
import { useRouter } from 'vue-router';

const router = useRouter();
const store = useExerciseStore();
const stores = useFunctionStore();
const user = stores.user;
const exerciseCreated = ref(false);

const nombre = ref('');
const descripcion = ref('');
const deporte = ref('');
const dificultad = ref('');
const intensidad = ref('');
const personas = ref('');
const edad = ref('');
const objetivo = ref('');
const material = ref('');

const errorMessage = ref('');

async function createNewExercise() {
  if (!nombre.value || !descripcion.value || !deporte.value || !dificultad.value || !intensidad.value || !personas.value || !edad.value || !objetivo.value || !material.value) {
    errorMessage.value = 'Por favor, rellene todos los campos';
    return;
  }
  const exercise = {
    nombre: nombre.value,
    descripcion: descripcion.value,
    deporte: deporte.value,
    dificultad: dificultad.value,
    intensidad: intensidad.value,
    personas: personas.value,
    edad: parseInt(edad.value, 10),
    objetivo: objetivo.value,
    material: material.value,
    imagen: '' // Este campo será asignado con una imagen por defecto en el store
  };
  exerciseCreated.value = true;

  await store.createExercise(exercise);

  // Resetea los campos después de crear el ejercicio
  nombre.value = '';
  descripcion.value = '';
  deporte.value = '';
  dificultad.value = '';
  intensidad.value = '';
  personas.value = '';
  edad.value = '';
  objetivo.value = '';
  material.value = '';

  errorMessage.value = '';
}

function goToHome() {
  router.push({ name: 'home' });
}

function goToPlan() {
  router.push({ name: 'plan' });
}

function goBack() {
  router.back();
}
</script>

<style scoped>
.create-exercise-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

input, select {
  width: 80%;
  padding: 8px;
  margin: 5px 0;
}

.button {
  background-color: #FAC710;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-weight: bold;
}

.button:hover {
  background-color: #e5b500;
}

.error-message {
  color: red;
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
.modal-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

</style>
