// Génère index.html, les pages ville, sitemap.xml, robots.txt et 404.html.
// Usage : node build.mjs            (utilise la config ci-dessous)
//         BASE=https://elagage-albi.fr PHONE=+33512345678 UMAMI_ID=xxxx node build.mjs
import fs from 'node:fs';
import { buildExtra } from './extra.mjs';
import { buildCommunes, COMMUNES } from './communes.mjs';

const BASE   = (process.env.BASE  || 'https://kevinhadad36.github.io/samuel-elagage').replace(/\/$/,'');
const PHONE  = process.env.PHONE  || '+33674665241';           // format international, pour tel:
const PHONE_DISPLAY = process.env.PHONE_DISPLAY || PHONE.replace(/^\+33(\d)(\d\d)(\d\d)(\d\d)(\d\d)$/, '0$1 $2 $3 $4 $5');
const UMAMI_ID = process.env.UMAMI_ID || '';                   // ID du site Umami (vide = pas d'analytics)
const TODAY = new Date().toISOString().slice(0,10);

const CITIES = [
  {slug:'albi',    name:'Albi',    dep:'Tarn (81)',    urban:true,  near:['Saint-Juéry','Lescure-d’Albigeois','Le Séquestre','Arthès','Cunac','Fréjairolles']},
  {slug:'castres', name:'Castres', dep:'Tarn (81)',    urban:true,  near:['Labruguière','Aussillon','Roquecourbe','Lagarrigue','Valdurenque']},
  {slug:'gaillac', name:'Gaillac', dep:'Tarn (81)',    urban:false, near:['Rabastens','Lisle-sur-Tarn','Cahuzac-sur-Vère','Brens','Técou']},
  {slug:'carmaux', name:'Carmaux', dep:'Tarn (81)',    urban:false, near:['Blaye-les-Mines','Cagnac-les-Mines','Saint-Benoît-de-Carmaux','Monestiés']},
  {slug:'mazamet', name:'Mazamet', dep:'Tarn (81)',    urban:false, near:['Aussillon','Pont-de-Larn','Saint-Amans-Soult','Hautpoul']},
  {slug:'rodez',   name:'Rodez',   dep:'Aveyron (12)', urban:true,  near:['Onet-le-Château','Olemps','Luc-la-Primaube','Sainte-Radegonde','Druelle']},
  {slug:'millau',  name:'Millau',  dep:'Aveyron (12)', urban:false, near:['Creissels','Saint-Georges-de-Luzençon','Aguessac','Nant']},
];
const PHOTOS = [
  ['haie.jpg','Samuel en nacelle pendant la taille d’une grande haie'],
  ['tilleul.jpg','Élagage d’un grand arbre depuis la nacelle'],
  ['abattage.jpg','Abattage d’un grand tronc près d’une maison'],
  ['cedre.jpg','Samuel en nacelle dans un grand arbre'],
  ['nacelle2.jpg','Camion-nacelle en intervention sur un arbre'],
  ['peupliers.jpg','Arbres étêtés en bordure de parking'],
];

const fill = (s, root) => s
  .replaceAll('{{ROOT}}', root).replaceAll('{{BASE}}', BASE)
  .replaceAll('{{PHONE_TEL}}', PHONE).replaceAll('{{PHONE_DISPLAY}}', PHONE_DISPLAY);
const analytics = UMAMI_ID ? `<script defer src="https://cloud.umami.is/script.js" data-website-id="${UMAMI_ID}"></script>` : '';
const cityLinks = (root) => CITIES.map(c=>`<a class="tag" href="${root}elagage-${c.slug}/">${c.name}</a>`).join('');

// ---------- index ----------
let idx = fs.readFileSync('src/index.template.html','utf8');
idx = idx.replace('{{CITY_LINKS}}', cityLinks(''));
idx = idx.replace('</head>', `${analytics}\n</head>`);
fs.writeFileSync('index.html', fill(idx,''));

