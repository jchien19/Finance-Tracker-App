// import { useState } from 'react';
import { useDateContext } from '../hooks/useDateContext';
import { useState } from 'react';

const Settings = () => {

    const { start, end, dispatch } = useDateContext();
    const [startDate, setStartDate] = useState(start);
    const [endDate, setEndDate] = useState(end);
    const [dateSuccess, setDateSuccess] = useState('');

    const handleDateSubmit = async (e) => {
        e.preventDefault();
        // console.log('start date: ', startDate)
        // console.log('end date: ', endDate)
        dispatch({type: 'CHANGE', payload: {startDate, endDate}})
        setDateSuccess('successful submit')
    }

    return (
    <div>
        <div className="bg-white space-x-4 ml-10 mr-10 mt-4 shadow-lg rounded-lg">
            <div>
                <h1 className="p-3 text-xl font-bold">Settings</h1>
            </div>
            <form className='p-1' onSubmit={handleDateSubmit}>
                <div className="p-2">
                    <div className='flex'>
                        <h1 className='text-lg'>Date Range</h1>
                    </div>

                <label className="block text-sm font-medium text-gray-700 mb-1 mt-2" htmlFor="date">
                    Start Date
                </label>
                <input
                    type="date"
                    id="s_date"
                    onChange={(e) => setStartDate(e.target.value)} 
                    value={startDate}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    required
                />
                <label className="block text-sm font-medium text-gray-700 mt-2" htmlFor="date">
                    End Date
                </label>
                <input
                    type="date"
                    id="e_date"
                    onChange={(e) => setEndDate(e.target.value)} 
                    value={endDate}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    required
                />
                </div>
                {dateSuccess && <div className = 'bg-green-200 rounded-lg border text-green-500'>{dateSuccess}</div>}
                <button type="submit" className="px-4 py-2 bg-purple-400 text-white rounded-md">
                    Submit
                </button>
            </form>
        </div>
    </div>
    )
}

export default Settings;