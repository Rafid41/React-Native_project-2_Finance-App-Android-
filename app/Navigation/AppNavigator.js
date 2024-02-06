// app\AppNavigator.js
// controls all navigation fuctionalities
import React from "react";
import HomeScreen from "../screens/HomeScreen";
// import MenuScreen from "./screens/MenuScreen";
// import FavouritesScreen from "./screens/FavouritesScreen";
// import DishDetailScreen from "./screens/DishDetailScreen";
// import Icon from "./components/Icon";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import Auth from "../screens/Auth";
import { useNavigation } from "@react-navigation/native";
import Categories from "../screens/Categories/Categories";
import Entries from "../screens/Entries/Entries";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        // initialRouteName="Home" means first app open e "Home" ashbe
        <Drawer.Navigator
            initialRouteName="Home"
            // hides Navbar
            //screenOptions={{ headerShown: false }}
        >
            <Drawer.Screen
                name="Auth"
                component={Auth}
                options={{ headerShown: false, swipeEnabled: false }}
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
        </Drawer.Navigator>
    );
};

export default AppNavigator;
