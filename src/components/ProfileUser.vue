<template>
  <div class="container-general">
    <button class="back-arrow" @click="goBack">
      <img src="../assets/backArrow.png" alt="Back Arrow" class="back-arrow-image" />
    </button>
    <div style="align-items: center;">
      <img src="../assets/usuario.png" class="image" />
    </div>
    <div v-if="user">
      <div class="linea-separadora"></div>
      <div class="info-usuario-general">
        <div class="info-usuario" v-for="field in fields" :key="field.key">
          <template v-if="field.key !== 'plan'">
            <button @click="edit(field.key)">
              <img src="../assets/edit.png" class="image-edit" />
            </button>
            <span class="info-usuario-texto-cabecera">{{ field.label }}:</span>
            <span class="info-usuario-texto" v-if="editField !== field.key">{{ user[field.key] }}</span>
            <input v-if="editField === field.key" v-model="editableValue" class="edit-input" />
            <button v-if="editField === field.key" @click="save">Guardar</button>
            <button v-if="editField === field.key" @click="cancel">Cancelar</button>
          </template>
          <template v-else>
            <span class="info-usuario-texto-cabecera">{{ field.label }}:</span>
            <span class="info-usuario-texto">{{ user.plan }}</span>
          </template>
        </div>
      </div>
    </div>
    <div v-else>
      <p>No hay usuario logueado.</p>
    </div>
    <div class="botones">
      <button class="button" @click="navigateTo3">
        <span class="button-text">CAMBIAR PLAN</span>
      </button>
      <button class="button" @click="navigateTo2">
        <span class="button-text">CERRAR SESION</span>
      </button>
    </div>
    <div v-if="updateSuccess" class="overlay-container">
      <div class="overlay-content">
        <p class="overlay-text">
          ¡Información actualizada correctamente!, se mostrara en el perfil la proxima vez que inicies sesión 😊
        </p>
        <div class="botones">
          <button class="button-pop-up" @click="redirectToProfile">
            <span class="button-text-pop-up">VOLVER AL PERFIL</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref, reactive } from 'vue';
import { useFunctionStore } from '../stores/FunctionStore';
import type { User } from '../stores/FunctionStore';

const router = useRouter();
const store = useFunctionStore();

const { user, updateUser } = store;
const editField = ref<keyof User | null>(null);
const editableValue = ref('');
const updateSuccess = ref(false);

type UserKey = Exclude<keyof User, 'userId' | 'plan'>; // Excluye 'userId' y 'plan' de las claves permitidas

const fields = reactive([
  { key: 'name', label: 'Nombre' },
  { key: 'apellidos', label: 'Apellidos' },
  { key: 'frase', label: 'Estado' },
  { key: 'email', label: 'Mail' },
  { key: 'password', label: 'Contraseña' },
  { key: 'plan', label: 'Plan' }
]) as Array<{ key: UserKey | 'plan'; label: string }>;

function edit(key: UserKey) {
  if (user && user[key] !== undefined) {  // Asegúrate de que user no es null y la propiedad existe
    editField.value = key;
    editableValue.value = user[key];
  }
}

async function save() {
  if (editField.value && user && typeof editableValue.value === 'string') {
    const updatedUser = { ...user, [editField.value]: editableValue.value };
    const success = await updateUser(updatedUser);
    if (success) {
      editField.value = null;
      updateSuccess.value = true; // Mostrar el modal de éxito
    } else {
      console.error('Failed to update user');
    }
  }
}

const navigateTo2 = () => {
  store.logout();
  router.push({ name: 'login' });
};

const navigateTo3 = () => {
  router.push({ name: 'plan' });
};

function cancel() {
  editField.value = null;
}

function redirectToProfile() {
  updateSuccess.value = false;
  router.push({ name: 'profile' }); // Redirigir al perfil para actualizar visualmente
}
function goBack() {
    router.back();
  }
</script>
  
  <style scoped>
  .edit-input {
    margin: 5px;
    padding: 5px;
  }
  .image-edit {
    cursor: pointer;
    width: 20px;
  }
.container-general {
  flex: 1;
  background-color: black;
  padding: 15% 10% 5% 10%;
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

.image {
  width: 225px;
  height: 225px;
}
.image-edit {
  width: 40px;
  height: 40px;
}
.linea-separadora {
  width: 100%;
  height: 1%;
  margin-vertical: 20px;
  background-color: #FAC710;
}
.info-usuario-general {
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
}
.info-usuario {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-vertical: 3%;
}
.info-usuario-texto-cabecera {
  font-size: 20px;
  font-weight: bold;
  margin-left: 10px;
  color: white;
}
.info-usuario-texto {
  font-size: 20px;
  margin-left: 10px;
  color: white;
}
.botones {
  width: 100%;
  align-items: center;
  justify-content: flex-end;
}
.button {
  width: 100%;
  height: 50px;
  background-color: #FAC710;
  border-radius: 5px;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.button-text {
  font-size: 20px;
  font-weight: bold;
  color: #000000;
}
.button-pop-up {
  background-color: #FAC710;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-weight: bold;
}

.button-pop-up:hover {
  background-color: #e5b500;
}
.overlay-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.overlay-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
}
</style>
  