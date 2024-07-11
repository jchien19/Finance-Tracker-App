// import { useState } from 'react';
// import axios from 'axios';
import ExpenseChart from "./ExpenseChart";

let totalSpent = 0;
const data = [
    { date: '2024-07-01', amount: 50 },
    { date: '2024-07-02', amount: 75 },
    { date: '2024-07-03', amount: 100 },
    // ... more data points
  ];

const TotalSpent = (props) => {

    const TotalDisplay = () => {
        let temp = 0;
        for(let i = 0; i < props.charges.length; i ++){
            if(props.charges[i].category_id === 6){
                temp -= Number(props.charges[i].total_amount_spent)
            } else {
                temp += Number(props.charges[i].total_amount_spent)
            }
        }
        totalSpent = temp;
    }
    TotalDisplay()

    return (
        <div className='bg-white'>
            <p>Amount Spent: {totalSpent}</p>
            {/* <ExpenseChart data ={data}/> */}
        </div>
    )

}

export default TotalSpent;