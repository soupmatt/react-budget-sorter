import * as React from "react";
import { BudgetItemSorter } from "./BudgetItemSorter";
import data from "../data.json";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import * as types from "../types";
import * as utils from "../utils";
import { DataOutput } from "./DataOutput";
import { HStack, Stat, StatLabel, StatNumber, VStack } from "@chakra-ui/react";
import { AddBudgetItemForm } from "./AddBudgetItemForm";
import { EditableField } from "./EditableField";

export class BudgetSorter extends React.Component<{}, types.BudgetSorterState> {
  constructor(props = {}) {
    super(props);
    this.state = data;

    this.onTotalAmountSubmit = this.onTotalAmountSubmit.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.onItemAdd = this.onItemAdd.bind(this);
    this.onTotalAmountSubmit = this.onTotalAmountSubmit.bind(this);
    this.onItemDelete = this.onItemDelete.bind(this);
    this.onItemUpdate = this.onItemUpdate.bind(this);
  }

  reorder<T>(list: T[], startIndex: number, endIndex: number): T[] {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  }

  onDragEnd(result: DropResult) {
    if (!result.destination) {
      return;
    }

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    if (destinationIndex === sourceIndex) {
      return;
    }

    const records = this.reorder(
      this.state.records,
      sourceIndex,
      destinationIndex
    );

    this.setState({ records });
  }

  onTotalAmountSubmit({ totalAmount }: { totalAmount: number }) {
    this.setState({ totalAmount });
  }

  onItemAdd(newItem: types.BudgetItem) {
    const records = this.state.records;
    records.splice(0, 0, newItem);
    this.setState({ records });
  }

  onItemDelete(index: number) {
    const records = this.state.records;
    records.splice(index, 1);
    this.setState({ records });
  }

  onItemUpdate(index: number, newItem: types.BudgetItem) {
    const records = this.state.records;
    const rec = Object.assign({}, records[index], newItem);
    records[index] = rec;
    this.setState({ records });
  }

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <HStack spacing={10} alignItems="start">
          <VStack spacing={4} padding={5}>
            <AddBudgetItemForm onSubmit={this.onItemAdd} />
            <Stat>
              <StatLabel>Total Amount Available</StatLabel>
              <EditableField
                initialValue={this.state.totalAmount}
                onSave={(value: number) => {
                  this.onTotalAmountSubmit({ totalAmount: value });
                }}
                onShow={(value: number) => (
                  <StatNumber>{utils.formatCurrency(value)}</StatNumber>
                )}
              />
            </Stat>
            <BudgetItemSorter
              {...this.state}
              onItemDelete={this.onItemDelete}
              onItemUpdate={this.onItemUpdate}
            />
          </VStack>
          <VStack spacing={4} padding={5}>
            <DataOutput {...this.state} />
          </VStack>
        </HStack>
      </DragDropContext>
    );
  }
}
