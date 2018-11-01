import React, { Component } from "react"
import {
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Image
} from "react-native"
import LoginForm from "./LoginForm"
import { LinearGradient } from "expo"
import Spinner from "react-native-loading-spinner-overlay"

export default class Login extends Component {
  static navigationOptions = {
    title: "Login",
    headerMode: "screen",
    header: null
  }

  render() {
    return (
      //Keyboard avoid view shifts the email/password fields up with padding to avoid keyboard

      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <LinearGradient
          start={[2.2, 0.2]}
          colors={["#00b4db", "#336699"]}
          style={styles.container}
        >
          <View style={styles.loginContainer}>
            <Image
              source={require("../../assets/logo/panda2small.png")}
              style={styles.logo}
            />
          </View>
          <View style={styles.formContainer}>
            <LoginForm />
          </View>
        </LinearGradient>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#336699"
  },

  loginContainer: {
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center"
  },

  logoText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 60,
    textAlign: "center",
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 4, height: 4 },
    textShadowRadius: 3
  },

  logo: {
    position: "absolute",
    width: 345.8,
    height: 136.8,
    padding: 0,
    paddingRight: 40
  },
  formContainer: {
    alignItems: "stretch"
  }
})
