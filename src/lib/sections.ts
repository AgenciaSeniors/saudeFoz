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
  color: string;
  priority: number;
  officialUrls: string[];
}

export const SECTIONS: Section[] = [
  {
    slug: 'primeros-pasos',
    icon: 'DoorOpen',
    color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    priority: 1,
    officialUrls: [
      'https://www.gov.br/saude/pt-br/assuntos/noticias/2025/setembro/novo-cartao-nacional-de-saude-com-cpf-como-funciona-na-pratica',
    ],
  },
  {
    slug: 'embarazo',
    icon: 'Baby',
    color: 'bg-pink-50 text-pink-700 border-pink-200',
    priority: 2,
    officialUrls: [
      'https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/g/gravidez/pre-natal',
    ],
  },
  {
    slug: 'ninos-vacunacion',
    icon: 'Syringe',
    color: 'bg-sky-50 text-sky-700 border-sky-200',
    priority: 3,
    officialUrls: ['https://www.gov.br/saude/pt-br/vacinacao/calendario'],
  },
  {
    slug: 'salud-mujer',
    icon: 'HeartPulse',
    color: 'bg-rose-50 text-rose-700 border-rose-200',
    priority: 4,
    officialUrls: [
      'https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/s/saude-da-mulher',
    ],
  },
  {
    slug: 'diabetes-hipertension',
    icon: 'Activity',
    color: 'bg-red-50 text-red-700 border-red-200',
    priority: 5,
    officialUrls: [
      'https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/d/diabetes',
      'https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/h/hipertensao',
    ],
  },
  {
    slug: 'adultos-mayores',
    icon: 'Users',
    color: 'bg-amber-50 text-amber-700 border-amber-200',
    priority: 6,
    officialUrls: [
      'https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/s/saude-da-pessoa-idosa',
    ],
  },
  {
    slug: 'salud-mental',
    icon: 'Brain',
    color: 'bg-violet-50 text-violet-700 border-violet-200',
    priority: 7,
    officialUrls: [
      'https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/s/saude-mental',
    ],
  },
  {
    slug: 'adicciones',
    icon: 'LifeBuoy',
    color: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    priority: 8,
    officialUrls: [
      'https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/c/caps',
    ],
  },
  {
    slug: 'ist-vih',
    icon: 'ShieldPlus',
    color: 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200',
    priority: 9,
    officialUrls: [
      'https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/i/ist',
    ],
  },
  {
    slug: 'salud-viajero',
    icon: 'Plane',
    color: 'bg-teal-50 text-teal-700 border-teal-200',
    priority: 10,
    officialUrls: [
      'https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/d/dengue',
      'https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/f/febre-amarela',
    ],
  },
  {
    slug: 'salud-bucal',
    icon: 'Smile',
    color: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    priority: 11,
    officialUrls: [
      'https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/s/saude-bucal',
    ],
  },
  {
    slug: 'discapacidad-bpc',
    icon: 'Accessibility',
    color: 'bg-lime-50 text-lime-700 border-lime-200',
    priority: 12,
    officialUrls: [
      'https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/s/saude-da-pessoa-com-deficiencia',
    ],
  },
  {
    slug: 'violencia',
    icon: 'ShieldAlert',
    color: 'bg-orange-50 text-orange-700 border-orange-200',
    priority: 13,
    officialUrls: ['https://www.gov.br/mulheres/pt-br/ligue180'],
  },
  {
    slug: 'farmacia-popular',
    icon: 'Pill',
    color: 'bg-green-50 text-green-700 border-green-200',
    priority: 14,
    officialUrls: [
      'https://www.gov.br/saude/pt-br/composicao/sectics/farmacia-popular',
    ],
  },
  {
    slug: 'urgencias',
    icon: 'Siren',
    color: 'bg-red-100 text-red-800 border-red-300',
    priority: 15,
    officialUrls: [
      'https://www.gov.br/saude/pt-br/composicao/saes/samu-192',
    ],
  },
];

export const getSectionBySlug = (slug: string): Section | undefined =>
  SECTIONS.find((s) => s.slug === slug);