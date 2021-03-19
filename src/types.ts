export interface BudgetItem {
  name: string;
  amount: number;
  runningTotal: number;
}

export interface BudgetItemRecord extends BudgetItem {
  runningTotal: number;
}
