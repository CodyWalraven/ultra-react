import React, { Component } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard
} from "react-native"
import { withNavigation } from "react-navigation"
import { AppStore } from "../AppStore/AppStore"

class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  apiLogin = () => {
    //Sends credentials to api and stores token, also navigates to Home screen upon success
    let xhr = new XMLHttpRequest()

    navigateToHomeScreen = () => {
      this.props.navigation.navigate("OptionView")
    }

    xhr.open("POST", "https://login.assetpanda.com/v2/session/token", true)
    xhr.mode = "no-cors"
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.send(
      JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    )

    xhr.onload = function() {
      if (xhr.status === 200) {
        var data = JSON.parse(this.responseText)
        AppStore.client_token = data.access_token
        Keyboard.dismiss()
        navigateToHomeScreen()
      } else if (xhr.status === 422) {
        alert("Email or password is incorrect")
      } else if (xhr.status === 502) {
        alert("502 bad gateway error, please try again in a few minutes")
      } else if (xhr.status === 500) {
        alert("Internal server error")
      } else {
        alert("An unexpected error occured, try again.")
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={email => this.setState({ email: email })}
          autoCapitalize="none"
          onSubmitEditing={() => this.passwordInput.focus()}
          autoCorrect={false}
          keyboardType="email-address"
          returnKeyType="next"
          placeholder="Email"
          underlineColorAndroid="transparent"
          placeholderTextColor="rgba(225,225,225,0.8)"
        />

        <TextInput
          style={styles.input}
          onChangeText={password => this.setState({ password: password })}
          returnKeyType="go"
          ref={input => (this.passwordInput = input)}
          placeholder="Password"
          underlineColorAndroid="transparent"
          placeholderTextColor="rgba(225,225,225,0.8)"
          secureTextEntry
        />

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => this.apiLogin()}
        >
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity
          style={styles.adminButtonContainer}
          onPress={() => this.props.navigation.navigate("Home")}
        >
          <Text style={styles.buttonText}>SECRET LOGIN</Text>
        </TouchableOpacity> */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "stretch",
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 65
  },
  input: {
    height: 40,
    backgroundColor: "rgba(225,225,225,0.2)",
    marginBottom: 15,
    padding: 10,
    borderRadius: 15,
    fontSize: 15,
    alignContent: "center",
    color: "rgba(225,225,225,0.8)"
  },
  buttonContainer: {
    backgroundColor: "#009933",
    paddingVertical: 15,
    borderRadius: 15
  },
  adminButtonContainer: {
    backgroundColor: "#803399",
    paddingVertical: 15,
    borderRadius: 15,
    marginTop: 10
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "500",
    fontSize: 20
  }
})

export default withNavigation(LoginForm)
