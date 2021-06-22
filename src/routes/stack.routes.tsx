import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../pages/HomeScreen';
import SignInScreen from '../pages/SignInScreen';
import CartScreen from '../pages/CartScreen';
import ProductDetailScreen from '../pages/ProductDetailScreen';
const Stack = createStackNavigator();

const MainStackScreen = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
      {/* <Stack.Screen name="SignIn" component={SignInScreen} /> */}

      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />

      <Stack.Screen name="Cart" component={CartScreen} />
    </Stack.Navigator>
  );
};

export default MainStackScreen;
