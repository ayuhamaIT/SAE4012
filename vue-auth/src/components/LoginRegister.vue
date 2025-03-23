<template>
    <div class="form-container">
      <h2>{{ isLogin ? 'Connexion' : "Inscription" }}</h2>
      <form @submit.prevent="handleSubmit">
        <div class="mb-3">
          <label>Email</label>
          <input type="email" class="form-control" v-model="email" required>
        </div>
        <div class="mb-3">
          <label>Mot de passe</label>
          <input type="password" class="form-control" v-model="password" required>
        </div>
        <div v-if="!isLogin" class="mb-3">
          <label>Confirmer le mot de passe</label>
          <input type="password" class="form-control" v-model="confirmPassword" required>
        </div>
        <button type="submit" class="btn btn-success w-100">
          {{ isLogin ? "Se connecter" : "S'inscrire" }}
        </button>
      </form>
      <p class="mt-3">
        <a href="#" @click.prevent="isLogin = !isLogin">
          {{ isLogin ? "Pas encore de compte ? S'inscrire" : "Déjà un compte ? Se connecter" }}
        </a>
      </p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isLogin: true,
        email: '',
        password: '',
        confirmPassword: ''
      };
    },
    methods: {
      handleSubmit() {
        if (!this.isLogin && this.password !== this.confirmPassword) {
          alert("Les mots de passe ne correspondent pas !");
          return;
        }
        alert(this.isLogin ? "Connexion réussie !" : "Inscription réussie !");
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
    margin: auto;
    margin-top: 50px;
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
  