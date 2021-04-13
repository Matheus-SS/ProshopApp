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
    let timer: NodeJS.Timeout;
    if (!user) {
      timer = setTimeout(() => setCounter(counter - 1), 1000);
      counter > 0 && timer;
    }
    //cleanup
    return () => {
      clearTimeout(timer);
    };
  }, [counter, user]);

  // AFTER 5 SECONDS GONNA SEND USER TO LOGIN
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!user) {
      timer = setTimeout(() => {
        navigation.navigate('Home');
      }, 5600);

      // cleanup function
      return () => {
        clearTimeout(timer);
      };
    }
  }, [user, navigation]);

  if (!user) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'stretch',
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
        <Text style={styles.title}>
          You gonna be soon redirect to Homescreen
        </Text>
        <Text style={styles.title}>Please login or create a new account</Text>
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
  },
});
export default Authentication;
