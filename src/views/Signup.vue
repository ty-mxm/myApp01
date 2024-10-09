<template>
  <ion-page>
    <!-- En-tête de la page avec titre" -->
    <ion-header class="header">
      <ion-toolbar color="primary">
        <ion-title>S'inscrire</ion-title>
      </ion-toolbar>
    </ion-header>

    <!-- Contenu principal de la page d'inscription -->
    <ion-content class="signup-content">
      <div class="signup-container">
        <!-- Champ de saisie pour le prénom -->
        <ion-item>
          <ion-input v-model="firstName" placeholder="Prénom" required></ion-input>
        </ion-item>
        <!-- Champ de saisie pour le nom -->
        <ion-item>
          <ion-input v-model="lastName" placeholder="Nom" required></ion-input>
        </ion-item>
        <!-- Champ de saisie pour l'email -->
        <ion-item>
          <ion-input v-model="email" type="email" placeholder="email@domaine.com" required></ion-input>
        </ion-item>
        <!-- Champ de saisie pour le mot de passe -->
        <ion-item>
          <ion-input v-model="password" type="password" placeholder="Mot de passe" required></ion-input>
        </ion-item>
        <!-- Bouton pour valider l'inscription, déclenchant la méthode handleSignUp -->
        <ion-button expand="block" @click="handleSignUp">S'inscrire</ion-button>
        <!-- Lien vers la page de connexion -->
        <router-link to="/login">
          <ion-button expand="block">Retour</ion-button>
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
  // Importation des composants Ion et du contrôleur d'alertes
  import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFooter, IonButton, IonItem, IonInput } from '@ionic/vue';
  import { alertController } from '@ionic/vue';
  import { defineComponent } from 'vue';

  // Déclaration du type SignUpUser qui correspond aux données envoyées lors de l'inscription
  export interface SignUpUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }

  // Fonction générique pour envoyer des requêtes POST JSON
  export async function postJSON(url: string, data: any): Promise<any> {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // Conversion des données en JSON
    });

    // Si la requête échoue, une erreur est levée
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // Renvoie de la réponse sous forme de JSON
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
      IonInput,
    },
    data() {
      return {
        // Variables liées aux champs de saisie
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        url: 'https://server-1-t93s.onrender.com/api/tp/signup', // URL de l'API pour l'inscription
      };
    },
    methods: {
      // Méthode appelée lors du clic sur le bouton "S'inscrire"
      async handleSignUp() {
        const signUpData: SignUpUser = {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
        };

        try {
          // Envoi des données d'inscription à l'API
          await postJSON(this.url, signUpData);
          // Redirection vers la page de connexion après inscription réussie
          this.$router.push({ path: '/login' });
        } catch (error) {
          // En cas d'erreur, une alerte est affichée à l'utilisateur
          const alert = await alertController.create({
            header: 'Erreur',
            message: 'Erreur lors de l\'inscription. Veuillez réessayer.',
            buttons: ['OK'],
          });
          await alert.present();
        }
      },
    },
  });
</script>

<style scoped>
  /* Style centré pour le contenu de la page d'inscription */
  .signup-content {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  /* Conteneur stylé pour le formulaire d'inscription */
  .signup-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 400px; /* Limite la largeur à 400px */
    margin: 80px auto 0;
    padding: 20px;
    border: 2px solid #f48fb1; /* Bordure rose */
    border-radius: 10px; /* Bordure arrondie */
    background-color: rgba(206, 147, 216, 0.8); /* Arrière-plan violet lavande */
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); /* Ombre légère */
  }
</style>
