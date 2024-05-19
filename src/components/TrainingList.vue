<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useFunctionStore } from '../stores/FunctionStore';

const router = useRouter();
const store = useFunctionStore();

// Asegúrate de cargar los ejercicios si aún no están cargados
onMounted(() => {
  if (!store.ejercicios.length) {
    store.fetchEjercicios();
  }
});


const entrenamientos = computed(() => store.ejercicios);

function goToExerciseDetails(exerciseId: number) {
  router.push({ name: 'info', params: { exerciseId } });
}
function goToFilter() {
  router.push({ name: 'filter' });
}
</script>


<template>
  <div class="container-general">
    <div class="contenedor">
      <button class="button" @click="goToFilter();">
        <span class="button-text" >Cambiar filtros</span>
      </button>
      <div v-for="entrenamiento in entrenamientos" :key="entrenamiento.exerciseId" class="tarjeta">
        <div class="info-con-foto">
          <img :src="'src/assets/ejes/' + entrenamiento.imagen" class="foto" />
          <div class="info-tarjeta">
            <p class="nombre">{{ entrenamiento.nombre }}</p>
            <p class="descripcion">{{ entrenamiento.descripcion }}</p>
            <button class="button-ver-mas" @click="goToExerciseDetails(Number(entrenamiento.exerciseId));">
              <span class="button-ver-mas-text">Ver más</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

  
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
}
.info-con-foto {
  display: flex;
  flex-direction: row;
  margin: 3% 3% 4% 3%;
  width: 94%;
  height: 84%;
}
.foto {
  width: 50%;
  height: 100%;
  border-radius: 5px;
}
.info-tarjeta {
  align-items: center;
  width: 50%;
  height: 100%;
}
.nombre {
  width: 95%;
  margin-left: 5%;
  height: 15%;
  text-align: center;
  color: white;
  font-weight: bold;
  font-size: 17px;
}
.descripcion {
  width: 95%;
  margin-left: 5%;
  height: 55%;
  text-align: auto;
  margin-top: 2%;
  color: white;
  font-size: 16px;
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
  width: 95%;
  margin-left: 5%;
  height: 20%;
  text-align: center;
  background-color: #FAC710;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5%;
}
.button-ver-mas-text {
  font-size: 15px;
  font-weight: bold;
  color: #000000;
}
</style>