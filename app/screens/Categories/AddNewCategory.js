// app\screens\Categories\AddNewCategory.js
import {
    Alert,
    Modal,
    StyleSheet,
    Text,
    Pressable,
    View,
    TextInput,
} from "react-native";
import styles from "../styles/styles";
import React, { useState } from "react";
import { connect } from "react-redux";
import { addCategory } from "../../redux/actionCreators";

// ======= mapStateToProps ==================//
const mapStateToProps = (state) => {
    return {
        isAuth: state.isAuth,
    };
};

// ============= send data to redux actionCreators =================//
const mapDispatchToProps = (dispatch) => {
    return {
        addCategory: (acc_name_key, category_name) =>
            dispatch(addCategory(acc_name_key, category_name)),
    };
};

// ===================== function start =======================//

const AddNewCategory = (props) => {
    const [textInput_category_name, setTextInput_category_name] = useState("");

    // ================ handle Submit ========================//
    const handleSubmit = () => {
        if (textInput_category_name == "") {
            Alert.alert("Please enter the Name of Category ");
        } else if (props.isAuth == null) {
            Alert.alert("Please Login first ");
        } else {
            props.addCategory(props.acc_name_key, textInput_category_name);
        }
    };

    //console.log(props.user_email);
    return (
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <Text style={{ fontSize: 20 }}>Add New Category{"\n"}</Text>

                <TextInput
                    placeholder="Category Name"
                    style={{
                        width: "100%",
                        borderBottomWidth: 1,
                        borderColor: "black",
                        padding: 7,
                    }}
                    value={textInput_category_name}
                    onChangeText={(text) => setTextInput_category_name(text)}
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

export default connect(mapStateToProps, mapDispatchToProps)(AddNewCategory);
