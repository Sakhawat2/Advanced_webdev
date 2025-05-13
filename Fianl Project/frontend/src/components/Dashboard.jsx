import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import Header from './Header'; // Import Header component
import '../styles.css';

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({ amount: '', date: '', category: '', description: '' });
  const chartRef = useRef(null);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    axios.get(`http://localhost:5000/api/expenses/${userId}`)
      .then((response) => setExpenses(response.data))
      .catch((error) => console.error('Error fetching expenses:', error));
  }, []);

  const handleInputChange = (e) => {
    setNewExpense({ ...newExpense, [e.target.name]: e.target.value });
  };

  const handleAddExpense = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/expenses', { ...newExpense, userId });
      setNewExpense({ amount: '', date: '', category: '', description: '' });
      axios.get(`http://localhost:5000/api/expenses/${userId}`)
        .then((response) => setExpenses(response.data)); // Refresh list
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };
  const handleUpdateExpense = async (id, currentData) => {
  const updatedAmount = prompt('Enter new amount:', currentData.amount);
  const updatedCategory = prompt('Enter new category:', currentData.category);
  const updatedDescription = prompt('Enter new description:', currentData.description);

  if (updatedAmount !== null && updatedCategory !== null && updatedDescription !== null) {
    try {
      await axios.put(`http://localhost:5000/api/expenses/${id}`, {
        amount: updatedAmount,
        date: currentData.date,
        category: updatedCategory,
        description: updatedDescription,
      });
      fetchExpenses();
    } catch (error) {
      console.error('Error updating expense:', error);
    }
  }
};

const handleDeleteExpense = async (id) => {
  try {
    await axios.delete(`http://localhost:5000/api/expenses/${id}`);
    fetchExpenses();
  } catch (error) {
    console.error('Error deleting expense:', error);
  }
};


  return (
    <div className="dashboard-container">
       <Header /> {/* Use Header here */}
      <h1>Personal Expense Tracker</h1>
      <h2>Dashboard</h2>

      {/* Expense Form */}
      <div className="expense-form">
        <h3>Add Expense</h3>
        <form onSubmit={handleAddExpense}>
          <input type="number" name="amount" placeholder="Amount ($)" value={newExpense.amount} onChange={handleInputChange} required />
          <input type="date" name="date" value={newExpense.date} onChange={handleInputChange} required />
          <input type="text" name="category" placeholder="Category" value={newExpense.category} onChange={handleInputChange} required />
          <input type="text" name="description" placeholder="Description" value={newExpense.description} onChange={handleInputChange} />
          <button type="submit">Add Expense</button>
        </form>
      </div>

      {/* Expense List */}
      <div className="expenses-list">
        <h3>Expense Summary</h3>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Description</th>
              <th>Amount ($)</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td>{expense.date}</td>
                <td>{expense.category}</td>
                <td>{expense.description}</td>
                <td>${expense.amount}</td>
                <td>
                  <button className="update-btn" onClick={() => handleUpdateExpense(expense.id, expense)}>Update</button>
                  <button className="delete-btn" onClick={() => handleDeleteExpense(expense.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
