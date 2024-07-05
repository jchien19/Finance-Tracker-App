import React, { useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, PieChart, Pie, Tooltip, Legend, Cell } from 'recharts';
// import { RadarChartDisplay, PieChartDisplay } from './ChartComponents';

let data = [
    { name: 'Rent/Utilities', expense: 10 },
    { name: 'Healthcare', expense: 0 },
    { name: 'Food', expense: 0 },
    { name: 'Leisure', expense: 0 },
    { name: 'Transportation', expense: 0 },
    // { name: 'Savings', expense: 0}
  ];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FFBCF4'];

const RadarChartDisplay = () => (
    <RadarChart outerRadius={150} width={500} height={500} data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="name" />
        <PolarRadiusAxis />
        <Radar name="Expenses" dataKey="expense" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        <Tooltip />
        <Legend />
    </RadarChart>
)


const PieChartDisplay = () => (
    <PieChart width={500} height={500}>
        <Pie
        data={data}
        dataKey="expense"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={150}
        fill="#8884d8"
        label
        >
        {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
        </Pie>
        <Tooltip />
        <Legend />
    </PieChart>
);

const updateData = (expenses) => {
    const amount_data = expenses.expense
    console.log('expesnes n update ', amount_data)
    for (let i = 0; i < amount_data.length; i ++){
        let cur = amount_data[i]
        if(cur.category_id === 1){
            data[0].expense = Number(cur.total_amount_spent)
        } else if (cur.category_id === 2){
            data[1].expense = Number(cur.total_amount_spent)
        } else if (cur.category_id === 3){
            data[2].expense = Number(cur.total_amount_spent)
        } else if (cur.category_id === 4){
            data[3].expense = Number(cur.total_amount_spent)
        } else if (cur.category_id === 5){
            data[4].expense = Number(cur.total_amount_spent)
        }
    }
    console.log('data after: ', data)
}

const ChartSwitcher = ( expenses ) => {
  const [chartType, setChartType] = useState('pie');
  console.log('chart switch,', expenses.expense);
  updateData(expenses)
  return (
    <div>
      <div>
        {/* <button onClick={updateData}>update</button> */}
        <button onClick={() => setChartType('pie')}>Pie Chart</button>
        <button onClick={() => setChartType('radar')}>Radar Chart</button>
      </div>
      <div>
        {/* {chartType === 'line' && <LineChartDisplay />} */}
        {chartType === 'radar' && <RadarChartDisplay/>}
        {chartType === 'pie' && <PieChartDisplay/>}
      </div>
    </div>
  );
};

export default ChartSwitcher;
