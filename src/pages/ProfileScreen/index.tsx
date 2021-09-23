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

const SignUpScreen = () => {
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(true);

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const navigation = useNavigation();
  const nameRef = useRef<TextInput>(null);
  const passowordRef = useRef<TextInput>(null);
  const newPasswordRef = useRef<TextInput>(null);

  const handleSubmit = async (
    email: string,
    username: string,
    password: string,
    newPassword: string,
  ) => {
    console.log(email, username, password, newPassword);
  };
  function title() {
    return (
      <View>
        <Text style={styles.title}>Profile</Text>
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
            returnKeyType="next"
            autoCapitalize="none"
            placeholder="Password"
            textContentType="password"
            onChangeText={(value) => setPassword(value)}
            placeholderTextColor="#fff"
            secureTextEntry={showPassword}
            onSubmitEditing={() => newPasswordRef.current?.focus()}
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

        {/* VIEW NEW PASSWORD */}
        <View style={{marginTop: 20}}>
          <TextInput
            style={{
              borderBottomColor: '#fff',
              borderBottomWidth: 1,
              height: 40,
              color: '#fff',
            }}
            ref={newPasswordRef}
            returnKeyType="send"
            autoCapitalize="none"
            placeholder="New password"
            textContentType="newPassword"
            onChangeText={(value) => setNewPassword(value)}
            placeholderTextColor="#fff"
            secureTextEntry={showNewPassword}
            onSubmitEditing={() =>
              handleSubmit(email, userName, password, newPassword)
            }
          />

          <TouchableOpacity
            style={{
              position: 'absolute',
              right: 0,
              top: 10,
            }}
            onPress={() => setShowNewPassword(!showNewPassword)}>
            <Icon
              name={`${showNewPassword ? 'eye' : 'eye-off'}`}
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
          onPress={() => handleSubmit(email, userName, password, newPassword)}>
          <Text style={styles.buttonText}>Save</Text>
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
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
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
