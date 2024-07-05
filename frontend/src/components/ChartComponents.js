import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, LineChart, Line, PieChart, Pie, Tooltip, CartesianGrid, XAxis, YAxis, Legend, Cell } from 'recharts';

const data = [
  { name: 'January', expense: 400 },
  { name: 'February', expense: 300 },
  { name: 'March', expense: 200 },
  { name: 'April', expense: 278 },
  { name: 'May', expense: 189 },
  { name: 'June', expense: 170}
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// export const LineChartDisplay = () => (
//   <LineChart width={600} height={300} data={data}>
//     <Line type="monotone" dataKey="expense" stroke="#8884d8" />
//     <CartesianGrid stroke="#ccc" />
//     <XAxis dataKey="name" />
//     <YAxis />
//     <Tooltip />
//     <Legend />
//   </LineChart>
// );


export const RadarChartDisplay = () => (

    // <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
    //   <PolarGrid />
    //   <PolarAngleAxis dataKey="subject" />
    //   <PolarRadiusAxis />
    //   <Radar name="RadarChart" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
    // </RadarChart>
    <RadarChart outerRadius={150} width={400} height={400} data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="name" />
        <PolarRadiusAxis />
        <Radar name="Expense" dataKey="expense" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        <Tooltip />
        <Legend />
    </RadarChart>

)

// const PieDisplay = (expense) => {
//     <PieChart width={400} height={400}>
//     <Pie
//     // data={data}
//     data = {expenses}
//     dataKey="total_amount_spent"
//     nameKey="category_id"
//     cx="50%"
//     cy="50%"
//     outerRadius={150}
//     fill="#8884d8"
//     label
//     >
//     {data.map((entry, index) => (
//         <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//     ))}
//     </Pie>
//     <Tooltip />
//     <Legend />
//     </PieChart>
// }



export const PieChartDisplay = (expenses) => (
    <PieChart width={400} height={400}>
    <Pie
    // data={data}
    data = {expenses}
    dataKey="total_amount_spent"
    nameKey="category_id"
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

// export const MyBarChart = () => (
//   <BarChart width={600} height={300} data={data}>
//     <Bar dataKey="expense" fill="#8884d8" />
//     <CartesianGrid stroke="#ccc" />
//     <XAxis dataKey="name" />
//     <YAxis />
//     <Tooltip />
//     <Legend />
//   </BarChart>
// );
