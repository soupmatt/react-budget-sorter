import React from "react";
import { VStack } from "@chakra-ui/react";
import { Droppable } from "react-beautiful-dnd";
import * as types from "./types";
import { BudgetItem } from "./BudgetItem";

export const BudgetItemSorter: React.FunctionComponent<{
  records: types.BudgetItemRecord[];
  onItemDelete: (index: number, item: types.BudgetItem) => void;
  onItemUpdate: (index: number, newItem: types.BudgetItem) => void;
}> = (props) => {
  const budgetItems = props.records.map(
    (value: types.BudgetItemRecord, index: number) => {
      return (
        <BudgetItem
          {...value}
          index={index}
          key={value.name}
          onItemDelete={(item) => props.onItemDelete(index, item)}
          onItemUpdate={(newItem) => props.onItemUpdate(index, newItem)}
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
