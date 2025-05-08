export interface Logo {
  id: string;
  image: any;
  url?: string;
}

export const Logos: Logo[] = [
  {
    id: "loteria",
    image: require("../assets/logos/LOGO-loteriadelvalle.png"),
    url: "https://loteriadelvalle.com/",
  },
  {
    id: "benevalle",
    image: require("../assets//logos/LOGO-Beneficencia-del-Valle.webp"),
    url: "https://benevalle.gov.co/",
  },
  {
    id: "gobvalle",
    image: require("../assets/logos/LOGO-gobernacion.png"),
    url: "https://www.valledelcauca.gov.co/",
  },
  {
    id: "org4",
    image: require("../assets/logos/LOGO-juegolegal.png"),
    // url: undefined
  },
  {
    id: "gane",
    image: require("../assets/logos/LOGO-gane.webp"),
    url: "https://www.gane.com.co/",
  },
  {
    id: "supergiros",
    image: require("../assets/logos/LOGO-supergiros.webp"),
    url: "https://www.supergiros.com.co/",
  },
];