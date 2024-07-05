import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    const login = async(usern, pass) => {
        setIsLoading(true)
        setError(null)

        const response = axios.post('http://localhost:4000/login')
    }
}