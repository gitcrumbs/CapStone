import {createReducer} from "../config/create-reducer";
import {REHYDRATE} from 'redux-persist';
import {setAuthToken} from "./authDispatcher";

export const LOGIN = "auth/login";
export const LOGOUT = "auth/logout";


const getDefaultRoles = () => {
    return getApplicableRoles({role: "ANONYMOUS"})
}
export const getApplicableRoles = (user) => {

    const isApproved = true;
    const isUser = true;


    return {isUser, isApproved}
}

export const initialState = {
    isLoggedIn: false,
    token: null,
    user: null,
    roles: getDefaultRoles()
}


const loginUser = (state, action) => {

    let updatedState = {}
    if (action?.payload) {
        const roles = getApplicableRoles(action.payload)
        updatedState = {isLoggedIn: true, token: action.payload.accessToken, user: action.payload, roles}
    }
    return {...state, ...updatedState}


};
const logOutUser = (state, action) => {

    console.log("logOutUser reducer", "logout reducer")

    return {...state, isLoggedIn: false, token: null, user: null, roles: getDefaultRoles()}

};
const rehydrateApp = (state, action) => {

    if (action?.payload?.auth?.user) {
        let {auth} = action.payload;
        let {user, token} = auth
        setAuthToken(token)
        const roles = getApplicableRoles(user)

        return {...state, isLoggedIn: true, token: token, user: user, roles}
    } else {
        return {...state}
    }


};


const authReducer = createReducer(initialState, {
    [LOGIN]: loginUser,
    [REHYDRATE]: rehydrateApp,
    [LOGOUT]: logOutUser


});


export default authReducer;

