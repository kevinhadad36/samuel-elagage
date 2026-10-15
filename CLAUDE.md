# Site Samuel Élagage Abattage
- Client : Samuel Seine, élagueur/abatteur, région d'Albi (Tarn). Zone : Tarn + Aveyron. Tél personnel : 06 74 66 52 41.
- Nom déclaré (SIRET) : Monsieur Samuel Seine, entrepreneur individuel. SIRET 511 072 753 00029 (societe.com, 2026-10-15).
- Adresse confirmée par Samuel (2026-10-15, à utiliser partout) : Place du Château, 81160 Saint-Juéry. Note : diffère de l'adresse enregistrée au SIRET (42 rue des Agriculteurs, Albi) — Samuel a donné celle-ci comme sa vraie adresse actuelle.
- Services : élagage, abattage, taille de haie, débroussaillage, étêtage, entretien espaces verts. Camion-nacelle. Devis + déplacement gratuits.
- Avis Google confirmés (2026-10-15) : 4,9/5, 14 avis sur la fiche principale — intégrés au site (badge + 2 citations).
- Style : Refero "Wise" (https://styles.refero.design/style/367c0c6e-73a7-441c-a8ff-91d139ac60dc) — Forest Ink #163300 / Lime #9fe870, display Archivo Black.
- Règles : aucun prix, avis, année d'expérience ou certification inventés. Photos réelles de Samuel (recadrées, plaques floutées, léger ajustement lumière uniquement).
- 17 ans d'expérience confirmés par Samuel (2026-10) — pas encore ajouté au site, à faire si souhaité.
- Mentions légales ajoutées (2026-10-15) : page /mentions-legales/ (éditeur, SIRET, hébergement, Umami sans cookie), liée dans tous les footers.
- À compléter : vrais tarifs (toujours non communiqués).

## Build
Ne pas éditer index.html ni elagage-*/ à la main : tout est généré.
- Source : `src/index.template.html`, `css/style.css`, `build.mjs` (villes), `extra.mjs` (FAQ + articles du blog « Conseils »), `communes.mjs` (10 pages communes, avec 2 photos réelles de Samuel par page, jamais la même deux fois sur une page). Pour ajouter un article : l’ajouter dans ARTICLES de extra.mjs, puis `node build.mjs`.
- Régénérer : `node build.mjs`
- Domaine acheté : samuelelagage.fr (GitHub Pages, fichier CNAME) — live, HTTPS actif.
- Numéro de suivi OVH actif depuis le 2026-10-15 : 05 31 51 11 96 (+33531511196), redirige vers le mobile de Samuel. Déjà utilisé dans le build (`PHONE=+33531511196`) — ne plus utiliser le numéro direct de Samuel sur le site.
- Build de référence utilisé : `BASE=https://samuelelagage.fr PHONE=+33531511196 UMAMI_ID=2dca9c6b-3124-4b42-8a64-4a566cfe36ff node build.mjs` puis commit + push. Umami actif depuis le 2026-10-15 (site "Samuel Élagage" sur cloud.umami.is).
- Suivi par canal : ajouter `?src=facebook`, `?src=gbp`, `?src=nextdoor`… aux liens vers le site ; l'événement `appel` d'Umami porte la source.

## Voix éditoriale
- Tout le site parle à la première personne du pluriel (« nous »), ton chaleureux. Le nom « Samuel Élagage Abattage » reste la marque.
- Photos : uniquement celles de Samuel (dossier img/), répétables d’une page à l’autre mais jamais deux fois sur la même page. Pas de photos libres.
