import React from "react";
import * as types from "./types";
import { useClipboard, Button, VStack, Text } from "@chakra-ui/react";

export const DataOutput: React.FunctionComponent<{
  data: types.BudgetItem[];
}> = ({ data }) => {
  const result = data.map((i) => {
    return { name: i.name, amount: i.amount };
  });
  const jsonStr = JSON.stringify(result, null, 2);

  const { hasCopied, onCopy } = useClipboard(jsonStr);

  return (
    <VStack>
      <Button onClick={onCopy} colorScheme="teal">
        {hasCopied ? "Copied" : "Copy Data To Clipboard"}
      </Button>
      <Text as="pre" fontSize="small">
        {jsonStr}
      </Text>
    </VStack>
  );
};
