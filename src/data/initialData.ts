import { MediaItem, NewsItem } from '../types/school';

export const SCHOOL_INFO = {
  name: 'LE BERCEAU DES 3S',
  tagline: 'Savoir · Sagesse · Succès',
  description: 'Établissement scolaire d\'excellence et d\'épanouissement en République de Guinée. De la maternelle au collège, nous cultivons le potentiel, l\'intégrité et la créativité de chaque élève.',
  whatsappPhone: '+224 662 11 80 00',
  whatsappRaw: '224662118000',
  phoneDisplay: '+224 662 11 80 00',
  email: 'contact@berceaudes3s.com',
  address: 'Quartier Kipé - Ratoma, Conakry, République de Guinée',
  hours: 'Lundi au Vendredi : 07h30 - 17h00 | Samedi : 08h30 - 12h30',
  foundedYear: '2016',
  stats: {
    students: '480+',
    classes: '18',
    teachers: '32',
    successRate: '98.5%'
  }
};

export const INITIAL_MEDIA: MediaItem[] = [
  {
    id: 'media-1',
    type: 'photo',
    title: 'Atelier de lecture & éveil en classe primaire',
    description: 'Séance interactive d\'apprentissage de la lecture et travail d\'équipe dans une ambiance chaleureuse et stimulante.',
    url: '/src/assets/images/hero_school_children_1792242497726.jpg',
    category: 'Primaire',
    published: true,
    featuredOnHome: true,
    parentalConsentVerified: true,
    date: '14 Octobre 2026',
    author: 'Direction Pédagogique'
  },
  {
    id: 'media-2',
    type: 'photo',
    title: 'Vue panoramique du campus et de la cour d\'honneur',
    description: 'Un environnement verdoyant, sécurisé et moderne, conçu pour favoriser l\'épanouissement et les récréations sereines.',
    url: '/src/assets/images/school_campus_exterior_1792242498160.jpg',
    category: 'Vie scolaire',
    published: true,
    featuredOnHome: true,
    parentalConsentVerified: true,
    date: '10 Octobre 2026',
    author: 'Direction Générale'
  },
  {
    id: 'media-3',
    type: 'photo',
    title: 'Laboratoire des petits scientifiques des 3S',
    description: 'Découverte des sciences naturelles, manipulations pratiques et expérimentations guidées par notre professeure certifiée.',
    url: '/src/assets/images/children_science_activity_1792242500149.jpg',
    category: 'Sciences & Découverte',
    published: true,
    featuredOnHome: true,
    parentalConsentVerified: true,
    date: '05 Octobre 2026',
    author: 'Professeur de Sciences'
  },
  {
    id: 'media-4',
    type: 'photo',
    title: 'Éveil ludique et motricité en Maternelle',
    description: 'Les tout-petits apprennent les formes géométriques, les chiffres et la socialisation dans le cocon bienveillant du Berceau.',
    url: '/src/assets/images/kindergarten_play_learning_1792242499931.jpg',
    category: 'Maternelle',
    published: true,
    featuredOnHome: true,
    parentalConsentVerified: true,
    date: '28 Septembre 2026',
    author: 'Éducatrice Maternelle'
  },
  {
    id: 'media-5',
    type: 'video',
    title: 'Chorale et hymne de l\'école Le Berceau des 3S',
    description: 'Prestation émouvante de la chorale des élèves lors de la cérémonie officielle d\'ouverture de l\'année scolaire.',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnailUrl: '/src/assets/images/hero_school_children_1792242497726.jpg',
    category: 'Fêtes & Cérémonies',
    published: true,
    featuredOnHome: true,
    parentalConsentVerified: true,
    date: '02 Octobre 2026',
    author: 'Maître de Musique',
    duration: '03:15'
  },
  {
    id: 'media-6',
    type: 'video',
    title: 'Tournoi interscolaire et démonstration de gymnastique',
    description: 'Moments forts des compétitions sportives et de l\'esprit d\'équipe qui anime nos jeunes athlètes.',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    thumbnailUrl: '/src/assets/images/school_campus_exterior_1792242498160.jpg',
    category: 'Sport & Culture',
    published: true,
    featuredOnHome: false,
    parentalConsentVerified: true,
    date: '22 Septembre 2026',
    author: 'Coach d\'EPS',
    duration: '02:40'
  },
  {
    id: 'media-7',
    type: 'photo',
    title: 'Visite guidée et sortie botanique au Jardin du 2 Octobre',
    description: 'Les élèves du cycle primaire découvrent la flore guinéenne et l\'importance de la préservation écologique.',
    url: '/src/assets/images/children_science_activity_1792242500149.jpg',
    category: 'Sorties pédagogiques',
    published: true,
    featuredOnHome: false,
    parentalConsentVerified: true,
    date: '15 Septembre 2026',
    author: 'Direction Pédagogique'
  }
];

