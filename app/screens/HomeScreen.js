// app\screens\HomeScreen.js
import React, { useState } from "react";
import {
    View,
    Text,
    Modal,
    SafeAreaView,
    StyleSheet,
    Platform,
    Button,
    Pressable,
} from "react-native";
import Constants from "expo-constants";
import AddAccountsModal from "./AddAccountsModal";

const HomeScreen = () => {
    const [modalVisible, setModalVisible] = useState(false);
    return (
        // <SafeAreaView>
        <View style={styles.view}>
            <Text>Home Screen</Text>
            {/* =========== modal =============== */}
            <Modal
                style={styles.modal}
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <AddAccountsModal />
                <Pressable
                    style={{
                        ...styles.addAccoundButton,
                        backgroundColor: "red",
                        minWidth: 100,
                    }}
                    onPress={() => setModalVisible(false)}
                >
                    <Text style={styles.button_text}>close</Text>
                </Pressable>
            </Modal>
            {/* ============== modal open ============== */}
            {/* Button == Pressable */}
            <Pressable
                style={styles.addAccoundButton}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.button_text}>Add New Account</Text>
            </Pressable>
        </View>
        // </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    view: {
        flex: 1,
        padding: 10,
        // different for android and ios
        paddingTop: Platform.OS == "ios" ? 0 : Constants.statusBarHeight,
    },
    addAccoundButton: {
        position: "absolute",
        bottom: 35,
        right: 20,
        padding: 16,
        borderRadius: 10,
        backgroundColor: "rgb(22, 111, 228)",
        alignItems: "center",
        justifyContent: "center",
    },
    button_text: {
        fontSize: 12,
        fontWeight: "bold",
    },
    modal: {
        backgroundColor: "red",
    },
});

export default HomeScreen;
