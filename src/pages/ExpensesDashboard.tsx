import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState, AppDispatch } from '../store/store';
import { fetchExpenses, setFilters } from '../store/slices/expenseSlice';
import ExpenseTable from '../components/Expenses/ExpenseTable';
import ExpenseFilters from '../components/Expenses/ExpenseFilters';
import QuizModal from '../components/Expenses/QuizModal';
import Pagination from '../components/Common/Pagination';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import { ChevronLeftIcon, ChevronRightIcon, PlusIcon } from '@heroicons/react/24/outline';
import styles from '../styles/RlConfiguration.module.css';

const ExpensesDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const { expenses, loading, error, totalRecords, filters } = useSelector(
    (state: RootState) => state.expenses
  );

  const [activeTab, setActiveTab] = useState<'Fixed' | 'Variable' | 'One-time'>('Fixed');
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);

  useEffect(() => {
    // Set dealer filter for dealer owners
    if (user?.role === 'dealer_owner' && user.partner_name) {
      dispatch(setFilters({ dealer_names: [user.partner_name] }));
    }
    
    dispatch(fetchExpenses(filters));
  }, [dispatch, filters, user]);

  const handleTabChange = (tab: 'Fixed' | 'Variable' | 'One-time') => {
    setActiveTab(tab);
  };

  const handlePageChange = (page: number) => {
    dispatch(setFilters({ page_number: page }));
  };

  const handleRowClick = (expense: any) => {
    if (user?.role === 'dealer_owner') {
      navigate(`/expenses/${expense.partner_id}`);
    }
  };

  const handleCreateExpense = () => {
    setEditingExpense(null);
    setIsQuizModalOpen(true);
  };

  const handleEditExpense = (expense: any) => {
    setEditingExpense(expense);
    setIsQuizModalOpen(true);
  };

  const breadcrumbs = [
    { name: user?.role === 'admin' ? 'Sales Rep RL' : 'Dealer Owner RL', href: '#' },
    { name: 'Expenses', href: '/expenses', current: true },
  ];

  if (loading && expenses.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <div className={styles.container}>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb}>
        <ChevronLeftIcon className={styles.breadcrumbIcon} />
        <ChevronLeftIcon className={styles.breadcrumbIcon} />
        {breadcrumbs.map((item, index) => (
          <React.Fragment key={item.name}>
            {index > 0 && <span className={styles.breadcrumbSeparator}>/</span>}
            <span
              className={
                item.current
                  ? styles.breadcrumbCurrent
                  : styles.breadcrumbItem
              }
            >
              {item.name}
            </span>
          </React.Fragment>
        ))}
      </nav>

      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Expenses</h1>
          <p className={styles.subtitle}>
            {user?.role === 'admin' 
              ? 'Manage and view all partner expenses' 
              : 'View your expense reports'
            }
          </p>
        </div>
        
        <div className={styles.headerActions}>
          {user?.role === 'admin' && <ExpenseFilters />}
          {user?.role === 'dealer_owner' && (
            <button
              onClick={handleCreateExpense}
              className={styles.primaryButton}
            >
              <PlusIcon className={styles.buttonIcon} />
              Add Expense
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className={styles.tabContainer}>
        <nav className={styles.tabNav}>
          {['Fixed', 'Variable', 'One-time'].map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab as 'Fixed' | 'Variable' | 'One-time')}
              className={`${styles.tab} ${
                activeTab === tab ? styles.tabActive : styles.tabInactive
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className={styles.content}>
        {error && (
          <div className={styles.errorMessage}>
            {error}
          </div>
        )}

        <ExpenseTable
          expenses={expenses}
          activeTab={activeTab}
          onRowClick={handleRowClick}
          onEditExpense={handleEditExpense}
          userRole={user?.role}
        />

        {totalRecords > filters.page_size && (
          <Pagination
            currentPage={filters.page_number}
            totalPages={Math.ceil(totalRecords / filters.page_size)}
            onPageChange={handlePageChange}
          />
        )}
      </div>

      {/* Quiz Modal */}
      <QuizModal
        isOpen={isQuizModalOpen}
        onClose={() => setIsQuizModalOpen(false)}
        expense={editingExpense}
        onSuccess={() => {
          setIsQuizModalOpen(false);
          dispatch(fetchExpenses(filters));
        }}
      />
    </div>
  );
};

export default ExpensesDashboard;