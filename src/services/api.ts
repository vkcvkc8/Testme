import { ExpenseFilters, CreateExpensePayload, APIResponse, ExpenseListResponse, Expense } from '../types/expense';

// Mock API implementation
class ExpenseAPI {
  private baseURL = '/api';

  // Simulate API delay
  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Mock data
  private mockExpenses: Expense[] = [
    {
      id: 1,
      partner_name: "AZray Solar LLC",
      partner_id: "32951",
      year: 2025,
      month: 6,
      fixed: {
        office_cost: 12000.5,
        salaries: 50000,
        software_flatrate: 1500,
        utilities: 1000
      },
      variable: {
        software_per_user: 200,
        office_supply: 300,
        marketing: 4000,
        recruiting: 2500,
        swag_merchandise: 750,
        bonus: 5000,
        nc_set_cost: 800,
        nc_att_cost: 600
      },
      onetime: {
        incentives: 3000,
        team_building: 1000,
        technology_hardware: 4500
      },
      created_at: "2025-06-05T18:25:53.732693Z",
      updated_at: "2025-06-06T09:32:39.446218Z"
    },
    {
      id: 2,
      partner_name: "Genesis Roofing LLC",
      partner_id: "32950",
      year: 2025,
      month: 6,
      fixed: {
        office_cost: 12000.5,
        salaries: 50000,
        software_flatrate: 1500,
        utilities: 1000
      },
      variable: {
        software_per_user: 200,
        office_supply: 300,
        marketing: 4000,
        recruiting: 2500,
        swag_merchandise: 750,
        bonus: 5000,
        nc_set_cost: 800,
        nc_att_cost: 600
      },
      onetime: {
        incentives: 3000,
        team_building: 1000,
        technology_hardware: 4500
      },
      created_at: "2025-06-06T09:38:17.828744Z",
      updated_at: "2025-06-06T09:38:17.828744Z"
    }
  ];

  async getAllExpenses(filters: ExpenseFilters): Promise<APIResponse<ExpenseListResponse>> {
    await this.delay(500);
    
    let filteredExpenses = [...this.mockExpenses];
    
    // Apply filters
    if (filters.dealer_names.length > 0) {
      filteredExpenses = filteredExpenses.filter(expense => 
        filters.dealer_names.includes(expense.partner_name)
      );
    }
    
    if (filters.filter_year > 0) {
      filteredExpenses = filteredExpenses.filter(expense => expense.year === filters.filter_year);
    }
    
    if (filters.filter_month > 0) {
      filteredExpenses = filteredExpenses.filter(expense => expense.month === filters.filter_month);
    }
    
    if (filters.search_value) {
      filteredExpenses = filteredExpenses.filter(expense =>
        expense.partner_name.toLowerCase().includes(filters.search_value.toLowerCase())
      );
    }
    
    // Apply sorting
    filteredExpenses.sort((a, b) => {
      const aValue = a[filters.sort_by as keyof Expense];
      const bValue = b[filters.sort_by as keyof Expense];
      
      if (filters.sort_order === 'DESC') {
        return aValue > bValue ? -1 : 1;
      }
      return aValue > bValue ? 1 : -1;
    });
    
    // Apply pagination
    const startIndex = (filters.page_number - 1) * filters.page_size;
    const paginatedExpenses = filteredExpenses.slice(startIndex, startIndex + filters.page_size);
    
    return {
      status: 200,
      message: "Expenses retrieved successfully",
      dbRecCount: filteredExpenses.length,
      data: {
        expenses_item: paginatedExpenses,
        TotalRecords: filteredExpenses.length
      }
    };
  }

  async getExpenseById(payload: { partner_name: string; year: number; month: number }): Promise<APIResponse<Expense>> {
    await this.delay(300);
    
    const expense = this.mockExpenses.find(exp => 
      exp.partner_name === payload.partner_name && 
      exp.year === payload.year && 
      exp.month === payload.month
    );
    
    if (!expense) {
      throw new Error('Expense not found');
    }
    
    return {
      status: 200,
      message: "Expenses retrieved successfully",
      dbRecCount: 1,
      data: expense
    };
  }

  async createExpense(payload: CreateExpensePayload): Promise<APIResponse<null>> {
    await this.delay(500);
    
    const newExpense: Expense = {
      id: this.mockExpenses.length + 1,
      ...payload,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    this.mockExpenses.push(newExpense);
    
    return {
      status: 201,
      message: "Expense data created successfully",
      dbRecCount: 0,
      data: null
    };
  }
}

export const expenseAPI = new ExpenseAPI();