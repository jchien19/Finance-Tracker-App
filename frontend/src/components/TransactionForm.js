import { useState } from 'react';
import axios from 'axios';

const TransactionForm = (passedFunction) => {

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const account_id = 'd1c1e475-52bb-4699-9f59-30cfcf8e953e'

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission logic here
        try {
          console.log(title, category, amount, date, account_id)
            const response = await axios.post('http://localhost:4000/newTransaction', { 
              account_id,
              amount,
              date,
              title,
              category
            });
            console.log(response.data)
            console.log('Form submitted');
        } catch (error){
            console.log(error)
        }        
      };

    return (
     <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-8 w-1/3 rounded-md shadow-lg z-50">
          <h2 className="text-xl font-semibold mb-4">Add Transaction</h2>
          <form onSubmit={passedFunction.ToggleFunction && handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="title">
                Title
              </label>
              <input
                type="text"
                id="title"
                onChange={(e) => setTitle(e.target.value)} 
                value={title}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>
            <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="category">
                  Category
                </label>
                <select
                  id="category"
                  onChange={(e) => setCategory(e.target.value)} 
                  value={category}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  required
                >
                  <option value="">Select a category</option>
                  <option value="1">Rent/Utilities</option>
                  <option value="2">Healthcare</option>
                  <option value="3">Food</option>
                  <option value="4">Leisure</option>
                  <option value="5">Transportation</option>
                  <option value="6">Savings</option>
                </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="amount">
                Amount
              </label>
              <input
                type="number"
                step="0.01"
                id="amount"
                min="0"
                onChange={(e) => setAmount(e.target.value)} 
                value={amount}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="date">
                Date
              </label>
              <input
                type="date"
                id="date"
                onChange={(e) => setDate(e.target.value)} 
                value={date}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={passedFunction.ToggleFunction}
                className="px-4 py-2 bg-gray-500 text-white rounded-md mr-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-purple-400 text-white rounded-md"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    )
}

export default TransactionForm