import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { expenseAPI } from '../../services/api';
import { Expense, ExpenseFilters, CreateExpensePayload } from '../../types/expense';

interface ExpenseState {
  expenses: Expense[];
  currentExpense: Expense | null;
  loading: boolean;
  error: string | null;
  totalRecords: number;
  filters: ExpenseFilters;
}

const initialState: ExpenseState = {
  expenses: [],
  currentExpense: null,
  loading: false,
  error: null,
  totalRecords: 0,
  filters: {
    page_number: 1,
    page_size: 10,
    sort_by: 'year',
    sort_order: 'DESC',
    search_value: '',
    dealer_names: [],
    filter_year: 0,
    filter_month: 0,
  },
};

export const fetchExpenses = createAsyncThunk(
  'expenses/fetchExpenses',
  async (filters: ExpenseFilters) => {
    const response = await expenseAPI.getAllExpenses(filters);
    return response;
  }
);

export const fetchExpenseById = createAsyncThunk(
  'expenses/fetchExpenseById',
  async (payload: { partner_name: string; year: number; month: number }) => {
    const response = await expenseAPI.getExpenseById(payload);
    return response;
  }
);

export const createExpense = createAsyncThunk(
  'expenses/createExpense',
  async (payload: CreateExpensePayload) => {
    const response = await expenseAPI.createExpense(payload);
    return response;
  }
);

const expenseSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<ExpenseFilters>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentExpense: (state) => {
      state.currentExpense = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses = action.payload.data.expenses_item;
        state.totalRecords = action.payload.data.TotalRecords;
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch expenses';
      })
      .addCase(fetchExpenseById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExpenseById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentExpense = action.payload.data;
      })
      .addCase(fetchExpenseById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch expense';
      })
      .addCase(createExpense.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createExpense.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createExpense.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create expense';
      });
  },
});

export const { setFilters, clearError, clearCurrentExpense } = expenseSlice.actions;
export default expenseSlice.reducer;