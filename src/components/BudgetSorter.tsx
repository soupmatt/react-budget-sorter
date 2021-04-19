import React, { useState } from "react";
import { BudgetItemSorter } from "./BudgetItemSorter";
import data from "../data.json";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import * as types from "../types";
import * as utils from "../utils";
import { DataOutput } from "./DataOutput";
import { HStack, Stat, StatLabel, StatNumber, VStack } from "@chakra-ui/react";
import { AddBudgetItemForm } from "./AddBudgetItemForm";
import { EditableField } from "./EditableField";

export const BudgetSorter = () => {
  function reorder<T>(list: T[], startIndex: number, endIndex: number): T[] {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  }

  function updateStateAndSave(
    newData: types.PropSubset<types.BudgetSorterState>
  ) {
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

  function onItemAdd(newItem: types.BudgetItem) {
    const records = state.records;
    records.splice(0, 0, newItem);
    updateStateAndSave({ records });
  }

  const onItemDelete = (index: number) => {
    const records = state.records;
    records.splice(index, 1);
    updateStateAndSave({ records });
  };

  const onItemUpdate = (index: number, newItem: types.BudgetItem) => {
    const records = state.records;
    const rec = Object.assign({}, records[index], newItem);
    records[index] = rec;
    updateStateAndSave({ records });
  };

  const [state, setState] = useState(data);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <HStack spacing={10} alignItems="start">
        <VStack spacing={4} padding={5}>
          <AddBudgetItemForm onSubmit={onItemAdd} />
          <Stat>
            <StatLabel>Total Amount Available</StatLabel>
            <EditableField
              initialValue={state.totalAmount}
              onSave={(value: number) => {
                onTotalAmountSubmit({ totalAmount: value });
              }}
              onShow={(value: number) => (
                <StatNumber>{utils.formatCurrency(value)}</StatNumber>
              )}
            />
          </Stat>
          <BudgetItemSorter
            {...state}
            onItemDelete={onItemDelete}
            onItemUpdate={onItemUpdate}
          />
        </VStack>
        <VStack spacing={4} padding={5}>
          <DataOutput {...state} />
        </VStack>
      </HStack>
    </DragDropContext>
  );
};
