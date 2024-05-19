<template>
    <div class="container-general">
      <button class="back-arrow" @click="goBack">
        <img src="../assets/backArrow.png" alt="Back Arrow" />
      </button>
  
      <div class="container">
        <div v-for="(plan, index) in planes" :key="index" class="planes-tarjeta" @click="selectPlan(plan.planes)">
          <div :class="[plan.planes === selectedPlan ? 'valor-seleccionado' : 'valor-normal']">
            <p class="titulo">Plan {{ plan.planes }}</p>
            <p class="precio">{{ plan.price }}</p>
          </div>
          <p class="descripcion-plan-text">{{ plan.descripcion }}</p>
        </div>
  
        <button class="button" @click="changePlan">
          <span class="button-text">ELEGIR PLAN</span>
        </button>
      </div>
  
      <div v-if="planChanged" class="overlay-container">
        <div class="overlay-content">
          <p class="overlay-text">
            ¡Plan cambiado correctamente! Gracias por confiar en nosotros 😊
          </p>
          <div class="botones">
            <button class="button-pop-up" @click="goToHome">
              <span class="button-text-pop-up">VOLVER AL INICIO</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { useFunctionStore } from '../stores/FunctionStore';
  
  const router = useRouter();
  const store = useFunctionStore();
  
  const selectedPlan = ref('');
  const planChanged = ref(false);
  
  onMounted(() => {
    store.fetchPlanes(); // Obtener los planes al montar el componente
  });
  
  const planes = computed(() => store.planes);
  
  function selectPlan(plan: string) {
    selectedPlan.value = plan;
  }
  
  async function changePlan() {
    await store.updateUserPlan(selectedPlan.value);
    planChanged.value = true;
  }
  
  function goToHome() {
    router.push({ name: 'home' });
  }
  
  function goBack() {
    router.back();
  }
  </script>
  
  <style scoped>
  .container-general {
    flex: 1;
    background-color: black;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .back-arrow {
    width: 50px;
    height: 50px;
    position: absolute;
    left: 5%;
    top: 3%;
  }
  .container {
    width: 80%;
    margin-top: 20%;
    flex: 1;
    border: 2px solid;
    align-self: center;
    align-items: center;
    justify-content: space-between;
  }
  .planes-tarjeta {
    margin-bottom: 10px;
    cursor: pointer;
  }
  .valor-normal, .valor-seleccionado {
    width: 100%;
    display: flex;
    flex-direction: row;
    border-width: 4px;
    border-radius: 10px;
    margin-bottom: 2px;
  }
  .valor-seleccionado {
    background-color: #444444;
    padding: 2px;
    border-color: #444444;
  }
  .titulo {
    color: #fac710;
    font-size: 30px;
    font-weight: bold;
    flex: 65%;
  }
  .precio {
    color: white;
    font-size: 30px;
    font-weight: bold;
    flex: 35%;
    text-align: right;
  }
  .descripcion-plan-text {
    font-size: 20px;
    color: white;
    text-align: justify;
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
  </style>
  