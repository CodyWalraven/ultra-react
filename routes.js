import { createStackNavigator } from 'react-navigation'
import Login from "./components/Login/Login"
import Home from "./components/Home/Home"
import LoginForm from "./components/Login/LoginForm"

export default createStackNavigator(
  {
    Login: { screen: Login },
    Home: { screen: Home },
    LoginForm: { screen: LoginForm }
  },
  {
    initialRouteName: 'Login'
  }
)