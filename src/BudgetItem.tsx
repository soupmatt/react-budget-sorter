import React from "react";
import { Grid, Text } from "@chakra-ui/react";
import { DragHandleIcon } from "@chakra-ui/icons";
import { Draggable } from "react-beautiful-dnd";

export interface DataItem {
  name: string;
  amount: number;
}

export interface BudgetItemProps {
  data: DataItem;
  index: number;
  runningTotal: number;
}

export const BudgetItem: React.FunctionComponent<BudgetItemProps> = (
  props: BudgetItemProps
) => {
  return (
    <Draggable
      draggableId={props.data.name}
      index={props.index}
      key={props.data.name}
    >
      {(provided) => (
        <Grid
          templateColumns="min-content 2fr 1fr 1fr"
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div {...provided.dragHandleProps}>
            <DragHandleIcon mr={2} />
          </div>
          <Text>{props.data.name}</Text>
          <Text textAlign="right">{props.data.amount}</Text>
          <Text textAlign="right">{props.runningTotal}</Text>
        </Grid>
      )}
    </Draggable>
  );
};
