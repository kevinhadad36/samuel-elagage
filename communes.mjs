// Pages communes (satellites des villes). Appelé par build.mjs.
import fs from 'node:fs';

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export const COMMUNES = [
  { slug: 'saint-juery',      name: 'Saint-Juéry',      parent: 'albi',    dep: 'Tarn (81)',    kind: 'res',   intro: 'commune voisine d’Albi, dans la vallée du Tarn' },
  { slug: 'le-sequestre',     name: 'Le Séquestre',     parent: 'albi',    dep: 'Tarn (81)',    kind: 'res',   intro: 'commune voisine d’Albi, au sud de la ville' },
  { slug: 'aussillon',        name: 'Aussillon',        parent: 'mazamet', dep: 'Tarn (81)',    kind: 'res',   intro: 'commune voisine de Mazamet' },
  { slug: 'labruguiere',      name: 'Labruguière',      parent: 'castres', dep: 'Tarn (81)',    kind: 'rural', intro: 'commune proche de Castres' },
  { slug: 'onet-le-chateau',  name: 'Onet-le-Château',  parent: 'rodez',   dep: 'Aveyron (12)', kind: 'res',   intro: 'commune voisine de Rodez' },
  { slug: 'luc-la-primaube',  name: 'Luc-la-Primaube',  parent: 'rodez',   dep: 'Aveyron (12)', kind: 'res',   intro: 'commune proche de Rodez' },
  { slug: 'rabastens',        name: 'Rabastens',        parent: 'gaillac', dep: 'Tarn (81)',    kind: 'rural', intro: 'commune du Tarn, au sud-ouest de Gaillac' },
  { slug: 'lisle-sur-tarn',   name: 'Lisle-sur-Tarn',   parent: 'gaillac', dep: 'Tarn (81)',    kind: 'rural', intro: 'commune proche de Gaillac, au bord du Tarn' },
  { slug: 'blaye-les-mines',  name: 'Blaye-les-Mines',  parent: 'carmaux', dep: 'Tarn (81)',    kind: 'res',   intro: 'commune voisine de Carmaux' },
  { slug: 'creissels',        name: 'Creissels',        parent: 'millau',  dep: 'Aveyron (12)', kind: 'rural', intro: 'commune voisine de Millau' },
];

// Photos de Samuel : on en prend deux différentes par page, en les faisant tourner d'une commune à l'autre.
const PHOTOS = [
  { f: 'haie.jpg',      alt: 'Taille d’une grande haie depuis la nacelle' },
  { f: 'tilleul.jpg',   alt: 'Élagage d’un grand arbre depuis la nacelle en centre-ville' },
  { f: 'abattage.jpg',  alt: 'Abattage d’un grand tronc près d’une maison' },
  { f: 'cedre.jpg',     alt: 'Élagage d’un grand arbre depuis la nacelle, dans un parc' },
  { f: 'branche.jpg',   alt: 'Grosse branche coupée qui tombe, nacelle en arrière-plan' },
  { f: 'nacelle1.jpg',  alt: 'Camion-nacelle en intervention entre deux grands arbres' },
  { f: 'nacelle2.jpg',  alt: 'Camion-nacelle en intervention sur un grand arbre' },
  { f: 'peupliers.jpg', alt: 'Arbres étêtés en bordure de parking' },
];

