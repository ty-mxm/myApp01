<template>
  <ion-page>
    <!-- En-tête de la page avec titre -->
    <ion-header class="header">
      <ion-toolbar color="primary">
        <ion-title>Connexion</ion-title>
      </ion-toolbar>
    </ion-header>

    <!-- Contenu principal de la page avec formulaire de connexion -->
    <ion-content class="login-content">
      <div class="login-container">

        <!-- Champ de saisie pour l'email -->
        <ion-item>
          <ion-input v-model="email" placeholder="email@domaine.com" required></ion-input>
        </ion-item>

        <!-- Champ de saisie pour le mot de passe -->
        <ion-item>
          <ion-input v-model="password" placeholder="Mot de passe" required></ion-input>
        </ion-item>

        <!-- Bouton pour soumettre le formulaire de connexion -->
        <ion-button expand="block" @click="handleLogin">Se connecter</ion-button>

        <!-- Lien vers la page d'inscription si l'utilisateur n'a pas encore de compte -->
        <router-link to="/signup">
          <ion-button expand="block">S'inscrire</ion-button>
        </router-link>
      </div>
    </ion-content>

    <!-- Barre de pied de page avec les crédits -->
    <ion-footer class="footer">
      <ion-toolbar color="secondary">
        <ion-title>Ty Mammoliti et Sofia Krins 2024 ™</ion-title>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

<script lang="ts">
  // Importation des composants Ion nécessaires et des fonctions utilitaires
  import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFooter, IonButton, IonItem, IonInput, IonIcon } from '@ionic/vue';
  import { alertController } from '@ionic/vue';
  import { defineComponent } from 'vue';

  // Déclaration des types pour les données d'utilisateur (LoginUser et LoginResponse)
  export interface LoginUser {
    email: string;
    password: string;
  }

  export interface LoginResponse {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
  }

  // Fonction pour envoyer les requêtes POST (pour l'authentification)
  export async function postJSON(url: string, data: any): Promise<any> {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response.json();
  }

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
      IonInput
    },
    data() {
      return {
        email: '', // Stocke l'email de l'utilisateur
        password: '', // Stocke le mot de passe de l'utilisateur
        errorMessage: '', // Message d'erreur à afficher en cas d'échec de connexion
        url: 'https://server-1-t93s.onrender.com/api/tp/login', // URL de l'API de connexion
      };
    },
    methods: {
      // Fonction pour gérer la soumission du formulaire de connexion
      async handleLogin() {
        const loginData: LoginUser = { email: this.email, password: this.password };

        // Vérifie si l'email et le mot de passe sont bien fournis
        if (!this.email || !this.password) {
          const alert = await alertController.create({
            header: 'Erreur d\'entrée',
            message: 'Veuillez entrer votre email et mot de passe.',
            buttons: ['OK'],
          });
          await alert.present();
          return;
        }

        try {
          // Envoi des données de connexion à l'API et traitement de la réponse
          const response: LoginResponse = await postJSON(this.url, loginData);
          const userData = { id: response.userId, firstName: response.firstName, lastName: response.lastName, email: response.email };

          // Stockage des données utilisateur dans le localStorage pour une utilisation future
          localStorage.setItem('user', JSON.stringify(userData));

          // Redirection vers la page de géolocalisation après une connexion réussie
          this.$router.push({ path: '/geolocations' });
        } catch (error) {
          // Gère l'erreur de connexion en affichant un message d'erreur
          this.errorMessage = 'Email ou mot de passe invalide.';
          const alert = await alertController.create({
            header: 'Échec de la connexion',
            message: this.errorMessage,
            buttons: ['OK'],
          });
          await alert.present();
        }
      },
    },
  });
</script>

<style scoped>
/* Style pour centrer le contenu de la page de connexion */
.login-content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

/* Conteneur pour les éléments du formulaire de connexion */
.login-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  margin: 80px auto 0;
  padding: 20px;
  border: 2px solid #f48fb1; /* Bordure rose */
  border-radius: 10px;
  background-color: rgba(206, 147, 216, 0.8); /* Arrière-plan violet lavande */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); /* Ombre pour un effet de profondeur */
}
</style>
