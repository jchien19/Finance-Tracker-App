import { createContext, useReducer } from "react";

export const DateContext = createContext();

export const DateReducer = (state, action) => {
    switch (action.type){
        case 'CHANGE':
            console.log('CHANGE: ', action.payload);
            return {
                start: action.payload.startDate,
                end: action.payload.endDate
            }
        default:
            return {state}
    }
}

export const DateContextProvider = ({ children }) => {

    let date = new Date()
    let month = date.getMonth() + 1
    let endMonth = date.getMonth() + 2
    let endYear = date.getFullYear()
    if(month < 10){
        month = '0' + month.toString();
        if(endMonth < 10){
            endMonth = '0' + endMonth.toString();
        }
    } else if (month === 12){
        endMonth = '01';
        endYear = '' + (endYear + 1).toString();
    }
    // console.log('date now: ', date)
    const [state, dispatch] = useReducer(DateReducer, {
        start: `${date.getFullYear()}-${month}-01`,
        end: `${endYear}-${endMonth}-01`
    })
    // console.log('Date State: ', state)

    return (
        <DateContext.Provider value={{...state, dispatch}}>
            { children }
        </DateContext.Provider>
    );
};