export type SectionSlug =
  | 'primeros-pasos'
  | 'embarazo'
  | 'ninos-vacunacion'
  | 'salud-mujer'
  | 'diabetes-hipertension'
  | 'adultos-mayores'
  | 'salud-mental'
  | 'adicciones'
  | 'ist-vih'
  | 'salud-viajero'
  | 'salud-bucal'
  | 'discapacidad-bpc'
  | 'violencia'
  | 'farmacia-popular'
  | 'urgencias';

export interface Section {
  slug: SectionSlug;
  icon: string;
  /** accent color used for left border bar and icon background */
  accentColor: string;
  /** text color for icon and accents */
  textColor: string;
  /** light background for icon circle */
  iconBg: string;
  priority: number;
  officialUrls: string[];
}

export const SECTIONS: Section[] = [
  {
    slug: 'primeros-pasos',
    icon: 'DoorOpen',
    accentColor: 'border-l-emerald-500',
    textColor: 'text-emerald-600',
    iconBg: 'bg-emerald-50',
    priority: 1,
    officialUrls: [
      'https://www.gov.br/saude/pt-br/assuntos/noticias/2025/setembro/novo-cartao-nacional-de-saude-com-cpf-como-funciona-na-pratica',
    ],
  },
  {
    slug: 'embarazo',
    icon: 'Baby',
    accentColor: 'border-l-pink-500',
    textColor: 'text-pink-600',
    iconBg: 'bg-pink-50',
    priority: 2,
    officialUrls: [
      'https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/g/gravidez/pre-natal',
    ],
  },
  {
    slug: 'ninos-vacunacion',
    icon: 'Syringe',
    accentColor: 'border-l-sky-500',
    textColor: 'text-sky-600',
    iconBg: 'bg-sky-50',
    priority: 3,
    officialUrls: ['https://www.gov.br/saude/pt-br/vacinacao/calendario'],
  },
  {
    slug: 'salud-mujer',
    icon: 'HeartPulse',
    accentColor: 'border-l-rose-500',
    textColor: 'text-rose-600',
    iconBg: 'bg-rose-50',
    priority: 4,
    officialUrls: [
      'https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/s/saude-da-mulher',
    ],
  },
  {
    slug: 'diabetes-hipertension',
    icon: 'Activity',
    accentColor: 'border-l-red-500',
    textColor: 'text-red-600',
    iconBg: 'bg-red-50',
    priority: 5,
    officialUrls: [
      'https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/d/diabetes',
      'https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/h/hipertensao',
    ],
  },
  {
    slug: 'adultos-mayores',
    icon: 'Users',
    accentColor: 'border-l-amber-500',
    textColor: 'text-amber-600',
    iconBg: 'bg-amber-50',
    priority: 6,
    officialUrls: [
      'https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/s/saude-da-pessoa-idosa',
    ],
  },
  {
    slug: 'salud-mental',
    icon: 'Brain',
    accentColor: 'border-l-violet-500',
    textColor: 'text-violet-600',
    iconBg: 'bg-violet-50',
    priority: 7,
    officialUrls: [
      'https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/s/saude-mental',
    ],
  },
  {
    slug: 'adicciones',
    icon: 'LifeBuoy',
    accentColor: 'border-l-indigo-500',
    textColor: 'text-indigo-600',
    iconBg: 'bg-indigo-50',
    priority: 8,
    officialUrls: [
      'https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/c/caps',
    ],
  },
  {
    slug: 'ist-vih',
    icon: 'ShieldPlus',
    accentColor: 'border-l-fuchsia-500',
    textColor: 'text-fuchsia-600',
    iconBg: 'bg-fuchsia-50',
    priority: 9,
    officialUrls: [
      'https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/i/ist',
    ],
  },
  {
    slug: 'salud-viajero',
    icon: 'Plane',
    accentColor: 'border-l-teal-500',
    textColor: 'text-teal-600',
    iconBg: 'bg-teal-50',
    priority: 10,
    officialUrls: [
      'https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/d/dengue',
      'https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/f/febre-amarela',
    ],
  },
  {
    slug: 'salud-bucal',
    icon: 'Smile',
    accentColor: 'border-l-cyan-500',
    textColor: 'text-cyan-600',
    iconBg: 'bg-cyan-50',
    priority: 11,
    officialUrls: [
      'https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/s/saude-bucal',
    ],
  },
  {
    slug: 'discapacidad-bpc',
    icon: 'Accessibility',
    accentColor: 'border-l-lime-500',
    textColor: 'text-lime-600',
    iconBg: 'bg-lime-50',
    priority: 12,
    officialUrls: [
      'https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/s/saude-da-pessoa-com-deficiencia',
    ],
  },
  {
    slug: 'violencia',
    icon: 'ShieldAlert',
    accentColor: 'border-l-orange-500',
    textColor: 'text-orange-600',
    iconBg: 'bg-orange-50',
    priority: 13,
    officialUrls: ['https://www.gov.br/mulheres/pt-br/ligue180'],
  },
  {
    slug: 'farmacia-popular',
    icon: 'Pill',
    accentColor: 'border-l-green-500',
    textColor: 'text-green-600',
    iconBg: 'bg-green-50',
    priority: 14,
    officialUrls: [
      'https://www.gov.br/saude/pt-br/composicao/sectics/farmacia-popular',
    ],
  },
  {
    slug: 'urgencias',
    icon: 'Siren',
    accentColor: 'border-l-red-600',
    textColor: 'text-red-700',
    iconBg: 'bg-red-50',
    priority: 15,
    officialUrls: [
      'https://www.gov.br/saude/pt-br/composicao/saes/samu-192',
    ],
  },
];

export const getSectionBySlug = (slug: string): Section | undefined =>
  SECTIONS.find((s) => s.slug === slug);
