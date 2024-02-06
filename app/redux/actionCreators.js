// app\redux\actionCreators.js
import * as actionTypes from "./actionTypes";
import { navigate } from "../Navigation/Navigation_all_helper";
import { Alert } from "react-native";

// //================ firebase database e upload ====================//
// // axios o use kora jay
// // ekhane fetch use kora holo
// export const addPlace = (place) => {
//     // console.log(place);
//     // auto state ashe reducer theke, variable(ekhane getState) e store korte hy
//     return (dispatch, getState) => {
//         let token = getState().token;
//         // places table e store
//         // link/uri , additional data
//         fetch(
//             `https://my-place-react-native-2-default-rtdb.asia-southeast1.firebasedatabase.app/places.json?auth=${token}`,
//             {
//                 method: "POST",
//                 body: JSON.stringify(place),
//             }
//         )
//             .catch((error) => console.log(error))
//             // error na hole
//             .then((response) => response.json())
//             .then((data) => {
//                 // load places  after add
//                 dispatch(loadPlaces());
//                 console.log("check data leak addPlaces\n");
//             });
//     };
// };

// // ============== to reducer ====================//
// export const setPlaces = (places) => {
//     return {
//         type: actionTypes.SET_PLACES,
//         payload: places,
//     };
// };

// //================ retrieve from firebase ======================//
// export const loadPlaces = () => (dispatch, getState) => {
//     let token = getState().token;
//     fetch(
//         `https://my-place-react-native-2-default-rtdb.asia-southeast1.firebasedatabase.app/places.json?auth=${token}`
//     )
//         .catch((err) => {
//             alert("something went wrong, sorry");
//             console.log(err);
//         })
//         .then((res) => res.json())
//         .then((data_from_firebase) => {
//             const places = [];
//             console.log("check data leak==> loadPlaces\n");

//             for (let key in data_from_firebase) {
//                 places.push({
//                     ...data_from_firebase[key],
//                     key: key,
//                 });
//             }

//             dispatch(setPlaces(places));
//         });
// };

// // =================== delete ==================//

// //  from firebase
// export const deletePlaceFromFirebase = (key) => {
//     // auto state ashe reducer theke, variable(ekhane getState) e store korte hy
//     return (dispatch, getState) => {
//         let token = getState().token;

//         // places table e store
//         // link/uri , additional data
//         fetch(
//             `https://my-place-react-native-2-default-rtdb.asia-southeast1.firebasedatabase.app/places/${key}.json?auth=${token}`,
//             {
//                 method: "DELETE",
//             }
//         )
//             .catch((error) => console.log(error))
//             // error na hole
//             .then((response) => response.json())
//             .then((data) => dispatch(loadPlaces()));
//     };
// };
// // ================== eita just silo list theke delete, use nai r =======================//
// export const deletePlace = (key) => {
//     return {
//         type: actionTypes.DELETE_PLACE,
//         payload: key,
//     };
// };

// =============== authenticate user ==========//
// send to reducer
export const authUser = (token, email) => {
    return {
        type: actionTypes.AUTHENTICATE_USER,
        payload: {
            token: token,
            email: email,
        },
    };
};

// ============= SIGN UP and LOGIN ================//
const API = "AIzaSyCA8wxBm24JfagwPdvCfBzO8-o0v-orvNU";

export const tryAuth = (email, password, mode) => (dispatch) => {
    if (mode == "signup") {
        url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API}`;
    } else if (mode == "login") {
        url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API}`;
    }

    fetch(url, {
        method: "POST",
        body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
        }),
        headers: { "Content-Type": "application/json" },
    })
        .catch((err) => {
            console.log(err);
            alert("Authentication Failed!");
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.error) {
                alert(data.error.message);
            } else {
                if (mode == "signup") {
                    dispatch(setUserIdWhenSignUp(email));
                }
                // dispacth to reducer

                dispatch(authUser(data.idToken, email));
                dispatch(loadAccounts(email));
                navigate("Home");
            }
        });
};

const setUserIdWhenSignUp = (email) => {
    return (dispatch, getState) => {
        let token = getState().token;

        fetch(
            `https://finance-app-react-native-32a6f-default-rtdb.asia-southeast1.firebasedatabase.app/Credentials.json?auth=${token}`,
            {
                method: "POST",
                body: JSON.stringify({
                    // userId: new Date().getTime(),
                    email: email,
                }),
            }
        )
            .catch((error) => console.log(error))
            // error na hole
            .then((response) => response.json())
            .then((data) => {
                console.log("check data leak setUserID\n");
            });
    };
};

//==================== Add account ===================//

export const addAccount = (email, acc_name) => {
    // console.log(place);
    // auto state ashe reducer theke, variable(ekhane getState) e store korte hy
    return (dispatch, getState) => {
        let token = getState().token;
        // places table e store
        // link/uri , additional data
        fetch(
            `https://finance-app-react-native-32a6f-default-rtdb.asia-southeast1.firebasedatabase.app/Account_Names.json?auth=${token}`,
            {
                method: "POST",
                body: JSON.stringify({
                    user_email: email,
                    acc_name: acc_name,
                }),
            }
        )
            .catch((error) => Alert.alert(error))
            // error na hole
            .then((response) => {
                Alert.alert("Added");
                //response.json();
            })
            .then((data) => {
                // load places  after add
                //dispatch(loadPlaces());
                console.log("check data leak addAccounts\n");
            });
    };
};

// ========================== retrive all accounts name for user ======================//

