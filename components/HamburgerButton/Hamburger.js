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
        source={require("../../assets/images/hamburger.png")}
        style={{ width: 40, height: 40 }}
      />
    )
  }
}
