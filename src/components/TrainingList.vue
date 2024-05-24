<template>
  <div class="container-general">
    <div class="contenedor">
      <button class="button" @click="goToFilter">
        <span class="button-text">Cambiar filtros</span>
      </button>
      <div v-for="entrenamiento in filteredEjercicios" :key="entrenamiento.exerciseId" class="tarjeta">
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
import { onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useExerciseStore } from '../stores/ExerciseStore';

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
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  height: 170px;
  border-radius: 8px;
  background-color: black;
  padding: 10px;
}

.info-con-foto {
  display: flex;
  width: 100%;
  height: 100%;
}

.foto {
  width: 45%;
  height: 100%;
  border-radius: 5px;
}

.info-tarjeta {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 55%;
  padding: 10px;
}

.nombre {
  color: white;
  font-weight: bold;
  font-size: 18px;
}

.descripcion {
  color: white;
  font-size: 14px;
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: left;
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
  width: fit-content;
  height: fit-content;
  background-color: #FAC710;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
}

.button-ver-mas-text {
  font-size: 15px;
  font-weight: bold;
  color: #000000;
}
</style>
