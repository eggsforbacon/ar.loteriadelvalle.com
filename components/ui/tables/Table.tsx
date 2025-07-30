import React, { ReactNode } from "react";
import { View } from "react-native";

const Table = ({
  children,
  separatorClassName,
}: {
  children: ReactNode[];
  separatorClassName?: string;
}) => {
  const elementLast = children.length - 1;
  const header = children[0];
  const rows = children[1] as ReactNode[];
  const pagination = elementLast >= 2 ? children[elementLast] : <View />;

  return (
    <View className="flex flex-col items-stretch justify-start">
      {header}
      {rows.map((row, i) => {
        return (
          <React.Fragment key={i}>
            {row}
            {i !== rows.length - 1 && (
              <View
                className={`h-px w-full ${separatorClassName ? separatorClassName : "bg-neutral-300"} `}
              />
            )}
          </React.Fragment>
        );
      })}
      {pagination}
    </View>
  );
};

export default Table;
