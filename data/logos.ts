export interface Logo {
  id: string;
  image: any;
  url?: string;
}

export const Logos: Logo[] = [
  {
    id: "gobvalle",
    image: require("../assets/logos/LOGO-gobernacion.png"),
    url: "https://www.valledelcauca.gov.co/",
  },
  {
    id: "benevalle",
    image: require("../assets//logos/LOGO-Beneficencia-del-Valle.png"),
    url: "https://benevalle.gov.co/",
  },
  {
    id: "loteria",
    image: require("../assets/logos/LOGO-loteriadelvalle.png"),
    url: "https://loteriadelvalle.com/",
  },
  {
    id: "org4",
    image: require("../assets/logos/LOGO-juegolegal.png"),
    // url: undefined
  },
  {
    id: "gane",
    image: require("../assets/logos/LOGO-gane.png"),
    url: "https://www.gane.com.co/",
  },
  {
    id: "coljuegos",
    image: require("../assets/logos/LOGO-coljuegos.png"),
    url: "https://www.coljuegos.gov.co/",
  },
  {
    id: "supergiros",
    image: require("../assets/logos/LOGO-supergiros.png"),
    url: "https://www.supergiros.com.co/",
  },
];
