export interface Premio {
  numero: string;
  serie: string;
  premio: string;
}

export interface Sorteo {
  id: number;
  sorteo: string;
  date: string;
  premios: Premio[];
}

export const mockData: Sorteo[] = [
  {
    id: 1,
    sorteo: '1234',
    date: '2025-04-23',
    premios: [
      { numero: '1508', serie: '162', premio: 'Premio Mayor' },
      { numero: '5678', serie: '001', premio: 'Premio de $500,000,000' },
      { numero: '1234', serie: '002', premio: 'Premio de $100,000,000' },
    ],
  },
  {
    id: 2,
    sorteo: '1235',
    date: '2025-04-16',
    premios: [
      { numero: '5679', serie: '002', premio: 'Premio Mayor' },
      { numero: '9876', serie: '003', premio: 'Tercer Premio' },
    ],
  },
  {
    id: 3,
    sorteo: '1236',
    date: '2025-04-09',
    premios: [
      { numero: '5679', serie: '002', premio: 'Premio Mayor' },
      { numero: '9876', serie: '003', premio: 'Tercer Premio' },
    ],
  },
  {
    id: 4,
    sorteo: '1237',
    date: '2025-04-02',
    premios: [
      { numero: '5679', serie: '002', premio: 'Premio Mayor' },
      { numero: '9876', serie: '003', premio: 'Tercer Premio' },
    ],
  },
  {
    id: 5,
    sorteo: '1238',
    date: '2025-03-26',
    premios: [
      { numero: '5679', serie: '002', premio: 'Premio Mayor' },
      { numero: '9876', serie: '003', premio: 'Tercer Premio' },
    ],
  },
  {
    id: 6,
    sorteo: '1239',
    date: '2025-03-19',
    premios: [
      { numero: '5679', serie: '002', premio: 'Premio Mayor' },
      { numero: '9876', serie: '003', premio: 'Tercer Premio' },
    ],
  },
];