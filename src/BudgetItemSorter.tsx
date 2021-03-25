import React from "react";
import { VStack } from "@chakra-ui/react";
import { Droppable } from "react-beautiful-dnd";
import * as types from "./types";
import { BudgetItem } from "./BudgetItem";

export const BudgetItemSorter: React.FunctionComponent<{
  records: types.BudgetItemRecord[];
  onItemDelete: types.ItemDeleteFn;
}> = (props) => {
  const budgetItems = props.records.map(
    (value: types.BudgetItemRecord, index: number) => {
      return (
        <BudgetItem
          {...value}
          index={index}
          key={value.name}
          onItemDelete={(e) => props.onItemDelete(index, e)}
        />
      );
    }
  );
  return (
    <Droppable droppableId="list">
      {(provided) => (
        <VStack
          p={8}
          align="left"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {budgetItems}
          {provided.placeholder}
        </VStack>
      )}
    </Droppable>
  );
};
