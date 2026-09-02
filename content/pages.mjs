export const SITE = 'https://msol92.com';
export const BIZ = {
  name: 'MSOL',
  legal: 'MSOL',
  tel: '06 35 26 13 63',
  telRaw: '+33635261363',
  email: 'Msol.said@gmail.com',
  street: '7 Rue Victor Hugo',
  city: 'Levallois-Perret',
  zip: '92300',
  region: 'Île-de-France',
  logo: '/images/logo-msol-sm.png',
  hero: '/images/hero-bg-1920.webp',
};

// Zones citées telles quelles sur le site existant — ne pas inventer de nouvelles communes.
export const ZONES = [
  'Paris 1er au 20e', 'Levallois-Perret', 'Neuilly-sur-Seine', 'Boulogne-Billancourt',
  'Courbevoie', 'Saint-Cloud', 'Hauts-de-Seine', 'Yvelines', 'Val-d’Oise',
];

export const PAGES = [
  {
    slug: 'services/pose-de-parquet',
    title: 'Pose de parquet à Paris et en Île-de-France',
    h1: 'Pose de parquet à Paris et en Île-de-France',
    metaTitle: 'Pose de parquet à Paris et en Île-de-France — MSOL parqueteur',
    metaDesc: 'Pose de parquet massif, contrecollé, stratifié : chevron, point de Hongrie, bâtons rompus. Artisan parqueteur à Paris et en Île-de-France. Devis gratuit.',
    serviceName: 'Pose de parquet',
    lead: 'Massif, contrecollé ou stratifié, collé ou flottant : la pose conditionne la durée de vie du parquet bien plus que l’essence choisie. Nous intervenons sur Paris et toute l’Île-de-France, du studio haussmannien au plateau de bureaux.',
    brief: { q: 'Comment pose-t-on un parquet ?', a: 'La pose d’un parquet se fait selon trois techniques. La <strong>pose collée</strong> solidarise les lames au support : c’est la référence sur chape et sur plancher chauffant, la seule adaptée aux grandes largeurs et aux motifs géométriques comme le point de Hongrie. La <strong>pose flottante</strong>, sur sous-couche, ne convient qu’au contrecollé et au stratifié ; elle est rapide et réversible mais sonne creux. La <strong>pose clouée</strong> sur lambourdes reste la technique historique du massif dans le bâti ancien, à condition d’avoir la hauteur sous plafond et un lambourdage sain. Avant toute pose, quatre points se vérifient : le taux d’humidité du support, sa planéité — pas plus de 5 mm de flèche sous une règle de deux mètres —, la compatibilité de l’essence avec un éventuel chauffage au sol, et l’acclimatation du bois, livré à l’avance dans le logement. MSOL réalise ces poses à Paris et en Île-de-France.' },
    sections: [
      { h: 'Les trois techniques de pose, et quand les employer',
        p: [
          'La <strong>pose collée</strong> est la référence sur chape et sur plancher chauffant : le parquet est solidaire du support, ce qui supprime la résonance et stabilise les lames face aux variations d’hygrométrie. C’est la seule technique que nous recommandons pour les grandes largeurs et pour les motifs géométriques.',
          'La <strong>pose flottante</strong>, sur sous-couche, ne convient qu’au contrecollé et au stratifié. Elle est rapide et réversible, donc adaptée à une location ou à un budget contraint, mais elle sonne creux et supporte mal les pièces humides.',
          'La <strong>pose clouée</strong> sur lambourdes reste la technique historique du parquet massif dans l’ancien. Elle demande une hauteur sous plafond suffisante et un lambourdage sain — deux points que nous vérifions avant de nous engager.',
        ] },
      { h: 'Chevron, point de Hongrie, bâtons rompus : ce qui les distingue',
        p: [
          'Le <strong>point de Hongrie</strong> se reconnaît à ses lames coupées en biais qui se rejoignent en pointe, formant des chevrons continus sans décrochement. Le <strong>parquet à bâtons rompus</strong> assemble des lames à angle droit, chaque lame venant buter contre le flanc de la suivante : le dessin est plus dense, la pose plus rapide, le rendu moins solennel.',
          'Ces motifs multiplient les coupes et exigent un calepinage tracé avant la première lame. Une erreur d’axe de deux millimètres au départ devient un défaut visible de plusieurs centimètres en fin de pièce. C’est là que se joue la différence entre un poseur et un parqueteur.',
        ] },
      { h: 'Ce que nous vérifions avant de poser',
        p: [
          'Le taux d’humidité du support, la planéité (une règle de deux mètres ne doit pas révéler plus de 5 mm de flèche), l’état du plancher existant, la présence d’un chauffage au sol et sa compatibilité avec l’essence retenue. Le bois est livré à l’avance dans le logement pour s’acclimater : poser un parquet sorti du camion, c’est provoquer des joints ouverts trois mois plus tard.',
        ] },
    ],
    faq: [
      { q: 'Combien de temps faut-il pour poser un parquet ?', a: 'Comptez une à deux journées pour une pièce en pose droite, davantage pour un point de Hongrie ou un chevron qui demandent un calepinage et de nombreuses coupes. À cela s’ajoutent les jours d’acclimatation du bois avant le chantier.' },
      { q: 'Peut-on poser du parquet sur un plancher chauffant ?', a: 'Oui, en pose collée, avec une essence et une épaisseur compatibles. Le chêne contrecollé est le choix le plus sûr. Nous vérifions systématiquement la résistance thermique de l’ensemble avant de valider.' },
      { q: 'Faut-il retirer l’ancien revêtement ?', a: 'Pas toujours. Un carrelage sain et plan peut servir de support à une pose collée. Une moquette ou un sol souple, en revanche, doivent être déposés.' },
    ],
  },
  {
    slug: 'services/poncage-parquet',
    title: 'Ponçage de parquet à Paris et en Île-de-France',
    h1: 'Ponçage de parquet à Paris et en Île-de-France',
    metaTitle: 'Ponçage de parquet à Paris — MSOL, parqueteur en Île-de-France',
    metaDesc: 'Ponçage de parquet sans poussière, en plusieurs passes de grains. Parquet massif, ancien ou point de Hongrie. Paris et Île-de-France, devis gratuit.',
    serviceName: 'Ponçage de parquet',
    lead: 'Le ponçage est l’étape qui décide du rendu final. Un parquet mal poncé se voit à la première lumière rasante — et aucune finition ne rattrape un défaut de ponçage.',
    brief: { q: 'En quoi consiste le ponçage d’un parquet ?', a: 'Le ponçage d’un parquet consiste à retirer la finition existante et à remettre le bois à nu, en plusieurs passes de grains décroissants. Le <strong>gros grain</strong> décape et rattrape les différences de niveau entre lames ; le <strong>grain moyen</strong> efface les rayures laissées par le premier passage ; le <strong>grain fin</strong> ferme le bois et prépare la finition. Sauter une passe fait gagner une demi-journée et se voit pendant vingt ans : les stries du gros grain remontent sous le vernis dès que la lumière est rasante. Les périphéries, hors d’atteinte de la ponceuse à bande, se traitent à la bordureuse et les angles à la main. Un parquet contrecollé n’accepte qu’un nombre limité de ponçages, dicté par l’épaisseur de sa couche d’usure : sous 2,5 mm, le support est menacé. MSOL ponce à Paris et en Île-de-France, avec aspiration à la source.' },
    sections: [
      { h: 'Plusieurs passes, plusieurs grains',
        p: [
          'Un ponçage sérieux se fait en trois passes au minimum. Le <strong>gros grain</strong> décape la finition ancienne et rattrape les différences de niveau entre lames. Le <strong>grain moyen</strong> efface les rayures laissées par le premier passage. Le <strong>grain fin</strong> ferme le bois et prépare la finition.',
          'Sauter une passe fait gagner une demi-journée et se paie pendant vingt ans : les stries du gros grain remontent sous le vernis dès que la lumière est rasante.',
        ] },
      { h: 'Bords, angles et sous-radiateurs',
        p: [
          'La ponceuse à bande ne va pas jusqu’au mur. Les périphéries se traitent à la bordureuse, les angles à la main. C’est la partie ingrate du métier et celle qu’on bâcle le plus souvent : un liseré non poncé le long des plinthes trahit immédiatement un chantier expédié.',
        ] },
      { h: 'Ponçage sans poussière',
        p: [
          'Nos machines sont raccordées à un système d’aspiration. On ne parle jamais de zéro poussière — ce serait mentir — mais d’une captation à la source qui rend le chantier vivable et évite d’empoussiérer le reste du logement. Les ouvertures sont protégées et le chantier est nettoyé avant l’application de la finition.',
        ] },
      { h: 'Quand le ponçage n’est pas la bonne réponse',
        p: [
          'Un parquet contrecollé n’accepte qu’un nombre limité de ponçages, dicté par l’épaisseur de sa couche d’usure. Sous 2,5 mm, on risque d’atteindre le support. De même, un parquet dont les lames bougent ou dont les clous remontent doit être repris avant tout ponçage. Nous le disons avant le devis, pas après.',
        ] },
    ],
    faq: [
      { q: 'Combien de fois peut-on poncer un parquet ?', a: 'Un parquet massif traditionnel supporte plusieurs ponçages sur sa durée de vie, tant qu’il reste de la matière au-dessus des languettes. Un contrecollé dépend de l’épaisseur de sa couche d’usure : nous la mesurons avant de nous prononcer.' },
      { q: 'Peut-on habiter le logement pendant le ponçage ?', a: 'C’est possible pièce par pièce, mais l’idéal reste de libérer la zone. Le ponçage est bruyant et la finition demande un temps de séchage sans passage.' },
      { q: 'Le ponçage supprime-t-il les taches ?', a: 'Les taches superficielles, oui. Une tache d’eau ou d’encre qui a pénétré le bois en profondeur peut subsister : dans ce cas, le remplacement de la lame est la seule solution propre.' },
    ],
  },
  {
    slug: 'services/vitrification-parquet',
    title: 'Vitrification de parquet à Paris et en Île-de-France',
    h1: 'Vitrification de parquet à Paris et en Île-de-France',
    metaTitle: 'Vitrification de parquet à Paris — MSOL, parqueteur Île-de-France',
    metaDesc: 'Vitrification de parquet mat, satiné ou brillant. Vitrificateur en phase aqueuse, plusieurs couches. Paris et Île-de-France. Devis gratuit.',
    serviceName: 'Vitrification de parquet',
    lead: 'La vitrification dépose un film qui protège le bois des passages, de l’eau et des rayures. C’est la finition la plus résistante — et celle qui pardonne le moins une préparation approximative.',
    brief: { q: 'Qu’est-ce que la vitrification d’un parquet ?', a: 'La vitrification consiste à déposer sur le parquet un film protecteur qui le protège des passages, de l’eau et des rayures. C’est la finition la plus résistante, disponible en <strong>mat</strong>, <strong>satiné</strong> ou <strong>brillant</strong> : le mat respecte l’aspect naturel du bois et masque les micro-rayures, le satiné offre une réflexion douce, le brillant agrandit la pièce mais souligne chaque défaut. Le standard en logement est d’une couche de fond suivie de deux couches de finition ; une troisième se justifie en passage intense. Entre deux couches, un égrenage casse les fibres relevées par l’humidité du produit, sans quoi le film final reste rugueux. MSOL travaille en phase aqueuse : odeur faible, séchage rapide, jaunissement moindre dans le temps. Comptez quelques heures avant de remarcher prudemment, une semaine avant de reposer meubles lourds et tapis.' },
    sections: [
      { h: 'Mat, satiné ou brillant',
        p: [
          'Le <strong>mat</strong> respecte l’aspect naturel du bois et masque bien les micro-rayures : c’est le choix dominant aujourd’hui, particulièrement sur les chênes clairs. Le <strong>satiné</strong> apporte une réflexion douce et reste le compromis le plus courant. Le <strong>brillant</strong> agrandit visuellement les pièces mais souligne chaque défaut et chaque poussière.',
        ] },
      { h: 'Combien de couches, et pourquoi',
        p: [
          'Une couche de fond puis deux couches de finition constituent le standard en logement. En passage intense — entrée, couloir, local professionnel — une troisième couche de finition se justifie. Entre deux couches, un égrenage léger casse les fibres relevées par l’humidité du produit : sans lui, le film final est rugueux au toucher.',
        ] },
      { h: 'Phase aqueuse ou solvant',
        p: [
          'Nous travaillons en phase aqueuse : odeur nettement plus faible, séchage rapide, remise en service plus tôt, et un jaunissement bien moindre dans le temps. Les vitrificateurs à solvant conservent un léger avantage de dureté sur certains usages très spécifiques, mais l’écart s’est resserré et l’inconfort du chantier ne le justifie plus en logement occupé.',
        ] },
      { h: 'Et si vous préférez l’huile ou le vernis-cire',
        p: [
          'La vitrification n’est pas la seule finition. L’huile pénètre le bois au lieu de le filmer : le toucher est plus chaleureux et une reprise locale est possible sans tout refaire, au prix d’un entretien régulier. Nous en discutons avant le devis plutôt que d’imposer une finition unique.',
        ] },
    ],
    faq: [
      { q: 'Combien de temps avant de remarcher sur le parquet ?', a: 'Quelques heures pour une circulation prudente en chaussettes, environ une semaine avant de reposer les meubles lourds et les tapis, le temps que le film atteigne sa dureté définitive.' },
      { q: 'Peut-on vitrifier par-dessus une ancienne vitrification ?', a: 'Seulement après un égrenage complet, et à condition que l’ancien film soit sain et bien adhérent. S’il s’écaille ou s’il est usé par plaques, un ponçage à nu s’impose.' },
      { q: 'La vitrification jaunit-elle ?', a: 'Les produits en phase aqueuse évoluent très peu. L’essentiel du changement de teinte que l’on observe avec les années vient du bois lui-même, qui fonce naturellement sous l’effet de la lumière.' },
    ],
  },
  {
    slug: 'services/renovation-parquet',
    title: 'Rénovation de parquet ancien à Paris et en Île-de-France',
    h1: 'Rénovation de parquet ancien à Paris et en Île-de-France',
    metaTitle: 'Rénovation de parquet ancien à Paris — MSOL parqueteur',
    metaDesc: 'Rénovation de parquet ancien : remplacement de lames, rebouchage, reprise de point de Hongrie, parquet sous moquette. Paris et Île-de-France.',
    serviceName: 'Rénovation de parquet',
    lead: 'Sous une moquette collée ou un lino des années soixante-dix se cache souvent un parquet d’origine récupérable. La rénovation coûte presque toujours moins cher qu’une dépose suivie d’une pose neuve — et elle garde le cachet que l’on ne rachète pas.',
    brief: { q: 'Peut-on rénover un parquet ancien plutôt que le remplacer ?', a: 'Dans la grande majorité des cas, oui — et la rénovation coûte presque toujours moins cher qu’une dépose suivie d’une pose neuve, puisqu’elle évite l’évacuation et l’achat du bois. Le calcul ne s’inverse que lorsque plus d’un tiers des lames doit être remplacé. Deux conditions : qu’il reste de l’épaisseur au-dessus des languettes, et que le lambourdage soit sain. Le diagnostic porte sur l’essence, l’épaisseur restante, les lames fendues ou piquées, la planéité et les traces d’humidité ; dans le bâti parisien ancien, le désaffleurement entre lames et l’affaissement en périphérie sont les deux surprises les plus fréquentes. Une lame abîmée se remplace par une lame de récupération de même essence plutôt que de se masquer à la pâte à bois, qui ne prend pas la finition de la même façon. MSOL rénove à Paris et en Île-de-France, diagnostic gratuit.' },
    sections: [
      { h: 'Le diagnostic avant tout',
        p: [
          'Avant d’annoncer un prix, il faut savoir ce qu’on a sous les pieds : essence et épaisseur restante, état du lambourdage, lames fendues ou attaquées, planéité générale, traces d’humidité. Dans le bâti parisien ancien, le désaffleurement entre lames et l’affaissement en périphérie de pièce sont les deux surprises les plus fréquentes.',
        ] },
      { h: 'Remplacer plutôt que reboucher',
        p: [
          'Une lame cassée, piquée ou tachée en profondeur se remplace. Nous cherchons une lame de récupération de même essence et de même largeur plutôt que de masquer le défaut à la pâte à bois : un rebouchage se voit toujours après vitrification, parce qu’il ne prend pas la finition de la même façon que le bois.',
          'Le rebouchage garde sa place pour les joints fins et les anciens trous de clou, où il fait exactement ce qu’on lui demande.',
        ] },
      { h: 'Parquet sous moquette ou sous lino',
        p: [
          'La dépose est la partie longue : colle néoprène, agrafes, feutre. Une fois le support à nu, un premier ponçage au gros grain révèle l’état réel du parquet. C’est seulement à ce moment que l’on sait si l’on part sur une rénovation complète ou sur des reprises ponctuelles — et nous vous le montrons avant de continuer.',
        ] },
      { h: 'Reprendre un point de Hongrie ancien',
        p: [
          'C’est le travail le plus exigeant du métier. Les angles des anciens points de Hongrie parisiens ne sont pas normalisés : chaque lame de remplacement doit être recoupée à l’angle exact du motif existant, sous peine de créer un décrochement visible en pleine pièce.',
        ] },
    ],
    faq: [
      { q: 'Mon parquet est-il récupérable ?', a: 'Dans la grande majorité des cas oui, tant qu’il reste de l’épaisseur au-dessus des languettes et que le lambourdage est sain. Le diagnostic sur place tranche — et il est gratuit.' },
      { q: 'Rénover ou remplacer : qu’est-ce qui coûte le moins cher ?', a: 'La rénovation, presque toujours, parce qu’elle évite la dépose, l’évacuation et l’achat du bois neuf. Le calcul s’inverse seulement quand plus d’un tiers des lames doit être remplacé.' },
      { q: 'Peut-on changer la teinte à cette occasion ?', a: 'Oui. Après ponçage, le parquet peut recevoir une teinte avant finition. C’est le bon moment pour éclaircir un chêne foncé ou uniformiser des lames de récupération.' },
    ],
  },
  {
    slug: 'parqueteur-paris',
    title: 'Parqueteur à Paris',
    h1: 'Parqueteur à Paris et en Île-de-France',
    metaTitle: 'Parqueteur à Paris — pose, ponçage, vitrification | MSOL',
    metaDesc: 'MSOL, artisan parqueteur intervenant dans tout Paris et en Île-de-France : pose, ponçage, vitrification et rénovation de parquet. Devis gratuit.',
    serviceName: 'Travaux de parquet',
    isHub: true,
    lead: 'MSOL est un artisan parqueteur établi à Levallois-Perret, aux portes du 17e arrondissement. Nous intervenons dans tout Paris et en Île-de-France, sur parquet neuf comme sur parquet ancien.',
    brief: { q: 'Que fait un parqueteur, et pourquoi en choisir un à Paris ?', a: 'Un parqueteur pose, ponce, vitrifie et rénove les parquets — quatre métiers distincts que peu d’entreprises maîtrisent de bout en bout. À Paris, le métier a ses contraintes propres : planchers sur solives bois dans le bâti haussmannien, hauteurs de seuil impossibles à modifier, points de Hongrie d’origine aux angles non normalisés, escaliers étroits et stationnement impossible, horaires de chantier encadrés par les règlements de copropriété. Un poseur habitué au pavillon neuf découvre ces contraintes sur le chantier ; un parqueteur parisien les intègre au devis. MSOL est établi à Levallois-Perret, aux portes du 17e arrondissement, et intervient dans tout Paris ainsi qu’en proche couronne — Neuilly-sur-Seine, Courbevoie, Boulogne-Billancourt, Saint-Cloud — et plus largement en Île-de-France. Visite et devis sont gratuits, pour les particuliers comme pour les professionnels.' },
    sections: [
      { h: 'Le parquet parisien a ses propres règles',
        p: [
          'Les immeubles haussmanniens et les constructions d’avant-guerre posent des contraintes qu’on ne rencontre pas ailleurs : planchers sur solives bois, hauteurs de seuil impossibles à modifier, points de Hongrie d’origine aux angles non normalisés, voisinage immédiat et horaires de chantier encadrés par le règlement de copropriété.',
          'Un parqueteur habitué au pavillon neuf découvre ces contraintes sur le chantier. Nous les intégrons au devis.',
        ] },
      { h: 'Accès, logistique, copropriété',
        p: [
          'Escalier étroit, absence d’ascenseur ou ascenseur trop petit pour des lames de deux mètres, stationnement impossible : à Paris, l’accès pèse réellement sur un chantier de parquet. Nous le regardons dès la visite, et nous prenons en charge les déclarations de travaux exigées par les syndics quand c’est nécessaire.',
        ] },
      { h: 'Nos quatre métiers',
        p: [
          'Nous couvrons la chaîne complète : <a href="/services/pose-de-parquet/">pose</a> de parquet massif, contrecollé et stratifié, <a href="/services/poncage-parquet/">ponçage</a> en plusieurs passes, <a href="/services/vitrification-parquet/">vitrification</a> mate, satinée ou brillante, et <a href="/services/renovation-parquet/">rénovation</a> de parquet ancien. Un seul interlocuteur du diagnostic à la finition.',
        ] },
      { h: 'Où nous intervenons',
        p: [
          'Paris intra-muros dans son ensemble, avec une présence naturellement plus forte sur l’ouest — 8e, 16e, 17e — du fait de notre implantation à Levallois-Perret. En proche couronne : Neuilly-sur-Seine, Courbevoie, Boulogne-Billancourt, Saint-Cloud et le reste des Hauts-de-Seine. Nous nous déplaçons également dans les Yvelines et le Val-d’Oise.',
        ] },
    ],
    faq: [
      { q: 'Le devis est-il vraiment gratuit ?', a: 'Oui, visite et devis sont gratuits et sans engagement, à Paris comme en proche couronne.' },
      { q: 'Intervenez-vous pour les professionnels ?', a: 'Oui : bureaux, commerces, cabinets et parties communes d’immeubles, en plus des logements de particuliers.' },
      { q: 'Travaillez-vous en copropriété ?', a: 'Régulièrement. Nous respectons les horaires de chantier fixés par le règlement et fournissons les éléments demandés par le syndic.' },
    ],
  },
];
