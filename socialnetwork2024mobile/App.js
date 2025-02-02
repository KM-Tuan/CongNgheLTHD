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
import PostList from './components/PostList/PostList';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MyDispatchContext, MyUserConText } from './configs/UserContexts';
import { useContext, useReducer } from 'react';
import MyUserReducer from './configs/UserReducers';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-paper';

const Stack = createNativeStackNavigator();
const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="postlist" component={PostList}/>
      <Stack.Screen name="post" component={Post} />
      <Stack.Screen name="postdetails" component={PostDetails} />
    </Stack.Navigator>
  );
};


//MENU
const SubUserStack = createNativeStackNavigator();
const SubUserNavigator = () => {
  return (
    <SubUserStack.Navigator screenOptions={{ headerShown: false }}>
      <SubUserStack.Screen name="submenu" component={SubMenu} />
      <SubUserStack.Screen name="login" component={Login} />
      <SubUserStack.Screen name="signup" component={SignUp} />
    </SubUserStack.Navigator>
  );
};

const UserStack = createNativeStackNavigator();
const UserNavigator = () => {
  return (
    <UserStack.Navigator screenOptions={{ headerShown: false }}>
      <UserStack.Screen name="menu" component={Menu} />
      <SubUserStack.Screen name="login" component={Login} />
      <SubUserStack.Screen name="signup" component={SignUp} />
    </UserStack.Navigator>
  );
};


//PERSONAL
const SubPersonalStack = createNativeStackNavigator();
const SubPersonalNavigator = () => {
  return (
    <SubPersonalStack.Navigator screenOptions={{ headerShown: false }}>
      <SubPersonalStack.Screen name="subpersonal" component={SubPersonal} />
    </SubPersonalStack.Navigator>
  )
}

const PersonalStack = createNativeStackNavigator();
const PersonalNavigator = () => {
  return (
    <PersonalStack.Navigator screenOptions={{ headerShown: false }}>
      <PersonalStack.Screen name="personal" component={Personal} />
      <PersonalStack.Screen name="post" component={Post} />
      <PersonalStack.Screen name="postdetails" component={PostDetails} />
    </PersonalStack.Navigator>
  )
}


//TAB
const Tab = createBottomTabNavigator();
const TabNavigator = () => {
  const user = useContext(MyUserConText);
  return (
    <Tab.Navigator>
      <Tab.Screen name="main" component={StackNavigator} options={{ title: "Trang chủ", tabBarIcon: () => <Icon source="home" size={23} /> }} />
      {user === null ? (
        <>
          <Tab.Screen name="submainpersonal" component={SubPersonalNavigator} options={{ title: "Trang cá nhân", tabBarIcon: () => <Icon source="account" size={25} /> }} />
          <Tab.Screen name="submainmenu" component={SubUserNavigator} options={{ title: "Tiện ích", tabBarIcon: () => <Icon source="menu" size={25} /> }} />
        </>
      ) : (
        <>
          <Tab.Screen name="mainpersonal" component={PersonalNavigator} options={{ title: "Trang cá nhân", tabBarIcon: () => <Icon source="account" size={25} /> }} />
          <Tab.Screen name="mainmenu" component={UserNavigator} options={{ title: "Tiện ích", tabBarIcon: () => <Icon source="menu" size={25} /> }} />
        </>
      )}
    </Tab.Navigator>
  );
};

export default function App() {
  const [user, dispatch] = useReducer(MyUserReducer, null);

  return (
    <NavigationContainer>
      <MyUserConText.Provider value={user}>
        <MyDispatchContext.Provider value={dispatch}>
          <TabNavigator />
        </MyDispatchContext.Provider>
      </MyUserConText.Provider>
    </NavigationContainer>
  );
}