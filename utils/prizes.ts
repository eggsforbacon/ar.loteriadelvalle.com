import type { Ticket } from '~/types/ticket';
import type { Sorteo, Premio } from '~/data/lottery';

interface MayorCheck {
  test: (n: string, s: string, p: Premio) => boolean;
  message: (n: string, s: string, p: Premio) => string;
  priority: number;
}

const mayorChecks: MayorCheck[] = [
  {
    test: (n, s, p) => n === p.numero && s === p.serie,
    message: () => '🎉 ¡Ganaste el Premio Mayor con número y serie!',
    priority: 100,
  },
  {
    test: (n, s, p) => n === p.numero,
    message: () => '🎉 ¡Ganaste el premio por las cuatro cifras, sin serie!',
    priority: 90,
  },
  {
    test: (_, s, p) => s === p.serie,
    message: () => '🎉 ¡Ganaste el premio por serie!',
    priority: 80,
  },
  {
    test: (n, s, p) => n.slice(0, 2) === p.numero.slice(0, 2) && n.slice(-2) === p.numero.slice(-2),
    message: (n, s, p) =>
      `🎉 ¡Ganaste el premio por primera y últimas dos cifras,${s === p.serie ? ' con serie!' : ' sin serie!'
      }.`,
    priority: 70,
  },
  {
    test: (n, s, p) => n.slice(-1) === p.numero.slice(-1) && n.slice(0, 2) === p.numero.slice(0, 2),
    message: (n, s, p) =>
      `🎉 ¡Ganaste el premio por última y primeras dos cifras,${s === p.serie ? ' con serie!' : ' sin serie!'
      }.`,
    priority: 65,
  },
  {
    test: (n, s, p) => n.slice(0, 3) === p.numero.slice(0, 3),
    message: (n, s, p) =>
      `🎉 ¡Ganaste el premio por las primeras tres cifras,${s === p.serie ? ' con serie!' : ' sin serie!'
      }.`,
    priority: 60,
  },
  {
    test: (n, s, p) => n.slice(-3) === p.numero.slice(-3),
    message: (n, s, p) =>
      `🎉 ¡Ganaste el premio por las últimas tres cifras,${s === p.serie ? ' con serie!' : ' sin serie!'
      }.`,
    priority: 55,
  },
  {
    test: (n, s, p) => n.slice(0, 2) === p.numero.slice(0, 2),
    message: (n, s, p) =>
      `🎉 ¡Ganaste el premio por las primeras dos cifras,${s === p.serie ? ' con serie!' : ' sin serie!'
      }.`,
    priority: 50,
  },
  {
    test: (n, s, p) => n.slice(-2) === p.numero.slice(-2),
    message: (n, s, p) =>
      `🎉 ¡Ganaste el premio por las últimos dos cifras,${s === p.serie ? ' con serie!' : ' sin serie!'
      }.`,
    priority: 45,
  },
  {
    test: (n, s, p) => n.slice(-1) === p.numero.slice(-1),
    message: (n, s, p) =>
      `🎉 ¡Ganaste el premio por última cifra,${s === p.serie ? ' con serie!' : ' sin serie!'
      }.`,
    priority: 40,
  },
];

export function getResultMessage(
  ticket: Ticket,
  sorteos: Sorteo[]
): string {
  if (!ticket.sorteo || !ticket.numero || !ticket.serie) {
    return 'Por favor completa todos los campos antes de consultar.';
  }

  const row = sorteos.find(r => r.sorteo === ticket.sorteo);
  if (!row) {
    return `Sorteo ${ticket.sorteo} no encontrado.`;
  }

  const messages: string[] = [];

  // 1) Revisar premios secos
  row.premios
    .filter(p => p.premio !== 'Premio Mayor')
    .forEach(p => {
      if (ticket.numero === p.numero && ticket.serie === p.serie) {
        messages.push(`🎉 !Ganaste el premio seco, con serie!`);
      } else if (ticket.numero === p.numero) {
        messages.push(`🎉 !Ganaste el premio seco, sin serie!`);
      }
    });

  // 2) Revisar Premio Mayor con prioridades
  const mayor = row.premios.find(p => p.premio === 'Premio Mayor');
  if (mayor) {
    const matched = mayorChecks
      .filter(c => c.test(ticket.numero, ticket.serie, mayor))
      .sort((a, b) => b.priority - a.priority);

    if (matched.length) {
      messages.push(
        matched[0].message(ticket.numero, ticket.serie, mayor)
      );
    }
  }

  if (messages.length === 0) {
    return 'Lo sentimos, no hay suerte esta vez. ¡Sigue intentando!';
  }

  return messages.join('\n');
}