import React from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";

// ============================= stateToProps =======================//
const mapStateToProps = (state) => {
    return {
        user_email: state.user_email,
    };
};

// //=============== dispatchToProps ======================//
// const mapDispatchToProps = (dispatch) => {
//     return {
//         loadAccounts: (email) => dispatch(loadAccounts(email)),
//     };
// };

const Categories = ({ route, navigation, user_email }) => {
    // receiving props, baki prop directly boshaya dbo
    const { account } = route.params;
    console.log(user_email);
    return (
        <View>
            <Text>Categories</Text>
        </View>
    );
};

export default connect(mapStateToProps)(Categories);
