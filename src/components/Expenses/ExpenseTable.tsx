import React from 'react';
import { PencilIcon, EyeIcon } from '@heroicons/react/24/outline';
import styles from '../../styles/RlConfiguration.module.css';

interface ExpenseTableProps {
  expenses: any[];
  activeTab: 'Fixed' | 'Variable' | 'One-time';
  onRowClick: (expense: any) => void;
  onEditExpense?: (expense: any) => void;
  userRole?: string;
}

const ExpenseTable: React.FC<ExpenseTableProps> = ({
  expenses,
  activeTab,
  onRowClick,
  onEditExpense,
  userRole,
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getColumnsForTab = () => {
    switch (activeTab) {
      case 'Fixed':
        return [
          { key: 'partner_name', label: 'Partner Name', sortable: true },
          { key: 'office_cost', label: 'Office', sortable: true, section: 'fixed' },
          { key: 'salaries', label: 'Salaries', sortable: true, section: 'fixed' },
          { key: 'software_flatrate', label: 'Software (Flatrate)', sortable: true, section: 'fixed' },
          { key: 'utilities', label: 'Utilities', sortable: false, section: 'fixed' },
        ];
      case 'Variable':
        return [
          { key: 'partner_name', label: 'Partner Name', sortable: true },
          { key: 'utilities', label: 'Utilities', sortable: false, section: 'variable' },
          { key: 'software_per_user', label: 'Software', sortable: true, section: 'variable' },
          { key: 'office_supply', label: 'Office Supply', sortable: true, section: 'variable' },
          { key: 'marketing', label: 'Marketing', sortable: true, section: 'variable' },
          { key: 'recruiting', label: 'Recruiting', sortable: true, section: 'variable' },
          { key: 'swag_merchandise', label: 'Swag/merchandise', sortable: true, section: 'variable' },
          { key: 'bonus', label: 'Bonus', sortable: true, section: 'variable' },
          { key: 'nc_set_cost', label: 'Non-Commission Setter Pay', sortable: false, section: 'variable' },
          { key: 'nc_att_cost', label: 'Appointment Set', sortable: false, section: 'variable' },
          { key: 'appointment_attending', label: 'Appointment Attending', sortable: false, section: 'variable' },
        ];
      case 'One-time':
        return [
          { key: 'partner_name', label: 'Partner Name', sortable: true },
          { key: 'incentives', label: 'Incentives', sortable: true, section: 'onetime' },
          { key: 'team_building', label: 'Team building', sortable: true, section: 'onetime' },
          { key: 'technology_hardware', label: 'Technology (Hardware)', sortable: true, section: 'onetime' },
        ];
      default:
        return [];
    }
  };

  const columns = getColumnsForTab();

  const getCellValue = (expense: any, column: any) => {
    if (column.key === 'partner_name') {
      return expense.partner_name;
    }
    
    if (column.section) {
      const sectionData = expense[column.section] || {};
      const value = sectionData[column.key];
      return value !== undefined ? formatCurrency(value) : '-';
    }
    
    return '-';
  };

  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead className={styles.tableHeader}>
            <tr>
              {columns.map((column) => (
                <th key={column.key} className={styles.tableHeaderCell}>
                  <div className={styles.tableHeaderContent}>
                    {column.label}
                    {column.sortable && (
                      <svg className={styles.sortIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                      </svg>
                    )}
                  </div>
                </th>
              ))}
              {userRole === 'dealer_owner' && (
                <th className={styles.tableHeaderCell}>Actions</th>
              )}
            </tr>
          </thead>
          <tbody className={styles.tableBody}>
            {expenses.map((expense, index) => (
              <tr
                key={expense.id || index}
                className={`${styles.tableRow} ${userRole === 'dealer_owner' ? styles.tableRowClickable : ''}`}
                onClick={() => userRole === 'dealer_owner' && onRowClick(expense)}
              >
                {columns.map((column) => (
                  <td key={column.key} className={styles.tableCell}>
                    {getCellValue(expense, column)}
                  </td>
                ))}
                {userRole === 'dealer_owner' && (
                  <td className={styles.tableCell}>
                    <div className={styles.actionButtons}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onEditExpense?.(expense);
                        }}
                        className={styles.actionButton}
                        title="Edit"
                      >
                        <PencilIcon className={styles.actionIcon} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onRowClick(expense);
                        }}
                        className={styles.actionButton}
                        title="View Details"
                      >
                        <EyeIcon className={styles.actionIcon} />
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {expenses.length === 0 && (
        <div className={styles.emptyState}>
          <p>No expenses found for the selected criteria.</p>
        </div>
      )}
    </div>
  );
};

export default ExpenseTable;