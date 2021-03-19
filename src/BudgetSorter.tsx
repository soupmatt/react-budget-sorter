import * as React from "react";
import { BudgetItemSorter } from "./BudgetItemSorter";
import data from "./data.json";

export const BudgetSorter = () => (
  <BudgetItemSorter records={Array.from(data)} />
);
