import React, { Component } from "react"
import { View, Text, Image } from "react-native"

export default class Hamburger extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <Image
        onPress={alert("I pressed it")}
        source={require("../../assets/images/hamburger.png")}
        style={{ width: 35, height: 35 }}
      />
    )
  }
}
