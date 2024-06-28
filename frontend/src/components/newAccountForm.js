import { useState } from 'react'
import axios from 'axios'

const newAccountForm = () =>{

    const[user, setUser] = useState('')
    const[pass, setPass] = useState('')

    const handleSubmit = async () => {
        const response = await axios.post('/api/register');
    }

    return(
        <form>

            <button>Register</button>
        </form>

    )
}