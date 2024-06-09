import { defineStore } from 'pinia';
import { ref } from 'vue';

export interface Amigo {
  amigoId?: number;
  usuario: string;
  amigos: string;
}

export interface Exercise {
  exerciseId?: number;
  nombre: string;
  descripcion: string;
  deporte: string;
  dificultad: string;
  intensidad: string;
  edad: number;
  objetivo: string;
  material: string;
  imagen: string;
}

export interface Plan {
  planId?: number;
  planes: string;
  price: string;
  descripcion: string;
  precio: number;
}

export interface Usage {
  usageId?: number;
  month: string;
  futbol: number;
  basket: number;
  basico: number;
  medium: number;
  pro: number;
  clientes: number;
}

export interface User {
  userId?: number;
  name: string;
  password: string;
  email: string;
  apellidos: string;
  frase: string;
  plan: string;
}

export const useAdminStore = defineStore('adminStore', {
  state: () => ({
    amigos: [] as Amigo[],
    ejercicios: [] as Exercise[],
    planes: [] as Plan[],
    usages: [] as Usage[],
    users: [] as User[]
  }),
  actions: {
    async fetchData(api: string) {
      try {
        const response = await fetch(`http://protacticback.retocsv.es:80/${api}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch data from ${api}`);
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error(error);
        return [];
      }
    },
    async updateData(api: string, item: any) {
      try {
        const response = await fetch(`http://protacticback.retocsv.es:80/${api}/${item.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(item)
        });
        if (!response.ok) {
          throw new Error(`Failed to update data in ${api}`);
        }
      } catch (error) {
        console.error(error);
      }
    },
    async deleteData(api: string, id: number) {
      try {
        const response = await fetch(`http://protacticback.retocsv.es:80/${api}/${id}`, {
          method: 'DELETE'
        });
        if (!response.ok) {
          throw new Error(`Failed to delete data from ${api}`);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
});
