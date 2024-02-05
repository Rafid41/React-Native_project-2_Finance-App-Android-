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
                console.log("check data leak addPlaces\n");
            });
    };
};

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

                navigate("Home");
            }
            // console.log(data);
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
