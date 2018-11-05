import React from "react"
import { StyleSheet, Text, View, Dimensions } from "react-native"
import { BarCodeScanner, Permissions } from "expo"
const { width } = Dimensions.get("window")

export default class Barcode extends React.Component {
  state = {
    hasCameraPermission: null
  }

  static navigationOptions = {
    title: "Navigation Options",
    headerMode: "screen",
    headerStyle: {
      backgroundColor: "#2067AE"
    },
    headerTintColor: "#FFF"
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({ hasCameraPermission: status === "granted" })
  }

  handleBarCodeScanned = ({ type, data }) => {
    alert(`Bar code ${data} has been scanned!`)
  }

  render() {
    const { hasCameraPermission } = this.state

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>
    }
    return (
      <BarCodeScanner
        onBarCodeRead={scan => alert(scan.data)}
        style={[StyleSheet.absoluteFill, styles.container]}
      >
        <View style={styles.layerTop} />
        <View style={styles.layerCenter}>
          <View style={styles.layerLeft} />
          <View style={styles.focused} />
          <View style={styles.layerRight} />
        </View>
        <View style={styles.layerBottom} />
      </BarCodeScanner>
    )
  }
}

const opacity = "rgba(0, 0, 0, .6)"
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  layerTop: {
    flex: 2,
    backgroundColor: opacity
  },
  layerCenter: {
    flex: 1,
    flexDirection: "row"
  },
  layerLeft: {
    flex: 1,
    backgroundColor: opacity
  },
  focused: {
    flex: 10
  },
  layerRight: {
    flex: 1,
    backgroundColor: opacity
  },
  layerBottom: {
    flex: 2,
    backgroundColor: opacity
  }
})
