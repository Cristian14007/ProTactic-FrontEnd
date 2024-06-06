<template>
  <div class="container-general">
    <div class="contenedor">
      <button class="button" @click="goToFilter">
        <span class="button-text">Cambiar filtros</span>
      </button>
      <button class="button" @click="toggleSortOrder">
        <span class="button-text">Ordenar por deportes</span>
      </button>
      <div v-for="entrenamiento in sortedEjercicios" :key="entrenamiento.exerciseId" class="tarjeta">
        <div class="info-con-foto">
          <img :src="'src/assets/ejes/' + entrenamiento.imagen" class="foto" />
          <div class="info-tarjeta">
            <p class="nombre">{{ entrenamiento.nombre }}</p>
            <p class="descripcion">{{ entrenamiento.descripcion }}</p>
            <button
              class="button-ver-mas"
              @click="entrenamiento.exerciseId !== undefined && goToExerciseDetails(entrenamiento.exerciseId)"
            >
              <span class="button-ver-mas-text">Ver más</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref,onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useExerciseStore } from '../stores/ExerciseStore';
const sortOrder = ref(true); // true: Futbol primero, false: Baloncesto primero

const router = useRouter();
const store = useExerciseStore();

// Asegúrate de cargar los ejercicios si aún no están cargados
onMounted(() => {
  if (!store.ejercicios.length) {
    store.fetchEjercicios();
  }
});

const filteredEjercicios = computed(() => store.filteredEjercicios);

function goToExerciseDetails(exerciseId: number) {
  router.push({ name: 'info', params: { exerciseId } });
}

function goToFilter() {
  router.push({ name: 'filter' });
}
const sortedEjercicios = computed(() => {
  const sorted = [...filteredEjercicios.value];
  if (sortOrder.value) {
    sorted.sort((a, b) => a.deporte.localeCompare(b.deporte));
  } else {
    sorted.sort((a, b) => b.deporte.localeCompare(a.deporte));
  }
  return sorted;
});

function toggleSortOrder() {
  sortOrder.value = !sortOrder.value;
}
</script>

<style scoped>
.container-general {
  flex: 1;
  width: 100%;
  align-self: center;
}
.contenedor {
  flex: 1;
  width: 95%;
  margin-vertical: 10px;
  align-self: center;
  margin-bottom: 85px;
}
.tarjeta {
  margin-bottom: 10px;
  height: 170px;
  border-radius: 8px;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  box-sizing: border-box;
}
.info-con-foto {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  gap: 10px;
}
.foto {
  width: 50%;
  height: 100%;
  border-radius: 5px;
  object-fit: cover;
}
.info-tarjeta {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 50%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
}
.nombre {
  width: 100%;
  text-align: center;
  color: white;
  font-weight: bold;
  font-size: 17px;
}
.descripcion {
  width: 100%;
  color: white;
  font-size: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.5;
  max-height: 3em; /* 2 lines * 1.5 line-height */
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
.button-ver-mas {
  width: 100%;
  height: 40px;
  text-align: center;
  background-color: #FAC710;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.button-ver-mas-text {
  font-size: 15px;
  font-weight: bold;
  color: #000000;
}
</style>
