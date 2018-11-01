import React, { Component } from "react"
import { ScrollView, Text, Container, Dimensions, Keyboard } from "react-native"
import Card from "./Card"
import Sidebar from "react-native-sidebar"
import { AppStore } from "../AppStore/AppStore"

export default class Home extends Component {
  constructor(props) {
    let screen_width = Dimensions.get("window").width - 20
    super(props)
    this.state = {
      card_width: screen_width,
      display_names: [],
      image_urls: [],
      name_and_image: [[]]
    }
  }

  static navigationOptions = {
    title: "Assets",
    headerMode: "screen",
    color: "blue"
  }
  // Runs right before the home screen appears
  componentWillMount() {
    this.fetchAssetGroupID(() => {
      this.fetchGroupData()
    })
  }

  fetchGroupData = () => {
    let xhr = new XMLHttpRequest()

    refreshComp = () => {
      this.forceUpdate()
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
    //
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
    let first_val = ""
    let second_val = ""
    let item_arr = []
    return (
      <ScrollView>
        {this.state.name_and_image.map(nameThenImage => (
          <Card
            key={Math.random()}
            title={nameThenImage[0]}
            image={nameThenImage[1]}
          />
        ))}
      </ScrollView>
    )
  }
}
