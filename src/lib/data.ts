// DADOS DE EXCESSO / MOCK DE IMÓVEIS E PROJETOS DA APLICAÇÃO

export interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  type: 'Apartamento' | 'Casa' | 'Terreno' | 'Comercial';
  status: 'Venda' | 'Aluguel';
  area: number;
  bedrooms: number;
  bathrooms: number;
  imageUrl: string;
  featured?: boolean;
}

export interface Project {
  id: string;
  title: string;
  category: 'Infraestrutura' | 'Residencial' | 'Comercial' | 'Reforma';
  location: string;
  year: number;
  imageUrl: string;
  description: string;
}

export const properties: Property[] = [
  {
    id: '1',
    title: 'Edifício Horizon Penthouse',
    location: 'Bairro Nobre, São Paulo',
    price: 3500000,
    type: 'Apartamento',
    status: 'Venda',
    area: 280,
    bedrooms: 4,
    bathrooms: 5,
    imageUrl: 'https://picsum.photos/seed/45/800/600',
    featured: true,
  },
  {
    id: '2',
    title: 'Casa das Palmeiras Modernistas',
    location: 'Alphaville, Barueri',
    price: 4200000,
    type: 'Casa',
    status: 'Venda',
    area: 450,
    bedrooms: 5,
    bathrooms: 6,
    imageUrl: 'https://picsum.photos/seed/78/800/600',
    featured: true,
  },
  {
    id: '3',
    title: 'Loft Industrial Central',
    location: 'Centro Histórico, Rio de Janeiro',
    price: 7500,
    type: 'Apartamento',
    status: 'Aluguel',
    area: 95,
    bedrooms: 1,
    bathrooms: 2,
    imageUrl: 'https://picsum.photos/seed/23/800/600',
  },
  {
    id: '4',
    title: 'Mansão Vista Mar',
    location: 'Angra dos Reis, RJ',
    price: 12000000,
    type: 'Casa',
    status: 'Venda',
    area: 800,
    bedrooms: 6,
    bathrooms: 8,
    imageUrl: 'https://picsum.photos/seed/mar1/800/600',
  }
];

export const projects: Project[] = [
  {
    id: 'p1',
    title: 'Ponte Estaiada Metropolitan',
    category: 'Infraestrutura',
    location: 'Grande SP',
    year: 2023,
    description: 'Complexo viário integrando bairros com tecnologia de ponta em concreto protendido.',
    imageUrl: 'https://picsum.photos/seed/99/800/600',
  },
  {
    id: 'p2',
    title: 'Corporate Tower Alpha',
    category: 'Comercial',
    location: 'Avenida Faria Lima, SP',
    year: 2022,
    description: 'Sede corporativa com certificação LEED Platinum e fachada em vidro duplo.',
    imageUrl: 'https://picsum.photos/seed/101/800/600',
  }
];

export type Propertys = {
  id: number
  slug: string
  title: string
  image: string
  city: string
  state: string
  neighborhood: string
  price: number
  type: "Apartamento" | "Casa" | "Comercial" | "Terreno" | "Cobertura"
  purpose: "Venda" | "Aluguel"
  bedrooms?: number
  bathrooms?: number
  parkingSpots?: number
  area: number
  description: string
}

export type Company = {
  id: number
  slug: string
  name: string
  logo: string
  coverImage: string
  city: string
  state: string
  segment: string
  description: string
  miniDescription: string
  history: string
  email: string
  phone: string
  website?: string
  social: {
    instagram: string
    linkedin: string
    facebook: string
  }
  properties: Propertys[]
}

