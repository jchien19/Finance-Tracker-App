import { useState } from 'react';
import axios from 'axios';

const TotalSpent = (props) => {

    const [total, setTotal] = useState(0);
    // console.log('Total Spent: ', props);
    let temp = 0;
    for(let i = 0; i < props.charges.length; i ++){
        if(props.charges.category_id === 6){
            temp -= props.charges[i].total_amount_spent
        } else {
            temp += props.charges[i].total_amount_spent
        }
    }
    // setTotal(temp)

    return (
        <div className='bg-white'>
            <p>Total spent: {total}</p>
        </div>
    )

}

export default TotalSpent;