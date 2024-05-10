<template>
  <div class="contenedor">
    <div class="tarjeta-slider" v-for="(slider, index) in sliders" :key="index">
      <div class="titulo-container">
        <p class="titulo-texto">{{ slider.title }}</p>
      </div>
      <div class="imagen-carousel">
        <figure>
          <img v-for="(image, i) in slider.images" :key="i" :src="image"
               class="foto" v-show="i === currentSlide[index]" 
               :alt="`Slider image ${i + 1}`" />
        </figure>
        <button @click="prevSlide(index)">Prev</button>
        <button @click="nextSlide(index)">Next</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

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


type Slider = {
  title: string;
  images: string[];
};

// Supongamos que tienes imágenes locales o URLs directas.
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

const nextSlide = (sliderIndex: number): void => {
  if (currentSlide[sliderIndex] < sliders[sliderIndex].images.length - 1) {
    currentSlide[sliderIndex]++;
  } else {
    currentSlide[sliderIndex] = 0;  // Volver al inicio
  }
};

const prevSlide = (sliderIndex: number): void => {
  if (currentSlide[sliderIndex] > 0) {
    currentSlide[sliderIndex]--;
  } else {
    currentSlide[sliderIndex] = sliders[sliderIndex].images.length - 1;  // Volver al final
  }
};
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

.foto {
  width: 100%; /* Las imágenes ocupan el 100% del ancho del contenedor */
  height: auto; /* Altura automática para mantener la proporción */
  display: block; /* Asegurar que no hay margen extra debajo */
}

button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  padding: 10px 20px;
  font-size: 16px;
  background-color: #FFF;
  border: none;
  cursor: pointer;
  z-index: 10; /* Asegurarse de que estén por encima de la imagen */
}

button:hover {
  background-color: #ccc;
}

button:first-of-type {
  left: 10px;
}

button:last-of-type {
  right: 10px;
}

@media (max-width: 768px) {
  .titulo-texto {
    font-size: 18px; /* Más pequeño en dispositivos móviles */
  }
}
</style>
