# Site Samuel Élagage Abattage
- Client : Samuel, élagueur/abatteur, région d'Albi. Zone : Tarn + Aveyron. Tél (tiré de sa propre annonce) : 06 74 66 52 41 — à faire valider.
- Services : élagage, abattage, taille de haie, débroussaillage, étêtage, entretien espaces verts. Camion-nacelle. Devis + déplacement gratuits.
- Style : Refero "Wise" (https://styles.refero.design/style/367c0c6e-73a7-441c-a8ff-91d139ac60dc) — Forest Ink #163300 / Lime #9fe870, display Archivo Black.
- Règles : aucun prix, avis, année d'expérience ou certification inventés. Photos réelles de Samuel (recadrées, plaques floutées, léger ajustement lumière uniquement).
- À compléter : adresse/SIRET/mentions légales, avis Google, vrais tarifs, nom de domaine.

## Build
Ne pas éditer index.html ni elagage-*/ à la main : tout est généré.
- Source : `src/index.template.html`, `css/style.css`, `build.mjs` (villes, textes des pages ville).
- Régénérer : `node build.mjs`
- Domaine acheté : samuelelagage.fr (GitHub Pages, fichier CNAME). Quand le numéro de suivi/Umami / le numéro de suivi / Umami sont prêts :
  `BASE=https://samuelelagage.fr PHONE=+33xxxxxxxxx UMAMI_ID=xxxx node build.mjs` puis commit + push.
- Suivi par canal : ajouter `?src=facebook`, `?src=gbp`, `?src=nextdoor`… aux liens vers le site ; l'événement `appel` d'Umami porte la source.
