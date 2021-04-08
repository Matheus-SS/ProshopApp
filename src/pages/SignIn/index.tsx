import React, {useState} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {createStyles} from '../../../styles';

const SignIn = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
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
            autoCapitalize="none"
            placeholder="Password"
            textContentType="password"
            placeholderTextColor="#fff"
            secureTextEntry={showPassword}
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
          }}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function renderResetPasswordButton() {
    return (
      <View style={{marginTop: 20, flexDirection: 'row', width: '100%'}}>
        <TouchableOpacity>
          <Text style={styles.resetPasswordButtonText}>Forgot password?</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusBar hidden />

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
          {renderResetPasswordButton()}
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
    paddingLeft: 20,
    textAlign: 'left',
  },
});

export default SignIn;