export const INITIAL_NEWS: NewsItem[] = [
  {
    id: 'news-1',
    title: 'Inscriptions ouvertes pour l\'année scolaire 2026 - 2027',
    excerpt: 'Les dossiers d\'admission pour la Maternelle, le Primaire et le Collège sont disponibles. Places limitées par classe pour garantir un encadrement d\'exception.',
    content: 'La Direction générale de l\'école LE BERCEAU DES 3S a le plaisir d\'informer les parents d\'élèves que les inscriptions et réinscriptions pour la rentrée 2026 - 2027 sont officiellement ouvertes.\n\nAfin de préserver notre engagement d\'excellence et un suivi individualisé, les effectifs sont strictement plafonnés à 24 élèves par classe. Nous invitons les familles à initier leur démarche directement par WhatsApp auprès du secrétariat ou en se présentant au campus.',
    category: 'Annonce officielle',
    date: '12 Octobre 2026',
    imageUrl: '/src/assets/images/school_campus_exterior_1792242498160.jpg',
    published: true,
    featuredOnHome: true,
    author: 'Le Directeur Général'
  },
  {
    id: 'news-2',
    title: 'Grande Journée Portes Ouvertes & Découverte des Clubs',
    excerpt: 'Venez visiter nos salles de classe, rencontrer notre corps professoral et assister aux démonstrations du club robotique et échecs ce samedi.',
    content: 'Chers parents et futurs élèves, l\'école LE BERCEAU DES 3S vous ouvre chaleureusement ses portes ce samedi de 09h00 à 15h00. Au programme : visite guidée des installations, rencontre avec les enseignants, présentations des ateliers artistiques, numériques et linguistiques.',
    category: 'Événement',
    date: '08 Octobre 2026',
    eventDate: 'Samedi 24 Octobre 2026',
    imageUrl: '/src/assets/images/hero_school_children_1792242497726.jpg',
    published: true,
    featuredOnHome: true,
    author: 'Cellule Communication'
  },
  {
    id: 'news-3',
    title: 'Félicitations à nos lauréats de l\'Examen National de Fin d\'Études Élémentaires',
    excerpt: '100% de réussite avec mention pour nos élèves de CM2 ! Un hommage vibrant au dévouement de nos enseignants et à la persévérance des enfants.',
    content: 'C\'est avec une immense fierté que la communauté du Berceau des 3S célèbre les brillants résultats de la promotion 2026 à l\'examen national d\'entrée en 7ème année. Ces performances récompensent notre méthode pédagogique axée sur la rigueur, l\'éveil intellectuel et la confiance en soi.',
    category: 'Pédagogie',
    date: '25 Septembre 2026',
    imageUrl: '/src/assets/images/children_science_activity_1792242500149.jpg',
    published: true,
    featuredOnHome: true,
    author: 'Direction Pédagogique'
  }
];

export const SCHOOL_VALUES = [
  {
    title: 'Savoir',
    subtitle: 'Excellence Académique',
    description: 'Une solide maîtrise des connaissances fondamentales (français, mathématiques, sciences, anglais dès le jeune âge) conjuguée à la curiosité d\'esprit.',
    color: 'blue'
  },
  {
    title: 'Sagesse',
    subtitle: 'Éthique & Citoyenneté',
    description: 'L\'apprentissage du respect d\'autrui, de la discipline positive, de l\'empathie, de l\'honnêteté et de la fierté civique et culturelle.',
    color: 'emerald'
  },
  {
    title: 'Succès',
    subtitle: 'Épanouissement Durable',
    description: 'Développer la confiance en soi, l\'esprit critique et l\'autonomie pour que chaque enfant devienne l\'acteur victorieux de son destin.',
    color: 'amber'
  }
];

export const TESTIMONIALS = [
  {
    id: 't-1',
    parentName: 'Mme Fatoumata Camara',
    childClass: 'Mère d\'Ibrahima (CE2) & Mariama (Grande Section)',
    quote: 'Le Berceau des 3S a transformé la scolarité de mes enfants. L\'accueil des maîtresses, la propreté du cadre et la réactivité de la direction sur WhatsApp font toute la différence.',
    rating: 5,
    year: 'Parent depuis 3 ans'
  },
  {
    id: 't-2',
    parentName: 'M. Mamadou Saliou Diallo',
    childClass: 'Père de Kadiatou (CM2, admise avec mention)',
    quote: 'La rigueur dans le travail et la bienveillance des encadreurs ont permis à ma fille d\'obtenir d\'excellents résultats à l\'examen national. Une école que je recommande les yeux fermés.',
    rating: 5,
    year: 'Parent depuis 5 ans'
  },
  {
    id: 't-3',
    parentName: 'Dr. Aïssatou Soumah',
    childClass: 'Mère de Mohamed (Petite Section)',
    quote: 'Pour la maternelle, la sécurité et la tendresse étaient mes priorités absolues. Au Berceau, chaque enfant est véritablement choyé et stimulé.',
    rating: 5,
    year: 'Nouvelle rentrée'
  }
];
