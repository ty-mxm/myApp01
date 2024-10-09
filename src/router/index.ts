import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import Login from '../views/Login.vue'; // Importer le composant Login
import Signup from '@/views/Signup.vue';
import Geolocation from '../views/Geolocation.vue'; // Importer le composant Geolocation

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/login', // Chemin pour la page de connexion
    name: 'Login',
    component: Login
  },
  {
    path: '/signup', // Chemin pour la page d'inscription
    name: 'SignUp',
    component: Signup
  },
  {
    path: '/geolocations', // Chemin pour la page de géolocalisation
    name: 'Geolocation',
    component: Geolocation
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
