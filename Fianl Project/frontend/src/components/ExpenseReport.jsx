import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import Header from './Header'; // Import Header component
import '../styles.css';

const monthNames = {
  "01": "January", "02": "February", "03": "March", "04": "April",
  "05": "May", "06": "June", "07": "July", "08": "August",
  "09": "September", "10": "October", "11": "November", "12": "December"
};

const ExpenseReport = () => {
  const [reportData, setReportData] = useState([]);
  const chartRef = useRef(null);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    axios.get(`http://localhost:5000/api/expenses/report/${userId}`)
      .then((response) => setReportData(response.data))
      .catch((error) => console.error('Error fetching report:', error));
  }, []);

  useEffect(() => {
    if (!chartRef.current || reportData.length === 0) return;

    new Chart(chartRef.current.getContext('2d'), {
      type: 'bar',
      data: {
        labels: reportData.map(exp => `${monthNames[exp.month_number]} ${exp.year} - ${exp.category}`),
        datasets: [{
          label: 'Total Spending',
          data: reportData.map(exp => exp.total_spent),
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        }]
      }
    });
  }, [reportData]);

  return (
    <div className="container">
      <Header /> {/* Use Header here */}

      <h2>Expense Report</h2>
      <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>Category</th>
            <th>Description</th>
            <th>Total Spent ($)</th>
          </tr>
        </thead>
        <tbody>
          {reportData.map((item, index) => (
            <tr key={index}>
              <td>{monthNames[item.month_number]} {item.year}</td>
              <td>{item.category}</td>
              <td>{item.description || "No description"}</td>
              <td>${item.total_spent.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default ExpenseReport;
