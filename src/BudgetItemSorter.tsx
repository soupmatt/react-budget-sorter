import React from "react";
import { VStack } from "@chakra-ui/react";
import { Droppable } from "react-beautiful-dnd";
import * as types from "./types";
import { BudgetItem } from "./BudgetItem";

export const BudgetItemSorter: React.FunctionComponent<{
  records: types.BudgetItemRecord[];
}> = (props) => {
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
            return <BudgetItem {...value} index={index} key={value.name} />;
          })}
          {provided.placeholder}
        </VStack>
      )}
    </Droppable>
  );
};
