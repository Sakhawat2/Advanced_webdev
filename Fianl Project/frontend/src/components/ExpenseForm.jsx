import React, { useState } from 'react';

const ExpenseForm = ({ onAddExpense }) => {
  const [formData, setFormData] = useState({
    amount: '',
    date: '',
    category: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddExpense(formData);
    setFormData({ amount: '', date: '', category: '', description: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Expense</h3>
      <input type="number" name="amount" value={formData.amount} onChange={handleChange} placeholder="Amount" required />
      <input type="date" name="date" value={formData.date} onChange={handleChange} required />
      <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="Category" required />
      <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description"></textarea>
      <button type="submit">Add Expense</button>
    </form>
  );
};

export default ExpenseForm;
