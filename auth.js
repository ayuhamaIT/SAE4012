document.addEventListener("DOMContentLoaded", function () {
    const formTitle = document.getElementById("form-title");
    const emailGroup = document.getElementById("email-group");
    const toggleForm = document.getElementById("toggle-form");
    const submitBtn = document.getElementById("submit-btn");
    let isSignup = false;

    toggleForm.addEventListener("click", function (e) {
        e.preventDefault();
        isSignup = !isSignup;

        if (isSignup) {
            formTitle.textContent = "Créez un compte";
            emailGroup.style.display = "block";
            submitBtn.textContent = "S'inscrire";
            toggleForm.textContent = "J'ai déjà un compte";
        } else {
            formTitle.textContent = "Connectez-vous à votre profil";
            emailGroup.style.display = "none";
            submitBtn.textContent = "Valider";
            toggleForm.textContent = "Je n’ai pas encore de compte";
        }
    });

    document.getElementById("auth-form").addEventListener("submit", function (e) {
        e.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const email = document.getElementById("email").value;

        if (isSignup) {
            console.log("Inscription:", { username, email, password });
            alert("Inscription réussie !");
        } else {
            console.log("Connexion:", { username, password });
            alert("Connexion réussie !");
        }
    });
});
