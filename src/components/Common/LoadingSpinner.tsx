import React from 'react';
import styles from '../../styles/RlConfiguration.module.css';

const LoadingSpinner: React.FC = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.spinner}></div>
      <p className={styles.loadingText}>Loading...</p>
    </div>
  );
};

export default LoadingSpinner;