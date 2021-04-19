import React from "react";
import * as types from "../types";
import { useClipboard, Button, VStack, Text } from "@chakra-ui/react";

export const DataOutput: React.FunctionComponent<types.BudgetSorterState> = (
  data
) => {
  const records = data.records.map((i) => {
    return { name: i.name, amount: i.amount };
  });
  const result = {
    ...data,
    records,
  };
  const jsonStr = JSON.stringify(result, null, 2);

  const { hasCopied, onCopy } = useClipboard(jsonStr);

  return (
    <VStack>
      <Button onClick={onCopy} colorScheme="teal">
        {hasCopied ? "Copied" : "Copy Data To Clipboard"}
      </Button>
      <Text as="pre" fontSize="x-small">
        {jsonStr}
      </Text>
    </VStack>
  );
};
