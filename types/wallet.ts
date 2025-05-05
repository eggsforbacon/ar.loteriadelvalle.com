export type Ticket = {
  imageUri?: string;
  number: string;
  raffle: string;
  series: string;
  date: Date;
  fractions: string[];
};

export function mapParsedToTicket(
  parsed: {
    imageUri: string;
    number: string;
    raffle: string;
    series: string;
    date: string;
    fractions: number[];
  }[]
): Ticket[] {
  const mappedTickets: Ticket[] = [];
  parsed.map((item) => {
    mappedTickets.push({
      ...item,
      date: new Date(item.date),
      fractions: item.fractions.map(String),
    });
  });
  return mappedTickets;
}
