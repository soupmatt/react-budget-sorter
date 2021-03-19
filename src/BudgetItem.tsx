import React from "react";
import { Grid, Text } from "@chakra-ui/react";
import { DragHandleIcon } from "@chakra-ui/icons";
import { Draggable } from "react-beautiful-dnd";
import * as types from "./types";

export interface BudgetItemProps extends types.BudgetItemRecord {
  index: number;
}

export const BudgetItem: React.FunctionComponent<BudgetItemProps> = (
  props: BudgetItemProps
) => {
  return (
    <Draggable draggableId={props.name} index={props.index} key={props.name}>
      {(provided) => (
        <Grid
          templateColumns="min-content 2fr 1fr 1fr"
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div {...provided.dragHandleProps}>
            <DragHandleIcon mr={2} />
          </div>
          <Text>{props.name}</Text>
          <Text textAlign="right">{props.amount}</Text>
          <Text textAlign="right">{props.runningTotal}</Text>
        </Grid>
      )}
    </Draggable>
  );
};
