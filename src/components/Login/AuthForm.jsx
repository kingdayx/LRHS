import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, TextInput, Image, ScrollView } from "react-native";
import { Button, Text } from "react-native-elements";
import { withFormik } from "formik";
import * as yup from "yup";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

function AuthForm(props) {
  const state = {
    user: "",
  };

  // const signUp = () => {
  //   return (
  //     <View>
  //       <Button
  //         backgroundColor="transparent"
  //         color="#838383"
  //         buttonStyle={styles.switchButton}
  //         onPress={() => props.switchAuthMode()}
  //         title="Sign Up"
  //       />
  //     </View>
  //   );
  // };

  const displayNameInput = () => {
    return (
      <View>
        <TextInput
          style={styles.formInput}
          onChangeText={(text) => props.setFieldValue("displayName", text)}
          placeholder="Display Name"
        />
      </View>
    );
  };

  // avatar = (
  //   <View>
  //     <TouchableOpacity
  //       onPress={() => {
  //         handlePickAvatar;
  //       }}
  //       style={styles.avatarPlaceholder}
  //     >
  //       <Image source={state.user.avatar} style={styles.avatar} />
  //       <Ionicons name="ios-add" size={40} color="#fff"></Ionicons>
  //     </TouchableOpacity>
  //   </View>
  // );

  return (
    <View style={styles.container}>
      <Text>LRHS Dating</Text>
      <Image
        style={{ width: 150, height: 150 }}
        source={require("../../../assets/logo.png")}
      />
      <View style={styles.login}>
        <TextInput
          style={styles.formInput}
          onChangeText={(text) => props.setFieldValue("email", text)}
          placeholder="Email:"
        />
        {props.authMode === "signup" ? displayNameInput : null}

        <TextInput
          style={styles.formInput2}
          secureTextEntry={true}
          onChangeText={(text) => props.setFieldValue("password", text)}
          placeholder="Password:"
        />

        <Button
          onPress={() => props.handleSubmit()}
          buttonStyle={styles.loginButton}
          title={props.authMode === "login" ? "Sign In" : "Sign Up"}
        />
        <View style={styles.signup}>
          <Text> Dont have an account?</Text>
          <Text
            style={styles.switchButton}
            onPress={() => props.switchAuthMode()}
          >
            Sign Up
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 60,
  },
  container: {
    display: "flex",
    marginTop: 50,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#E1E2E6",
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    position: "absolute",
    borderRadius: 50,
  },
  formInput: {
    width: 300,
    height: 50,
    borderColor: "#B5B4BC",
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
  },
  formInput2: {
    marginTop: -10,
    borderColor: "#B5B4BC",
    borderWidth: 1,
    height: 50,
    width: 300,
    padding: 8,
  },
  loginButton: {
    width: 200,
    marginBottom: 16,
    backgroundColor: "#6f37be",
    marginTop: 3,
  },
  switchButton: {
    color: "#838383",
    textDecorationLine: "underline",
  },
  login: {
    justifyContent: "center",
    alignItems: "center",
  },
  signUp: {
    display: "flex",
    flexDirection: "row",
  },
});

export default withFormik({
  mapPropsToValues: () => ({
    email: "",
    password: "",
    displayName: "",
  }),
  validationSchema: (props) =>
    yup.object().shape({
      email: yup.string().email().required(),
      password: yup.string().min(5).required(),
      displayName:
        props.authMode === "signup" ? yup.string().min(5).required() : null,
    }),
  handleSubmit: (values, { props }) => {
    props.authMode === "login" ? props.login(values) : props.signup(values);
  },
})(AuthForm);
