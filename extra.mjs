// FAQ + blog « Conseils ». Appelé par build.mjs.
import fs from 'node:fs';

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const FAQ = [
  ['Dans quelles zones intervenez-vous ?', 'Dans tout le Tarn et l’Aveyron. Nous sommes basés dans la région d’Albi et nous nous déplaçons dans les deux départements.'],
  ['Le devis est-il gratuit ?', 'Oui. Le devis et le déplacement sont gratuits.'],
  ['Comment obtenir un devis ?', 'Appelez-nous ou envoyez-nous un SMS avec une ou deux photos de l’arbre ou de la haie et votre commune. Nous vous recontactons pour fixer la suite.'],
  ['Pourquoi utiliser une nacelle ?', 'Le camion-nacelle permet de travailler en hauteur de façon stable, sur des arbres hauts ou de grandes haies, sans abîmer le jardin et sans grimper dans l’arbre pour chaque branche.'],
  ['Quels travaux réalisez-vous ?', 'Élagage, abattage, étêtage, taille de haie, débroussaillage et entretien d’espaces verts.'],
  ['Quand faut-il élaguer ?', 'Cela dépend de l’espèce et du but recherché. Nous détaillons les repères généraux dans notre article sur les bonnes périodes pour élaguer.', 'conseils/quand-elaguer-ses-arbres/'],
  ['Ai-je besoin d’une autorisation pour abattre un arbre ?', 'Pas toujours, mais certaines situations en demandent une. Voir notre article sur les autorisations d’abattage, et renseignez-vous en mairie avant de décider.', 'conseils/abattre-un-arbre-autorisation/'],
  ['Qu’en est-il des déchets verts et du reste du chantier ?', 'C’est un point que nous précisons avec vous au moment du devis, pour que tout soit clair avant le début des travaux.'],
];

