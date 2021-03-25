import React, { useState } from "react";
import { BudgetItemSorter } from "./BudgetItemSorter";
import { TotalForm } from "./TotalForm";
import data from "./data.json";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import * as types from "./types";
import * as utils from "./utils";
import { DataOutput } from "./DataOutput";
import { HStack, Stat, StatLabel, StatNumber, VStack } from "@chakra-ui/react";
import { AddBudgetItemForm } from "./AddBudgetItemForm";

export const BudgetSorter = () => {
  function reorder<T>(list: T[], startIndex: number, endIndex: number): T[] {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  }

  function updateRunningTotals(data: types.BudgetSorterState): void {
    data.records.reduce((runningTotal: number, rec) => {
      rec.runningTotal = runningTotal - rec.amount;
      return rec.runningTotal;
    }, data.totalAmount);
  }

  function updateStateAndSave(
    newData: types.PropSubset<types.BudgetSorterState>
  ) {
    updateRunningTotals({ ...state, ...newData });
    setState({ ...state, ...newData });
  }

  function onDragEnd(result: DropResult) {
    if (!result.destination) {
      return;
    }

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    if (destinationIndex === sourceIndex) {
      return;
    }

    const records = reorder(state.records, sourceIndex, destinationIndex);

    updateStateAndSave({ records });
  }

  function onTotalAmountSubmit({ totalAmount }: { totalAmount: number }) {
    updateStateAndSave({ totalAmount });
  }

  function itemToRecord(item: types.BudgetItem): types.BudgetItemRecord {
    return { ...item, runningTotal: 0 };
  }

  function onItemAdd(newItem: types.BudgetItem) {
    const records = state.records;
    records.splice(0, 0, itemToRecord(newItem));
    updateStateAndSave({ records });
  }

  const onItemDelete = (index: number) => {
    const records = state.records;
    records.splice(index, 1);
    updateRunningTotals({ ...state, records });
    setState({ ...state, records });
  };

  const records: types.BudgetItemRecord[] = data.records.map(itemToRecord);
  updateRunningTotals({ ...data, records });

  const [state, setState] = useState({
    ...data,
    records,
  });

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <HStack spacing={10} alignItems="start">
        <VStack spacing={4} padding={5}>
          <HStack spacing={10}>
            <TotalForm onSubmit={onTotalAmountSubmit} />
            <Stat>
              <StatLabel>Total Amount Available</StatLabel>
              <StatNumber>{utils.formatCurrency(state.totalAmount)}</StatNumber>
            </Stat>
          </HStack>
          <AddBudgetItemForm onSubmit={onItemAdd} />
          <BudgetItemSorter {...state} onItemDelete={onItemDelete} />
        </VStack>
        <VStack spacing={4} padding={5}>
          <DataOutput {...state} />
        </VStack>
      </HStack>
    </DragDropContext>
  );
};
