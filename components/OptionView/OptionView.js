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

  fetchGroupData = () => {
    let xhr = new XMLHttpRequest()

    refreshComp = () => {
      this.forceUpdate()
      this.setState({ loading: false })
    }

    setDataState = data => {
      this.setState({ data: data })
    }

    returnNameAndImage = () => {
      return this.state.name_and_image
    }

    setImageAndTitleData = () => {
      let objects = this.state.data.objects
      for (let x = 0; x < objects.length; x++) {
        let current_item = objects[x].display_name
        let image_url = ""
        if (objects[x].default_attachment !== null) {
          image_url = objects[x].default_attachment.url
        } else {
          image_url =
            "http://meeconline.com/wp-content/uploads/2014/08/placeholder.png"
        }
        this.state.name_and_image[x] = new Array(current_item, image_url)
      }
    }
    
    xhr.open(
      "GET",
      `https://login.assetpanda.com/v2/entities/${
        AppStore.main_entity_id
      }/objects`,
      true
    )
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.setRequestHeader("Authorization", `Bearer ${AppStore.client_token}`)
    xhr.send(JSON.stringify({}))

    xhr.onload = function() {
      if (xhr.status === 200) {
        var data = JSON.parse(this.responseText)
        setDataState(data)
        setImageAndTitleData()
        refreshComp()
      } else if (xhr.status === 502) {
        alert("502 bad gateway error, please try again in a few minutes")
      } else if (xhr.status === 500) {
        alert("Internal server error")
      } else {
        alert(`Some other error occured code ${xhr.status}`)
      }
    }
  }

  fetchAssetGroupID = callback => {
    //Sends credentials to api and stores token, also navigates to Home screen upon success
    let xhr = new XMLHttpRequest()

    refreshComp = () => {
      this.forceUpdate()
    }

    getGroupInfo = group_id => {
      this.fetchGroupData(group_id)
    }

    xhr.open("GET", "https://login.assetpanda.com/v2/entities", true)
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.setRequestHeader("Authorization", `Bearer ${AppStore.client_token}`)
    xhr.send(JSON.stringify({}))

    xhr.onload = function() {
      if (xhr.status === 200) {
        var data_full = JSON.parse(this.responseText)
        AppStore.main_entity_id = data_full[0].id
        callback()
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
