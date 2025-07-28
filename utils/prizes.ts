import type { Ticket } from '~/types/ticket';
import type { Draw, Prize } from '~/data/lottery';

interface MayorCheck {
  test: (n: string, s: string, p: Prize) => boolean;
  message: (n: string, s: string, p: Prize) => string;
  priority: number;
}

const mayorChecks: MayorCheck[] = [
  {
    test: (n, s, p) => n === p.number && s === p.series,
    message: () => '🎉 ¡Ganaste el Premio Mayor con número y serie!',
    priority: 100,
  },
  {
    test: (n, s, p) => n === p.number,
    message: () => '🎉 ¡Ganaste el premio por las cuatro cifras, sin serie!',
    priority: 90,
  },
  {
    test: (_, s, p) => s === p.series,
    message: () => '🎉 ¡Ganaste el premio por serie!',
    priority: 80,
  },
  {
    test: (n, s, p) => n.slice(0, 2) === p.number.slice(0, 2) && n.slice(-2) === p.number.slice(-2),
    message: (n, s, p) =>
      `🎉 ¡Ganaste el premio por primera y últimas dos cifras,${s === p.series ? ' con serie!' : ' sin serie!'
      }.`,
    priority: 70,
  },
  {
    test: (n, s, p) => n.slice(-1) === p.number.slice(-1) && n.slice(0, 2) === p.number.slice(0, 2),
    message: (n, s, p) =>
      `🎉 ¡Ganaste el premio por última y primeras dos cifras,${s === p.series ? ' con serie!' : ' sin serie!'
      }.`,
    priority: 65,
  },
  {
    test: (n, s, p) => n.slice(0, 3) === p.number.slice(0, 3),
    message: (n, s, p) =>
      `🎉 ¡Ganaste el premio por las primeras tres cifras,${s === p.series ? ' con serie!' : ' sin serie!'
      }.`,
    priority: 60,
  },
  {
    test: (n, s, p) => n.slice(-3) === p.number.slice(-3),
    message: (n, s, p) =>
      `🎉 ¡Ganaste el premio por las últimas tres cifras,${s === p.series ? ' con serie!' : ' sin serie!'
      }.`,
    priority: 55,
  },
  {
    test: (n, s, p) => n.slice(0, 2) === p.number.slice(0, 2),
    message: (n, s, p) =>
      `🎉 ¡Ganaste el premio por las primeras dos cifras,${s === p.series ? ' con serie!' : ' sin serie!'
      }.`,
    priority: 50,
  },
  {
    test: (n, s, p) => n.slice(-2) === p.number.slice(-2),
    message: (n, s, p) =>
      `🎉 ¡Ganaste el premio por las últimos dos cifras,${s === p.series ? ' con serie!' : ' sin serie!'
      }.`,
    priority: 45,
  },
  {
    test: (n, s, p) => n.slice(-1) === p.number.slice(-1),
    message: (n, s, p) =>
      `🎉 ¡Ganaste el premio por última cifra,${s === p.series ? ' con serie!' : ' sin serie!'
      }.`,
    priority: 40,
  },
];

export function getResultMessage(
  ticket: Ticket,
  sorteos: Draw[]
): string {
  if (!ticket.draw || !ticket.number || !ticket.series) {
    return 'Por favor completa todos los campos antes de consultar.';
  }

  const row = sorteos.find(r => r.draw === ticket.draw);
  if (!row) {
    return `Sorteo ${ticket.draw} no encontrado.`;
  }

  const messages: string[] = [];

  // 1) Revisar premios secos
  row.prizes
    .filter(p => p.prize.toUpperCase() !== 'PREMIO MAYOR')
    .forEach(p => {
      if (ticket.number === p.number && ticket.series === p.series) {
        messages.push(`🎉 ¡Ganaste el premio seco, con serie!`);
      } else if (ticket.number === p.number) {
        messages.push(`🎉 ¡Ganaste el premio seco, sin serie!`);
      }
    });

  // 2) Revisar Premio Mayor con prioridades
  const mayor = row.prizes.find(p => p.prize.toUpperCase() === 'PREMIO MAYOR');
  if (mayor) {
    const matched = mayorChecks
      .filter(c => c.test(ticket.number, ticket.series, mayor))
      .sort((a, b) => b.priority - a.priority);

    if (matched.length) {
      messages.push(
        matched[0].message(ticket.number, ticket.series, mayor)
      );
    }
  }

  if (messages.length === 0) {
    return 'Lo sentimos, no hay suerte esta vez. ¡Sigue intentando!';
  }

  return messages.join('\n');
}