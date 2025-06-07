import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { setFilters } from '../../store/slices/expenseSlice';
import { FunnelIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import styles from '../../styles/RlConfiguration.module.css';

const ExpenseFilters: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { filters } = useSelector((state: RootState) => state.expenses);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchValue, setSearchValue] = useState(filters.search_value);

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    dispatch(setFilters({ search_value: value, page_number: 1 }));
  };

  const handleYearChange = (year: number) => {
    dispatch(setFilters({ filter_year: year, page_number: 1 }));
  };

  const handleMonthChange = (month: number) => {
    dispatch(setFilters({ filter_month: month, page_number: 1 }));
  };

  const handleDealerNamesChange = (dealerNames: string[]) => {
    dispatch(setFilters({ dealer_names: dealerNames, page_number: 1 }));
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className={styles.filtersContainer}>
      {/* Search */}
      <div className={styles.searchContainer}>
        <MagnifyingGlassIcon className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search partners..."
          value={searchValue}
          onChange={(e) => handleSearchChange(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      {/* Filter Button */}
      <button
        onClick={() => setIsFilterOpen(!isFilterOpen)}
        className={styles.filterButton}
      >
        <FunnelIcon className={styles.filterIcon} />
        Filters
      </button>

      {/* Filter Dropdown */}
      {isFilterOpen && (
        <div className={styles.filterDropdown}>
          <div className={styles.filterSection}>
            <label className={styles.filterLabel}>Year</label>
            <select
              value={filters.filter_year || ''}
              onChange={(e) => handleYearChange(parseInt(e.target.value) || 0)}
              className={styles.filterSelect}
            >
              <option value="">All Years</option>
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          <div className={styles.filterSection}>
            <label className={styles.filterLabel}>Month</label>
            <select
              value={filters.filter_month || ''}
              onChange={(e) => handleMonthChange(parseInt(e.target.value) || 0)}
              className={styles.filterSelect}
            >
              <option value="">All Months</option>
              {months.map((month, index) => (
                <option key={index + 1} value={index + 1}>{month}</option>
              ))}
            </select>
          </div>

          <div className={styles.filterActions}>
            <button
              onClick={() => {
                dispatch(setFilters({
                  search_value: '',
                  filter_year: 0,
                  filter_month: 0,
                  dealer_names: [],
                  page_number: 1
                }));
                setSearchValue('');
                setIsFilterOpen(false);
              }}
              className={styles.clearFiltersButton}
            >
              Clear All
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseFilters;