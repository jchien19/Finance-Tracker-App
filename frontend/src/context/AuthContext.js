import { createContext, useReducer } from "react";

export const AuthContext = createContext();

export const AuthReducer = (state, action) => {
    switch (action.type){
        case 'LOGIN':
            return {usern: action.payload}
        case 'LOGOUT':
            return {usern: null}
        default:
            return {state}
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, {
        usern: null
    })
    console.log('Auth State: ', state)

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    );
};