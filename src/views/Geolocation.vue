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
          <p><strong>Adresse: </strong>{{ address || 'Adresse non disponible' }}</p> <!-- Affiche l'adresse ici -->
          <ion-button expand="block" @click="addLocation">AJOUTER L'EMPLACEMENT</ion-button>
          <ion-button expand="block" @click="clearLocations">TOUT EFFACER</ion-button>
          <ion-button expand="block" @click="logout"> SE DÉCONNECTER</ion-button>
  
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
  import { Geolocation } from '@capacitor/geolocation';
  
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
        address: null as string | null, // Ajout de la propriété pour l'adresse
        locations: [] as string[],
      };
    },
    methods: {
      async addLocation() {
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
        // Renvoie l'utilisateur à la page login
        this.$router.push({ path: '/login' }); 
      },
      clearLocations() {
        this.locations = [];
      },
      async fetchGeolocation() {
        try {
        const position = await Geolocation.getCurrentPosition();
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;

        // Obtenez l'adresse avec les coordonnées
        this.address = await this.getAddressFromCoordinates(this.latitude, this.longitude);
      } catch (error) {
        console.error('Erreur de géolocalisation', error);
      }
    },
    async getAddressFromCoordinates(latitude: number, longitude: number) {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
        );
        const data = await response.json();
        return data.display_name;
      } catch (error) {
        console.error('Erreur lors de la récupération de l\'adresse :', error);
        return 'Adresse non disponible';
      }
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
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.location-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  margin: 80px auto 0;
  padding: 20px;
  border: 2px solid #f48fb1; /* Bordure rose */
  border-radius: 10px;
  background-color: rgba(206, 147, 216, 0.8); /* Arrière-plan violet lavande */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

p {
  margin: 10px 0;
  text-align: center;
}

ion-button {
  margin-top: 10px;
  width: 100%;
}

ion-list {
  margin-top: 10px;
  background-color: transparent; /* Rendre la liste transparente */
  border: none; /* Supprime les bordures */
}

ion-item {
  background-color: transparent; /* Rendre chaque élément transparent */
  border: none; /* Supprime les bordures */
  text-align: center; /* Centrer le texte */
  padding: 5px 0;
}
  </style>
  