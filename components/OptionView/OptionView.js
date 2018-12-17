import React, { Component } from "react"
import { View, Text, Dimensions, StyleSheet } from "react-native"
import { CardViewWithImage } from "react-native-simple-card-view"
import { withNavigation } from "react-navigation"
import { AppStore } from "../AppStore/AppStore"
import Spinner from "react-native-loading-spinner-overlay"
import Hamburger from "../HamburgerButton/Hamburger"

class OptionView extends Component {
  constructor(props) {
    super(props)
    let width = Dimensions.get("window").width - 20
    let height = Dimensions.get("window").height / 5

    this.state = {
      width: width,
      height: height,
      loading: true
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

  componentWillMount() {
    this.fetchAssetGroupID()
  }

  // Moves to the home screen with Assets
  navigateToHomeScreen = () => {
    this.props.navigation.navigate("Home")
  }

  //Navigates to the react camera screen
  navigateToBarcode = () => {
    this.props.navigation.navigate("Barcode")
  }

  fetchAssetGroupID = () => {
    //Sends credentials to api and stores token, also navigates to Home screen upon success
    let xhr = new XMLHttpRequest()

    setLoadingState = state => {
      this.setState({ loading: state })
    }

    xhr.open("GET", "https://login.assetpanda.com/v1/entities", true)
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.setRequestHeader("Authorization", `Bearer ${AppStore.client_token}`)
    xhr.send(JSON.stringify({}))

    xhr.onload = function() {
      if (xhr.status === 200) {
        var data_full = JSON.parse(this.responseText)
        AppStore.asset_id = data_full[0].id
        console.log(`Asset ID of ${AppStore.asset_id}`)
        setLoadingState(false)
      } else if (xhr.status === 502) {
        alert("502 bad gateway error, please try again in a few minutes")
      } else if (xhr.status === 500) {
        alert("Internal server error")
      }
    }
  }

  render() {
    return (
      <View>
        <Spinner visible={this.state.loading} textContent={"Loading..."} />
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
