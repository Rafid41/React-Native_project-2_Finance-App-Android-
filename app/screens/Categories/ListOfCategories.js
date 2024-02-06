// app\screens\Categories\ListOfCategories.js
import React from "react";
import {
    FlatList,
    View,
    Text,
    StyleSheet,
    Pressable,
    TouchableOpacity,
} from "react-native";
import { navigate } from "../../Navigation/Navigation_all_helper";
import { connect } from "react-redux";
import { loadEntries, accountSummery } from "../../redux/actionCreators";

// ======================= mapStateToProps =======================//
const mapDispatchToProps = (dispatch) => {
    return {
        loadEntries: (acc_name_key) => dispatch(loadEntries(acc_name_key)),
        accountSummery: (account_key) => dispatch(accountSummery(account_key)),
    };
};

// ================================= Main fn ================================//
const ListOfCategories = (props) => {
    // ===================== summery button =========================//
    let summery_button = (
        <View style={styles.summeryContainer}>
            <Pressable
                style={({ pressed }) => [
                    styles.SummeryItemContainer,
                    {
                        opacity: pressed ? 0.5 : 1,
                        backgroundColor: pressed ? "#05611c" : "#7d0ac9",
                    },
                ]}
                onPress={() => {
                    props.accountSummery(props.accountKey_of_category);
                    navigate("Summery");
                }}
            >
                <Text
                    style={{
                        color: "white",
                        fontWeight: "bold",
                        fontStyle: "italic",
                        fontSize: 22,
                    }}
                >
                    Show Summery
                </Text>
            </Pressable>
        </View>
    );

    if (props.category_List.length == 0) {
        summery_button = null;
    }

    // ================= return ========================//
    return (
        <View>
            <FlatList
                style={styles.FlatList_container}
                data={props.category_List}
                keyExtractor={(item) => item.key}
                renderItem={({ item, index }) => (
                    <TouchableOpacity>
                        <Pressable
                            style={({ pressed }) => [
                                styles.itemContainer,
                                {
                                    borderBottomColor:
                                        index < props.category_List.length - 1
                                            ? "transparent"
                                            : "black",
                                    opacity: pressed ? 0.5 : 1,
                                    backgroundColor: pressed
                                        ? "#0dd9d2"
                                        : "white",
                                },
                            ]}
                            onPress={() => {
                                // send params
                                //  key of that category name
                                props.loadEntries(item.key);
                                navigate("Entries", {
                                    category_key: item.key,
                                    category_name: item.category_name,
                                    accountKey_of_category:
                                        props.accountKey_of_category,
                                });
                            }}
                        >
                            <Text style={styles.itemText}>
                                {item.category_name}
                            </Text>
                        </Pressable>
                    </TouchableOpacity>
                )}
            />
            {summery_button}
        </View>
    );
};

const styles = StyleSheet.create({
    FlatList_container: {
        padding: 25,
    },
    itemContainer: {
        padding: 12,
        borderWidth: 2,
        borderBottomColor: "transparent",
    },
    itemText: {
        fontSize: 16,
        color: "#333",
        fontWeight: "bold",
    },
    summeryContainer: {
        padding: 25,
        alignItems: "center",
    },
    SummeryItemContainer: {
        width: "80%",
        padding: 12,
        borderWidth: 2,
        borderRadius: 15,
        alignItems: "center",
    },
});

export default connect(null, mapDispatchToProps)(ListOfCategories);
