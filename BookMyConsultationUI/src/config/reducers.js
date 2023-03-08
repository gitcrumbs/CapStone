import {combineReducers} from 'redux';
import auth, {LOGOUT} from '../auth/authStore';

const appReducer = combineReducers({
    auth
})

export default (state, action) => {
    const appState = action.type === LOGOUT ? undefined : { ...state }
    return appReducer(appState, action)
}
