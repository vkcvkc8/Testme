import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Layout from './components/Layout/Layout';
import ExpensesDashboard from './pages/ExpensesDashboard';
import ExpenseDetail from './pages/ExpenseDetail';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Layout>
            <Routes>
              <Route path="/" element={<Navigate to="/expenses" replace />} />
              <Route path="/expenses" element={<ExpensesDashboard />} />
              <Route path="/expenses/:partnerId" element={<ExpenseDetail />} />
            </Routes>
          </Layout>
        </div>
      </Router>
    </Provider>
  );
}

export default App;