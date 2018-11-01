import React, { Component } from "react"
import { View, Text, Dimensions } from "react-native"
import { CardViewWithImage } from "react-native-simple-card-view"

export default class OptionView extends Component {
  constructor(props) {
    super(props)
    let width = Dimensions.get("window").width - 20
    let height = Dimensions.get("window").height / 5

    this.state = {
      width: width,
      height: height
    }
  }

  static navigationOptions = {
    title: "Navigation Optionss",
    headerMode: "screen",
    color: "blue"
  }

  render() {
    return (
      <View>
        <CardViewWithImage
          width={this.state.width}
          source={require("../../assets/images/search.png")}
          content={this.props.secondary_default}
          title={""}
          roundedImage={false}
          imageWidth={230}
          imageHeight={89}
        />
        <CardViewWithImage
          width={this.state.width}
          source={}
          content={this.props.secondary_default}
          title={this.props.title}
          roundedImage={false}
          imageWidth={230}
          imageHeight={89}
        />
        <CardViewWithImage
          width={this.state.width}
          source={}
          content={this.props.secondary_default}
          title={this.props.title}
          roundedImage={false}
          imageWidth={300}
          imageHeight={this.state.height}
        />
      </View>
    )
  }
}
