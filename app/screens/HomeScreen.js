// app\screens\HomeScreen.js
import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    Modal,
    SafeAreaView,
    Pressable,
    TouchableOpacity,
} from "react-native";
import styles from "./styles/styles";
import AddAccountsModal from "./AddAccountsModal";
import ListOfAccounts from "./ListOfAccounts";
import { loadAccounts } from "../redux/actionCreators";
import { connect } from "react-redux";

// ============================= stateToProps =======================//
const mapStateToProps = (state) => {
    return {
        user_email: state.user_email,
        account_List: state.account_List,
    };
};

//=============== dispatchToProps ======================//
const mapDispatchToProps = (dispatch) => {
    return {
        loadAccounts: (email) => dispatch(loadAccounts(email)),
    };
};

// ========================== HomeScreen ==========================//
const HomeScreen = (props) => {
    const [modalVisible, setModalVisible] = useState(false);

    // load Acc list
    const load_acc_List = () => {
        console.log(props.user_email);
        props.loadAccounts(props.user_email);
    };

    //========================= useEffect ========================//
    // useEffect() kaj korena, Auth er time e loadAccounts() call/dispatch kora hoise, actionCreators.js theke
    // useEffect(() => {
    //     load_acc_List();
    // }, []);

    // =====================================  return =======================//
    return (
        // <SafeAreaView>
        <View style={styles.view}>
            <Text
                style={{
                    textAlign: "center",
                    fontSize: 22,
                    fontWeight: "bold",
                }}
            >
                Accounts
            </Text>
            <ListOfAccounts account_List={props.account_List} />
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
                    onPress={() => {
                        setModalVisible(false);
                        load_acc_List();
                    }}
                >
                    <Text style={styles.button_text}>close</Text>
                </Pressable>
            </Modal>
            {/* ============== modal open btn ============== */}
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
