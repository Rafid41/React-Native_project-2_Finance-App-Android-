// app\screens\AddAccountsModal.js
import {
    Alert,
    Modal,
    StyleSheet,
    Text,
    Pressable,
    View,
    TextInput,
} from "react-native";
import React, { useState } from "react";
import { connect } from "react-redux";
import { addAccount } from "../redux/actionCreators";

// ======= mapStateToProps ==================//
const mapStateToProps = (state) => {
    return {
        isAuth: state.isAuth,
        user_email: state.user_email,
    };
};

// ============= send data to redux actionCreators =================//
const mapDispatchToProps = (dispatch) => {
    return {
        addAccount: (email, acc_name) => dispatch(addAccount(email, acc_name)),
    };
};

// ===================== function start =======================//

const AddAccountsModal = (props) => {
    const [textInputValue, setTextInputValue] = useState("");

    // ================ handle Submit ========================//
    const handleSubmit = () => {
        if (textInputValue == "") {
            Alert.alert("Please enter the Name of the Account ");
        } else if (props.user_email == null) {
            Alert.alert("Please Login first ");
        } else {
            props.addAccount(props.user_email, textInputValue);
        }
    };

    //console.log(props.user_email);
    return (
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <Text style={{ fontSize: 20 }}>Add New Accounts{"\n"}</Text>

                <TextInput
                    placeholder="Account Name"
                    style={{
                        width: "100%",
                        borderBottomWidth: 1,
                        borderColor: "black",
                        padding: 7,
                    }}
                    value={textInputValue}
                    onChangeText={(text) => setTextInputValue(text)}
                />
                <Pressable
                    style={styles.accSubmitBtn}
                    onPress={() => handleSubmit()}
                >
                    <Text
                        style={{ padding: 2, fontSize: 10, fontWeight: "bold" }}
                    >
                        ADD
                    </Text>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
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

export default connect(mapStateToProps, mapDispatchToProps)(AddAccountsModal);
