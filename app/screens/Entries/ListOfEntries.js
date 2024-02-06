// app\screens\Entries\ListOfEntries.js
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

// ================================= Main fn ================================//
const ListOfEntries = (props) => {
    // console.log(props.entry_List);
    return (
        <View>
            <FlatList
                style={styles.FlatList_container}
                data={props.entry_List}
                keyExtractor={(item) => item.key}
                renderItem={({ item, index }) => (
                    <TouchableOpacity>
                        <Pressable
                            style={({ pressed }) => [
                                styles.itemContainer,
                                {
                                    borderBottomColor:
                                        index < props.entry_List.length - 1
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
                                navigate("EntryDetail", {
                                    the_Entry: item.the_Entry,
                                });
                            }}
                        >
                            <Text style={styles.itemText}>
                                {item.the_Entry.name}
                            </Text>
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

export default ListOfEntries;
