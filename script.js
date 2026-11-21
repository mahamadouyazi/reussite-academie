// FORMULAIRE D'INSCRIPTION
const formulaire = document.getElementById("form-inscription");

// COMPTEUR DES INSCRIPTIONS
const compteurInscriptions = document.getElementById("compteur-inscriptions");

let nombreInscriptions = Number(localStorage.getItem("nombreInscriptions")) || 0;

// Afficher le nombre enregistré
if (compteurInscriptions) {
    compteurInscriptions.textContent = nombreInscriptions;
}

// GESTION DU FORMULAIRE
if (formulaire) {

    formulaire.addEventListener("submit", function(event) {

        event.preventDefault();

        // Récupérer les informations
        const nom = document.getElementById("nom").value.trim();
        const telephone = document.getElementById("telephone").value.trim();
        const niveau = document.getElementById("niveau").value;
        const matiere = document.getElementById("matiere").value;

        // Vérifier le nom
        if (nom.length < 3 || !/^[A-Za-zÀ-ÿ' -]+$/.test(nom)) {
            alert("Veuillez entrer un nom valide, sans chiffres.");
            return;
        }

        // Vérifier le téléphone
        const chiffres = telephone.replace(/\D/g, "");

        if (chiffres.length < 8 || chiffres.length > 15) {
            alert("Veuillez entrer un numéro de téléphone valide.");
            return;
        }

        // Vérifier les choix
        if (niveau === "" || matiere === "") {
            alert("Veuillez choisir un niveau et une matière.");
            return;
        }

        // Créer le message WhatsApp
        const message =
            "Bonjour Réussite Académie !" +
            "\nNouvelle demande d'inscription." +
            "\nNom : " + nom +
            "\nTéléphone : " + telephone +
            "\nNiveau : " + niveau +
            "\nMatière : " + matiere;

        // Confirmation
        if (!confirm("Vos informations sont-elles correctes ?")) {
            return;
        }

        // Mettre à jour le compteur
        nombreInscriptions++;

        localStorage.setItem("nombreInscriptions", nombreInscriptions);

        if (compteurInscriptions) {
            compteurInscriptions.textContent = nombreInscriptions;
        }

        // Ouvrir WhatsApp
        const numero = "22798909419";

        const lien = "https://wa.me/" + numero +
            "?text=" + encodeURIComponent(message);

        window.open(lien, "_blank");

    });

}

// BOUTON RETOUR EN HAUT
const boutonRetour = document.getElementById("retour-haut");

if (boutonRetour) {

    window.addEventListener("scroll", function() {

        if (window.scrollY > 300) {
            boutonRetour.style.display = "block";
        } else {
            boutonRetour.style.display = "none";
        }

    });

    boutonRetour.addEventListener("click", function() {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}

// ANIMATION DES SECTIONS AU DÉFILEMENT
const sections = document.querySelectorAll("section");

sections.forEach((section) => {
    section.classList.add("section-animation");
});

// OBSERVER LE DÉFILEMENT
const observateur = new IntersectionObserver((entrees) => {

    entrees.forEach((entree) => {

        if (entree.isIntersecting) {

            entree.target.classList.add("visible");

            observateur.unobserve(entree.target);
        }

    });

}, {
    threshold: 0.15
});

// ACTIVER L'OBSERVATION
sections.forEach((section) => {
    observateur.observe(section);
});
// ANIMATION DES STATISTIQUES

const statistiques = document.querySelectorAll(".statistique h3");

const observateurStatistiques = new IntersectionObserver((entrees) => {

    entrees.forEach((entree) => {

        if (entree.isIntersecting) {

            const element = entree.target;

            // Récupérer le nombre final
            const valeurFinale = parseInt(element.textContent);

            // Commencer à zéro
            let compteur = 0;

            const duree = 2000;
            const increment = valeurFinale / 50;

            const animation = setInterval(() => {

                compteur += increment;

                if (compteur >= valeurFinale) {

                    element.textContent = valeurFinale;

                    clearInterval(animation);

                } else {

                    element.textContent = Math.floor(compteur);

                }

            }, duree / 50);

            observateurStatistiques.unobserve(element);

        }

    });

}, {
    threshold: 0.5
});

// Lancer l'animation
statistiques.forEach((statistique) => {
    observateurStatistiques.observe(statistique);
});
// IMPRESSION DES INFORMATIONS D'INSCRIPTION

const boutonImprimer = document.getElementById("imprimer-inscription");

if (boutonImprimer) {

    boutonImprimer.addEventListener("click", function() {

        const nom = document.getElementById("nom").value;
        const telephone = document.getElementById("telephone").value;
        const niveau = document.getElementById("niveau").value;
        const matiere = document.getElementById("matiere").value;

        if (!nom || !telephone || !niveau || !matiere) {
            alert("Veuillez remplir tous les champs avant l'impression.");
            return;
        }

        const fenetre = window.open("", "_blank");

        fenetre.document.write(`
            <h1>RÉUSSITE ACADÉMIE</h1>
            <h2>Informations d'inscription</h2>
            <p><strong>Nom :</strong> ${nom}</p>
            <p><strong>Téléphone :</strong> ${telephone}</p>
            <p><strong>Niveau :</strong> ${niveau}</p>
            <p><strong>Matière :</strong> ${matiere}</p>
        `);

        fenetre.document.close();
        fenetre.print();

    });

}
// AFFICHER LA DATE ET L'HEURE

function afficherDateHeure() {

    const zoneDate = document.getElementById("date-heure");

    if (zoneDate) {

        const maintenant = new Date();

        const date = maintenant.toLocaleDateString("fr-FR");

        const heure = maintenant.toLocaleTimeString("fr-FR");

        zoneDate.textContent = "📅 " + date + " | 🕒 " + heure;

    }

}

afficherDateHeure();

setInterval(afficherDateHeure, 1000);
const boutonTheme = document.getElementById("bouton-theme");

if (boutonTheme) {
    boutonTheme.addEventListener("click", function() {
        document.body.classList.toggle("mode-sombre");

        if (document.body.classList.contains("mode-sombre")) {
            boutonTheme.textContent = "☀️ Mode clair";
        } else {
            boutonTheme.textContent = "🌙 Mode sombre";
        }
    });
}