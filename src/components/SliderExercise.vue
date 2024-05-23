<template>
  <div class="contenedor">
    <div class="tarjeta-slider" v-for="(slider, index) in sliders" :key="index">
      <div class="titulo-container">
        <p class="titulo-texto">{{ slider.title }}</p>
      </div>
      <div class="imagen-carousel">
        <figure class="image-wrapper">
          <img v-for="(image, i) in slider.images" :key="i" :src="image"
               class="foto" v-show="i === currentSlide[index]" 
               :alt="`Slider image ${i + 1}`" 
               @click="goToInfoView(slider.title)" />
        </figure>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useExerciseStore } from '../stores/ExerciseStore';

const router = useRouter();

import posesion from '@/assets/futbol/posesion.jpg';
import centro from '@/assets/futbol/centro.jpg';
import basculacion from '@/assets/futbol/basculacion.jpg';
import a from '@/assets/basket/22.jpg';
import basketon from '@/assets/basket/basketon.jpg';
import balon from '@/assets/basket/balon.png';
import circuit from '@/assets/futbol/circuit.jpg';
import corro from '@/assets/basket/corro.jpg';
import combinacion from '@/assets/futbol/combinacion.jpg';
import bosesion from '@/assets/basket/posesion.jpg';
import cuadra from '@/assets/futbol/cuadra.jpg';
import panuelo from '@/assets/basket/panuelo.jpg';

const store = useExerciseStore();

function goToInfoView(sliderTitle: string) {
  let filters = {};
  if (sliderTitle === 'TOP FUTBOL') {
    filters = { deporte: 'Futbol' };
  } else if (sliderTitle === 'TOP BALONCESTO') {
    filters = { deporte: 'Basket' };
  } else if (sliderTitle === 'LOS MAS DIFICILES') {
    filters = { intensidad: 'Hard' }; 
  } else if (sliderTitle === 'PARA CALENTAR') {
    filters = { objetivo: 'Calentamiento' };
  }
  
  store.setFilters(filters);
  router.push({ name: 'exercises' });
}

type Slider = {
  title: string;
  images: string[];
};

const sliders: Slider[] = [
  {
    title: 'TOP FUTBOL',
    images: [posesion, centro, basculacion],
  },
  {
    title: 'TOP BALONCESTO',
    images: [a, basketon, balon],
  },
  {
    title: 'LOS MAS DIFICILES',
    images: [circuit, corro, combinacion],
  },
  {
    title: 'PARA CALENTAR',
    images: [bosesion, cuadra, panuelo],
  }
];

const currentSlide = reactive<number[]>(sliders.map(() => 0));
const intervals = reactive<number[]>(sliders.map(() => 0));

const nextSlide = (sliderIndex: number): void => {
  if (currentSlide[sliderIndex] < sliders[sliderIndex].images.length - 1) {
    currentSlide[sliderIndex]++;
  } else {
    currentSlide[sliderIndex] = 0;  // Volver al inicio
  }
};

const startAutoSlide = (sliderIndex: number): number => {
  return setInterval(() => {
    nextSlide(sliderIndex);
  }, 3000); // Cambia de imagen cada 3 segundos
};

onMounted(() => {
  sliders.forEach((_, index) => {
    intervals[index] = startAutoSlide(index);
  });
});

onUnmounted(() => {
  intervals.forEach(interval => clearInterval(interval));
});
</script>

<style scoped>
.contenedor {
  width: 90%;
  max-width: 700px; /* Limitar el tamaño máximo */
  margin: 20px auto; /* Centrar y dar espacio alrededor */
  position: relative; /* Para posicionar absolutamente los botones dentro */
}

.tarjeta-slider {
  overflow: hidden; /* Ocultar partes de la imagen que desborden */
  position: relative; /* Relativo para posicionar los botones */
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

.imagen-carousel {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.image-wrapper {
  width: 100%;
  height: 0;
  padding-bottom: 56.25%; /* Relación de aspecto 16:9 */
  background-color: black; /* Fondo negro para el contenedor de imágenes */
  position: relative;
  border: 4px solid black; /* Añadir borde negro al contenedor */
}

.foto {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Asegurarse de que la imagen cubra todo el contenedor */
  position: absolute;
  top: 0;
  left: 0;
  border: 2px solid black; /* Añadir borde negro a la imagen */
}
</style>