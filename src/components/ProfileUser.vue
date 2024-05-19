<template>
    <div class="container-general">
      <button class="back-arrow">
        <img src="../assets/backArrow.png" alt="Back Arrow" />
      </button>
      <div style="align-items: center;">
        <img src="../assets/usuario.png" class="image" />
      </div>
      <div v-if="user">
        <div class="linea-separadora"></div>
        <div class="info-usuario-general">
          <div class="info-usuario" v-for="field in fields" :key="field.key">
            <button @click="edit(field.key)">
              <img src="../assets/edit.png" class="image-edit" />
            </button>
            <span class="info-usuario-texto-cabecera">{{ field.label }}:</span>
            <span class="info-usuario-texto" v-if="editField !== field.key">{{ user[field.key] }}</span>
            <input v-if="editField === field.key" v-model="editableValue" class="edit-input" />
            <button v-if="editField === field.key" @click="save">Guardar</button>
            <button v-if="editField === field.key" @click="cancel">Cancelar</button>
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
    </div>
  </template>
  
  <script setup lang="ts">
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  import { ref, reactive } from 'vue';
  import { useFunctionStore} from '../stores/FunctionStore';
import type { User } from '../stores/FunctionStore';

  
  const { user, updateUser } = useFunctionStore();
  const editField = ref<UserKey | null>(null);
  const editableValue = ref('');
  
  type UserKey = Exclude<keyof User, 'userId'>; // Excluye 'userId' de las claves permitidas

// Ahora 'field.key' debería ser de tipo 'UserKey'
const fields = reactive([
  { key: 'name', label: 'Nombre' },
  { key: 'apellidos', label: 'Apellidos' },
  { key: 'frase', label: 'Estado' },
  { key: 'email', label: 'Mail' },
  { key: 'password', label: 'Contraseña' },
  { key: 'plan', label: 'Plan' }
]) as Array<{ key: UserKey; label: string }>;
  
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
    } else {
      console.error('Failed to update user');
    }
  }
}

const navigateTo2 = () => {
        router.push({ name: 'login' });
    };
    const navigateTo3 = () => {
        router.push({ name: 'plan' });
    };
  
  function cancel() {
    editField.value = null;
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
  width: 50px;
  height: 50px;
  position: absolute;
  left: 5%;
  top: 5%;
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
</style>
  