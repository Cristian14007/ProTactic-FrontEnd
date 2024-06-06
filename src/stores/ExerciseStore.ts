import { defineStore } from 'pinia';
import { ref } from 'vue';

export interface Exercise {
  exerciseId?: number;
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

export interface UsageData {
  month: string;
  futbol: number;
  basket: number;
  basico: number;
  medium: number;
  pro: number;
  clientes: number;
}

function applyFilters(data: Exercise[], filters: any): Exercise[] {
    return data.filter(exercise =>
      (!filters.intensidad || exercise.intensidad === filters.intensidad) &&
      (!filters.edad || exercise.edad === filters.edad) &&
      (!filters.deporte || exercise.deporte === filters.deporte) &&
      (!filters.objetivo || exercise.objetivo === filters.objetivo) &&
      (!filters.personas || exercise.personas === filters.personas) &&
      (!filters.dificultad || exercise.dificultad === filters.dificultad)
    );
  }

export const useExerciseStore = defineStore('exerciseStore', {
    state: () => ({
        ejercicios: [] as Exercise[],
        filters: {} as any,
        usageData: [] as UsageData[]
      }),
      actions: {
        async fetchEjercicios() {
          try {
            const response = await fetch('http://localhost:5008/Exercise');
            if (!response.ok) {
              throw new Error('Failed to fetch exercises');
            }
            const data = await response.json() as Exercise[];
            this.ejercicios = data;
          } catch (error) {
            console.error("Failed to fetch exercises:", error);
          }
        },
        setFilters(filters: any) {
          this.filters = filters;
        },
        async createExercise(exercise: Exercise) {
            try {
              if (!exercise.imagen) {
                exercise.imagen = '.src/assets/ejes/3.gif'; // Asignar una imagen por defecto
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
              this.fetchEjercicios(); // Actualiza la lista de ejercicios después de crear uno nuevo
            } catch (error) {
              console.error('Failed to create exercise:', error);
            }
          },
          async fetchUsageData() {
            try {
              const response = await fetch('http://localhost:5008/Usage');
              if (!response.ok) {
                throw new Error('Failed to fetch usage data');
              }
              this.usageData = await response.json();
            } catch (error) {
              console.error('Failed to fetch usage data:', error);
            }
          }
      },
      getters: {
        filteredEjercicios(state): Exercise[] {
          return applyFilters(state.ejercicios, state.filters);
        },
      },
    });