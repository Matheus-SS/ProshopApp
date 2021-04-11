import React, {useContext, useEffect} from 'react';

import {useNavigation} from '@react-navigation/core';

import {AuthContext} from '../Context';
import {Text, View} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {createStyles} from '../../../styles';

const Authentication: React.FC = ({children}) => {
  const [counter, setCounter] = React.useState(5);

  const navigation = useNavigation();

  const {user} = useContext(AuthContext);

  console.log(user);
  // COUNTER
  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);

  // AFTER 5 SECONDS GONNA SEND USER TO LOGIN
  useEffect(() => {
    if (!user) {
      setTimeout(() => {
        navigation.navigate('SignIn');
      }, 5600);
    }
  });

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
        <Icon name="cancel" size={60} color="red" />
        {/* <ActivityIndicator size="large" color="#232323" /> */}
        <Text style={styles.title}>
          You need to be Logged in to access this page.
        </Text>
        <Text style={styles.title}>
          You gonna be redirect to login page in {counter}{' '}
        </Text>
      </View>
    );
  }
  return <View style={{flex: 1}}>{children}</View>;
};

const styles = createStyles({
  title: {
    fontSize: '1.2rem',
    color: '#fff',
  },
});
export default Authentication;
