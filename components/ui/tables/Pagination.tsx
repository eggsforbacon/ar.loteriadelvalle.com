import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const Pagination = ({
  page,
  numberOfPages,
  onPageChange,
  label,
}: {
  page: number;
  numberOfPages: number;
  onPageChange: (newPage: number) => void;
  label?: string;
}) => {
  const isSingle = numberOfPages === 1;
  const renderPages = () => {
    if (numberOfPages <= 5) {
      return (
        <>
          {Array.from({ length: numberOfPages }).map((_, i) => (
            <View key={i}>
              <Text>{i}</Text>
            </View>
          ))}
        </>
      );
    } else {
      return (
        <>
          {Array.from({ length: numberOfPages }).map((_, i) => (
            <View key={i}>
              <Text>{i}</Text>
            </View>
          ))}
        </>
      );
    }
  };

  return (
    <View className="flex flex-row items-center justify-center gap-4 py-8">
      {!isSingle && (
        <>
          <View className="flex flex-row items-center justify-start gap-2">
            <TouchableOpacity className="flex aspect-square flex-col items-center justify-center rounded-full bg-primary-600 p-3">
              <AntDesign name="doubleleft" size={16} color="white" />
            </TouchableOpacity>
            <TouchableOpacity className="flex aspect-square flex-col items-center justify-center rounded-full bg-primary-600 p-3">
              <AntDesign name="left" size={16} color="white" />
            </TouchableOpacity>
          </View>
          <View className="flex flex-row items-center justify-start gap-2">{renderPages()}</View>
          <View className="flex flex-row items-center justify-start gap-2">
            <TouchableOpacity className="flex aspect-square flex-col items-center justify-center rounded-full bg-primary-600 p-3">
              <AntDesign name="doubleright" size={16} color="white" />
            </TouchableOpacity>
            <TouchableOpacity className="flex aspect-square flex-col items-center justify-center rounded-full bg-primary-600 p-3">
              <AntDesign name="right" size={16} color="white" />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default Pagination;
