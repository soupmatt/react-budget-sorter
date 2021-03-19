import React, { useState } from "react";
import { BudgetItemSorter } from "./BudgetItemSorter";
import { TotalForm } from "./TotalForm";
import data from "./data.json";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import * as types from "./types";
import * as utils from "./utils";
import { VStack } from "@chakra-ui/layout";
import { Stat, StatLabel, StatNumber } from "@chakra-ui/stat";

export const BudgetSorter = () => {
  function reorder<T>(list: T[], startIndex: number, endIndex: number): T[] {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  }

  function updateRunningTotals(
    records: types.BudgetItemRecord[],
    totalAmount: number
  ): void {
    records.reduce((runningTotal: number, rec) => {
      rec.runningTotal = runningTotal - rec.amount;
      return rec.runningTotal;
    }, totalAmount);
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

    updateRunningTotals(records, state.totalAmount);

    setState({ ...state, records });
  }

  function onTotalAmountSubmit({ totalAmount }: { totalAmount: number }) {
    updateRunningTotals(state.records, totalAmount);
    setState({ ...state, totalAmount });
  }

  const records: types.BudgetItemRecord[] = data.map((data) => {
    return { ...data, runningTotal: 0 };
  });
  updateRunningTotals(records, 0);

  const [state, setState] = useState({ records, totalAmount: 0 });

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <VStack spacing={4} padding={5}>
        <TotalForm onSubmit={onTotalAmountSubmit} />
        <Stat>
          <StatLabel>Total Amount Available</StatLabel>
          <StatNumber>{utils.formatCurrency(state.totalAmount)}</StatNumber>
        </Stat>
        <BudgetItemSorter {...state} />
      </VStack>
    </DragDropContext>
  );
};
