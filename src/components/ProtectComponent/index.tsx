import React, {useContext, useCallback} from 'react';

import {useNavigation} from '@react-navigation/core';

import {AuthContext} from 'Components/Context';
import {Text, TouchableOpacity, View} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {createStyles} from 'Styles/index';

const Authentication: React.FC = ({children}) => {
  const {reset} = useNavigation();

  const {user} = useContext(AuthContext);

  const handleOkPressed = useCallback(() => {
    reset({
      routes: [
        {
          name: 'Home',
        },
      ],
      index: 0,
    });
  }, [reset]);
  if (!user) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 20,
          backgroundColor: '#232323',
        }}>
        <Icon
          name="cancel"
          size={60}
          color="red"
          style={{alignSelf: 'center'}}
        />
        {/* <ActivityIndicator size="large" color="#232323" /> */}
        <Text style={styles.title}>
          You need to be Logged in to access this page.
        </Text>
        <TouchableOpacity onPress={handleOkPressed} style={styles.returnButton}>
          <Icon name="home" size={30} color="#000" />
          <Text
            style={[styles.title, {color: '#000', fontFamily: 'Roboto-Bold'}]}>
            Return to Homepage
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  return <View style={{flex: 1}}>{children}</View>;
};

const styles = createStyles({
  title: {
    fontSize: '1.2rem',
    color: '#fff',
    marginTop: 5,
    textAlign: 'center',
  },
  returnButton: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: 30,
    flexDirection: 'row',
  },
});
export default Authentication;
