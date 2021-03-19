import React, { useState } from "react";
import { VStack } from "@chakra-ui/react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";

import { BudgetItem, BudgetItemProps, DataItem } from "./BudgetItem";
interface BudgetItemSorterProps {
  records: DataItem[];
}

export const BudgetItemSorter: React.FunctionComponent<BudgetItemSorterProps> = (
  props: BudgetItemSorterProps
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
