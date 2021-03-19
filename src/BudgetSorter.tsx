import React, { useState } from "react";
import { Grid, Text, VStack } from "@chakra-ui/react";
import { DragHandleIcon } from "@chakra-ui/icons";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
interface DataItem {
  name: string;
  amount: number;
}

interface BudgetSorterProps {
  records: DataItem[];
}

interface BudgetItemProps {
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

export const BudgetSorter: React.FunctionComponent<BudgetSorterProps> = (
  props: BudgetSorterProps
) => {
  function reorder<T>(list: T[], startIndex: number, endIndex: number): T[] {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  }

  function onDragEnd(result: DropResult) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const records = reorder(
      state.records,
      result.source.index,
      result.destination.index
    );

    updateRunningTotals(records);

    setState({ records });
  }

  function updateRunningTotals(records: BudgetItemProps[]): void {
    records.reduce((runningTotal: number, rec) => {
      rec.runningTotal = runningTotal + rec.data.amount;
      return rec.runningTotal;
    }, 0);
  }

  const recs: BudgetItemProps[] = props.records.map((data, index) => {
    return { data, index, runningTotal: 0 };
  });
  updateRunningTotals(recs);

  const [state, setState] = useState({ records: recs });

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="list">
        {(provided) => (
          <VStack
            p={8}
            align="left"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {state.records.map((value: BudgetItemProps, index: number) => {
              return <BudgetItem {...value} index={index} />;
            })}
            {provided.placeholder}
          </VStack>
        )}
      </Droppable>
    </DragDropContext>
  );
};
