import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { forwardRef, useState } from "react";
import { View, Text, Image, ImageSourcePropType, TouchableOpacity } from "react-native";

import BottomSheetModalView from "~/components/bottom-sheet";

type _Props = object;

type SecurityMeasure = {
  title: string;
  description: string;
  uri: ImageSourcePropType[];
};

const TutorialBottomSheet = forwardRef<BottomSheetModal, _Props>((_, modalRef) => {
  const securityMeasures: SecurityMeasure[] = [
    {
      title: "Verifica a contraluz",
      description:
        "Sostén el billete a contraluz. El primer semicírculo se completará perfectamente si tu billete es legal",
      uri: [
        require("./../../assets/images/ar/security/Backlight_OFF.png"),
        require("./../../assets/images/ar/security/Backlight_ON.png"),
      ],
    },
    {
      title: "Cambia de color al frotar",
      description:
        "Frota el círculo rosado con tu dedo. Verás al círculo de color desaparecer si tu billete es legal.",
      uri: [
        require("./../../assets/images/ar/security/Friction_OFF.png"),
        require("./../../assets/images/ar/security/Friction_ON.png"),
      ],
    },
    {
      title: "Raspa con una moneda",
      description:
        "Con una moneda raspa el último círculo. Cambiará de color si tu billete es legal.",
      uri: [
        require("./../../assets/images/ar/security/Coin_OFF.png"),
        require("./../../assets/images/ar/security/Coin_ON.png"),
      ],
    },
  ];

  const RenderMeasure = ({ title, uri, description }: SecurityMeasure) => {
    const [open, setOpen] = useState<boolean>(false);

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setOpen(!open)}
        className={`flex items-center justify-between gap-4 transition-all duration-200 ease-in-out ${open ? "flex-col" : "flex-row"}`}>
        <View
          className={`relative transition-all duration-200 ease-in-out ${open ? "order-1 !h-52 !w-52" : "order-none h-24 w-24"}`}>
          <Image
            source={uri[0]}
            className={`${open ? "h-52 w-52" : "h-24 w-24"} absolute transition-all duration-200 ease-in-out`}
          />
          {open && (
            <Image
              source={uri[1]}
              className={`absolute left-0 top-0 h-52 w-52 ${open ? "opacity-100" : "opacity-0"}`}
            />
          )}
        </View>
        <View
          className={`flex flex-1 flex-col items-stretch justify-center gap-2 transition-all duration-200 ease-in-out `}>
          <Text className="text-2xl">{title}</Text>
          <Text className="text-wrap">{description}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <BottomSheetModalView ref={modalRef} snaps={["60%", "100%"]}>
      <Text className="text-4xl font-semibold">¿Cómo funciona?</Text>
      <View className="flex flex-col gap-8">
        <Text className="text-lg text-neutral-700">
          ¡Desde esta pantalla podrás ver nuestras campañas actuales en realidad aumentada! También
          puedes ver nuestras medidas de seguridad
        </Text>
        <View className="flex flex-col items-stretch justify-start gap-16">
          {securityMeasures.map((sec, i) => {
            return (
              <RenderMeasure
                key={i}
                title={sec.title}
                description={sec.description}
                uri={sec.uri}
              />
            );
          })}
        </View>
      </View>
    </BottomSheetModalView>
  );
});

export default TutorialBottomSheet;
