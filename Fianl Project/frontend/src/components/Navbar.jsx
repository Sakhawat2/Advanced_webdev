import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ padding: '10px', backgroundColor: '#4CAF50', color: '#fff' }}>
      <Link to="/" style={{ margin: '0 10px', color: '#fff', textDecoration: 'none' }}>Home</Link>
      <Link to="/register" style={{ margin: '0 10px', color: '#fff', textDecoration: 'none' }}>Register</Link>
      <Link to="/add-expense" style={{ margin: '0 10px', color: '#fff', textDecoration: 'none' }}>Add Expense</Link>
      <Link to="/dashboard" style={{ margin: '0 10px', color: '#fff', textDecoration: 'none' }}>Dashboard</Link>
    </nav>
  );
};

export default Navbar;