const ARTICLES = [
  {
    slug: 'automne-hiver-entretien-arbres',
    title: 'Automne et hiver : préparer ses arbres et ses haies',
    desc: 'Que faire en automne et avant l’hiver : branches mortes, arbres fragilisés, dernière taille de haie et bonnes habitudes avant les coups de vent.',
    body: `
<p>La chute des feuilles ouvre la meilleure période de l’année pour s’occuper des arbres. Voici ce qu’il est utile de faire maintenant, et avant les coups de vent de l’hiver.</p>
<h2>Regarder ses arbres quand ils perdent leurs feuilles</h2>
<p>Sans feuillage, on voit mieux le bois mort, les branches qui se croisent et celles qui frottent contre le toit, un mur ou une ligne. C’est le bon moment pour repérer ce qui doit être retiré avant l’hiver.</p>
<h2>Les signes qui doivent alerter</h2>
<ul class="ticks"><li>Des branches mortes ou cassées encore accrochées dans l’arbre</li><li>Un arbre qui penche davantage qu’avant ou dont le sol se soulève à la base</li><li>Des champignons sur le tronc ou au pied, ou des fissures dans l’écorce</li><li>Des branches qui touchent un toit, une gouttière ou une ligne électrique</li></ul>
<p>Si l’un de ces signes est présent près d’une maison, d’une route ou d’un passage, mieux vaut faire vérifier l’arbre avant les tempêtes.</p>
<h2>Élaguer : la saison s’ouvre</h2>
<p>Pour beaucoup d’arbres feuillus, la période de repos de la végétation, de l’automne à la fin de l’hiver, est favorable à la taille. On évite en revanche de tailler par fort gel. Selon l’espèce, l’élagage peut aussi attendre la fin de l’hiver.</p>
<h2>Haies : une dernière taille avant l’hiver</h2>
<p>Une taille d’automne permet d’arriver à l’hiver avec une haie propre et dégagée. Évitez de tailler pendant les périodes de gel marqué.</p>
<h2>Débroussaillage et nettoyage</h2>
<p>L’automne est aussi le moment de dégager les talus, les abords de maison et les parcelles envahies avant que la végétation ne retombe sous le poids de l’humidité.</p>
<h2>Un doute sur un arbre ?</h2>
<p>Envoyez-nous une photo avec votre commune : nous vous disons ce que nous en pensons et nous vous proposons un devis gratuit.</p>`,
  },
  {
    slug: 'quand-elaguer-ses-arbres',
    title: 'Quand élaguer ses arbres ? Les bonnes périodes',
    desc: 'Repères généraux pour choisir la période d’élagage selon les arbres, et pourquoi éviter la période de nidification.',
    body: `
<p>Il n’existe pas une seule date valable pour tous les arbres. Voici des repères généraux, à adapter à l’espèce et à l’état de l’arbre.</p>
<h2>L’hiver, pour la plupart des arbres feuillus</h2>
<p>Quand l’arbre est en repos de végétation, en général de novembre à mars, la taille est souvent la mieux supportée. Sans feuilles, on voit aussi mieux la structure des branches, ce qui facilite le travail.</p>
<h2>Éviter la période de nidification</h2>
<p>Au printemps et au début de l’été, de nombreux oiseaux nichent dans les arbres et les haies. Il est conseillé d’éviter les interventions lourdes de mi-mars à fin juillet environ, sauf nécessité, par exemple un arbre dangereux.</p>
<h2>Les cas particuliers</h2>
<ul class="ticks"><li><b>Arbres fruitiers :</b> la période dépend de l’espèce, certains se taillent en fin d’hiver, d’autres après la récolte.</li><li><b>Conifères :</b> ils supportent généralement moins bien une taille sévère, mieux vaut un professionnel pour décider.</li><li><b>Branche dangereuse :</b> si une branche menace une maison, une route ou une ligne électrique, ne repoussez pas l’intervention.</li></ul>
<h2>Un conseil simple</h2>
<p>En cas de doute, envoyez-nous une photo : nous vous dirons ce que nous conseillons selon l’arbre et la saison.</p>`,
  },
  {
    slug: 'abattre-un-arbre-autorisation',
    title: 'Abattre un arbre : faut-il une autorisation ?',
    desc: 'Dans quels cas une autorisation peut être nécessaire avant d’abattre un arbre, et les vérifications à faire en mairie.',
    body: `
<p>Sur un terrain privé, abattre un arbre n’exige pas toujours une démarche. Mais plusieurs situations peuvent imposer une autorisation ou des règles particulières. Cet article donne des repères, il ne remplace pas l’avis de votre mairie.</p>
<h2>Ce qu’il faut vérifier avant d’abattre</h2>
<ul class="ticks"><li><b>Le document d’urbanisme local</b> (PLU) : certains arbres ou boisements y sont protégés.</li><li><b>Un espace boisé classé</b> : l’abattage y est encadré.</li><li><b>Les abords d’un monument historique ou un site protégé</b> : l’avis de l’architecte des Bâtiments de France peut être demandé.</li><li><b>Le règlement d’un lotissement ou d’une copropriété</b>, qui peut imposer ses propres règles.</li><li><b>Les lignes électriques ou autres réseaux</b> à proximité : des précautions et des déclarations spécifiques s’appliquent.</li></ul>
<h2>Le bon réflexe</h2>
<p>Appelez la mairie de votre commune avant de décider, en précisant l’adresse et la parcelle. Elle vous dira si une démarche est nécessaire.</p>
<h2>Et le chantier lui-même ?</h2>
<p>Quand l’abattage est possible, il peut se faire en démontant l’arbre morceau par morceau depuis la nacelle, utile près d’une maison ou d’un mur. Envoyez-nous une photo pour un devis gratuit.</p>`,
  },
  {
    slug: 'taille-de-haie-hauteur-distance',
    title: 'Taille de haie : hauteur, distance et période',
    desc: 'Les repères à connaître pour tailler une haie : distance à respecter avec le voisin, hauteur et bonne période.',
    body: `
<p>Une haie qui pousse sans contrôle finit par gêner le passage, la lumière ou le voisinage. Voici les points à connaître, sous réserve des usages et règles de votre commune.</p>
<h2>Les distances par rapport au voisin</h2>
<p>En règle générale, le Code civil prévoit que les plantations de plus de 2 mètres de haut se situent à au moins 2 mètres de la limite de propriété, et celles de 2 mètres ou moins à au moins 50 centimètres. Des usages locaux ou un règlement de lotissement peuvent changer cela : vérifiez auprès de votre mairie.</p>
<h2>La hauteur</h2>
<p>La hauteur d’une haie dépend de ces règles et de ce que vous voulez en faire : clôture, brise-vue ou simple décor. Au-delà de ce que l’on peut atteindre depuis le sol, la nacelle permet de tailler en sécurité.</p>
<h2>La bonne période</h2>
<p>Comme pour les arbres, il est conseillé d’éviter la taille de mi-mars à fin juillet environ, parce que des oiseaux y nichent. Une taille à l’automne ou en fin d’hiver convient à beaucoup de haies, selon l’espèce.</p>
<h2>Une grande haie ?</h2>
<p>Pour les haies hautes ou longues, nous les taillons depuis la nacelle. Envoyez-nous une photo pour un devis gratuit.</p>`,
  },
];

