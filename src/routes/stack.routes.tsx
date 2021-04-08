import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from '../pages/HomeScreen';
import SignInScreen from '../pages/SignInScreen';
import CartScreen from '../pages/CartScreen';

const Stack = createStackNavigator();

function StackNavigatorRoutes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SingIn" component={SignInScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackNavigatorRoutes;