// ---------- pages ville ----------
const NAV = (root) => `<header><div class="wrap nav">
<a class="logo" href="${root}">Samuel<span>ÉLAGAGE · ABATTAGE</span></a>
<ul><li><a href="${root}#services">Services</a></li><li><a href="${root}#realisations">Réalisations</a></li><li><a href="${root}#zone">Zone</a></li><li><a href="${root}conseils/">Conseils</a></li><li><a href="#contact">Contact</a></li></ul>
<a class="btn btn-lime" href="tel:{{PHONE_TEL}}">Appeler</a></div></header>`;

CITIES.forEach((c,i)=>{
  const root='../', url=`${BASE}/elagage-${c.slug}/`;
  const title=`Élagage et abattage à ${c.name} — Samuel Élagage Abattage`;
  const desc=`Élagueur à ${c.name} et alentours : élagage, abattage, taille de haie, débroussaillage avec camion-nacelle. Devis gratuit, déplacement gratuit. Appelez Samuel.`;
  const ph=[PHOTOS[i%PHOTOS.length],PHOTOS[(i+2)%PHOTOS.length]];
  const needs = c.urban
    ? `En ville, les arbres poussent souvent près des maisons, des murs et des parkings, et l’accès n’est pas toujours simple. Le camion-nacelle permet de travailler en hauteur sans abîmer le jardin, et de démonter un arbre morceau par morceau quand il n’y a pas la place de l’abattre d’un coup.`
    : `Sur les terrains plus grands, les besoins sont souvent les haies longues, les arbres à élaguer autour de la maison et les parcelles à débroussailler. La nacelle permet d’atteindre les hauteurs en sécurité, et Samuel se déplace gratuitement pour établir le devis.`;
  const html = `<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${desc}">
<link rel="canonical" href="${url}">
<meta property="og:type" content="website"><meta property="og:title" content="${title}"><meta property="og:description" content="${desc}"><meta property="og:url" content="${url}"><meta property="og:image" content="${BASE}/img/${ph[0][0]}">
<meta name="theme-color" content="#163300">
<link rel="icon" href="${root}favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${root}css/style.css">
<script type="application/ld+json">${JSON.stringify({"@context":"https://schema.org","@type":"LocalBusiness","name":"Samuel Élagage Abattage","url":url,"telephone":PHONE,"description":`Élagage, abattage, taille de haie et débroussaillage à ${c.name} et alentours.`,"areaServed":[{"@type":"City","name":c.name},...c.near.map(n=>({"@type":"City","name":n}))],"address":{"@type":"PostalAddress","addressRegion":"Occitanie","addressCountry":"FR"}})}</script>
${analytics}
</head><body>
${NAV(root)}
<main>
<div class="page-hero"><div class="wrap">
<p class="crumb"><a href="${root}">Accueil</a> › Élagage à ${c.name}</p>
<span class="tag">${c.dep} · Devis gratuit</span>
<h1>Élagage et abattage à <em>${c.name}</em></h1>
<p class="lead">Samuel intervient à ${c.name} et dans les communes voisines : élagage, abattage, taille de haie, débroussaillage, avec son camion-nacelle.</p>
<div class="cta"><a class="btn btn-lime" href="tel:{{PHONE_TEL}}">Appeler Samuel · {{PHONE_DISPLAY}}</a><a class="link" href="sms:{{PHONE_TEL}}">Ou envoyer un SMS</a></div>
</div></div>
<div class="band"><div class="wrap"><ul><li>Devis gratuit</li><li>Déplacement gratuit</li><li>Camion-nacelle</li><li>${c.name} et alentours</li></ul></div></div>
<section><div class="wrap prose">
<h2>Ce que Samuel fait à ${c.name}</h2>
<ul class="ticks"><li>Élagage et taille d’arbres, même hauts ou difficiles d’accès</li><li>Abattage, y compris démontage en hauteur</li><li>Taille de haie depuis la nacelle</li><li>Débroussaillage et entretien d’espaces verts</li><li>Étêtage d’arbres devenus trop grands</li></ul>
<h2>Des besoins différents selon le terrain</h2>
<p>${needs}</p>
<h2>Autour de ${c.name}</h2>
<p>Samuel se déplace aussi à : ${c.near.map(n=>{const k=COMMUNES.find(x=>x.name===n);return k?`<a class="link" href="../elagage-${k.slug}/">${n}</a>`:n}).join(', ')}, et dans le reste du ${c.dep.split(' ')[0]}.</p>
<div class="photos2">${ph.map(p=>`<img src="${root}img/${p[0]}" alt="${p[1]}" loading="lazy">`).join('')}</div>
</div></section>
<section class="contact" id="contact"><div class="wrap"><div class="contact-box">
<div><h2>Un arbre à faire voir à ${c.name} ?</h2><p style="margin:16px 0 0">Appelez Samuel ou envoyez-lui un SMS avec une photo : il vous répond et vous propose un devis gratuit.</p></div>
<div><a class="big" href="tel:{{PHONE_TEL}}">{{PHONE_DISPLAY}}</a>
<div class="cta" style="margin-top:20px"><a class="btn btn-lime" href="tel:{{PHONE_TEL}}">Appeler</a><a class="btn btn-out" href="sms:{{PHONE_TEL}}">Envoyer un SMS</a></div>
<p class="note" style="margin-top:18px">Devis et déplacement gratuits.</p></div>
</div></div></section>
<section style="background:var(--fog);padding:48px 0"><div class="wrap"><h2 style="font-size:1.6rem;margin-bottom:16px">Autres zones d’intervention</h2><div class="zone">${CITIES.filter(x=>x!==c).map(x=>`<a class="tag" href="../elagage-${x.slug}/">${x.name}</a>`).join('')}</div></div></section>
</main>
<footer><div class="wrap"><span>© 2026 Samuel Élagage Abattage</span><span>Tarn · Aveyron</span></div></footer>
<div class="callbar"><a class="btn btn-lime" href="tel:{{PHONE_TEL}}">Appeler Samuel · Devis gratuit</a></div>
<script src="${root}js/track.js" defer></script>
</body></html>`;
  fs.mkdirSync(`elagage-${c.slug}`,{recursive:true});
  fs.writeFileSync(`elagage-${c.slug}/index.html`, fill(html,root));
});

