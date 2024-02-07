// app\AppNavigator.js
// controls all navigation fuctionalities
import React from "react";
import HomeScreen from "../screens/HomeScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import Auth from "../screens/Auth";
import { useNavigation } from "@react-navigation/native";
import Categories from "../screens/Categories/Categories";
import Entries from "../screens/Entries/Entries";
import EntryDetail from "../screens/Entries/EntryDetail";
import Summery from "../screens/Summery/Summery";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        // initialRouteName="Home" means first app open e "Home" ashbe
        <Drawer.Navigator
            initialRouteName="Auth"
            // hides Navbar
            //screenOptions={{ headerShown: false }}
        >
            <Drawer.Screen
                name="Auth"
                component={Auth}
                options={{
                    headerShown: false,
                    swipeEnabled: false,
                    drawerLabel: "Logout",
                }}
            />
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen
                name="Categories"
                component={Categories}
                options={{
                    drawerLabel: () => null,
                    // hides it from sliding window
                    drawerItemStyle: { display: "none" },
                }}
            />
            <Drawer.Screen
                name="Entries"
                component={Entries}
                options={{
                    drawerLabel: () => null,
                    // hides it from sliding window
                    drawerItemStyle: { display: "none" },
                }}
            />
            <Drawer.Screen
                name="EntryDetail"
                component={EntryDetail}
                options={{
                    drawerLabel: () => null,
                    // hides it from sliding window
                    drawerItemStyle: { display: "none" },
                }}
            />
            <Drawer.Screen
                name="Summery"
                component={Summery}
                options={{
                    drawerLabel: () => null,
                    // hides it from sliding window
                    drawerItemStyle: { display: "none" },
                }}
            />
        </Drawer.Navigator>
    );
};

export default AppNavigator;
