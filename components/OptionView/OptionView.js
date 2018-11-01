import React, { Component } from "react"
import { View, Text, Dimensions } from "react-native"
import { CardViewWithImage } from "react-native-simple-card-view"

export default class OptionView extends Component {
  constructor(props) {
    super(props)
    let width = Dimensions.get("window").width - 20
    let height = Dimensions.get("window").height / 5.5

    this.state = {
      width: width,
      height: height
    }
  }

  render() {
    return (
      <View>
        <Text> textInComponent </Text>
      </View>
    )
  }
}
