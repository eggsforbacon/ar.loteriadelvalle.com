export interface Prize {
  number: string;
  series: string;
  prize: string;
}

export interface Draw {
  id: number;
  draw: string;
  date: string;
  prizes: Prize[];
}

export const mockData: Draw[] = [
  {
    id: 1,
    draw: '1234',
    date: '2025-04-23',
    prizes: [
      { number: '1508', series: '162', prize: 'Premio Mayor' },
      { number: '5678', series: '001', prize: 'Premio de $500,000,000' },
      { number: '1234', series: '002', prize: 'Premio de $100,000,000' },
    ],
  },
  {
    id: 2,
    draw: '1235',
    date: '2025-04-16',
    prizes: [
      { number: '5679', series: '002', prize: 'Premio Mayor' },
      { number: '9876', series: '003', prize: 'Tercer Premio' },
    ],
  },
  {
    id: 3,
    draw: '1236',
    date: '2025-04-09',
    prizes: [
      { number: '5679', series: '002', prize: 'Premio Mayor' },
      { number: '9876', series: '003', prize: 'Tercer Premio' },
    ],
  },
  {
    id: 4,
    draw: '1237',
    date: '2025-04-02',
    prizes: [
      { number: '5679', series: '002', prize: 'Premio Mayor' },
      { number: '9876', series: '003', prize: 'Tercer Premio' },
    ],
  },
  {
    id: 5,
    draw: '1238',
    date: '2025-03-26',
    prizes: [
      { number: '5679', series: '002', prize: 'Premio Mayor' },
      { number: '9876', series: '003', prize: 'Tercer Premio' },
    ],
  },
  {
    id: 6,
    draw: '1239',
    date: '2025-03-19',
    prizes: [
      { number: '5679', series: '002', prize: 'Premio Mayor' },
      { number: '9876', series: '003', prize: 'Tercer Premio' },
    ],
  },
];