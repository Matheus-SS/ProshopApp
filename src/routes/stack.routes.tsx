import React, {useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {View} from 'react-native';

import {AuthContext} from '../components/Context/index';

import AsyncStorage from '@react-native-async-storage/async-storage';

import LottieView from 'lottie-react-native';

import HomeScreen from '../pages/HomeScreen';
import SignInScreen from '../pages/SignInScreen';

import AuthRoutes from '../routes/auth.routes';
import CartScreen from '../pages/CartScreen';

type InitalStateType = {
  isLoading: boolean;
  userName: string | null;
  userToken: string | null;
};

type ActionType =
  | {type: 'RETRIEVE_TOKEN'; token: string | null; isLoading: boolean}
  | {type: 'LOGIN'; id: string; token: string | null}
  | {type: 'LOGOUT'}
  | {type: 'REGISTER'; id: string; token: string; isLoading: boolean};

const Stack = createStackNavigator();

function StackNavigatorRoutes() {
  // const [isLoading, setIsLoading] = React.useState(true);
  const [user, setUser] = React.useState<string | null>(null);

  const initialLoginState: InitalStateType = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const loginReducer = (
    prevState: InitalStateType,
    action: ActionType,
  ): InitalStateType => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      default:
        return prevState;
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState,
  );

  const authContext = React.useMemo(
    () => ({
      signIn: async (userName: string, password: string) => {
        // setUserToken('TOKEN');
        // setIsLoading(false)
        let userToken: string | null = null;

        if (userName === 'user' && password === 'pass') {
          try {
            userToken = 'TOKEN';
            await AsyncStorage.setItem('@Proshop-Token', userToken);
            setUser(userToken);
          } catch (error) {
            console.log(error);
          }
        }

        // console.log('userTOKEN', userToken);
        dispatch({type: 'LOGIN', id: userName, token: userToken});
      },
      signOut: async () => {
        // setUserToken(null);
        // setIsLoading(false);
        try {
          await AsyncStorage.removeItem('@Proshop-Token');
        } catch (error) {
          console.log(error);
        }
        dispatch({type: 'LOGOUT'});
      },
      signUp: () => {
        // setUserToken('TOKEN');
        // setIsLoading(false);
      },
      user: user,
    }),
    [user],
  );

  useEffect(() => {
    setTimeout(async () => {
      // setIsLoading(false);
      let userToken = null;
      try {
        userToken = await AsyncStorage.getItem('@Proshop-Token');
        setUser(userToken);
      } catch (error) {
        console.log(error);
      }
      // console.log('user token', userToken);
      dispatch({type: 'RETRIEVE_TOKEN', token: userToken, isLoading: false});
    }, 3500);
  }, [loginState]);

  if (loginState.isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {/* <ActivityIndicator size="large" color="#232323" /> */}
        <LottieView
          source={require('../assets/eccomerce.json')}
          autoPlay
          loop
        />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {loginState.userToken !== null ? (
          <AuthRoutes />
        ) : (
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="SignIn" component={SignInScreen} />
            {/* we need the screen cart here to be able to call the function navigateToCart inside Homescreen  */}
            <Stack.Screen name="Cart" component={CartScreen} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

export default StackNavigatorRoutes;
