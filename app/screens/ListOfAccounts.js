import React from "react";
import {
    FlatList,
    View,
    Text,
    StyleSheet,
    Pressable,
    TouchableOpacity,
} from "react-native";
import { navigate } from "../Navigation/Navigation_all_helper";
import { loadCategory } from "../redux/actionCreators";
import { connect } from "react-redux";

// //=============== dispatchToProps ======================//
const mapDispatchToProps = (dispatch) => {
    return {
        loadCategory: (acc_name_key) => dispatch(loadCategory(acc_name_key)),
    };
};
// ===========================================================
const ListOfAccounts = (props) => {
    return (
        <View>
            <FlatList
                style={styles.FlatList_container}
                data={props.account_List}
                keyExtractor={(item) => item.key}
                renderItem={({ item, index }) => (
                    <TouchableOpacity>
                        <Pressable
                            style={({ pressed }) => [
                                styles.itemContainer,
                                {
                                    borderBottomColor:
                                        index < props.account_List.length - 1
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
                                // data load eikhan theke kora holo, cz 'Categories' e useEffect() kaj korena
                                props.loadCategory(item.key);
                                navigate("Categories", { account: item });
                            }}
                        >
                            <Text style={styles.itemText}>{item.acc_name}</Text>
                        </Pressable>
                    </TouchableOpacity>
                )}
            />
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
});

export default connect(null, mapDispatchToProps)(ListOfAccounts);