export const companies: Company[] = [
  {
    id: 1,
    slug: "imobiliaria-horizonte",
    name: "Imobiliária Horizonte",
    logo: "https://picsum.photos/seed/horizonte-logo/500/300",
    coverImage: "https://picsum.photos/seed/horizonte-cover/1400/900",
    city: "Aracaju",
    state: "SE",
    segment: "Imobiliária",
    description:
      "Especializada em imóveis residenciais e comerciais, a Imobiliária Horizonte combina atendimento consultivo, tecnologia e agilidade para conectar pessoas aos imóveis ideais.",
    miniDescription: "Especializada em imóveis residenciais e comerciais com foco em inovação digital.",
    history:
      "Fundada com a missão de modernizar o mercado imobiliário sergipano, a Imobiliária Horizonte cresceu apoiada em três pilares: confiança, inovação e proximidade com o cliente. Ao longo dos anos, consolidou sua atuação em vendas, locações e consultoria imobiliária, construindo uma reputação sólida no mercado regional.",
    email: "contato@horizonte.com.br",
    phone: "(79) 99999-1001",
    website: "https://horizonte.com.br",
    social: {
      instagram: "https://instagram.com/imobiliariahorizonte",
      linkedin: "https://linkedin.com/company/imobiliariahorizonte",
      facebook: "https://facebook.com/imobiliariahorizonte",
    },
    properties: [
      {
        id: 101,
        slug: "apartamento-vista-mar-atalaia",
        title: "Apartamento Vista Mar",
        image: "https://picsum.photos/seed/horizonte-imovel-1/900/700",
        city: "Aracaju",
        state: "SE",
        neighborhood: "Atalaia",
        price: 450000,
        type: "Apartamento",
        purpose: "Venda",
        bedrooms: 3,
        bathrooms: 2,
        parkingSpots: 2,
        area: 98,
        description:
          "Apartamento moderno com excelente ventilação, varanda ampla e localização privilegiada próxima à orla.",
      },
      {
        id: 102,
        slug: "casa-condominio-aruana",
        title: "Casa em Condomínio",
        image: "https://picsum.photos/seed/horizonte-imovel-2/900/700",
        city: "Aracaju",
        state: "SE",
        neighborhood: "Aruana",
        price: 780000,
        type: "Casa",
        purpose: "Venda",
        bedrooms: 4,
        bathrooms: 3,
        parkingSpots: 2,
        area: 180,
        description:
          "Casa espaçosa em condomínio fechado, com área gourmet, quintal e excelente padrão construtivo.",
      },
      {
        id: 103,
        slug: "sala-comercial-jardins",
        title: "Sala Comercial Premium",
        image: "https://picsum.photos/seed/horizonte-imovel-3/900/700",
        city: "Aracaju",
        state: "SE",
        neighborhood: "Jardins",
        price: 320000,
        type: "Comercial",
        purpose: "Venda",
        bathrooms: 1,
        parkingSpots: 1,
        area: 45,
        description:
          "Sala comercial em região estratégica, ideal para consultórios, escritórios e operações administrativas.",
      },
    ],
  },
  {
    id: 2,
    slug: "grupo-atlas",
    name: "Grupo Atlas",
    logo: "https://picsum.photos/seed/atlas-logo/500/300",
    coverImage: "https://picsum.photos/seed/atlas-cover/1400/900",
    city: "Salvador",
    state: "BA",
    segment: "Construção",
    description:
      "Empresa voltada para desenvolvimento urbano e construção civil, com atuação em obras residenciais, comerciais e projetos de infraestrutura.",
    miniDescription: "Referência em construção civil e desenvolvimento urbano.",
    history:
      "O Grupo Atlas surgiu com foco em entregar empreendimentos que unissem engenharia, durabilidade e visão de longo prazo. Com uma trajetória marcada por projetos robustos e compromisso com qualidade, a empresa se consolidou como referência em construção civil no Nordeste.",
    email: "contato@grupoatlas.com.br",
    phone: "(71) 99999-2002",
    website: "https://grupoatlas.com.br",
    social: {
      instagram: "https://instagram.com/grupoatlas",
      linkedin: "https://linkedin.com/company/grupoatlas",
      facebook: "https://facebook.com/grupoatlas",
    },
    properties: [
      {
        id: 201,
        slug: "cobertura-luxo-barra",
        title: "Cobertura de Luxo na Barra",
        image: "https://picsum.photos/seed/atlas-imovel-1/900/700",
        city: "Salvador",
        state: "BA",
        neighborhood: "Barra",
        price: 1850000,
        type: "Cobertura",
        purpose: "Venda",
        bedrooms: 4,
        bathrooms: 5,
        parkingSpots: 3,
        area: 260,
        description:
          "Cobertura sofisticada com vista panorâmica, acabamentos premium e área de lazer privativa.",
      },
      {
        id: 202,
        slug: "casa-alto-padrao-pituba",
        title: "Casa Alto Padrão na Pituba",
        image: "https://picsum.photos/seed/atlas-imovel-2/900/700",
        city: "Salvador",
        state: "BA",
        neighborhood: "Pituba",
        price: 1350000,
        type: "Casa",
        purpose: "Venda",
        bedrooms: 5,
        bathrooms: 4,
        parkingSpots: 3,
        area: 240,
        description:
          "Casa ampla em bairro nobre, ideal para famílias que buscam conforto, segurança e localização estratégica.",
      },
      {
        id: 203,
        slug: "terreno-avenida-paralela",
        title: "Terreno Comercial na Paralela",
        image: "https://picsum.photos/seed/atlas-imovel-3/900/700",
        city: "Salvador",
        state: "BA",
        neighborhood: "Paralela",
        price: 980000,
        type: "Terreno",
        purpose: "Venda",
        area: 600,
        description:
          "Terreno com excelente potencial para incorporação ou implantação de operação comercial.",
      },
    ],
  },
  {
    id: 3,
    slug: "nexus-realty",
    name: "Nexus Realty",
    logo: "https://picsum.photos/seed/nexus-logo/500/300",
    coverImage: "https://picsum.photos/seed/nexus-cover/1400/900",
    city: "Recife",
    state: "PE",
    segment: "Tecnologia",
    description:
      "A Nexus Realty une inteligência de dados, operação comercial e tecnologia imobiliária para acelerar resultados e melhorar a experiência do cliente.",
    miniDescription: "Empresa focada em tecnologia e gestão inteligente de imóveis.",
    history:
      "Criada para ser uma imobiliária orientada por tecnologia, a Nexus Realty nasceu com o objetivo de transformar a jornada de compra, venda e locação em algo mais simples, inteligente e eficiente. Sua atuação combina ferramentas digitais, análise de dados e atendimento consultivo.",
    email: "contato@nexusrealty.com.br",
    phone: "(81) 99999-3003",
    website: "https://nexusrealty.com.br",
    social: {
      instagram: "https://instagram.com/nexusrealty",
      linkedin: "https://linkedin.com/company/nexusrealty",
      facebook: "https://facebook.com/nexusrealty",
    },
    properties: [
      {
        id: 301,
        slug: "apartamento-boa-viagem",
        title: "Apartamento em Boa Viagem",
        image: "https://picsum.photos/seed/nexus-imovel-1/900/700",
        city: "Recife",
        state: "PE",
        neighborhood: "Boa Viagem",
        price: 620000,
        type: "Apartamento",
        purpose: "Venda",
        bedrooms: 3,
        bathrooms: 2,
        parkingSpots: 2,
        area: 110,
        description:
          "Apartamento bem localizado, com planta funcional e proximidade de serviços, escolas e áreas de lazer.",
      },
      {
        id: 302,
        slug: "sala-corporativa-recife-antigo",
        title: "Sala Corporativa no Recife Antigo",
        image: "https://picsum.photos/seed/nexus-imovel-2/900/700",
        city: "Recife",
        state: "PE",
        neighborhood: "Recife Antigo",
        price: 5400,
        type: "Comercial",
        purpose: "Aluguel",
        bathrooms: 2,
        parkingSpots: 2,
        area: 85,
        description:
          "Espaço corporativo para empresas que buscam localização estratégica e ambiente profissional moderno.",
      },
      {
        id: 303,
        slug: "casa-condominio-aldeia",
        title: "Casa em Condomínio em Aldeia",
        image: "https://picsum.photos/seed/nexus-imovel-3/900/700",
        city: "Recife",
        state: "PE",
        neighborhood: "Aldeia",
        price: 890000,
        type: "Casa",
        purpose: "Venda",
        bedrooms: 4,
        bathrooms: 3,
        parkingSpots: 2,
        area: 190,
        description:
          "Casa com excelente integração de ambientes, área verde e proposta ideal para moradia familiar.",
      },
    ],
  }
];