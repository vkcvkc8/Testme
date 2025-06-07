import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { fetchExpenseById, clearCurrentExpense } from '../store/slices/expenseSlice';
import QuizModal from '../components/Expenses/QuizModal';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import { ChevronLeftIcon, PencilIcon } from '@heroicons/react/24/outline';
import styles from '../styles/RlConfiguration.module.css';

const ExpenseDetail: React.FC = () => {
  const { partnerId } = useParams<{ partnerId: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { currentExpense, loading, error } = useSelector(
    (state: RootState) => state.expenses
  );

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'Fixed' | 'Variable' | 'One-time'>('Fixed');

  useEffect(() => {
    if (partnerId && user?.partner_name) {
      dispatch(fetchExpenseById({
        partner_name: user.partner_name,
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
      }));
    }

    return () => {
      dispatch(clearCurrentExpense());
    };
  }, [dispatch, partnerId, user]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const renderExpenseSection = () => {
    if (!currentExpense) return null;

    switch (activeTab) {
      case 'Fixed':
        return (
          <div className={styles.expenseSection}>
            <div className={styles.expenseGrid}>
              <div className={styles.expenseCard}>
                <h4 className={styles.expenseCardTitle}>Office</h4>
                <p className={styles.expenseCardValue}>
                  {formatCurrency(currentExpense.fixed?.office_cost || 0)}
                </p>
              </div>
              <div className={styles.expenseCard}>
                <h4 className={styles.expenseCardTitle}>Salaries</h4>
                <p className={styles.expenseCardValue}>
                  {formatCurrency(currentExpense.fixed?.salaries || 0)}
                </p>
              </div>
              <div className={styles.expenseCard}>
                <h4 className={styles.expenseCardTitle}>Software (Flatrate)</h4>
                <p className={styles.expenseCardValue}>
                  {formatCurrency(currentExpense.fixed?.software_flatrate || 0)}
                </p>
              </div>
              <div className={styles.expenseCard}>
                <h4 className={styles.expenseCardTitle}>Utilities</h4>
                <p className={styles.expenseCardValue}>
                  {formatCurrency(currentExpense.fixed?.utilities || 0)}
                </p>
              </div>
            </div>
          </div>
        );
      case 'Variable':
        return (
          <div className={styles.expenseSection}>
            <div className={styles.expenseGrid}>
              <div className={styles.expenseCard}>
                <h4 className={styles.expenseCardTitle}>Utilities</h4>
                <p className={styles.expenseCardValue}>
                  {formatCurrency(currentExpense.variable?.utilities || 0)}
                </p>
              </div>
              <div className={styles.expenseCard}>
                <h4 className={styles.expenseCardTitle}>Software</h4>
                <p className={styles.expenseCardValue}>
                  {formatCurrency(currentExpense.variable?.software_per_user || 0)}
                </p>
              </div>
              <div className={styles.expenseCard}>
                <h4 className={styles.expenseCardTitle}>Office Supply</h4>
                <p className={styles.expenseCardValue}>
                  {formatCurrency(currentExpense.variable?.office_supply || 0)}
                </p>
              </div>
              <div className={styles.expenseCard}>
                <h4 className={styles.expenseCardTitle}>Marketing</h4>
                <p className={styles.expenseCardValue}>
                  {formatCurrency(currentExpense.variable?.marketing || 0)}
                </p>
              </div>
              <div className={styles.expenseCard}>
                <h4 className={styles.expenseCardTitle}>Recruiting</h4>
                <p className={styles.expenseCardValue}>
                  {formatCurrency(currentExpense.variable?.recruiting || 0)}
                </p>
              </div>
              <div className={styles.expenseCard}>
                <h4 className={styles.expenseCardTitle}>Swag/merchandise</h4>
                <p className={styles.expenseCardValue}>
                  {formatCurrency(currentExpense.variable?.swag_merchandise || 0)}
                </p>
              </div>
              <div className={styles.expenseCard}>
                <h4 className={styles.expenseCardTitle}>Bonus</h4>
                <p className={styles.expenseCardValue}>
                  {formatCurrency(currentExpense.variable?.bonus || 0)}
                </p>
              </div>
              <div className={styles.expenseCard}>
                <h4 className={styles.expenseCardTitle}>Non-Commission Setter Pay</h4>
                <p className={styles.expenseCardValue}>-</p>
              </div>
              <div className={styles.expenseCard}>
                <h4 className={styles.expenseCardTitle}>Appointment Set</h4>
                <p className={styles.expenseCardValue}>-</p>
              </div>
              <div className={styles.expenseCard}>
                <h4 className={styles.expenseCardTitle}>Appointment Attending</h4>
                <p className={styles.expenseCardValue}>-</p>
              </div>
            </div>
          </div>
        );
      case 'One-time':
        return (
          <div className={styles.expenseSection}>
            <div className={styles.expenseGrid}>
              <div className={styles.expenseCard}>
                <h4 className={styles.expenseCardTitle}>Incentives</h4>
                <p className={styles.expenseCardValue}>
                  {formatCurrency(currentExpense.onetime?.incentives || 0)}
                </p>
              </div>
              <div className={styles.expenseCard}>
                <h4 className={styles.expenseCardTitle}>Team building</h4>
                <p className={styles.expenseCardValue}>
                  {formatCurrency(currentExpense.onetime?.team_building || 0)}
                </p>
              </div>
              <div className={styles.expenseCard}>
                <h4 className={styles.expenseCardTitle}>Technology (Hardware)</h4>
                <p className={styles.expenseCardValue}>
                  {formatCurrency(currentExpense.onetime?.technology_hardware || 0)}
                </p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorMessage}>{error}</p>
        <button
          onClick={() => navigate('/expenses')}
          className={styles.primaryButton}
        >
          Back to Expenses
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.detailHeader}>
        <button
          onClick={() => navigate('/expenses')}
          className={styles.backButton}
        >
          <ChevronLeftIcon className={styles.backIcon} />
          Back to Expenses
        </button>
        
        <div className={styles.detailHeaderContent}>
          <h1 className={styles.title}>Expenses</h1>
          <button
            onClick={() => setIsEditModalOpen(true)}
            className={styles.primaryButton}
          >
            <PencilIcon className={styles.buttonIcon} />
            Edit Expenses
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className={styles.tabContainer}>
        <nav className={styles.tabNav}>
          {['Fixed', 'Variable', 'One-time'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as 'Fixed' | 'Variable' | 'One-time')}
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
        {renderExpenseSection()}
      </div>

      {/* Edit Modal */}
      <QuizModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        expense={currentExpense}
        onSuccess={() => {
          setIsEditModalOpen(false);
          // Refresh the current expense data
          if (partnerId && user?.partner_name) {
            dispatch(fetchExpenseById({
              partner_name: user.partner_name,
              year: new Date().getFullYear(),
              month: new Date().getMonth() + 1,
            }));
          }
        }}
      />
    </div>
  );
};

export default ExpenseDetail;