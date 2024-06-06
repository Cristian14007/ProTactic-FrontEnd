<script setup lang="ts">
import AdminEdit from "../components/AdminEdit.vue"
import ChartSubs from '../components/ChartSub.vue';
import ChartCompo from '../components/ChartCompo.vue';
</script>

<template>
<AdminEdit></AdminEdit>
<h1>Gráfico de Clientes</h1>
    <ChartSubs />
    <h1>Gráfico de Deportes</h1>
    <ChartCompo />
</template>

<style scoped>
</style>
