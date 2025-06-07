export interface FixedExpenses {
  office_cost: number;
  salaries: number;
  software_flatrate: number;
  utilities?: number;
}

export interface VariableExpenses {
  software_per_user: number;
  office_supply: number;
  marketing: number;
  recruiting: number;
  swag_merchandise: number;
  bonus: number;
  nc_set_cost: number;
  nc_att_cost: number;
}

export interface OneTimeExpenses {
  incentives: number;
  team_building: number;
  technology_hardware: number;
}

export interface Expense {
  id: number;
  partner_name: string;
  partner_id: string;
  year: number;
  month: number;
  fixed: FixedExpenses;
  variable: VariableExpenses;
  onetime: OneTimeExpenses;
  created_at: string;
  updated_at: string;
}

export interface ExpenseFilters {
  page_number: number;
  page_size: number;
  sort_by: string;
  sort_order: 'ASC' | 'DESC';
  search_value: string;
  dealer_names: string[];
  filter_year: number;
  filter_month: number;
}

export interface CreateExpensePayload {
  partner_name: string;
  partner_id: string;
  year: number;
  month: number;
  fixed: FixedExpenses;
  variable: VariableExpenses;
  onetime: OneTimeExpenses;
}

export interface APIResponse<T> {
  status: number;
  message: string;
  dbRecCount: number;
  data: T;
}

export interface ExpenseListResponse {
  expenses_item: Expense[];
  TotalRecords: number;
}