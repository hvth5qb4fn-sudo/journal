const book = document.querySelector('.book');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

let currentLeftIndex = 0; // index de la page gauche affichée

// --- Données : date + texte (orthographe corrigée) ---
const pagesData = [
  {
    date: "26 septembre",
    text: `Port de Valence : Arrivés au port de Valence tôt ce matin, après deux jours de mer depuis Marseille. L'air sentait la poussière et le soleil chaud d'Espagne. Les gars de l'équipage étaient nerveux mais contents : un port, ça redonne le sourire à bord. Moi, j'ai surtout profité pour poser le pied à terre et refaire des stocks frais.`
  },
  {
    date: "27 septembre",
    text: `Valence : Jour tranquille au port. Tout l'équipage a passé la journée à courir entre inspections, manutention et paperasse. J'ai préparé un gros ragoût pour ce soir, histoire de remettre tout le monde d'aplomb. Le soleil cognait fort, mais le vent du large rendait l'air plus respirable. Nuit bruyante à cause des opérations, impossible de dormir avant minuit.`
  },
  {
    date: "28 septembre",
    text: `Départ de Valence : On appareille en début d'après-midi. Ça me fait toujours un petit coup de mou de quitter un port, même quand on y est resté si peu. Le climat est chaud et le vent reste modéré, parfait pour commencer la route vers Gibraltar. Je sens que les prochains jours seront paisibles : de l'eau, du soleil et des conteneurs. Je range mes couteaux et prépare la cuisine pour reprendre le rythme de mer. Sur la route vers Gibraltar – 11 nœuds.`
  },
  {
    date: "29 septembre",
    text: `En mer : Mer calme, ciel bleu, chaleur un peu lourde. Les machines avancent doucement à 11 nœuds sans se presser. Je passe plus de temps à essuyer la condensation qu'à couper des légumes. Les gars jouent aux cartes entre deux quarts, ça rigole fort dans le salon.`
  },
  {
    date: "30 septembre",
    text: `Arrivée au détroit de Gibraltar (midi) : On a aperçu les côtes des deux continents depuis la passerelle, c’est un spectacle toujours assez impressionnant. Je suis monté quelques minutes pour regarder le détroit, ça change de mes casseroles. Le vent s'est levé mais rien de méchant. On garde la même allure tranquille. Les autres aiment bien ce passage, ça leur rappelle qu'on avance quelque part. Longue descente le long de l'Afrique – 13 nœuds.`
  },
  {
    date: "1er octobre",
    text: `En route plein sud : La mer est douce, le vent léger. On a augmenté la vitesse à 13 nœuds, mais honnêtement ça reste lent pour la stature de l'Evergiven. Je passe mes journées à cuisiner et mes soirées à écouter le bruit des vagues contre la coque. Rien d'exceptionnel, mais c'est reposant.`
  },
  {
    date: "2 octobre",
    text: `Large du Maroc : Toujours rien à signaler, juste l'océan. Je fais varier les menus pour éviter l'ennui, mais tout finit par se ressembler. L'équipage commence à sentir la lassitude, c'est toujours comme ça après le départ d'Europe. Le vent apporte un peu de fraîcheur, heureusement.`
  },
  {
    date: "3 octobre",
    text: `Cap au sud : Le soleil tape plus fort de jour en jour. Ça me fait surveiller les chambres froides de près : pas envie que tout lâche en pleine traversée. Rigoler dans la cuisine avec les gars remonte le moral. À 13 nœuds, on a l'impression d'être une vieille tortue chargée à bloc.`
  },
  {
    date: "4 octobre",
    text: `En mer : Le vent persiste mais reste faible. Je profite de la mer calme pour faire du pain : les gars adorent ça. Je vis presque sans repères temporels, juste mes plats et ma routine. Parfois, un albatros passe ras les conteneurs, comme s'il nous surveillait.`
  },
  {
    date: "5 octobre",
    text: `Descente vers le Sahara : Toujours un temps doux, rien qui perturbe la route. Je commence à trouver le silence un peu pesant. Les machines continuent à vibrer doucement. Certains marins s'ennuient à mourir, moi je m'occupe comme je peux dans ma cuisine.`
  },
  {
    date: "6 octobre",
    text: `En continu vers le sud : Je me suis levé en apercevant un voile léger sur l'océan, la brume du matin. Les repas défilent : riz, poisson congelé, légumes sautés… la routine. Le vent se lève par moments mais ça ne secoue pas. On garde nos 13 nœuds tranquilles.`
  },
  {
    date: "7 octobre",
    text: `Toujours en mer : Rien de neuf. J'ai bien rigolé avec le bosco qui s'est plaint que même le vent s'ennuyait ici. Parfois, rester des jours sans voir une côte fait perdre la notion du voyage. Mais on avance, doucement.`
  },
  {
    date: "8 octobre",
    text: `Au large de la Mauritanie : Chaleur douce, ciel clair, un peu de vent. Je passe l'après-midi à nettoyer les frigos, un enfer de condensation. L'équipage commence à parler du prochain cap : le Sénégal approche. Pour l'instant, la mer est clémente.`
  },
  {
    date: "9 octobre",
    text: `Avant le Sénégal : La mer reste calme, presque trop. On se prépare à enfin voir des côtes. J'ai préparé un repas spécial, simple mais réconfortant : poulet, riz, sauce bien relevée. Les discussions tournent autour du passage du cap plus tard, tout le monde sait que ce sera une autre histoire.`
  },
  {
    date: "10 octobre",
    text: `En face des côtes du Sénégal : Les côtes sont enfin visibles à l'horizon, c'est toujours un moment attendu après tant de jours d'océan. Il fait doux, le vent porte un ton plus chaud. On ne fait pas escale, on continue direct vers le sud. Je trouve ça un peu frustrant de passer si près sans s'arrêter, mais c'est la vie en mer, pas le temps de tergiverser. Route vers le Cap de Bonne-Espérance.`
  },
  {
    date: "11–14 octobre",
    text: `Descente vers le sud de l'Afrique : Mer stable mais l'humidité commence à se faire sentir. Les nuits sont plus brumeuses et les journées collantes. On garde toujours 13 nœuds, sans incident. L'air change peu à peu : on approche le "vrai" sud. J'essaie de garder la cuisine sèche mais c'est peine perdue.`
  },
  {
    date: "15 octobre",
    text: `Cap de Bonne-Espérance : On y est : le fameux passage. Le vent souffle fort et la houle secoue tout ce qui n'est pas fixé. Aujourd'hui un marin philippin nous a conté la fois où il a dû traverser une tempête. Il fait beau malgré tout, mais la brume et l'humidité s'accrochent à nous.`
  },

  /* Texte supplémentaire "Geo" et suite — je les intègre tels que fournis,
     en corrigeant l'orthographe et la ponctuation. */
  {
    date: "22 octobre",
    text: `Océan Indien : On est bien entrés dans l'océan Indien aujourd'hui. Température autour de 22 °C, donc ça va. Je me sers encore des légumes frais que j'avais achetés au dernier port, mais ils commencent à s'abîmer. L'océan est super calme, juste de l'eau partout. L'équipage reprend son rythme : quart, boulot, repas. Rien de spécial.`
  },
  {
    date: "23 octobre",
    text: `Océan Indien : La nuit a bougé pas mal. Le matin, tout le monde était fatigué. J'ai utilisé ce qu'il me restait de poivrons et de tomates avant que ça tourne. La zone est totalement vide, aucun bateau croisé. On sent qu'on est dans une des plus grandes étendues maritimes du monde. Ça fait un peu bizarre.`
  },
  {
    date: "24 octobre",
    text: `Océan Indien : J'ai regardé ce qu'il me restait en réserve : encore quelques oignons, carottes et un peu de salade. Je commence à faire simple pour tenir jusqu'à Singapour. La journée a été super monotone. Le capitaine a dit qu'on suit une des routes principales du commerce mondial, même si pour l'instant on ne voit personne.`
  },
  {
    date: "25 octobre",
    text: `Océan Indien : Petite frayeur cette nuit avec un conteneur qui a fait du bruit. Le reste de la journée calme. J'ai fait un plat de poisson avec les derniers légumes potables. On parle beaucoup de la suite : on sait que Malacca, c'est l'endroit où ça va devenir compliqué parce que c'est un passage très fréquenté.`
  },
  {
    date: "26 octobre",
    text: `Océan Indien : Rien de nouveau, mer calme. Je commence à manquer de produits frais, donc je fais plus de choses à base de conserves. L'équipage a clairement hâte d'arriver vers les zones plus vivantes. Moi aussi, surtout pour racheter du frais.`
  },
  {
    date: "27 octobre",
    text: `Océan Indien : On a vu un cargo très loin. Premier depuis des jours. Discussion rapide pendant le repas, ça casse la routine. Je garde les derniers légumes pour un repas un peu meilleur avant le détroit.`
  },
  {
    date: "28 octobre",
    text: `Océan Indien : Le vent a bien soufflé aujourd'hui, pas pratique pour cuisiner. Le bateau bougeait beaucoup. J'ai fait un repas simple pour ne pas me prendre la tête. On commence tous à sentir qu'on approche des zones plus chaudes et plus humides.`
  },
  {
    date: "29 octobre",
    text: `Océan Indien : J'ai fait du pain ce matin, ça a remonté un peu le moral. On arrive à la fin des légumes, il reste juste quelques carottes et oignons. L'équipage parle des familles et de l'arrivée, signe qu'on arrive à la fin du long passage.`
  },
  {
    date: "30 octobre",
    text: `Océan Indien : Journée calme. Le capitaine vérifie souvent les écrans parce qu'on avance vers des zones où il y a plus de trafic maritime. Moi j'ai fait l'inventaire : on tient, mais vivement Singapour.`
  },
  {
    date: "31 octobre",
    text: `Océan Indien : Dernier jour de "vrai" océan. Ciel gris, ambiance un peu fatiguée. J'ai fait un petit ragoût avec ce qui restait de légumes. Après ça, fini, on passe aux conserves jusqu'au port. Je range la cuisine parce que dans les détroits, ça bouge plus.`
  },
  {
    date: "1er novembre",
    text: `Océan Indien : On sent l'air changer : plus chaud, plus humide. On approche du détroit. La brume commence à arriver aussi, ça annonce des jours compliqués.`
  },
  {
    date: "2 novembre",
    text: `Entrée du détroit de Malacca : Là, c'est un autre monde. Chaleur énorme, brume et plusieurs bateaux. Le détroit de Malacca est un des endroits les plus fréquentés du monde pour le commerce, et ça se voit direct. La radio n'arrêtait pas, l'équipage était super concentré. Dans la cuisine, je transpirais juste en coupant des légumes. On voyait rien, parfois moins d'un kilomètre. Ambiance vraiment stressante, t'as pas le droit à l'erreur ici. Le capitaine a rappelé aussi que c'est une zone où il y a parfois eu de la piraterie, mais maintenant c'est mieux contrôlé.`
  },
  {
    date: "5 novembre",
    text: `Détroit et port de Singapour : On a quitté Malacca pour entrer dans le détroit de Singapour. Toujours beaucoup de navires, mais tout est très organisé ici. On voyait les cargos avancer comme à la chaîne. En fin de matinée, on a vu les grosses installations du port, puis les immeubles derrière, dans la chaleur et la brume. Une fois accostés, je suis sorti pour acheter des légumes, de la viande fraîche, bref refaire tout le stock : carottes, salades, tomates, poulet… ça faisait du bien de revoir de vrais produits. Ça marque la fin du voyage. On a eu du calme, de l'ennui, du stress, un peu de tout. Long trajet, mais on a bien tenu. Moi, je suis content d'avoir retrouvé de quoi cuisiner normalement.`
  }
];

// --- Création des pages (statique) ---
pagesData.forEach((entry, index) => {
  const page = document.createElement('div');
  page.classList.add('page');
  // alterner gauche/droite : index pair => gauche
  if (index % 2 === 0) page.classList.add('page-left');
  else page.classList.add('page-right');

  page.innerHTML = `
    <h2>${entry.date}</h2>
    <div class="content">${entry.text}</div>
  `;
  book.appendChild(page);
});

const pageElements = document.querySelectorAll('.page');

// Afficher deux pages du spread
function showSpread() {
  pageElements.forEach((page, index) => {
    if (index === currentLeftIndex || index === currentLeftIndex + 1) {
      page.style.display = 'block';
    } else {
      page.style.display = 'none';
    }
  });
}

// navigation
nextBtn.addEventListener('click', () => {
  currentLeftIndex += 2;
  if (currentLeftIndex > pageElements.length - 2) currentLeftIndex = pageElements.length - 2;
  showSpread();
});

prevBtn.addEventListener('click', () => {
  currentLeftIndex -= 2;
  if (currentLeftIndex < 0) currentLeftIndex = 0;
  showSpread();
});

// initial
showSpread();
