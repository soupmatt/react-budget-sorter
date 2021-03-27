import React from "react";
import { Grid, IconButton, Text } from "@chakra-ui/react";
import { DeleteIcon, DragHandleIcon } from "@chakra-ui/icons";
import { Draggable } from "react-beautiful-dnd";
import * as types from "./types";
import * as utils from "./utils";
import { EditableField } from "./EditableField";

export interface BudgetItemProps extends types.BudgetItemRecord {
  index: number;
  onItemDelete: (item: types.BudgetItem) => any;
  onItemUpdate: (item: types.BudgetItem) => any;
}

export const BudgetItem: React.FunctionComponent<BudgetItemProps> = (
  props: BudgetItemProps
) => {
  return (
    <Draggable draggableId={props.name} index={props.index}>
      {(provided) => (
        <Grid
          templateColumns="min-content 3fr 2fr 2fr min-content"
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div {...provided.dragHandleProps}>
            <DragHandleIcon mr={2} />
          </div>
          <Text>{props.name}</Text>
          <EditableField
            initialValue={props.amount}
            onSave={(value: number) => {
              props.onItemUpdate({ name: props.name, amount: value });
            }}
            onShow={(value: number) => (
              <Text textAlign="right">{utils.formatCurrency(value)}</Text>
            )}
          />
          <Text
            textAlign="right"
            color={props.runningTotal >= 0 ? "green" : "red"}
          >
            {utils.formatCurrency(props.runningTotal)}
          </Text>
          <IconButton
            ml={5}
            aria-label="remove record"
            icon={<DeleteIcon />}
            onClick={(event) => {
              event.preventDefault();
              props.onItemDelete({ name: props.name, amount: props.amount });
            }}
          />
        </Grid>
      )}
    </Draggable>
  );
};
