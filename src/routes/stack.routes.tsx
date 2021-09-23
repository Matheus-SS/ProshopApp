import React from 'react';
// import {createStackNavigator} from '@react-navigation/stack';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import SignInScreen from 'Pages/SignInScreen';
import SignUpScreen from 'Pages/SignUpScreen';
import ForgotPasswordScreen from 'Pages/ForgotPasswordScreen';

import HomeScreen from 'Pages/HomeScreen';
import ProfileScreen from 'Pages/ProfileScreen';
import CartScreen from 'Pages/CartScreen';
import ShippingAddressScreen from 'Pages/ShippingAddressScreen';
import ProductDetailScreen from 'Pages/ProductDetailScreen';

const Stack = createSharedElementStackNavigator();

const MainStackScreen = () => {
  return (
    <Stack.Navigator initialRouteName="Home" headerMode="none">
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />

      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ShippingAddress" component={ShippingAddressScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen
        name="ProductDetail"
        options={{
          cardStyleInterpolator: ({current: {progress}}) => {
            return {
              cardStyle: {
                opacity: progress,
              },
            };
          },
        }}
        component={ProductDetailScreen}
        sharedElementsConfig={(route) => {
          const {item} = route.params;
          return [
            {
              id: `item.${item.id}.image`,
              animation: 'fade',
            },
            {
              id: `item.${item.id}.title`,
              animation: 'fade',
            },
          ];
        }}
      />

      <Stack.Screen name="Cart" component={CartScreen} />
    </Stack.Navigator>
  );
};

export default MainStackScreen;
