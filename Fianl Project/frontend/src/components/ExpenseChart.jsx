import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

const ExpenseChart = ({ expenses }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current || !expenses.length) return;

    const ctx = chartRef.current.getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: expenses.map(exp => exp.category),
        datasets: [{
          label: 'Total Spending by Category',
          data: expenses.map(exp => exp.total_spent),
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        }]
      }
    });

  }, [expenses]);

  return <canvas ref={chartRef} />;
};

export default ExpenseChart;
