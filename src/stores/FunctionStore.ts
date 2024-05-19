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
    imagen: string;
    descripcion: string;
    dificultad: string;
    intensidad: string;
    edad: number;
    deporte: string;
    personas: string;
    objetivo: string;
    material: string;
  }
  export interface  Plan {
    planId?: number
      planes: string;
      price: string;
      descripcion: string;
      precio: number;
    }
    export interface Amigo {
      id?: number;
      usuario: string;
      amigos: string;
    }

  export const useFunctionStore = defineStore('functionStore', {
    state: () => ({
      user: ref<User | null>(null),
      users: [] as User[],
      ejercicios: [] as Exercise[],
      filters: {} as any,
      planes: [] as Plan[],
      amigos: [] as Amigo[]
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
        throw new Error('Failed to fetch exercises');
      }
      const data = await response.json() as Exercise[];
      this.ejercicios = this.applyFilters(data);  // Aplicar filtros después de cargar los datos
    } catch (error) {
      console.error("Failed to fetch exercises:", error);
    }
  },
  applyFilters(data: Exercise[]) {
    return data.filter(exercise => 
      (!this.filters.intensidad || exercise.intensidad === this.filters.intensidad) &&
      (!this.filters.edad || exercise.edad === this.filters.edad) &&
      (!this.filters.deporte || exercise.deporte === this.filters.deporte) &&
      (!this.filters.objetivo || exercise.objetivo === this.filters.objetivo) &&
      (!this.filters.personas || exercise.personas === this.filters.personas) &&
      (!this.filters.dificultad || exercise.dificultad === this.filters.dificultad)
    );
  },
  setFilters(filters: any) {
    this.filters = filters;
  },
  async createExercise(exercise: Exercise) {
    try {
      if (!exercise.imagen) {
      exercise.imagen = '../assets/usuario.png'; // Asignar una imagen por defecto
    }
    const response = await fetch('http://localhost:5008/Exercise', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(exercise)
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to create exercise: ${errorText}`);
    }
    const newExercise = await response.json() as Exercise;
    this.ejercicios.push(newExercise); // Añade el nuevo ejercicio al estado
  } catch (error) {
    console.error('Failed to create exercise:', error);
  }
  },
  async fetchPlanes() {
    try {
      const response = await fetch('http://localhost:5008/Plan'); // Ajusta la URL si es necesario
      if (!response.ok) {
        throw new Error('Failed to fetch plans');
      }
      const data = await response.json() as Plan[];
      this.planes = data;
    } catch (error) {
      console.error("Failed to fetch plans:", error);
    }
  },
  async updateUserPlan(plan: string) {
    if (!this.user) return;
    
    try {
      const response = await fetch(`http://localhost:5008/User/${this.user.userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...this.user, plan })
      });
      if (!response.ok) {
        throw new Error('Failed to update user plan');
      }
      this.user = await response.json(); // Actualiza el usuario con el nuevo plan
    } catch (error) {
      console.error('Failed to update user plan:', error);
    }
  },
  async fetchUsers() {
    try {
      const response = await fetch('http://localhost:5008/User');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      this.users = await response.json();
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  },
  async fetchAmigos() {
    if (!this.user) return;
    try {
      const response = await fetch(`http://localhost:5008/Amigo?usuario=${this.user.email}`);
      if (!response.ok) {
        throw new Error('Failed to fetch amigos');
      }
      this.amigos = await response.json();
    } catch (error) {
      console.error("Failed to fetch amigos:", error);
    }
  },
  async seguir(email: string) {
    if (!this.user) return;
    try {
      const amigo: Amigo = { usuario: this.user.email, amigos: email };
      const response = await fetch('http://localhost:5008/Amigo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(amigo),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to add amigo: ${errorText}`);
      }
      const newAmigo = await response.json();
      this.amigos.push(newAmigo);
    } catch (error) {
      console.error("Failed to add amigo:", error);
    }
  },
  async dejarDeSeguir(email: string) {
    if (!this.user) return;
    try {
      const amigo = this.amigos.find(a => a.amigos === email && a.usuario === this.user!.email);
      if (!amigo || !amigo.id) return;
      const response = await fetch(`http://localhost:5008/Amigo/${amigo.id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete amigo');
      }
      this.amigos = this.amigos.filter(a => a.id !== amigo.id);
    } catch (error) {
      console.error("Failed to delete amigo:", error);
    }
  }
    
    
    }
  });