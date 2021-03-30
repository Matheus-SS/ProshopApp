import React from 'react';
import {SafeAreaView} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

EStyleSheet.build();

import HomeScreen from './src/pages/HomeScreen';
const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <HomeScreen />
    </SafeAreaView>
  );
};

export default App;
