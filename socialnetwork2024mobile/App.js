import { NavigationContainer } from '@react-navigation/native';
import Home from './components/Home/Home';
import Personal from './components/Personal/Personal';
import Menu from './components/Menu/Menu';
import Post from './components/Post/Post';
import PostDetails from './components/PostDetails/PostDetails';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import SubPersonal from './components/SubPersonal/SubPersonal'
import SubMenu from './components/SubMenu/SubMenu';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="home" component={Home}/>
      <Stack.Screen name="personal" component={Personal}/>
      <Stack.Screen name="menu" component={Menu}/>
      {/* <Stack.Screen name="submenu" component={SubMenu}/> */}
      <Stack.Screen name="post" component={Post}/>
      <Stack.Screen name="postdetails" component={PostDetails}/>
      <Stack.Screen name="login" component={Login}/>
      <Stack.Screen name="signup" component={SignUp}/>
      {/* <Stack.Screen name="subpersonal" component={SubPersonal}/> */}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator/>
    </NavigationContainer>
  );
}