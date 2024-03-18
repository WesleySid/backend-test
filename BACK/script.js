document.addEventListener("DOMContentLoaded", () => {
  console.log("Ca marche");
});

//AKI KEY
const formulaire = document.getElementById("contactForm");

formulaire.addEventListener("submit", async (event) => {
  // Empêcher le comportement par défaut du formulaire, qui est de recharger la page
  event.preventDefault();
  console.log("salut salut");
  // traitement du formulaire ici

  const firstname = document.querySelector("#prénom").value;
  const lastname = document.querySelector("#nom-de-famille").value;
  const email = document.querySelector("#email").value;
  const subject = document.querySelector("#sujet").value;
  const message = document.querySelector("#message").value;

  console.log(firstname, lastname, email, subject, message);
});
