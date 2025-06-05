export interface Prize {
  premio: string;
  valorPremio: string;
  cantidad: number;
  valorNetoBillete: string;
  valorNetoFraccion: string;
}

export const planDePremios: Prize[] = [
  { premio: 'Premio Mayor', valorPremio: '$ 9.000.000.000', cantidad: 1, valorNetoBillete: '$ 5.976.000.000', valorNetoFraccion: '$ 1.992.000.000' },
  { premio: 'Seco $ 500 millones', valorPremio: '$ 500.000.000', cantidad: 1, valorNetoBillete: '$ 332.000.000', valorNetoFraccion: '$ 110.666.667' },
  { premio: 'Secos $ 100 millones', valorPremio: '$ 100.000.000', cantidad: 2, valorNetoBillete: '$ 66.400.000', valorNetoFraccion: '$ 22.133.333' },
  { premio: 'Secos $ 60 millones', valorPremio: '$ 60.000.000', cantidad: 3, valorNetoBillete: '$ 39.840.000', valorNetoFraccion: '$ 13.280.000' },
  { premio: 'Secos $ 40 millones', valorPremio: '$ 40.000.000', cantidad: 1, valorNetoBillete: '$ 26.560.000', valorNetoFraccion: '$ 8.853.333' },
  { premio: 'Secos $ 30 millones', valorPremio: '$ 30.000.000', cantidad: 25, valorNetoBillete: '$ 19.920.000', valorNetoFraccion: '$ 6.640.000' },
];

export const aproximacionesConSerie: Prize[] = [
  { premio: 'POSTERIOR', valorPremio: '$ 5.800.000', cantidad: 1, valorNetoBillete: '$ 3.851.200', valorNetoFraccion: '$ 1.604.667' },
  { premio: 'ANTERIOR', valorPremio: '$ 5.800.000', cantidad: 1, valorNetoBillete: '$ 3.851.200', valorNetoFraccion: '$ 1.604.667' },
  { premio: 'SERIE', valorPremio: '$ 21.687', cantidad: 8908, valorNetoBillete: '$ 18.000', valorNetoFraccion: '$ 6.000' },
  { premio: 'TRES PRIMERAS CIFRAS DEL MAYOR', valorPremio: '$ 8.674.699', cantidad: 891, valorNetoBillete: '$ 5.760.000', valorNetoFraccion: '$ 1.920.000' },
  { premio: 'TRES ULTIMAS CIFRAS DEL MAYOR', valorPremio: '$ 8.674.699', cantidad: 81, valorNetoBillete: '$ 5.760.000', valorNetoFraccion: '$ 1.920.000' },
  { premio: 'DOS PRIMERAS CIFRAS Y ULTIMA DEL MAYOR', valorPremio: '$ 8.674.699', cantidad: 81, valorNetoBillete: '$ 5.760.000', valorNetoFraccion: '$ 1.920.000' },
  { premio: 'PRIMERA CIFRA Y DOS ULTIMAS DEL MAYOR', valorPremio: '$ 8.674.699', cantidad: 9, valorNetoBillete: '$ 5.760.000', valorNetoFraccion: '$ 1.920.000' },
  { premio: 'DOS PRIMERAS CIFRAS DEL MAYOR', valorPremio: '$ 867.470', cantidad: 9, valorNetoBillete: '$ 720.000', valorNetoFraccion: '$ 240.000' },
  { premio: 'DOS ULTIMAS CIFRAS DEL MAYOR', valorPremio: '$ 867.470', cantidad: 9, valorNetoBillete: '$ 720.000', valorNetoFraccion: '$ 240.000' },
  { premio: 'ULTIMA CIFRA DEL MAYOR', valorPremio: '$ 43.373', cantidad: 9, valorNetoBillete: '$ 36.000', valorNetoFraccion: '$ 12.000' },
];

export const aproximacionesDiferenteSerie: Prize[] = [
  { premio: 'ULTIMA', valorPremio: '$ 21.687', cantidad: 221859, valorNetoBillete: '$ 18.000', valorNetoFraccion: '$ 6.000' },
  { premio: 'DOS ULTIMAS', valorPremio: '$ 43.373', cantidad: 20169, valorNetoBillete: '$ 36.000', valorNetoFraccion: '$ 12.000' },
  { premio: 'DOS PRIMERAS', valorPremio: '$ 43.373', cantidad: 20169, valorNetoBillete: '$ 36.000', valorNetoFraccion: '$ 12.000' },
  { premio: 'TRES PRIMERAS', valorPremio: '$ 65.060', cantidad: 2241, valorNetoBillete: '$ 54.000', valorNetoFraccion: '$ 18.000' },
  { premio: 'TRES ULTIMAS', valorPremio: '$ 65.060', cantidad: 2241, valorNetoBillete: '$ 54.000', valorNetoFraccion: '$ 18.000' },
  { premio: 'DOS PRIMERAS Y ULTIMA', valorPremio: '$ 65.060', cantidad: 2241, valorNetoBillete: '$ 54.000', valorNetoFraccion: '$ 18.000' },
  { premio: 'PRIMERA Y DOS ULTIMA', valorPremio: '$ 65.060', cantidad: 2241, valorNetoBillete: '$ 54.000', valorNetoFraccion: '$ 18.000' },
  { premio: 'CUATRO CIFRAS', valorPremio: '$ 5.800.000', cantidad: 249, valorNetoBillete: '$ 3.851.200', valorNetoFraccion: '$ 1.604.667' },
  { premio: 'SECOS EN DIFERENTE SERIE', valorPremio: '$ 43.373', cantidad: 7470, valorNetoBillete: '$ 36.000', valorNetoFraccion: '$ 12.000' },
];