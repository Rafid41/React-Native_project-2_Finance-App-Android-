import React from "react";
import {
    FlatList,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from "react-native";

const ListOfAccounts = (props) => {
    return (
        <View>
            <FlatList
                style={styles.FlatList_container}
                data={props.account_List}
                keyExtractor={(item) => item.key}
                renderItem={({ item, index }) => (
                    <TouchableOpacity>
                        <View
                            style={{
                                ...styles.itemContainer,
                                borderBottomColor:
                                    index < props.account_List.length - 1
                                        ? "transparent"
                                        : "black",
                            }}
                        >
                            <Text style={styles.itemText}>{item.acc_name}</Text>
                        </View>
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

export default ListOfAccounts;
