<template>
  <ion-page>
    <ion-header class="header">
      <!-- Barre d'en-tête avec titre -->
      <ion-toolbar color="primary">
        <ion-title>Géolocalisation</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="geolocation-content">
      <!-- Conteneur principal pour les informations de géolocalisation -->
      <div class="location-container">
        <!-- Affichage de la latitude, de la longitude et de l'adresse -->
        <p>Latitude: {{ latitude }}</p>
        <p>Longitude: {{ longitude }}</p>
        <p><strong>Adresse: </strong>{{ address || 'Adresse non disponible' }}</p> <!-- Affiche l'adresse -->
        
        <!-- Boutons pour ajouter l'emplacement, effacer la liste et se déconnecter -->
        <ion-button expand="block" @click="fetchGeolocation">Recharger la position</ion-button>
        <ion-button expand="block" @click="addLocation">AJOUTER L'EMPLACEMENT</ion-button>
        <ion-button expand="block" @click="clearLocations">TOUT EFFACER</ion-button>
        <ion-button expand="block" @click="logout"> SE DÉCONNECTER</ion-button>

        <!-- Liste des emplacements enregistrés avec la latitude, la longitude et l'adresse -->
        <ion-list>
          <ion-item v-for="(location, index) in locations" :key="index" class="styled-item">
            <div class="location-info"> 
              <!-- Latitude et longitude sur une seule ligne -->
              <div class="lat-lon"> 
                <p>Lat: {{ location.latitude }}</p>
                <p>Lon: {{ location.longitude }}</p>
              </div>
              <!-- Affichage de l'adresse sauvegardée -->
              <p><strong>Adresse: </strong>{{ location.address || 'Adresse non disponible' }}</p>
            </div>
          </ion-item>
        </ion-list>
      </div>
    </ion-content>

    <ion-footer class="footer">
      <!-- Barre de pied de page avec les crédits -->
      <ion-toolbar color="secondary">
        <ion-title>Ty Mammoliti et Sofia Krins 2024 ™</ion-title>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

<script lang="ts">
  import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFooter, IonButton, IonItem, IonList } from '@ionic/vue';
  import { defineComponent } from 'vue';
  import { Geolocation } from '@capacitor/geolocation';  // Importation de la géolocalisation

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
        // Variables pour stocker la latitude, la longitude et l'adresse
        latitude: null as number | null,
        longitude: null as number | null,
        address: null as string | null, // Ajout de la propriété pour l'adresse
        locations: [] as Array<{ latitude: number, longitude: number, address: string | null }>, // Stocke les emplacements avec l'adresse
      };
    },
    methods: {
      // Ajoute l'emplacement actuel à la liste des emplacements sauvegardés
      async addLocation() {
        if (this.latitude !== null && this.longitude !== null) {
        const location = {
          latitude: this.latitude,
          longitude: this.longitude,
          address: this.address || 'Adresse non disponible',
        };
        this.locations.push(location);  // Ajoute les coordonnées et l'adresse à la liste
      } else {
        alert('Veuillez d\'abord obtenir la géolocalisation.');  // Message si la géolocalisation n'a pas encore été obtenue
      }
    },  
      // Méthode pour déconnecter l'utilisateur et le renvoyer à la page de connexion
      logout() {
        console.log('Déconnexion effectuée');
        this.$router.push({ path: '/login' });  // Redirection vers la page de login
      },
      // Efface la liste des emplacements sauvegardés
      clearLocations() {
        this.locations = [];
      },
      // Obtient la géolocalisation actuelle de l'utilisateur
      async fetchGeolocation() {
        try {
          const position = await Geolocation.getCurrentPosition();  // Obtient les coordonnées actuelles
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;

          // Obtenir l'adresse avec les coordonnées
          this.address = await this.getAddressFromCoordinates(this.latitude, this.longitude);  // Utilise les coordonnées pour obtenir l'adresse
        } catch (error) {
          console.error('Erreur de géolocalisation', error);
        }
      },
      // Récupère l'adresse en fonction de la latitude et de la longitude via l'API
      async getAddressFromCoordinates(latitude: number, longitude: number) {
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          return data.display_name;  // Retourne l'adresse obtenue
        } catch (error) {
          console.error('Erreur lors de la récupération de l\'adresse :', error);
          return 'Adresse non disponible';  // Si une erreur se produit, retourne un message par défaut
        }
      },
    },
    // Quand la page est chargée, la géolocalisation est automatiquement récupérée
    mounted() {
      this.fetchGeolocation();
    },
  });
</script>

<style scoped>
/* Styles pour centrer le contenu et améliorer l'esthétique de l'interface */
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

ion-item.styled-item {
  background-color: rgba(206, 147, 216, 0.8); /* Arrière-plan violet lavande */
  color: white; /* Texte en blanc */
  border: none; /* Supprime les bordures */
  border-radius: 10px; /* Bordure arrondie */
  padding: 10px;
  margin-bottom: 10px; /* Ajout d'un espace entre les éléments */
}

/* Supprime le fond par défaut de ion-item */
ion-item.styled-item::part(native) {
  background: none;
}

/* Style pour afficher latitude et longitude sur une seule ligne */
.lat-lon {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.location-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white; /* Texte en blanc */
}
</style>
