import React, { useState } from "react";
import { BudgetItemSorter } from "./BudgetItemSorter";
import data from "./data.json";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import * as types from "./types";

export const BudgetSorter = () => {
  function reorder<T>(list: T[], startIndex: number, endIndex: number): T[] {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  }

  function updateRunningTotals(records: types.BudgetItemRecord[]): void {
    records.reduce((runningTotal: number, rec) => {
      rec.runningTotal = runningTotal + rec.amount;
      return rec.runningTotal;
    }, 0);
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

  const records: types.BudgetItemRecord[] = data.map((data) => {
    return { ...data, runningTotal: 0 };
  });
  updateRunningTotals(records);

  const [state, setState] = useState({ records });

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <BudgetItemSorter records={state.records} />
    </DragDropContext>
  );
};
