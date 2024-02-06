import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    TouchableOpacity,
} from "react-native";

const EntryDetail = ({ route }) => {
    const { the_Entry } = route.params;

    const entry = the_Entry;
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Entry Details</Text>
            <View style={styles.detailContainer}>
                <Text style={styles.label}>Name:</Text>
                <Text style={styles.text}>{the_Entry.name}</Text>
            </View>

            <View style={styles.detailContainer}>
                <Text style={styles.label}>Type:</Text>
                <Text style={styles.text}>{the_Entry.type}</Text>
            </View>
            <View style={styles.detailContainer}>
                <Text style={styles.label}>Money Amount:</Text>
                <Text style={styles.text}>{the_Entry.money_amount}</Text>
            </View>
            <View style={styles.detailContainer}>
                <Text style={styles.label}>Description:</Text>
                <Text style={styles.text}>{the_Entry.description}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 30,
        alignItems: "center",
        backgroundColor: "#f0f0f0",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    detailContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
    },
    label: {
        width: 120,
        fontWeight: "bold",
    },
    text: {
        flex: 1,
        fontSize: 16,
    },
});

export default EntryDetail;
