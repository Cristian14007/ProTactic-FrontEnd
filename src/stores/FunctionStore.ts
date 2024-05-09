import { defineStore } from 'pinia';
import { computed, reactive, ref } from 'vue';

interface User {
  userId?: number
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
      },
      async checkUserExists(email: string): Promise<boolean> {
        try {
          const response = await fetch('http://localhost:5008/User');
          if (!response.ok) {
            throw new Error('Failed to fetch users');
          }
          const users: User[] = await response.json();  // Aquí usamos la interfaz User
          return users.some(user => user.email === email);
        } catch (error) {
          console.error('Error checking user exists:', error);
          return false; 
        }
      },
      async createUser(userData: { email: string; password: string; name: string; apellidos: string; frase: string }): Promise<User | null> {
        try {
            const response = await fetch('http://localhost:5008/User', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            if (!response.ok) {
                const errorText = await response.text();  // Usar .text() en caso de que no sea JSON
                throw new Error(`Failed to create user: status ${response.status} - ${errorText}`);
            }
    
            // Si la respuesta está vacía, no intentar analizarla como JSON
            const text = await response.text();
            try {
                return text ? JSON.parse(text) : null;  // Sólo analizar como JSON si hay contenido
            } catch (e) {
                return null;  // Si el contenido no puede ser analizado, retornar nulo
            }
        } catch (error) {
            console.error('Failed to create user:', error);
            return null;
        }
    }
    }
  });