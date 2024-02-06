import { StyleSheet, Platform } from "react-native";
import Constants from "expo-constants";

const styles = StyleSheet.create({
    // ======================= HomeScreen.js ===============================//
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
        color: "white",
    },

    // ===================== AddAccountsModal.js ==============================//
    centeredView: {
        flex: 1,
        // justifyContent: "center",
        alignItems: "center",
        margin: 10,
        marginTop: 100,
        backgroundColor: "white",
        borderWidth: 4,
        borderRadius: 25,
        padding: 15,
    },
    modalView: {
        margin: 20,
    },
    accSubmitBtn: {
        width: 100,
        height: 50,
        marginTop: 20,
        padding: 16,
        borderRadius: 10,
        backgroundColor: "#8ce6e3",
        alignItems: "center",
        justifyContent: "center",
    },
});

export default styles;
