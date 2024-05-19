<template>
    <div class="create-exercise-container">
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
        <option>High</option>
      </select>
      
      <select v-model="intensidad">
        <option disabled value="">Seleccione Intensidad</option>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
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
  import { useFunctionStore } from '../stores/FunctionStore';
  import { useRouter } from 'vue-router';

  
  const router = useRouter();
  
  const store = useFunctionStore();
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

  const errorMessage = ref('')
  
  async function createNewExercise() {
    if (!nombre.value || !descripcion.value || !deporte.value || !dificultad.value || !intensidad.value || !personas.value || !edad.value || !objetivo.value|| !material.value) {
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
  
  function goBack() {
    router.back();
  }
  </script>
  
  <style scoped>
  .create-exercise-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px;
  }
  
  h2 {
    margin-bottom: 10px;
  }
  
  input, select {
    padding: 8px;
    font-size: 16px;
  }
  
  .button, .button-pop-up {
    width: 100%;
    height: 50px;
    background-color: #fac710;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .button-text, .button-text-pop-up {
    font-size: 20px;
    font-weight: bold;
    color: #000000;
  }
  .back-arrow {
    width: 50px;
    height: 50px;
    position: absolute;
    left: 5%;
    top: 3%;
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
  }
  .error-message {
  color: red;
  font-weight: bold;
}
  </style>
  