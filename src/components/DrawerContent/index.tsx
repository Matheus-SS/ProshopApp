import React, {useCallback, useContext} from 'react';
import {View, Text} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {createStyles} from '@styles/index';

import {AuthContext} from '@components/Context';

const DrawerContent = (props: DrawerContentComponentProps) => {
  const {signOut, user} = useContext(AuthContext);

  const handleLogout = useCallback(() => {
    signOut();
    props.navigation.navigate('Home');
  }, [props.navigation, signOut]);

  return (
    <View style={{flex: 1, backgroundColor: '#232323'}}>
      <DrawerContentScrollView {...props}>
        <View>
          {/* USER INFO */}
          {user && (
            <View style={{paddingLeft: 17}}>
              <View style={styles.containerUserInfo}>
                <Icon name="account" size={20} color="#fff" />
                <Text style={styles.userInfo}>Jhon Doe</Text>
              </View>
              <View style={styles.containerUserInfo}>
                <Icon name="email" size={20} color="#fff" />
                <Text style={styles.userInfo}>Jhon@gmail.com</Text>
              </View>
            </View>
          )}
          {/* BAR */}

          {user && (
            <>
              <View
                style={{backgroundColor: '#aaa', height: 0.5, marginTop: 10}}
              />
            </>
          )}

          {/* ROUTES */}
          <View style={{marginTop: 5, paddingLeft: 15}}>
            {!user && (
              <DrawerItem
                icon={() => <Icon name="login" size={20} color="#fff" />}
                label="Login"
                labelStyle={{color: '#fff'}}
                onPress={() => props.navigation.navigate('SignIn')}
              />
            )}

            <DrawerItem
              icon={() => <Icon name="home" size={20} color="#fff" />}
              label="Home"
              labelStyle={{color: '#fff'}}
              onPress={() => props.navigation.navigate('Home')}
            />

            {user && (
              <DrawerItem
                icon={() => <Icon name="account" size={20} color="#fff" />}
                label="Profile"
                labelStyle={{color: '#fff'}}
                onPress={() => console.log('PROFILE')}
              />
            )}

            {user && (
              <DrawerItem
                icon={() => <Icon name="map-marker" size={20} color="#fff" />}
                label="Address"
                labelStyle={{color: '#fff'}}
                onPress={() => console.log('ADDRESS')}
              />
            )}

            <DrawerItem
              icon={() => <Icon name="shopping" size={20} color="#fff" />}
              label="Cart"
              labelStyle={{color: '#fff'}}
              onPress={() => props.navigation.navigate('Cart')}
            />
          </View>
        </View>
      </DrawerContentScrollView>
      <View>
        {!user && (
          <DrawerItem
            labelStyle={{color: '#ddd'}}
            label="Create a new account"
            onPress={() => console.log('NEW ACCOUNT')}
          />
        )}

        {user && (
          <DrawerItem
            labelStyle={{color: 'red'}}
            label="Logout"
            icon={() => <Icon name="logout" size={20} color="red" />}
            onPress={handleLogout}
          />
        )}
      </View>
    </View>
  );
};

const styles = createStyles({
  containerUserInfo: {
    flexDirection: 'row',
    marginTop: 5,
  },
  userInfo: {
    fontSize: '1rem',
    color: '#Fff',
    marginLeft: 15,
  },
});

export default DrawerContent;
