import { useState } from 'react';
import axios from 'axios';

const EditForm = (props) => {

  let categoryInit = 0;
  if(props.TransInfo.category === 'Rent/Utilities'){
    categoryInit = 1;
  } else if(props.TransInfo.category === "Healthcare"){
    categoryInit = 2;
  } else if(props.TransInfo.category === "Food"){
    categoryInit = 3;
  } else if(props.TransInfo.category === "Leisure"){
    categoryInit = 4;
  } else if(props.TransInfo.category === "Transportation"){
    categoryInit = 5;
  }   else if(props.TransInfo.category === "Savings"){
    categoryInit = 6;
  }
  console.log('edit form trans id: ', props.TransInfo.id)
    const [title, setTitle] = useState(`${props.TransInfo.desc}`);
    const [category, setCategory] = useState(`${categoryInit}`);
    const [amount, setAmount] = useState(`${Math.abs(props.TransInfo.amount)}`);
    const [date, setDate] = useState(`${props.TransInfo.trans_date.substring(0,10)}`);
    // const account_id = 'd1c1e475-52bb-4699-9f59-30cfcf8e953e'

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission logic here
        try {
            const response = await axios.patch('http://localhost:4000/updateTransaction/' + props.TransInfo.id.toString(), { 
              amount,
              date,
              title,
              category
            });
            console.log(response.data)
            console.log('Form submitted');
            props.ToggleFunction()
        } catch (error){
            console.log(error)
        }        
      };

    return (
     <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-8 w-1/3 rounded-md shadow-lg z-50">
          <h2 className="text-xl font-semibold mb-4">Edit Transaction</h2>
          <form onSubmit={handleSubmit}>
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
                  <option value="0">Select a category</option>
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
                onClick={props.ToggleFunction}
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

export default EditForm