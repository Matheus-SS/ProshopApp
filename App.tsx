import 'react-native-gesture-handler';
import React from 'react';
import {SafeAreaView} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
// import {NavigationContainer} from '@react-navigation/native';
EStyleSheet.build();

// import HomeScreen from './src/pages/HomeScreen';
import SignIn from './src/pages/SignIn';
const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <SignIn />
    </SafeAreaView>
  );
};

export default App;
