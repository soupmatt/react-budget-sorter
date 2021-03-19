export interface BudgetItemRecord {
  name: string;
  amount: number;
  runningTotal: number;
}

export interface BudgetSorterState {
  records: BudgetItemRecord[];
  totalAmount: number;
}
