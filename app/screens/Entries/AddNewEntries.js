// app\screens\Entries\AddNewEntries.js
import { Alert, Text, Pressable, View, TextInput } from "react-native";
import styles from "../styles/styles";
import React, { useState } from "react";
import { connect } from "react-redux";
import { addEntry } from "../../redux/actionCreators";

// ======= mapStateToProps ==================//
const mapStateToProps = (state) => {
    return {
        isAuth: state.isAuth,
    };
};

// // ============= send data to redux actionCreators =================//
const mapDispatchToProps = (dispatch) => {
    return {
        addEntry: (category_key, accountKey_of_category, inputEntry) =>
            dispatch(
                addEntry(category_key, accountKey_of_category, inputEntry)
            ),
    };
};

// ===================== function start =======================//

const AddNewEntry = (props) => {
    const [inputEntry, setInputEntry] = useState({
        name: "",
        type: "",
        description: "",
        money_amount: "",
    });

    // ================ handle Submit ========================//
    const handleSubmit = () => {
        // check money_amount valid or not
        let valid = true;
        if (inputEntry.money_amount != "") {
            for (let i in inputEntry.money_amount) {
                if (
                    !(
                        inputEntry.money_amount[i] >= "0" &&
                        inputEntry.money_amount[i] <= "9"
                    )
                ) {
                    valid = false;
                    break;
                }
            }
        }

        if (
            inputEntry.name == "" ||
            inputEntry.type == "" ||
            inputEntry.money_amount == ""
        ) {
            Alert.alert("Please enter the Name , Type and Money Amount fields");
        } else if (valid == false) {
            Alert.alert("Money Amount Must be a Number, not a text");
        } else if (props.isAuth == null) {
            Alert.alert("Please Login first ");
        } else {
            props.addEntry(
                props.category_key,
                props.accountKey_of_category,
                inputEntry
            );
        }
    };

    //console.log(props.user_email);
    return (
        <View style={styles.centeredViewForNewEntries}>
            <View style={styles.modalView}>
                <Text style={{ fontSize: 20, textAlign: "center" }}>
                    Add New Entry{"\n"}
                </Text>

                <TextInput
                    placeholder="Entry Name"
                    style={{
                        width: "100%",
                        borderBottomWidth: 1,
                        borderColor: "black",
                        padding: 7,
                    }}
                    value={inputEntry.name}
                    onChangeText={(text) =>
                        setInputEntry({ ...inputEntry, name: text })
                    }
                />
                <Text>{"\n"}</Text>

                {/* ===================================================== */}
                <View style={styles.row}>
                    <Text>Select Type:</Text>
                    <Pressable
                        style={[
                            styles.typeButton,
                            inputEntry.type === "expense" && styles.selected,
                        ]}
                        onPress={() =>
                            setInputEntry({ ...inputEntry, type: "expense" })
                        }
                    >
                        <Text>Expense</Text>
                    </Pressable>
                    <Pressable
                        style={[
                            styles.typeButton,
                            inputEntry.type === "income" && styles.selected,
                        ]}
                        onPress={() =>
                            setInputEntry({ ...inputEntry, type: "income" })
                        }
                    >
                        <Text>Income</Text>
                    </Pressable>
                </View>

                <Text>{"\n"}</Text>
                <TextInput
                    placeholder="Money Amount"
                    style={styles.input}
                    value={inputEntry.money}
                    onChangeText={(text) =>
                        setInputEntry({ ...inputEntry, money_amount: text })
                    }
                    keyboardType="numeric" // This will allow only numeric input
                />
                <Text>{"\n"}</Text>
                <TextInput
                    placeholder="Description (Optional)"
                    style={styles.textArea}
                    value={inputEntry.description}
                    onChangeText={(text) =>
                        setInputEntry({ ...inputEntry, description: text })
                    }
                />

                {/* ======================================================== */}
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

export default connect(mapStateToProps, mapDispatchToProps)(AddNewEntry);
