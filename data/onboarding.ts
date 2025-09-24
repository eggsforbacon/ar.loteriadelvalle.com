import { OnboardingItemProps } from "~/components/OnboardingItem";

export default [
  {
    id: "1",
    title: "Detección de fraude asistida",
    description:
      "Te brindamos asistencia interactiva con Realidad Aumentada para conocer cómo detectar billetes fraudulentos.",
    image: require("./../assets/images/onboarding/1.png"),
  },
  {
    id: "2",
    title: "Tus billetes en tu celular",
    description:
      "¿Estás en la calle y tu billete en casa? Revisa tus billetes comprados desde la app, ¡con tranquilidad!*",
    image: require("./../assets/images/onboarding/2.png"),
    liability:
      "*La presentación de billetes digitales no es una forma válida para reclamar tu premio. Haz click aquí para conocer más",
    liabilityUrl: "https://benevalle.gov.co/preguntas-frecuentes",
  },
  {
    id: "3",
    title: "Resultados en vivo",
    description:
      "En esta pantalla verás nuestras novedades con realidad aumentada. También encontrarás una guía para asegurarte de la legalidad de tu billete, ¡y así jugarle legal a la salud del Valle!",
    image: require("./../assets/images/onboarding/3.png"),
  },
  /* {
    id: "4",
    title: "Estadísticas y tendencias",
    description: "Trivia y estadísticas de la Lotería del Valle, al alcance de tu mano.",
    image: require("./../assets/images/onboarding/4.png"),
  }, */
] as unknown as OnboardingItemProps[];
