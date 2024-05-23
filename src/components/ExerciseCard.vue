<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useExerciseStore } from '../stores/ExerciseStore';

const route = useRoute();
import { useRouter } from 'vue-router';

const router = useRouter();


const store = useExerciseStore();

// Suponiendo que ya has cargado los ejercicios en algún momento, por ejemplo en el componente padre o en el router guard.
const ejercicio = computed(() => {
  // Aseguramos que el ID es un string y lo convertimos a número
  const exerciseId = Array.isArray(route.params.exerciseId)
    ? route.params.exerciseId[0]  // Tomamos el primer elemento si es un arreglo
    : route.params.exerciseId;    // Usamos el valor directamente si es un string

  return store.ejercicios.find(e => e.exerciseId === parseInt(exerciseId));
});

function getClass(dificultadOrIntensidad: string) {
  return {
    'baja': 'text-green-500',
    'media': 'text-yellow-500',
    'alta': 'text-red-500'
  }[dificultadOrIntensidad] || 'text-gray-500';
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
      <div class="descripcion-container">
        <p class="titulo-descripcion">Atributos</p>
        <div class="caracteristicas-container">
          <div class="caracteristicas-container-individual">
            <div class="prueba">
              <p class="prueba2">Dificultad</p>
            </div>
            <p :class="getClass(ejercicio.dificultad)">{{ ejercicio.dificultad }}</p>
          </div>
          <div class="caracteristicas-container-individual">
            <div class="prueba">
              <p class="prueba2">Intensidad</p>
            </div>
            <p :class="getClass(ejercicio.intensidad)">{{ ejercicio.intensidad }}</p>
          </div>
          <div class="caracteristicas-container-individual">
            <div class="prueba">
              <p class="prueba2">Edad mínima:</p>
            </div>
            <p class="texto-caracteristicas">{{ ejercicio.edad }}</p>
          </div>
        </div>
        <p class="titulo-descripcion">Descripción</p>
        <p class="descripcion-texto">{{ ejercicio.descripcion }}</p>
      </div>
      <button class="button">
        <span class="button-text"  @click="goBack">VOLVER</span>
      </button>
    </div>
  </div>
  <div v-else>
    <p>Ejercicio no encontrado.</p>
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