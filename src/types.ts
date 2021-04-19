import React from "react";

export interface BudgetItem {
  name: string;
  amount: number;
}

export interface BudgetData {
  totalAmount: number;
  records: BudgetItem[];
}

export type BudgetSorterState = BudgetData;

export type ItemDeleteFn = (
  index: number,
  event?: React.SyntheticEvent
) => void;

export type PropSubset<Type> = {
  [Property in keyof Type]?: Type[Property];
};
