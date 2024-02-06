// app\screens\Categories\Categories.js
import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    Modal,
    SafeAreaView,
    Button,
    Pressable,
    TouchableOpacity,
} from "react-native";
import styles from "../styles/styles";
import { connect } from "react-redux";
import AddNewCategory from "./AddNewCategory";
import { loadCategory } from "../../redux/actionCreators";
import ListOfCategories from "./ListOfCategories";

// ============================= stateToProps =======================//
const mapStateToProps = (state) => {
    return {
        category_List: state.category_List,
    };
};

// //=============== dispatchToProps ======================//
const mapDispatchToProps = (dispatch) => {
    return {
        loadCategory: (acc_name_key) => dispatch(loadCategory(acc_name_key)),
    };
};

// =========================== CATEGORY ==========================//
const Categories = ({ route, navigation, loadCategory, category_List }) => {
    // receiving props, baki prop directly boshaya dbo
    const { account } = route.params;
    const [modalVisible, setModalVisible] = useState(false);
    console.log(account.key);

    // ======================= load category==================//
    const load_category_List = () => {
        // console.log(props.user_email);
        loadCategory(account.key);
    };

    //========================= useEffect ========================//
    useEffect(() => {
        load_category_List();
    }, []);

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
                Categories
            </Text>
            <ListOfCategories category_List={category_List} />
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
                <AddNewCategory acc_name_key={account.key} />
                <Pressable
                    style={{
                        ...styles.addAccoundButton,
                        backgroundColor: "red",
                        minWidth: 100,
                    }}
                    onPress={() => {
                        setModalVisible(false);
                        load_category_List();
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
                <Text style={styles.button_text}>Add New Category</Text>
            </Pressable>
        </View>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
