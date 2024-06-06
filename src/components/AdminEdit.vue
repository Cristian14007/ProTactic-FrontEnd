<template>
  <div v-if="isAdmin" class="admin-container">
    <button class="back-arrow" @click="goBack">
        <img src="../assets/backArrow.png" alt="Back Arrow" class="back-arrow-image"/>
      </button>
      <h1>Admin Dashboard</h1>
    <div class="api-section" v-for="(api, index) in apis" :key="index">
      <button @click="fetchData(api)">{{ api }}</button>
      <div v-if="apiData[api]">
        <div v-for="(item, idx) in apiData[api]" :key="item[getIdField(api)]" class="api-item">
          <div v-for="(value, key) in item" :key="key" class="api-field">
            <span>{{ key }}: </span>
            <input v-model="item[key]" :readonly="!editMode[api][idx]" />
          </div>
          <button @click="toggleEditMode(api, idx)">
            {{ editMode[api][idx] ? 'Save' : 'Edit' }}
          </button>
          <button @click="deleteData(api, item[getIdField(api)])">Delete</button>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <p>Access denied. Only admins can access this section.</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useFunctionStore } from '../stores/FunctionStore';

const router = useRouter();
const store = useFunctionStore();

const apis = ['Amigo', 'Exercise', 'Plan', 'Usage', 'Users'];
const apiData = ref<{ [key: string]: any[] }>({});
const editMode = ref<{ [key: string]: boolean[] }>({});
const isAdmin = ref(false);

onMounted(() => {
  const userEmail = store.user?.email;
  if (userEmail === 'admin@gmail.com') {
    isAdmin.value = true;
  } else {
    isAdmin.value = false;
    router.push({ name: 'home' }); // Redirect non-admin users to home or any other page
  }
});

async function fetchData(api: string) {
  try {
    const response = await fetch(`http://localhost:5008/${api}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch data from ${api}`);
    }
    const data = await response.json();
    apiData.value[api] = data;
    editMode.value[api] = data.map(() => false);
  } catch (error) {
    console.error(error);
  }
}

function getIdField(api: string): string {
  const idFields: { [key: string]: string } = {
    Amigo: 'amigoId',
    Exercise: 'exerciseId',
    Plan: 'planId',
    Usage: 'usageId',
    Users: 'userId'
  };
  return idFields[api] || 'id';
}

function toggleEditMode(api: string, index: number) {
  if (editMode.value[api][index]) {
    updateData(api, apiData.value[api][index]);
  }
  editMode.value[api][index] = !editMode.value[api][index];
}

async function updateData(api: string, item: any) {
  try {
    const response = await fetch(`http://localhost:5008/${api}/${item[getIdField(api)]}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    });
    if (!response.ok) {
      throw new Error(`Failed to update data in ${api}`);
    }
    await fetchData(api); // Refresh data
  } catch (error) {
    console.error(`Error: Failed to update data in ${api}`);
  }
}

async function deleteData(api: string, id: number) {
  try {
    const response = await fetch(`http://localhost:5008/${api}/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error(`Failed to delete data from ${api}`);
    }
    await fetchData(api); // Refresh data
  } catch (error) {
    console.error(`Error: Failed to delete data from ${api}`);
  }
}

function goBack() {
    router.push({ name: 'home' });
  }
</script>

<style scoped>
.admin-container {
  padding: 20px;
}

.api-section {
  margin-bottom: 20px;
}

.api-item {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
}

.api-field {
  display: flex;
  margin-bottom: 5px;
}

.api-field span {
  font-weight: bold;
  margin-right: 5px;
}

button {
  margin-right: 5px;
  padding: 5px 10px;
}
.back-arrow {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0; /* Elimina el padding del botón */
}

.back-arrow-image {
  width: 30px; /* Ajusta el tamaño de la imagen según sea necesario */
  height: auto;
  display: block; /* Asegura que la imagen no tenga margen extra */
}
</style>
