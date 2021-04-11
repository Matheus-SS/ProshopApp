import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import CartScreen from '../pages/CartScreen';
import HomeScreen from '../pages/HomeScreen';

const AuthStack = createStackNavigator();

const AuthRoutes = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <AuthStack.Screen name="Home" component={HomeScreen} />
      <AuthStack.Screen name="Cart" component={CartScreen} />
    </AuthStack.Navigator>
  );
};

export default AuthRoutes;
