import React, { Component } from "react"
import { View, Text, Dimensions } from "react-native"
import { CardViewWithImage } from "react-native-simple-card-view"
import { AppStore } from "../AppStore/AppStore"

export default class Card extends Component {
  constructor(props) {
    super(props)
    let width = Dimensions.get("window").width - 20
    let height = Dimensions.get("window").height / 5.5

    this.state = {
      width: width,
      height: height
    }
  }

  componentDidMount() {}

  render() {
    return (
      <View>
        <CardViewWithImage
          width={this.state.width}
          source={{
            uri: this.props.image
          }}
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
