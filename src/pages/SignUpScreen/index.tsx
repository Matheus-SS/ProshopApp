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

import {createStyles} from '../../../styles';

import {AuthContext} from '../../components/Context';

const SignUpScreen = () => {
  const [showPassword, setShowPassword] = useState<boolean>(true);

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();
  const nameRef = useRef<TextInput>(null);
  const passowordRef = useRef<TextInput>(null);

  const {signUp} = React.useContext(AuthContext);

  const handleSubmit = async (
    email: string,
    username: string,
    passWord: string,
  ) => {
    await signUp(email, username, passWord);
  };
  function title() {
    return (
      <View>
        <Text style={styles.title}>Create your account</Text>
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
            onChangeText={(value) => setEmail(value)}
            returnKeyType="next"
            onSubmitEditing={() => nameRef.current?.focus()}
            autoCapitalize="none"
            placeholder="Email"
            textContentType="emailAddress"
            placeholderTextColor="#fff"
          />
        </View>

        {/* VIEW NAME */}
        <View style={{marginTop: 20}}>
          <TextInput
            ref={nameRef}
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
            placeholder="Name"
            textContentType="name"
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
            onSubmitEditing={() => handleSubmit(email, userName, password)}
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

  function renderButton() {
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
          onPress={() => handleSubmit(email, userName, password)}>
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function renderHomeButton() {
    return (
      <View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.goBackButtonText}>Go Back</Text>
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
          {renderButton()}
          <View style={styles.containerSecondaryButtons}>
            {renderHomeButton()}
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

export default SignUpScreen;
