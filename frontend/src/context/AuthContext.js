import {createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer"

const INITIAL_STATE = {
    user: {
        _id:"615c7dabb4f410280a2771f9",
        username:"Mali",
        email:"Mali@gmail.com",
        profilePicture:"person/1.jpg",
        coverPicture:"",
        followers:[],
        followings:[]
    },
    isFetching:false,
    error:false
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) =>{
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
    return(
        <AuthContext.Provider 
            value= {{
                user: state.user,
                isFetching: state.isFetching,
                error: state.error,
                dispatch
                }} 
        >
            {children}
        </AuthContext.Provider>
    )
}