import React, { Component } from "react"
import { View, Text, Dimensions, StyleSheet } from "react-native"
import { CardViewWithImage } from "react-native-simple-card-view"
import { withNavigation } from "react-navigation"

class OptionView extends Component {
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
    title: "Navigation Options",
    headerMode: "screen",
    gesturesEnabled: false,
    headerLeft: null,
    headerStyle: {
      backgroundColor: "#2067AE"
    },
    headerTintColor: "#FFF"
  }

  navigateToHomeScreen = () => {
    this.props.navigation.navigate("Home")
  }

  navigateToBarcode = () => {
    this.props.navigation.navigate("Barcode")
  }

  render() {
    return (
      <View>
        <CardViewWithImage
          onPress={() => this.navigateToHomeScreen()}
          width={this.state.width}
          source={require("../../assets/images/fix_search.png")}
          content={this.props.secondary_default}
          title={""}
          roundedImage={false}
          imageWidth={225}
          imageHeight={100}
        />
        <CardViewWithImage
          onPress={() => this.navigateToBarcode()}
          width={this.state.width}
          source={require("../../assets/images/fix_barcode.png")}
          content={this.props.secondary_default}
          title={""}
          roundedImage={false}
          imageWidth={225}
          imageHeight={100}
        />
      </View>
    )
  }
}

export default withNavigation(OptionView)
