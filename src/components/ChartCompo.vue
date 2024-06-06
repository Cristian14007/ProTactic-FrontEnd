<template>
  <div>
    <canvas ref="chart"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { Chart, BarElement, BarController, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { useExerciseStore } from '../stores/ExerciseStore';

Chart.register(BarElement, BarController, CategoryScale, LinearScale, Tooltip, Legend);

const store = useExerciseStore();
const chart = ref<HTMLCanvasElement | null>(null);

const chartData = computed(() => {
  const labels = store.usageData.map(data => data.month);
  const futbolData = store.usageData.map(data => data.futbol);
  const basketData = store.usageData.map(data => data.basket);

  return {
    labels,
    datasets: [
      {
        label: 'Fútbol',
        backgroundColor: '#42A5F5',
        data: futbolData
      },
      {
        label: 'Baloncesto',
        backgroundColor: '#FFA726',
        data: basketData
      }
    ]
  };
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false
};

let chartInstance: Chart | null = null;

onMounted(() => {
  store.fetchUsageData();

  watch(
    () => chartData.value,
    (newData) => {
      if (chart.value && newData.labels.length > 0) {
        if (chartInstance) {
          chartInstance.destroy();
        }
        chartInstance = new Chart(chart.value, {
          type: 'bar',
          data: newData,
          options: chartOptions
        });
      }
    },
    { immediate: true }
  );
});
</script>

<style scoped>
canvas {
  max-width: 100%;
  max-height: 400px;
}
</style>
