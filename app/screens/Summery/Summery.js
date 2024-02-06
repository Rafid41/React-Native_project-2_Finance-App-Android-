// app\screens\Summery\Summery.js

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
    return {
        account_summery: state.account_summery,
    };
};

const Summery = (props) => {
    const { income, expense } = props.account_summery;

    // Calculate the difference between income and expense
    const difference = income - expense;

    // Determine the status based on the difference
    let status;
    let statusColor;
    if (difference > 0) {
        status = `Savings amount ${difference}`;
        statusColor = "green";
    } else if (difference < 0) {
        status = `Loss amount ${-difference}`;
        statusColor = "red";
    } else {
        status = "Neutral";
        statusColor = "blue";
    }

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Account Summary</Text>
            <Text style={styles.Text}>Total Income: {income}</Text>
            <Text style={styles.Text}>Total Expense: {expense}</Text>
            <Text style={{ ...styles.Text, color: statusColor }}>
                Status: {status}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 4,
        height: 200,
        margin: 30,
        marginTop: 150,
        borderRadius: 20,
    },
    heading: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    Text: {
        fontSize: 15,
        padding: 5,
        fontWeight: "bold",
    },
});
export default connect(mapStateToProps)(Summery);
