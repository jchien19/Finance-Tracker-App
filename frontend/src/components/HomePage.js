import React, { useState } from 'react'
import { useAuthContext } from "../hooks/useAuthContext"
import axios from 'axios';
import TransactionDisplay from './TransactionDisplay';
import GraphDisplay from './GraphDisplay';

const HomePage = () => {

    const { usern } = useAuthContext();
    const[transactions, setTransactions] = useState('');
    const[expenses, setExpenses] = useState('');
    
    const handleClick = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.get('http://localhost:4000/getLedger');
            console.log(response.data)
            setTransactions(response.data)
        } catch (error){
            console.log(error)
        }
    }

    const handleExpense = async (e) => {
        e.preventDefault()
        try {
            setExpenses('');
            const response = await axios.get('http://localhost:4000/getExpenses');
            console.log(response.data)
            for(let i = 0; i < response.data.length; i ++){
                if(response.data[i].category_id != 6){
                    response.data[i].total_amount_spent = (Number(response.data[i].total_amount_spent) * -1).toString()
                }
            }
            // response.data[0].total_amount_spent = (Number(response.data[0].total_amount_spent) * -1).toString()
            // response.data[1].total_amount_spent = (Number(response.data[1].total_amount_spent) * -1).toString()
            // response.data[2].total_amount_spent = (Number(response.data[2].total_amount_spent) * -1).toString()
            // response.data[3].total_amount_spent = (Number(response.data[3].total_amount_spent) * -1).toString()
            // response.data[4].total_amount_spent = (Number(response.data[4].total_amount_spent) * -1).toString()
            console.log(response.data)
            setExpenses(response.data)
        } catch (error){
            console.log(error)
        }
    }

    return (
        <div>
            <div className="flex space-x-4 p-8">
                <div className="bg-white p-8 shadow-lg rounded-lg w-3/5 h-2/3">
                    <div className='flex relative absolute'>
                        <h3 className='text-1xl'>Transactions</h3>
                        <div className=' bg-gray-200 rounded p-1 justify-end'>
                            <button onClick={handleClick}>refresh</button>
                        </div>
                    </div>
                    {transactions && transactions.map(transaction => (
                        <TransactionDisplay trans={transaction}/>
                    ))}
                    
                </div>
                <div className="bg-white p-8 shadow-lg rounded-lg w-2/5 h-2/3">
                    <h3 className='text-1xl'>Expenses Graphs</h3>
                    <div className=' bg-gray-200 rounded p-1 justify-end'>
                        <button onClick={handleExpense}>refresh</button>
                    </div>
                    {expenses && <GraphDisplay expense = {expenses}/>}
                </div>
            </div>
        </div>
    )
}

export default HomePage