export function buildCommunes(ctx) {
  const { BASE, PHONE, analytics, NAV, fill, CITIES } = ctx;
  const root = '../';
  const out = [];
  COMMUNES.forEach((c, i) => {
    const parent = CITIES.find(x => x.slug === c.parent);
    const depName = c.dep.split(' ')[0];
    const url = `${BASE}/elagage-${c.slug}/`;
    const title = `Élagage et abattage à ${c.name} (${depName}) — Samuel Élagage Abattage`;
    const desc = `Élagueur à ${c.name}, ${c.intro} : élagage, abattage, taille de haie, débroussaillage avec camion-nacelle. Devis gratuit. Appelez-nous.`;
    const set = [PHOTOS[(2 * i) % PHOTOS.length], PHOTOS[(2 * i + 1) % PHOTOS.length]];
    const sameDep = COMMUNES.filter(x => x !== c && x.dep === c.dep);
    const needs = c.kind === 'res'
      ? 'Dans les quartiers résidentiels, les arbres et les haies poussent souvent près des maisons, des clôtures et des voisins. Nous travaillons depuis la nacelle pour intervenir en hauteur sans abîmer le jardin, et nous pouvons démonter un arbre morceau par morceau quand l’espace manque.'
      : 'Sur les terrains plus étendus, les besoins sont souvent des haies longues, des arbres à élaguer autour de la maison et des parcelles à débroussailler. La nacelle permet d’atteindre les hauteurs en sécurité, et le devis est gratuit.';
    const ld = { '@context': 'https://schema.org', '@type': 'LocalBusiness', name: 'Samuel Élagage Abattage', url, telephone: PHONE,
      description: `Élagage, abattage, taille de haie et débroussaillage à ${c.name} et alentours.`,
      areaServed: [{ '@type': 'City', name: c.name }, { '@type': 'City', name: parent.name }],
      address: { '@type': 'PostalAddress', addressRegion: 'Occitanie', addressCountry: 'FR' } };
    const html = `<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${url}">
<meta property="og:type" content="website"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(desc)}"><meta property="og:url" content="${url}"><meta property="og:image" content="${BASE}/img/haie.jpg">
<meta name="theme-color" content="#163300">
<link rel="icon" href="${root}favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${root}css/style.css">
<script type="application/ld+json">${JSON.stringify(ld)}</script>
${analytics}
</head><body>
${NAV(root)}
<main>
<div class="page-hero"><div class="wrap">
<p class="crumb"><a href="${root}">Accueil</a> › <a href="${root}elagage-${parent.slug}/">${parent.name}</a> › ${c.name}</p>
<span class="tag">${c.dep} · Devis gratuit</span>
<h1>Élagage et abattage à <em>${c.name}</em></h1>
<p class="lead">${c.name}, ${c.intro}  : nous intervenons chez vous pour l’élagage, l’abattage, la taille de haie et le débroussaillage, avec notre camion-nacelle.</p>
<div class="cta"><a class="btn btn-lime" href="tel:{{PHONE_TEL}}">Nous appeler · {{PHONE_DISPLAY}}</a><a class="link" href="sms:{{PHONE_TEL}}">Ou envoyer un SMS</a></div>
</div></div>
<div class="band"><div class="wrap"><ul><li>Devis gratuit</li><li>Déplacement gratuit</li><li>Camion-nacelle</li><li>${c.name} et alentours</li></ul></div></div>
<section><div class="wrap prose">
<h2>Ce que nous faisons à ${c.name}</h2>
<ul class="ticks"><li>Élagage et taille d’arbres, même hauts ou difficiles d’accès</li><li>Abattage, y compris démontage en hauteur</li><li>Taille de haie depuis la nacelle</li><li>Débroussaillage et entretien d’espaces verts</li></ul>
<h2>Selon votre terrain</h2>
<p>${needs}</p>
<h2>Une demande à ${c.name} ?</h2>
<p>Nous nous déplaçons dans tout le ${depName}. Pour ${c.name}, appelez-nous ou envoyez-nous un SMS avec une photo et votre adresse : nous vous répondons et nous vous proposons un devis gratuit. Vous êtes plutôt vers <a class="link" href="${root}elagage-${parent.slug}/">${parent.name}</a> ? Une page y est dédiée.</p>
<div class="photos2">${set.map(s => `<img src="${root}img/${s.f}" alt="${esc(s.alt)}" loading="lazy" width="800" height="600">`).join('')}</div>
<p class="note" style="color:var(--slate);margin-top:10px">Quelques-uns de nos chantiers.</p>
</div></section>
<section class="contact" id="contact"><div class="wrap"><div class="contact-box">
<div><h2>Un arbre à faire voir à ${c.name} ?</h2><p style="margin:16px 0 0">Appelez-nous ou envoyez-nous un SMS avec une photo : nous vous répondons et vous proposons un devis gratuit.</p></div>
<div><a class="big" href="tel:{{PHONE_TEL}}">{{PHONE_DISPLAY}}</a>
<div class="cta" style="margin-top:20px"><a class="btn btn-lime" href="tel:{{PHONE_TEL}}">Appeler</a><a class="btn btn-out" href="sms:{{PHONE_TEL}}">Envoyer un SMS</a></div>
<p class="note" style="margin-top:18px">Devis et déplacement gratuits.</p></div>
</div></div></section>
<section style="background:var(--fog);padding:48px 0"><div class="wrap"><h2 style="font-size:1.6rem;margin-bottom:16px">Autres communes</h2><div class="zone"><a class="tag" href="${root}elagage-${parent.slug}/">${parent.name}</a>${sameDep.map(x => `<a class="tag" href="${root}elagage-${x.slug}/">${x.name}</a>`).join('')}</div></div></section>
</main>
<footer><div class="wrap"><span>© 2026 Samuel Élagage Abattage</span><span>Tarn · Aveyron</span></div></footer>
<div class="callbar"><a class="btn btn-lime" href="tel:{{PHONE_TEL}}">Nous appeler · Devis gratuit</a></div>
<script src="${root}js/track.js" defer></script>
</body></html>`;
    fs.mkdirSync(`elagage-${c.slug}`, { recursive: true });
    fs.writeFileSync(`elagage-${c.slug}/index.html`, fill(html, root));
    out.push(`elagage-${c.slug}/`);
  });
  return out;
}
