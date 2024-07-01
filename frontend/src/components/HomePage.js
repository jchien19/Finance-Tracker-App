

const HomePage = () => {

    return (
        <div>
            <div className="flex space-x-4 p-8">
                <div className="bg-white p-8 shadow-lg rounded-lg w-2/3 h-2/3">
                    <h3 className='text-1xl'>Transactions</h3>
                </div>
                <div className="bg-white p-8 shadow-lg rounded-lg w-1/3 h-2/3">
                    <h3 className='text-1xl'>Graphs</h3>
                </div>
            </div>
        </div>
    )
}

export default HomePage