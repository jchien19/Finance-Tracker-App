import { useState } from 'react';
import axios from 'axios';
import EditForm from './EditForm';

const TransactionDisplay = ({ trans }) => {

    const id = trans.id;
    const [showPopup, setShowPopup] = useState('');

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };
    

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            console.log('frontend delete id: ', trans.id)
            const response = await axios.delete('http://localhost:4000/deleteTransaction/' + id.toString());
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    if(!trans.expense){
        return (
            <div className='mt-2 mb-2'>
                <div className="flex m-auto rounded-lg bg-gray-100 m-1">
                    <div className="items-center flex w-3/4 rounded-lg p-3">
                        <h1 className='abolsute text-xl font-bold text-purple-700'>{trans.desc}</h1>
                        <p className="ml-3 align-text-center"> {trans.category} | {trans.trans_date}</p>
                    </div>

                    <div className="w-1/4 bg-green-100 text-center rounded-lg p-4">
                        <p className='font-semibold'>{trans.amount}</p>
                    </div>
                    <div className='flex align-center py-4'>
                        <div>
                            <span className="material-symbols-outlined cursor-pointer" onClick={handleDelete}>delete</span>
                        </div>
                        <div>
                            <span className="material-symbols-outlined cursor-pointer" onClick={togglePopup}>edit</span>
                        </div>
                    </div>
                </div>    
                {showPopup && <EditForm ToggleFunction = {togglePopup} TransInfo={trans}/>}
            </div>
        )
    } else {
        return (
            <div className='mt-2 mb-2'>
                <div className="flex m-auto rounded-lg bg-gray-100 m-1">
                    <div className="items-center flex w-3/4 rounded-lg p-3">
                        <h1 className='abolsute text-xl font-bold text-purple-700'>{trans.desc}</h1>
                        <p className="ml-3 align-text-center"> {trans.category} | {trans.trans_date}</p>
                    </div>
                    <div className="w-1/4 bg-red-100 text-center rounded-lg p-4">
                        <p className='font-semibold'>{trans.amount}</p>
                    </div>
                    <div className='flex align-center py-4 '>
                        <div>
                            <span className="material-symbols-outlined cursor-pointer" onClick={handleDelete}>delete</span>
                        </div>
                        <div>
                            <span className="material-symbols-outlined cursor-pointer" onClick={togglePopup}>edit</span>
                        </div>
                    </div>
                </div>
                {showPopup && <EditForm ToggleFunction = {togglePopup} TransInfo={trans}/>}
            </div>
        )
    }
    

}

export default TransactionDisplay;