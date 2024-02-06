// app\redux\reducer.js
import * as actionTypes from "./actionTypes";

// initial state
const initState = {
    isAuth: false,
    token: null,
    user_email: null,
    account_List: [],
};

export const rootReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.AUTHENTICATE_USER:
            return {
                ...state,
                isAuth: true,
                token: action.payload.token,
                user_email: action.payload.email,
            };
        case actionTypes.LOAD_ACCOUNTS:
            return {
                ...state,
                account_List: action.payload,
            };

        default:
            return state;
    }
};