// ---------- 404, robots, sitemap ----------
fs.writeFileSync('404.html', `<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Page introuvable — Samuel Élagage Abattage</title><meta name="robots" content="noindex"><style>body{font-family:system-ui,sans-serif;background:#163300;color:#fff;min-height:100vh;display:grid;place-items:center;text-align:center;padding:24px}a{display:inline-block;margin-top:18px;background:#9fe870;color:#163300;font-weight:600;padding:12px 26px;border-radius:999px;text-decoration:none}</style></head><body><div><h1>Cette page n’existe pas</h1><p>Mais Samuel, lui, est joignable.</p><a href="tel:${PHONE}">Appeler ${PHONE_DISPLAY}</a><br><a href="${BASE}/" style="background:transparent;color:#fff;border:1px solid #fff">Retour à l’accueil</a></div></body></html>`);
fs.writeFileSync('robots.txt', `User-agent: *\nAllow: /\nSitemap: ${BASE}/sitemap.xml\n`);
const extra = [...buildExtra({BASE,PHONE,analytics,NAV,fill,TODAY}), ...buildCommunes({BASE,PHONE,analytics,NAV,fill,CITIES})];
const urls=[`${BASE}/`,...CITIES.map(c=>`${BASE}/elagage-${c.slug}/`),...extra.map(p=>`${BASE}/${p}`)];
fs.writeFileSync('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u=>`  <url><loc>${u}</loc><lastmod>${TODAY}</lastmod></url>`).join('\n')}\n</urlset>\n`);
console.log('OK', urls.length, 'pages');
