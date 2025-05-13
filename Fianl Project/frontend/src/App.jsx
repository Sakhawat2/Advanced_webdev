import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ExpenseReport from './components/ExpenseReport';
import Registration from './components/Registration'; // Import Sign Up Page
import './styles.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/signup" element={<Registration />} /> {/* Route for Sign Up */}
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/report" element={<ExpenseReport />} />
      </Routes>
    </Router>
  );
};

export default App;
