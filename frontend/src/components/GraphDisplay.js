import React, { useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, PieChart, Pie, Tooltip, Legend, Cell } from 'recharts';
// import { RadarChartDisplay, PieChartDisplay } from './ChartComponents';

let data = [
    { name: 'Rent/Utilities', expense: 0 },
    { name: 'Healthcare', expense: 0 },
    { name: 'Food', expense: 0 },
    { name: 'Leisure', expense: 0 },
    { name: 'Transportation', expense: 0 },
    // { name: 'Savings', expense: 0}
  ];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FFBCF4'];

const RadarChartDisplay = () => (
    <RadarChart outerRadius={150} width={475} height={500} data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="name" />
        <PolarRadiusAxis />
        <Radar name="Expenses" dataKey="expense" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        <Tooltip />
        <Legend />
    </RadarChart>
)


const PieChartDisplay = () => (
    <PieChart width={475} height={500}>
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
    // for(let j = 0; j < 6; j ++){
    //   data[0].expense = 0;
    // };
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
      <div className='flex absolute relative'>

        <div className='bg-gray-100 border border-gray-300 gap-2 px-2 rounded-full mr-1'>
            <button onClick={() => setChartType('pie')}>Pie</button>
        </div>
        <div className='bg-gray-100 border border-gray-300 gap-2 px-2 rounded-full'>
            <button onClick={() => setChartType('radar')}>Radar</button>
        </div>


{/* <form class="max-w-sm mx-auto">
  <label for="countries_disabled" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
  <select id="countries_disabled" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
    <option selected>Choose a graph</option>
    <option value="Pie">Pie</option>
    <option value="Radar">Radar</option>
  </select>
</form> */}


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
