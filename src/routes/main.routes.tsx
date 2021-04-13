import React, {useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native';

import {createDrawerNavigator} from '@react-navigation/drawer';

import {StatusBar, View} from 'react-native';

import {AuthContext} from '../components/Context/index';
import DrawerContent from '../components/DrawerContent';

import AsyncStorage from '@react-native-async-storage/async-storage';

import LottieView from 'lottie-react-native';

import MainStackScreen from './stack.routes';

import RootDrawerRoutes from '../routes/root.routes';

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

const Drawer = createDrawerNavigator();

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

  // when the app open gonna retrieve token if user is already authenticated
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
        <StatusBar hidden />

        {user ? (
          <Drawer.Navigator
            drawerContent={(props) => <DrawerContent {...props} />}>
            <Drawer.Screen name="HomeDrawer" component={MainStackScreen} />
          </Drawer.Navigator>
        ) : (
          <RootDrawerRoutes />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

export default StackNavigatorRoutes;
