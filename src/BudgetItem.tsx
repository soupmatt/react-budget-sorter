import React from "react";
import { Grid, Text } from "@chakra-ui/react";
import { DragHandleIcon } from "@chakra-ui/icons";
import { Draggable } from "react-beautiful-dnd";
import * as types from "./types";
import * as utils from "./utils";

export interface BudgetItemProps extends types.BudgetItemRecord {
  index: number;
}

export const BudgetItem: React.FunctionComponent<BudgetItemProps> = (
  props: BudgetItemProps
) => {
  return (
    <Draggable draggableId={props.name} index={props.index}>
      {(provided) => (
        <Grid
          templateColumns="min-content 3fr 2fr 2fr"
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div {...provided.dragHandleProps}>
            <DragHandleIcon mr={2} />
          </div>
          <Text>{props.name}</Text>
          <Text textAlign="right">{utils.formatCurrency(props.amount)}</Text>
          <Text
            textAlign="right"
            color={props.runningTotal >= 0 ? "green" : "red"}
          >
            {utils.formatCurrency(props.runningTotal)}
          </Text>
        </Grid>
      )}
    </Draggable>
  );
};
