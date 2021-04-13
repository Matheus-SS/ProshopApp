import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../pages/HomeScreen';
import SignInScreen from '../pages/SignInScreen';
import CartScreen from '../pages/CartScreen';

const Stack = createStackNavigator();

const MainStackScreen = () => (
  <Stack.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen name="Home" component={HomeScreen} />

    <Stack.Screen name="SignIn" component={SignInScreen} />
    <Stack.Screen name="Cart" component={CartScreen} />
  </Stack.Navigator>
);

export default MainStackScreen;
