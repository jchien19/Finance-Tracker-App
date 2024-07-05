
const TransactionDisplay = ({ trans }) => {

    if(!trans.expense){
        return (
            <div className='mt-2 mb-2'>
                <div className="flex m-auto rounded-lg bg-gray-100 m-1">
                    <div className="items-center flex w-3/4 rounded-lg p-3">
                        <h1 className='abolsute text-xl font-bold text-purple-700'>{trans.desc}</h1>
                        <p className="ml-3 align-text-center"> {trans.category} | {trans.trans_date.substring(0,10)}</p>
                    </div>
                    <div className="w-1/4 bg-green-100 text-center rounded-lg p-4">
                        <p className='font-semibold'>{trans.amount}</p>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className='mt-2 mb-2'>
                <div className="flex m-auto rounded-lg bg-gray-100 m-1">
                    <div className="items-center flex w-3/4 rounded-lg p-3">
                        <h1 className='abolsute text-xl font-bold text-purple-700'>{trans.desc}</h1>
                        <p className="ml-3 align-text-center"> {trans.category} | {trans.trans_date.substring(0,10)}</p>
                    </div>
                    <div className="w-1/4 bg-red-100 text-center rounded-lg p-4">
                        <p className='font-semibold'>{trans.amount}</p>
                    </div>
                </div>
            </div>
        )
    }
    

}

export default TransactionDisplay;