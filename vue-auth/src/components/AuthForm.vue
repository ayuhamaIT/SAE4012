<template>
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-white py-3">
        <div class="container">
          <a class="navbar-brand" href="index.html">
            <img src="../../../images/LOGO avec texte.png" alt="LenscreenLogo" />
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarContent">
            <ul class="navbar-nav ms-auto">
              <li class="nav-item"><a class="nav-link" href="boutique.html">Boutique</a></li>
              <li class="nav-item"><a class="nav-link" href="panier.html">Panier</a></li>
              <li class="nav-item"><a class="nav-link active" href="connexion.html">Compte</a></li>
            </ul>
          </div>
        </div>
      </nav>
  
      <main class="d-flex justify-content-center align-items-center min-vh-80">
        <div class="form-container">
          <h2>{{ formTitle }}</h2>
          <form @submit.prevent="handleSubmit">
            <div class="mb-3">
              <label for="username" class="form-label">Pseudo</label>
              <input type="text" class="form-control" v-model="username" required />
            </div>
            <div class="mb-3" v-if="isSignup">
              <label for="email" class="form-label">Adresse mail</label>
              <input type="email" class="form-control" v-model="email" />
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Mot de passe</label>
              <input type="password" class="form-control" v-model="password" required />
            </div>
            <button type="submit" class="btn btn-success w-100">Valider</button>
          </form>
          <p class="mt-3">
            <a href="#" @click.prevent="toggleForm">{{ toggleText }}</a>
          </p>
        </div>
      </main>
  
      <footer class="bg-dark text-white py-3 text-center">
        <div class="container">
          <p>@Lenscreen. Tous droits réservés</p>
          <small>Produits | FAQ | Qu'est-ce que Lenscreen?</small>
        </div>
      </footer>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: "",
        email: "",
        password: "",
        isSignup: false
      };
    },
    computed: {
      formTitle() {
        return this.isSignup ? "Créer un compte" : "Connectez-vous à votre profil";
      },
      toggleText() {
        return this.isSignup ? "J’ai déjà un compte" : "Je n’ai pas encore de compte";
      }
    },
    methods: {
      toggleForm() {
        this.isSignup = !this.isSignup;
      },
      handleSubmit() {
        console.log("Form submitted", this.username, this.email, this.password);
      }
    }
  };
  </script>
  
  <style scoped>
  .form-container {
    background: white;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 500px;
    text-align: center;
  }
  h2 {
    color: #2c56a8;
    font-weight: bold;
    margin-bottom: 20px;
  }
  label {
    font-weight: bold;
    color: #333;
  }
  .form-control {
    border: 2px solid #6a0dad;
    border-radius: 5px;
  }
  .btn-success {
    background-color: #28a745;
    border: none;
    padding: 10px;
    font-size: 18px;
    border-radius: 5px;
  }
  .btn-success:hover {
    background-color: #218838;
  }
  a {
    color: #6a0dad;
    text-decoration: none;
    font-weight: bold;
  }
  a:hover {
    text-decoration: underline;
  }
  </style>
  