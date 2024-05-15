import { defineStore } from 'pinia';
import { computed, reactive, ref } from 'vue';

export interface  User {
  userId?: number
    name: string;
    password: string;
    email: string;
    apellidos: string;
    frase: string;
    plan: string;
  }
  export interface Exercise {
    exerciseId?: number
    nombre: string;
    img: string;
    descripcion: string;
    dificultad: string;
    intensidad: string;
    edad: number;
  }

  export const useFunctionStore = defineStore('functionStore', {
    state: () => ({
      user: ref<User | null>(null),
      ejercicios: [] as Exercise[]
    }),
    actions: {
      async fetchUser(email: string, password: string): Promise<User | null> {
        try {
          const response = await fetch(`http://localhost:5008/User`);
          const users: User[] = await response.json();
          const user = users.find(user => user.email === email && user.password === password);
          if (user) {
            this.user = user;  // Guardamos el usuario en el estado
          }
          return user ? user : null;
        } catch (error) {
          console.error('Failed to fetch user:', error);
          return null;
        }
      },
      logout() {
        this.user = null;  // Limpiar el usuario del estado
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
    },
    async updateUser(updatedUser: Partial<User>): Promise<boolean> {
      if (!updatedUser.userId) {
          console.error('User ID is missing, cannot update user');
          return false;
      }
      try {
          const response = await fetch(`http://localhost:5008/User/${updatedUser.userId}`, {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(updatedUser)
          });
          if (!response.ok) {
              const errorText = await response.text();  // Usar .text() para manejar respuestas no-JSON
              throw new Error(`Failed to update user: status ${response.status} - ${errorText}`);
          }
  
          // Si la respuesta está vacía, no intentar analizarla como JSON
          const text = await response.text();
          try {
              if (text) {
                  const data = JSON.parse(text);  // Sólo analizar como JSON si hay contenido
                  this.user = data;  // Actualiza el estado del usuario en el store
                  return true;
              } else {
                  return true;  // Si no hay contenido, asumir que la actualización fue exitosa
              }
          } catch (e) {
              console.error('Unexpected response format:', e);
              return false;  // Si el contenido no puede ser analizado, considerar fallido
          }
      } catch (error) {
          console.error('Failed to update user:', error);
          return false;
      }
  },
  async fetchEjercicios() {
    try {
      const response = await fetch('http://localhost:5008/Exercise');
      if (!response.ok) {
        throw new Error(`Failed to fetch exercises: status ${response.status}`);
      }
      this.ejercicios = await response.json() as Exercise[];
    } catch (error) {
      console.error('Failed to fetch exercises:', error);
    }
  }
  
    
    
    }
  });