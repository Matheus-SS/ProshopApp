import React, {useRef, useState} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {createStyles} from 'Styles/index';

import {AuthContext} from 'Components/Context';

const SignInScreen = () => {
  const [showPassword, setShowPassword] = useState<boolean>(true);

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();
  const passowordRef = useRef<TextInput>(null);

  const {signIn} = React.useContext(AuthContext);

  const handleSubmit = async (username: string, passWord: string) => {
    await signIn(username, passWord);
  };
  function title() {
    return (
      <View>
        <Text style={styles.title}>Welcome to Proshop</Text>
      </View>
    );
  }

  function renderForm() {
    return (
      // VIEW FORM
      <View style={{width: '100%', paddingHorizontal: 20}}>
        {/* VIEW EMAIL */}
        <View style={{marginTop: 20}}>
          <TextInput
            style={{
              borderBottomColor: '#fff',
              borderBottomWidth: 1,
              height: 40,
              color: '#fff',
            }}
            onChangeText={(value) => setUserName(value)}
            returnKeyType="next"
            onSubmitEditing={() => passowordRef.current?.focus()}
            autoCapitalize="none"
            placeholder="Email"
            textContentType="emailAddress"
            placeholderTextColor="#fff"
          />
        </View>

        {/* VIEW PASSWORD */}
        <View style={{marginTop: 20}}>
          <TextInput
            style={{
              borderBottomColor: '#fff',
              borderBottomWidth: 1,
              height: 40,
              color: '#fff',
            }}
            ref={passowordRef}
            returnKeyType="send"
            autoCapitalize="none"
            placeholder="Password"
            textContentType="password"
            onChangeText={(value) => setPassword(value)}
            placeholderTextColor="#fff"
            secureTextEntry={showPassword}
            onSubmitEditing={() => handleSubmit(userName, password)}
          />

          <TouchableOpacity
            style={{
              position: 'absolute',
              right: 0,
              top: 10,
            }}
            onPress={() => setShowPassword(!showPassword)}>
            <Icon
              name={`${showPassword ? 'eye' : 'eye-off'}`}
              color="#fff"
              size={20}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function renderSignInButton() {
    return (
      <View style={{marginTop: 30, flexDirection: 'row'}}>
        <TouchableOpacity
          style={{
            backgroundColor: '#fff',
            padding: 10,
            marginHorizontal: 20,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          }}
          onPress={() => handleSubmit(userName, password)}>
          <Text style={styles.buttonText}>Sign in</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function renderSignUpButton() {
    return (
      <View style={{marginTop: 10, flexDirection: 'row'}}>
        <TouchableOpacity
          style={{
            backgroundColor: '#fff',
            padding: 10,
            marginHorizontal: 20,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          }}
          onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.buttonText}>Create account</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function renderResetPasswordButton() {
    return (
      <View>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.resetPasswordButtonText}>Forgot password?</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function renderHomeButton() {
    return (
      <View>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={styles.goBackButtonText}>Go Home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#232323',
        }}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {title()}
          {renderForm()}
          {renderSignInButton()}
          {renderSignUpButton()}
          <View style={styles.containerSecondaryButtons}>
            {renderHomeButton()}
            {renderResetPasswordButton()}
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = createStyles({
  title: {
    fontSize: '2rem',
    fontFamily: 'Roboto-Bold',
    color: '#fff',
  },
  buttonText: {
    fontSize: '1.2rem',
    fontFamily: 'Roboto-Regular',
    color: '#232323',
  },
  resetPasswordButtonText: {
    fontSize: '1rem',
    fontFamily: 'Roboto-Regular',
    color: '#ccc',
  },

  goBackButtonText: {
    fontSize: '1rem',
    fontFamily: 'Roboto-Regular',
    color: '#ccc',
  },

  containerSecondaryButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
  },
});

export default SignInScreen;
