import { createStackNavigator } from "react-navigation"
import Login from "./components/Login/Login"
import Home from "./components/Home/Home"
import LoginForm from "./components/Login/LoginForm"
import OptionView from "./components/OptionView/OptionView"
import Barcode from "./components/Barcode/Barcode"

export default createStackNavigator(
  {
    Login: { screen: Login },
    Home: { screen: Home },
    LoginForm: { screen: LoginForm },
    OptionView: { screen: OptionView },
    Barcode: { screen: Barcode }
  },
  {
    initialRouteName: "Login"
  }
)
