// app\screens\HomeScreen.js
import React from "react";
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    Platform,
    Button,
} from "react-native";
import Constants from "expo-constants";

const HomeScreen = () => {
    return (
        <SafeAreaView>
            <View style={styles.view}>
                <Text>Home Screen</Text>
            </View>
            <Button title="dd">Add new Album</Button>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    view: {
        // different for android and ios
        paddingTop: Platform.OS == "ios" ? 0 : Constants.statusBarHeight,
    },
});

export default HomeScreen;
