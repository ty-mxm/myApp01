<template>
    <ion-page>
      <ion-header class="header">
        <ion-toolbar color="primary">
          <ion-title>S'inscrire</ion-title>
        </ion-toolbar>
      </ion-header>
  
      <ion-content class="signup-content">
        <div class="signup-container">
          <ion-item>
            <ion-input v-model="firstName" placeholder="Prénom" required></ion-input>
          </ion-item>
          <ion-item>
            <ion-input v-model="lastName" placeholder="Nom" required></ion-input>
          </ion-item>
          <ion-item>
            <ion-input v-model="email" type="email" placeholder="email@domaine.com" required></ion-input>
          </ion-item>
          <ion-item>
            <ion-input v-model="password" type="password" placeholder="Mot de passe" required></ion-input>
          </ion-item>
          <ion-button expand="block" @click="handleSignUp">S'inscrire</ion-button>
          <router-link to="/login">
            <ion-button expand="block">Retour</ion-button>
          </router-link>
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
  import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFooter, IonButton, IonItem, IonInput } from '@ionic/vue';
  import { alertController } from '@ionic/vue';
  import { defineComponent } from 'vue';
  
  // Déclaration des types pour les données d'inscription
  export interface SignUpUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }
  
  // Fonction pour envoyer une requête POST
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
      IonInput,
    },
    data() {
      return {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        url: 'https://server-1-t93s.onrender.com/api/tp/signup',
      };
    },
    methods: {
      async handleSignUp() {
        const signUpData: SignUpUser = { firstName: this.firstName, lastName: this.lastName, email: this.email, password: this.password };
  
        try {
          await postJSON(this.url, signUpData);
          this.$router.push({ path: '/login' });
        } catch (error) {
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
  .signup-content {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  .signup-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 400px;
    margin: 80px auto 0;
    padding: 20px;
    border: 2px solid #007bff;
    border-radius: 10px;
    background-color: rgba(135, 206, 250, 0.8);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }
  </style>
  