
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