export function buildExtra(ctx) {
  const { BASE, PHONE, analytics, NAV, fill, TODAY } = ctx;
  const root = '../';
  const head = (title, desc, path, ld) => `<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${BASE}/${path}">
<meta property="og:type" content="website"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(desc)}"><meta property="og:url" content="${BASE}/${path}"><meta property="og:image" content="${BASE}/img/haie.jpg">
<meta name="theme-color" content="#163300">
<link rel="icon" href="__ROOT__favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="__ROOT__css/style.css">
${ld ? `<script type="application/ld+json">${JSON.stringify(ld)}</script>` : ''}
${analytics}
</head><body>`;
  const cta = `<section class="contact" id="contact"><div class="wrap"><div class="contact-box">
<div><h2>Un arbre ou une haie à faire voir ?</h2><p style="margin:16px 0 0">Appelez-nous ou envoyez-nous un SMS avec une photo : nous vous répondons et vous proposons un devis gratuit.</p></div>
<div><a class="big" href="tel:{{PHONE_TEL}}">{{PHONE_DISPLAY}}</a>
<div class="cta" style="margin-top:20px"><a class="btn btn-lime" href="tel:{{PHONE_TEL}}">Appeler</a><a class="btn btn-out" href="sms:{{PHONE_TEL}}">Envoyer un SMS</a></div>
<p class="note" style="margin-top:18px">Devis et déplacement gratuits.</p></div></div></div></section>`;
  const foot = (r) => `<footer><div class="wrap"><span>© 2026 Samuel Élagage Abattage</span><span>Tarn · Aveyron</span></div></footer>
<div class="callbar"><a class="btn btn-lime" href="tel:{{PHONE_TEL}}">Nous appeler · Devis gratuit</a></div>
<script src="${r}js/track.js" defer></script></body></html>`;
  const write = (dir, html, r) => {
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(`${dir}/index.html`, fill(html.replaceAll('__ROOT__', r), r));
  };

  // ---- FAQ (racine +1 niveau) ----
  const faqLd = { '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: FAQ.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
  write('faq', `${head('Questions fréquentes — Samuel Élagage Abattage', 'Zone d’intervention, devis gratuit, nacelle, périodes d’élagage : nos réponses aux questions fréquentes.', 'faq/', faqLd)}
${NAV(root)}<main>
<div class="page-hero"><div class="wrap"><p class="crumb"><a href="${root}">Accueil</a> › Questions fréquentes</p>
<h1>Vos <em>questions</em></h1><p class="lead">Les réponses aux questions qu’on pose le plus souvent avant de demander un devis.</p></div></div>
<section style="padding-top:0"><div class="wrap prose">${FAQ.map(([q, a, link]) => `<h2>${esc(q)}</h2><p>${esc(a)}${link ? ` <a class="link" href="${root}${link}">Lire l’article</a>` : ''}</p>`).join('')}</div></section>
${cta}</main>${foot(root)}`, root);

  // ---- Blog ----
  const idxCards = ARTICLES.map(a => `<a class="card" href="${a.slug}/" style="text-decoration:none"><h3>${esc(a.title)}</h3><p>${esc(a.desc)}</p><span class="link">Lire l’article</span></a>`).join('');
  write('conseils', `${head('Conseils élagage, abattage et haies — Samuel Élagage Abattage', 'Nos conseils pratiques : quand élaguer, autorisation d’abattage, taille de haie.', 'conseils/')}
${NAV(root)}<main>
<div class="page-hero"><div class="wrap"><p class="crumb"><a href="${root}">Accueil</a> › Conseils</p>
<h1>Nos <em>conseils</em></h1><p class="lead">Des repères simples pour entretenir vos arbres et vos haies. Chaque cas est différent : pour le vôtre, demandez un devis gratuit.</p></div></div>
<section style="padding-top:0"><div class="wrap"><div class="cards">${idxCards}</div></div></section>
${cta}</main>${foot(root)}`, root);

  const root2 = '../../';
  ARTICLES.forEach(a => {
    const ld = { '@context': 'https://schema.org', '@type': 'Article', headline: a.title, description: a.desc,
      datePublished: TODAY, dateModified: TODAY, mainEntityOfPage: `${BASE}/conseils/${a.slug}/`,
      author: { '@type': 'Organization', name: 'Samuel Élagage Abattage' }, publisher: { '@type': 'Organization', name: 'Samuel Élagage Abattage' } };
    write(`conseils/${a.slug}`, `${head(`${a.title} — Samuel Élagage Abattage`, a.desc, `conseils/${a.slug}/`, ld)}
${NAV(root2)}<main>
<div class="page-hero"><div class="wrap"><p class="crumb"><a href="${root2}">Accueil</a> › <a href="${root2}conseils/">Conseils</a> › ${esc(a.title)}</p>
<h1 style="font-size:clamp(1.9rem,7vw,3.4rem)">${esc(a.title)}</h1></div></div>
<section style="padding-top:0"><div class="wrap prose">${a.body}</div></section>
${cta}</main>${foot(root2)}`, root2);
  });

  return ['faq/', 'conseils/', ...ARTICLES.map(a => `conseils/${a.slug}/`)];
}
