import 'react-native-gesture-handler';
import React from 'react';
import {SafeAreaView} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Routes from './src/routes/main.routes';

EStyleSheet.build();

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Routes />
    </SafeAreaView>
  );
};

export default App;
