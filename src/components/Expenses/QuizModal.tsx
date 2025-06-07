import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { createExpense } from '../../store/slices/expenseSlice';
import { XMarkIcon } from '@heroicons/react/24/outline';
import styles from '../../styles/RlConfiguration.module.css';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  expense?: any;
  onSuccess: () => void;
}

const QuizModal: React.FC<QuizModalProps> = ({
  isOpen,
  onClose,
  expense,
  onSuccess,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { loading } = useSelector((state: RootState) => state.expenses);

  const [formData, setFormData] = useState({
    partner_name: '',
    partner_id: '',
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    fixed: {
      office_cost: 0,
      salaries: 0,
      software_flatrate: 0,
      utilities: 0,
    },
    variable: {
      software_per_user: 0,
      office_supply: 0,
      marketing: 0,
      recruiting: 0,
      swag_merchandise: 0,
      bonus: 0,
      nc_set_cost: 0,
      nc_att_cost: 0,
    },
    onetime: {
      incentives: 0,
      team_building: 0,
      technology_hardware: 0,
    },
  });

  const [activeSection, setActiveSection] = useState<'fixed' | 'variable' | 'onetime'>('fixed');

  useEffect(() => {
    if (expense) {
      setFormData({
        partner_name: expense.partner_name,
        partner_id: expense.partner_id,
        year: expense.year,
        month: expense.month,
        fixed: { ...expense.fixed },
        variable: { ...expense.variable },
        onetime: { ...expense.onetime },
      });
    } else if (user?.role === 'dealer_owner' && user.partner_name) {
      setFormData(prev => ({
        ...prev,
        partner_name: user.partner_name,
        partner_id: user.id, // Assuming user.id is the partner_id
      }));
    }
  }, [expense, user]);

  const handleInputChange = (
    section: 'fixed' | 'variable' | 'onetime',
    field: string,
    value: number
  ) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleBasicInfoChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await dispatch(createExpense(formData)).unwrap();
      onSuccess();
    } catch (error) {
      console.error('Failed to save expense:', error);
    }
  };

  const renderFixedExpenses = () => (
    <div className={styles.formSection}>
      <h3 className={styles.sectionTitle}>Fixed Expenses</h3>
      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Office Cost</label>
          <input
            type="number"
            step="0.01"
            value={formData.fixed.office_cost}
            onChange={(e) => handleInputChange('fixed', 'office_cost', parseFloat(e.target.value) || 0)}
            className={styles.formInput}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Salaries</label>
          <input
            type="number"
            step="0.01"
            value={formData.fixed.salaries}
            onChange={(e) => handleInputChange('fixed', 'salaries', parseFloat(e.target.value) || 0)}
            className={styles.formInput}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Software (Flatrate)</label>
          <input
            type="number"
            step="0.01"
            value={formData.fixed.software_flatrate}
            onChange={(e) => handleInputChange('fixed', 'software_flatrate', parseFloat(e.target.value) || 0)}
            className={styles.formInput}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Utilities</label>
          <input
            type="number"
            step="0.01"
            value={formData.fixed.utilities}
            onChange={(e) => handleInputChange('fixed', 'utilities', parseFloat(e.target.value) || 0)}
            className={styles.formInput}
          />
        </div>
      </div>
    </div>
  );

  const renderVariableExpenses = () => (
    <div className={styles.formSection}>
      <h3 className={styles.sectionTitle}>Variable Expenses</h3>
      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Software (per user)</label>
          <input
            type="number"
            step="0.01"
            value={formData.variable.software_per_user}
            onChange={(e) => handleInputChange('variable', 'software_per_user', parseFloat(e.target.value) || 0)}
            className={styles.formInput}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Office Supply</label>
          <input
            type="number"
            step="0.01"
            value={formData.variable.office_supply}
            onChange={(e) => handleInputChange('variable', 'office_supply', parseFloat(e.target.value) || 0)}
            className={styles.formInput}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Marketing</label>
          <input
            type="number"
            step="0.01"
            value={formData.variable.marketing}
            onChange={(e) => handleInputChange('variable', 'marketing', parseFloat(e.target.value) || 0)}
            className={styles.formInput}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Recruiting</label>
          <input
            type="number"
            step="0.01"
            value={formData.variable.recruiting}
            onChange={(e) => handleInputChange('variable', 'recruiting', parseFloat(e.target.value) || 0)}
            className={styles.formInput}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Swag/Merchandise</label>
          <input
            type="number"
            step="0.01"
            value={formData.variable.swag_merchandise}
            onChange={(e) => handleInputChange('variable', 'swag_merchandise', parseFloat(e.target.value) || 0)}
            className={styles.formInput}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Bonus</label>
          <input
            type="number"
            step="0.01"
            value={formData.variable.bonus}
            onChange={(e) => handleInputChange('variable', 'bonus', parseFloat(e.target.value) || 0)}
            className={styles.formInput}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>NC Set Cost</label>
          <input
            type="number"
            step="0.01"
            value={formData.variable.nc_set_cost}
            onChange={(e) => handleInputChange('variable', 'nc_set_cost', parseFloat(e.target.value) || 0)}
            className={styles.formInput}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>NC Att Cost</label>
          <input
            type="number"
            step="0.01"
            value={formData.variable.nc_att_cost}
            onChange={(e) => handleInputChange('variable', 'nc_att_cost', parseFloat(e.target.value) || 0)}
            className={styles.formInput}
          />
        </div>
      </div>
    </div>
  );

  const renderOnetimeExpenses = () => (
    <div className={styles.formSection}>
      <h3 className={styles.sectionTitle}>One-time Expenses</h3>
      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Incentives</label>
          <input
            type="number"
            step="0.01"
            value={formData.onetime.incentives}
            onChange={(e) => handleInputChange('onetime', 'incentives', parseFloat(e.target.value) || 0)}
            className={styles.formInput}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Team Building</label>
          <input
            type="number"
            step="0.01"
            value={formData.onetime.team_building}
            onChange={(e) => handleInputChange('onetime', 'team_building', parseFloat(e.target.value) || 0)}
            className={styles.formInput}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Technology (Hardware)</label>
          <input
            type="number"
            step="0.01"
            value={formData.onetime.technology_hardware}
            onChange={(e) => handleInputChange('onetime', 'technology_hardware', parseFloat(e.target.value) || 0)}
            className={styles.formInput}
          />
        </div>
      </div>
    </div>
  );

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>
            {expense ? 'Edit Expense' : 'Create New Expense'}
          </h2>
          <button
            onClick={onClose}
            className={styles.modalCloseButton}
          >
            <XMarkIcon className={styles.modalCloseIcon} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.modalForm}>
          {/* Basic Information */}
          <div className={styles.formSection}>
            <h3 className={styles.sectionTitle}>Basic Information</h3>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Partner Name</label>
                <input
                  type="text"
                  value={formData.partner_name}
                  onChange={(e) => handleBasicInfoChange('partner_name', e.target.value)}
                  className={styles.formInput}
                  disabled={user?.role === 'dealer_owner'}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Partner ID</label>
                <input
                  type="text"
                  value={formData.partner_id}
                  onChange={(e) => handleBasicInfoChange('partner_id', e.target.value)}
                  className={styles.formInput}
                  disabled={user?.role === 'dealer_owner'}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Year</label>
                <input
                  type="number"
                  value={formData.year}
                  onChange={(e) => handleBasicInfoChange('year', parseInt(e.target.value))}
                  className={styles.formInput}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Month</label>
                <select
                  value={formData.month}
                  onChange={(e) => handleBasicInfoChange('month', parseInt(e.target.value))}
                  className={styles.formInput}
                  required
                >
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {new Date(0, i).toLocaleString('default', { month: 'long' })}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Section Tabs */}
          <div className={styles.tabContainer}>
            <nav className={styles.tabNav}>
              {[
                { key: 'fixed', label: 'Fixed' },
                { key: 'variable', label: 'Variable' },
                { key: 'onetime', label: 'One-time' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveSection(tab.key as 'fixed' | 'variable' | 'onetime')}
                  className={`${styles.tab} ${
                    activeSection === tab.key ? styles.tabActive : styles.tabInactive
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Dynamic Content */}
          {activeSection === 'fixed' && renderFixedExpenses()}
          {activeSection === 'variable' && renderVariableExpenses()}
          {activeSection === 'onetime' && renderOnetimeExpenses()}

          {/* Form Actions */}
          <div className={styles.modalActions}>
            <button
              type="button"
              onClick={onClose}
              className={styles.secondaryButton}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={styles.primaryButton}
            >
              {loading ? 'Saving...' : expense ? 'Update Expense' : 'Create Expense'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuizModal;