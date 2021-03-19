import React from "react";
import { VStack } from "@chakra-ui/react";
import { Droppable } from "react-beautiful-dnd";
import * as types from "./types";
import { BudgetItem } from "./BudgetItem";
interface BudgetItemSorterProps {
  records: types.BudgetItemRecord[];
}

export const BudgetItemSorter: React.FunctionComponent<BudgetItemSorterProps> = (
  props: BudgetItemSorterProps
) => {
  return (
    <Droppable droppableId="list">
      {(provided) => (
        <VStack
          p={8}
          align="left"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {props.records.map((value: types.BudgetItemRecord, index: number) => {
            return <BudgetItem {...value} index={index} />;
          })}
          {provided.placeholder}
        </VStack>
      )}
    </Droppable>
  );
};
