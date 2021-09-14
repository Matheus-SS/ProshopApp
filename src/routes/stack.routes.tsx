import React from 'react';
// import {createStackNavigator} from '@react-navigation/stack';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import HomeScreen from '../pages/HomeScreen';
import SignInScreen from '../pages/SignInScreen';
import SignUpScreen from '../pages/SignUpScreen';
import CartScreen from '../pages/CartScreen';
import ProductDetailScreen from '../pages/ProductDetailScreen';

const Stack = createSharedElementStackNavigator();

const MainStackScreen = () => {
  return (
    <Stack.Navigator initialRouteName="Home" headerMode="none">
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />

      <Stack.Screen name="Home" component={HomeScreen} />
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
