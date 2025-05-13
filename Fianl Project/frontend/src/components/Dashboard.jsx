import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import Header from './Header';
import '../styles.css';

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const chartRef = useRef(null);
  const userId = localStorage.getItem('userId');

  const fetchExpenses = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/expenses/${userId}`);
      setExpenses(response.data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  useEffect(() => {
    if (!chartRef.current || expenses.length === 0) return;

    new Chart(chartRef.current.getContext('2d'), {
      type: 'bar',
      data: {
        labels: expenses.map(exp => exp.category),
        datasets: [{
          label: 'Total Spending',
          data: expenses.map(exp => exp.amount),
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        }]
      }
    });
  }, [expenses]);

  const handleDeleteExpense = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/expenses/${id}`);
      fetchExpenses();
    } catch (error) {
      console.error('Error deleting expense:', error);
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

  return (
    <div className="dashboard-container">
      <Header /> {/* Use Header here */}

      <div className="expenses-list">
        <h2>Dashboard</h2>
        <h3>Expense Summary</h3>

        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Description</th>
              <th>Amount ($)</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td>{expense.date}</td>
                <td>{expense.category}</td>
                <td>{expense.description}</td>
                <td>${expense.amount}</td>
                <td>{expense.category === "Unpaid" ? "🔴 Unpaid" : "🟢 Paid"}</td>
                <td>
                  <button onClick={() => handleDeleteExpense(expense.id)}>Delete</button>
                  <button className="update-btn" onClick={() => handleUpdateExpense(expense.id, expense)}>Update</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="graph-section">
        <h3>Expense Distribution</h3>
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default Dashboard;
