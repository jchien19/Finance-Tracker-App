import React, { useState } from 'react'
import { useAuthContext } from "../hooks/useAuthContext"
import axios from 'axios';
import TransactionDisplay from './TransactionDisplay';
import GraphDisplay from './GraphDisplay';
import TransactionForm from './TransactionForm';
import TotalSpent from './TotalSpent';

const HomePage = () => {

    const { usern } = useAuthContext();
    const[transactions, setTransactions] = useState('');
    const[expenses, setExpenses] = useState('');
    const [showPopup, setShowPopup] = useState(false);

    const togglePopup = () => {
      setShowPopup(!showPopup);
    };
    
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
            console.log(response.data)
            setExpenses(response.data)
        } catch (error){
            console.log(error)
        }
    }

    return (
        <div>
            <div className='bg-white space-x-4 ml-8 mr-8 mt-4 shadow-lg rounded-lg'>
                <div className='p-4'>
                    <h3 className='text-1xl font-bold'>Total</h3>
                    {expenses && <TotalSpent charges={expenses}/>}
                </div>
            </div>
            <div className="flex space-x-4 p-8">
                <div className="bg-white p-8 shadow-lg rounded-lg w-3/5 h-2/3">
                    <div className='flex relative absolute p-3'>
                        <h3 className='text-1xl font-bold'>Transactions</h3>
                        <div className='flex absolute right-0 transform gap-2 border border-gray-300 bg-gray-100 rounded-full px-2 shadow-gray-300'>
                            <button onClick={togglePopup}>
                                            Add New Expense
                            </button>
                        <div className='border border-l border-gray-300'></div>
                            <button onClick={handleClick}>refresh</button>
                        </div>
                    </div>
            {showPopup && <TransactionForm ToggleFunction = {togglePopup}/>}
                {transactions && transactions.map(transaction => (
                    <TransactionDisplay trans={transaction}/>
            ))}
                </div>
                <div className="bg-white p-8 shadow-lg rounded-lg w-2/5 h-2/3">
                    <div className='flex relative absolute p-2'>
                        <h3 className='text-1xl font-bold'>Expenses Graph</h3>
                        <div className='absolute right-0 bg-gray-100 border border-gray-300 gap-2 rounded-full px-2'>
                            <button onClick={handleExpense}>refresh</button>
                        </div>
                    </div>
                    {expenses && <GraphDisplay expense = {expenses}/>}
                </div>
            </div>
        </div>
    )
}

export default HomePage