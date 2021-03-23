export interface BudgetItem {
  name: string;
  amount: number;
}

export interface BudgetItemRecord extends BudgetItem {
  runningTotal: number;
}

export interface BudgetSorterState {
  records: BudgetItemRecord[];
  totalAmount: number;
}
