import { defineStore } from 'pinia';
import { computed, reactive, ref } from 'vue';

interface User {
    userId: number;
    name: string;
    password: string;
    email: string;
    apellidos: string;
    frase: string;
    plan: string;
  }

  export const useFunctionStore = defineStore('functionStore', {
    actions: {
      async fetchUser(email: string, password: string): Promise<User | null> {
        try {
          const response = await fetch(`http://localhost:5008/User`);
          const users: User[] = await response.json();
          const user = users.find((user: User) => user.email === email && user.password === password);
          return user ? user : null;  // Devuelve el usuario si lo encuentra, null si no
        } catch (error) {
          console.error('Failed to fetch user:', error);
          return null; // Manejo de error
        }
      }
    }
  });