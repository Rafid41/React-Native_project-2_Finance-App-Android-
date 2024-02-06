// app\redux\reducer.js
import * as actionTypes from "./actionTypes";

// initial state
const initState = {
    isAuth: false,
    token: null,
    user_email: null,
    account_List: [],
    category_List: [],
    entry_List: [],
    account_summery: {
        income: 0,
        expense: 0,
    },
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

        case actionTypes.LOAD_CATEGORIES:
            return {
                ...state,
                category_List: action.payload,
            };
        case actionTypes.LOAD_ENTRIES:
            return {
                ...state,
                entry_List: action.payload,
            };
        case actionTypes.LOAD_ACCOUNT_SUMMERY:
            return {
                ...state,
                account_summery: action.payload,
            };

        default:
            return state;
    }
};
