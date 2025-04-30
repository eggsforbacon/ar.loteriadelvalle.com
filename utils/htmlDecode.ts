export function decodeHtmlEntities(str: string): string {
  const entities: { [key: string]: string } = {
    '&quot;': '"',
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&nbsp;': ' ',
    '&apos;': "'",
    '&#8220;': '“',
    '&#8221;': '”'
  };

  return str.replace(/&[a-zA-Z0-9#]+;/g, (match) => entities[match] || match);
}