const express = require("express");
const cors = require("cors");
const formData = require("form-data");
const Mailgun = require("mailgun.js");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

/* MAILGUN CONFIGURATION */
const mailgun = new Mailgun(formData);
const client = mailgun.client({
  username: "Wesley Sid",
  key: process.env.MAILGUN_APIKEY /* VOTRE CLÉ API */,
});

app.get("/", (req, res) => {
  res.send("server is up");
});

app.post("/form", async (req, res) => {
  try {
    //   Le console.log de req.body nous affiche les données qui ont été rentrées dans les inputs (dans le formulaire frontend) :
    console.log(req.body);

    // On destructure req.body
    const { firstname, lastname, email, message } = req.body;

    //   On crée un objet messageData qui contient des informations concernant le mail (qui m'envoie le mail, adresse vers laquelle je veux envoyer le mail, titre et contenu du mail) :
    const messageData = {
      from: `${firstname} ${lastname} <${email}>`,
      to: "nono@lereacteur.io",
      subject: `Formulaire JS`,
      text: message,
    };

    // On envoie les infos à Mailgun pour créer le mail et l'envoyer
    const response = await client.messages.create(
      process.env.SANDBOX, // <==== ⚠️ le domain commence par "sandbox" et fini par ".mailgun.org"
      messageData
    );

    console.log(response);

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.all("*", (req, res) => {
  return res.status(404).json("Not found");
});

app.listen(process.env.PORT, () => {
  console.log("server is listening");
});
