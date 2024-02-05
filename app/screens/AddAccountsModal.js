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

// ======= mapStateToProps ==================//
const mapStateToProps = (state) => {
    return {
        isAuth: state.isAuth,
        user_email: state.user_email,
    };
};

const AddAccountsModal = (props) => {
    const [textInputValue, setTextInputValue] = useState("");
    console.log(props.user_email);
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
});

export default connect(mapStateToProps)(AddAccountsModal);
