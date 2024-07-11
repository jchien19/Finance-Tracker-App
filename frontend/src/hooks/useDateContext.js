import { DateContext } from '../context/DateContext'
import { useContext } from 'react'

export const useDateContext = () => {
    const context = useContext(DateContext)
    if(!context){
        throw Error('DateContext is out of scope')
    }
    return context
}