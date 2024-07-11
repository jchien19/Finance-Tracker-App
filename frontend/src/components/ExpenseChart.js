import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ExpenseChart = ( props ) => {

    console.log('Expense Chart: ', props)
    // const data = [
    //     { date: '2024-07-01', amount: -50 },
    //     { date: '2024-07-02', amount: 75 },
    //     { date: '2024-07-03', amount: 100 },
    //     // ... more data points
    //   ];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={props.importedData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="trans_date" />
        <YAxis 
          scale="linear" 
          domain={[-80, 80]} 
          tickFormatter={(value) => `$${value.toFixed(2)}`} 
        />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="amount" stroke="#840DAB" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ExpenseChart;
