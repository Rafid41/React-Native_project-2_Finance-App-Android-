// app\screens\Entries\Entries.js
// app\screens\Categories\Categories.js
import React, { useState, useEffect } from "react";
import { View, Text, Modal, Pressable } from "react-native";
import styles from "../styles/styles";
import { connect } from "react-redux";
import AddNewEntries from "./AddNewEntries";
import { loadEntries } from "../../redux/actionCreators";
import ListOfEntries from "./ListOfEntries";

// import { loadCategory } from "../../redux/actionCreators";
// import ListOfCategories from "./ListOfCategories";

// // ============================= stateToProps =======================//
const mapStateToProps = (state) => {
    return {
        entry_List: state.entry_List,
    };
};

// // //=============== dispatchToProps ======================//
const mapDispatchToProps = (dispatch) => {
    return {
        loadEntries: (acc_name_key) => dispatch(loadEntries(acc_name_key)),
    };
};

// =========================== CATEGORY ==========================//
const Entries = ({ route, navigation, loadEntries, entry_List }) => {
    // receiving props, baki prop directly boshaya dbo
    const { category_key, category_name, accountKey_of_category } =
        route.params;

    const [modalVisible, setModalVisible] = useState(false);

    // console.log(category_key, category_name, accountKey_of_category);

    // // ======================= load category==================//
    const load_Entry_List = () => {
        loadEntries(category_key);
    };

    //========================= useEffect ========================//
    // loaded from ListOfCategories page
    // useEffect(() => {
    //     load_category_List();
    // }, [navigation]);

    // =====================================  return =======================//
    return (
        <View style={styles.view}>
            <Text
                style={{
                    textAlign: "center",
                    fontSize: 22,
                    fontWeight: "bold",
                }}
            >
                Entries
            </Text>
            {/*=================== List of Entries ==================*/}
            <ListOfEntries entry_List={entry_List} />
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
                <AddNewEntries
                    category_key={category_key}
                    accountKey_of_category={accountKey_of_category}
                />
                <Pressable
                    style={{
                        ...styles.addAccoundButton,
                        backgroundColor: "red",
                        minWidth: 100,
                    }}
                    onPress={() => {
                        setModalVisible(false);
                        load_Entry_List();
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
                <Text style={styles.button_text}>Add New Entries</Text>
            </Pressable>
        </View>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Entries);
