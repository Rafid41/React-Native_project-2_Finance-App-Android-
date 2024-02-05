// App.js
import React from "react";
import AppNavigator from "./app/Navigation/AppNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "./app/redux/store";
import {
    navigate,
    navigationRef,
} from "./app/Navigation/Navigation_all_helper";

export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer ref={navigationRef}>
                <AppNavigator />
            </NavigationContainer>
        </Provider>
    );
}
