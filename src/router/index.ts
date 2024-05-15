import { createRouter, createWebHistory } from "vue-router"
//import CarteleraView from "../views/CarteleraView.vue"
import CreateExerciseView from "../views/CreateExerciseView.vue"
import ExercisesView from "../views/ExercisesView.vue"
import FilterView from "../views/FilterView.vue"
import InfoView from "../views/InfoView.vue"
import LoginView from "../views/LoginView.vue"
import PlanView from "../views/PlanView.vue"
import HomeView from "../views/HomeView.vue"
import ProfileView from "../views/ProfileView.vue"
import RegisterView from "../views/RegisterView.vue"
import UsersView from "../views/UsersView.vue"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'login',
            component: LoginView
         },
         {
             path: '/home',
             name: 'home',
             component: HomeView
        },
        {
            path: '/register',
            name: 'register',
            component: RegisterView
          },
          {
              path: '/create',
              name: 'create',
              component: CreateExerciseView
            },
            {
                path: '/exercises',
                name: 'exercises',
                component: ExercisesView
                
              },
              {
                  path: '/filter',
                  name: 'filter',
                  component: FilterView
                },
                {
                    path: '/info:exerciseId',
                    name: 'info',
                    component: InfoView
                  },
                  {
                      path: '/plan',
                      name: 'plan',
                      component: PlanView
                    },
                    {
                        path: '/profile',
                        name: 'profile',
                        component: ProfileView
                      },
                      {
                          path: '/users',
                          name: 'users',
                          component: UsersView
                        }
       
    ]
})

export default router