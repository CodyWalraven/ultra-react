import React, { Component } from "react"
import { ScrollView, Dimensions, View } from "react-native"
import Card from "./Card"
import Hamburger from "../HamburgerButton/Hamburger"
import { AppStore } from "../AppStore/AppStore"
import Spinner from "react-native-loading-spinner-overlay"
import AnimatedHideView from "react-native-animated-hide-view"

export default class Home extends Component {
  constructor(props) {
    let screen_width = Dimensions.get("window").width - 20
    super(props)
    this.state = {
      card_width: screen_width,
      display_names: [],
      image_urls: [],
      name_and_image: [[]],
      loading: true
    }
  }

  static navigationOptions = {
    title: "Assets",
    headerMode: "screen",
    headerStyle: {
      backgroundColor: "#2067AE"
    },
    headerTintColor: "#FFF"
  }
  // Runs right before the home screen appears
  componentWillMount() {
    this.fetchGroupData()
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
      `https://login.assetpanda.com/v1/entities/${
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

  render() {
    return (
      <View>
        <ScrollView>
          <Spinner visible={this.state.loading} textContent={"Loading..."} />
          <AnimatedHideView visible={!this.state.loading}>
            {this.state.name_and_image.map(nameThenImage => (
              <Card
                visible={false}
                style={{ width: 0, height: 0 }}
                key={Math.random()}
                title={nameThenImage[0]}
                image={nameThenImage[1]}
              />
            ))}
          </AnimatedHideView>
        </ScrollView>
      </View>
    )
  }
}
