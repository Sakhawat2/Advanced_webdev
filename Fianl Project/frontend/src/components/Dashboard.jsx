import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ExpenseForm from './ExpenseForm';

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const userId = localStorage.getItem('userId'); // Get logged-in user ID

  // Fetch expenses from the server
  const fetchExpenses = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/expenses/${userId}`);
      setExpenses(response.data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  // Add a new expense
  const handleAddExpense = async (expenseData) => {
    try {
      await axios.post('http://localhost:5000/api/expenses', { ...expenseData, userId });
      fetchExpenses(); // Refresh the list
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  // Update an expense
  const handleUpdateExpense = async (id, updatedData) => {
    try {
      await axios.put(`http://localhost:5000/api/expenses/${id}`, updatedData);
      fetchExpenses(); // Refresh the list
    } catch (error) {
      console.error('Error updating expense:', error);
    }
  };

  // Delete an expense
  const handleDeleteExpense = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/expenses/${id}`);
      fetchExpenses(); // Refresh the list
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <ExpenseForm onAddExpense={handleAddExpense} />
      <h3>Expense Summary</h3>
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            {expense.date} - {expense.category} - ${expense.amount}
            <p>{expense.description}</p>
            <button onClick={() => handleDeleteExpense(expense.id)}>Delete</button>
            <button
              onClick={() => handleUpdateExpense(expense.id, {
                amount: prompt('Enter new amount:', expense.amount),
                date: expense.date,
                category: expense.category,
                description: prompt('Enter new description:', expense.description),
              })}
            >
              Update
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