export const loadAccounts = (email) => (dispatch, getState) => {
    let token = getState().token;
    fetch(
        `https://finance-app-react-native-32a6f-default-rtdb.asia-southeast1.firebasedatabase.app/Account_Names.json?orderBy="user_email"&equalTo="${email}"&auth=${token}`
    )
        .catch((err) => {
            alert("something went wrong, sorry");
            console.log(err);
        })
        .then((res) => res.json())
        .then((data_from_firebase) => {
            console.log("check data leak==> loadAccounts\n");
            // console.log(data_from_firebase);
            const accountNames = [];
            //  retrive only acc_names
            for (let key in data_from_firebase) {
                accountNames.push({
                    acc_name: data_from_firebase[key].acc_name,
                    key: key,
                });
            }
            dispatch(loadAcoounts_helper(accountNames));
        });
};

export const loadAcoounts_helper = (accountNames) => {
    return {
        type: actionTypes.LOAD_ACCOUNTS,
        payload: accountNames,
    };
};

// =============================== ADD new Catrgory ============================//
export const addCategory = (acc_name_key, category_name) => {
    return (dispatch, getState) => {
        let token = getState().token;
        // places table e store
        // link/uri , additional data
        fetch(
            `https://finance-app-react-native-32a6f-default-rtdb.asia-southeast1.firebasedatabase.app/Categories.json?auth=${token}`,
            {
                method: "POST",
                body: JSON.stringify({
                    target_account_key: acc_name_key,
                    category_name: category_name,
                }),
            }
        )
            .catch((error) => Alert.alert(error))
            // error na hole
            .then((response) => {
                Alert.alert("Added");
            })
            .then((data) => {
                // load places  after add
                //dispatch(loadPlaces());
                console.log("check data leak addCategories\n");
            });
    };
};

// ========================== Load Category ======================//

export const loadCategory = (acc_name_key) => (dispatch, getState) => {
    let token = getState().token;
    fetch(
        `https://finance-app-react-native-32a6f-default-rtdb.asia-southeast1.firebasedatabase.app/Categories.json?orderBy="target_account_key"&equalTo="${acc_name_key}"&auth=${token}`
    )
        .catch((err) => {
            alert("something went wrong, sorry");
            console.log(err);
        })
        .then((res) => res.json())
        .then((data_from_firebase) => {
            console.log("check data leak==> LoadCategories\n");

            const CategoryNames = [];

            for (let key in data_from_firebase) {
                CategoryNames.push({
                    category_name: data_from_firebase[key].category_name,
                    key: key,
                });
            }
            // console.log(CategoryNames);
            dispatch(loadCategory_helper(CategoryNames));
        });
};

export const loadCategory_helper = (CategoryNames) => {
    return {
        type: actionTypes.LOAD_CATEGORIES,
        payload: CategoryNames,
    };
};

// ======================== Add Entries ===============================//
export const addEntry = (category_key, accountKey_of_category, inputEntry) => {
    return (dispatch, getState) => {
        let token = getState().token;
        // places table e store
        // link/uri , additional data
        fetch(
            `https://finance-app-react-native-32a6f-default-rtdb.asia-southeast1.firebasedatabase.app/Entries.json?auth=${token}`,
            {
                method: "POST",
                body: JSON.stringify({
                    category_key: category_key,
                    accountKey_of_category: accountKey_of_category,
                    the_Entry: inputEntry,
                }),
            }
        )
            .catch((error) => Alert.alert(error))
            // error na hole
            .then((response) => {
                Alert.alert("Added");
            })
            .then((data) => {
                // load places  after add
                //dispatch(loadPlaces());
                console.log("check data leak addEntry\n");
            });
    };
};

// ========================== Load Entry ======================//

export const loadEntries = (category_key) => (dispatch, getState) => {
    let token = getState().token;
    fetch(
        `https://finance-app-react-native-32a6f-default-rtdb.asia-southeast1.firebasedatabase.app/Entries.json?orderBy="category_key"&equalTo="${category_key}"&auth=${token}`
    )
        .catch((err) => {
            alert("something went wrong, sorry");
            console.log(err);
        })
        .then((res) => res.json())
        .then((data_from_firebase) => {
            console.log("check data leak==> LoadCategories\n");

            const Entries = [];

            for (let key in data_from_firebase) {
                Entries.push({
                    accountKey_of_category:
                        data_from_firebase[key].accountKey_of_category,
                    category_key: data_from_firebase[key].category_key,
                    the_Entry: data_from_firebase[key].the_Entry,
                    key: key,
                });
            }
            // console.log(Entries);
            dispatch(loadEntries_helper(Entries));
        });
};

export const loadEntries_helper = (Entries) => {
    return {
        type: actionTypes.LOAD_ENTRIES,
        payload: Entries,
    };
};

// ========================= fetch account summery ======================//
export const accountSummery = (account_key) => (dispatch, getState) => {
    let token = getState().token;
    fetch(
        `https://finance-app-react-native-32a6f-default-rtdb.asia-southeast1.firebasedatabase.app/Entries.json?orderBy="accountKey_of_category"&equalTo="${account_key}"&auth=${token}`
    )
        .catch((err) => {
            alert("something went wrong, sorry");
            console.log(err);
        })
        .then((res) => res.json())
        .then((data_from_firebase) => {
            console.log("check data leak==> account summery\n");

            let income = 0;
            let expense = 0;

            for (let key in data_from_firebase) {
                let x = Number(data_from_firebase[key].the_Entry.money_amount);

                if (data_from_firebase[key].the_Entry.type == "expense") {
                    expense += x;
                } else if (data_from_firebase[key].the_Entry.type == "income") {
                    income += x;
                }
            }
            let summery = {
                income: income,
                expense: expense,
            };

            dispatch(accountSummery_helper(summery));
        });
};

export const accountSummery_helper = (summery) => {
    return {
        type: actionTypes.LOAD_ACCOUNT_SUMMERY,
        payload: summery,
    };
};
