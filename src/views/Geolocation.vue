<template>
    <ion-page>
      <ion-header class="header">
        <ion-toolbar color="primary">
          <ion-title>Géolocalisation</ion-title>
        </ion-toolbar>
      </ion-header>
  
      <ion-content class="geolocation-content">
        <div class="location-container">
          <p>Latitude: {{ latitude }}</p>
          <p>Longitude: {{ longitude }}</p>
          <ion-button expand="block" @click="addLocation">AJOUTER EMPLACEMENT</ion-button>
          <ion-button expand="block" @click="logout">DÉCONNECTER</ion-button>
          <ion-button expand="block" @click="clearLocations">ÉFFACER TOUT</ion-button>
  
          <ion-list>
            <ion-item v-for="(location, index) in locations" :key="index">{{ location }}</ion-item>
          </ion-list>
        </div>
      </ion-content>
  
      <ion-footer class="footer">
        <ion-toolbar color="secondary">
          <ion-title>Ty Mammoliti et Sofia Krins 2024 ™</ion-title>
        </ion-toolbar>
      </ion-footer>
    </ion-page>
  </template>
  
  <script lang="ts">
  import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFooter, IonButton, IonItem, IonList } from '@ionic/vue';
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    components: {
      IonContent,
      IonHeader,
      IonPage,
      IonTitle,
      IonToolbar,
      IonFooter,
      IonButton,
      IonItem,
      IonList,
    },
    data() {
      return {
        latitude: null as number | null,
        longitude: null as number | null,
        locations: [] as string[],
      };
    },
    methods: {
      addLocation() {
        if (this.latitude !== null && this.longitude !== null) {
          const location = `Lat: ${this.latitude}, Lon: ${this.longitude}`;
          this.locations.push(location);
        } else {
          alert('Veuillez d\'abord obtenir la géolocalisation.');
        }
      },
      logout() {
        // Code pour gérer la déconnexion
        console.log('Déconnexion effectuée');
        // Redirection ou effacement de session
        this.$router.push({ path: '/login' });
      },
      clearLocations() {
        this.locations = [];
      },
      fetchGeolocation() {
        // Ici, vous pouvez intégrer le code pour récupérer la géolocalisation
        navigator.geolocation.getCurrentPosition((position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
        }, (error) => {
          console.error('Erreur de géolocalisation', error);
        });
      },
    },
    mounted() {
      this.fetchGeolocation();
    },
  });
  </script>
  
  <style scoped>
  .geolocation-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }
  
  .location-container {
    width: 100%;
    max-width: 400px;
  }
  </style>
  