import React, {useRef, useState} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';

import {createStyles} from 'Styles/index';

const ShippingAddressScreen = () => {
  const navigation = useNavigation();

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [zipcode, setZipcode] = useState('');

  const cityRef = useRef<TextInput>(null);
  const countryRef = useRef<TextInput>(null);
  const zipcodeRef = useRef<TextInput>(null);

  const handleSubmit = async (
    address: string,
    city: string,
    country: string,
    zipcode: string,
  ) => {
    console.log(address, city, country, zipcode);
  };
  function title() {
    return (
      <View>
        <Text style={styles.title}>Inform your address</Text>
      </View>
    );
  }

  function renderForm() {
    return (
      // VIEW FORM
      <View style={{width: '100%', paddingHorizontal: 20}}>
        {/* VIEW ADDRESS */}
        <View style={{marginTop: 20}}>
          <TextInput
            style={{
              borderBottomColor: '#fff',
              borderBottomWidth: 1,
              height: 40,
              color: '#fff',
            }}
            onChangeText={(value) => setAddress(value)}
            returnKeyType="next"
            onSubmitEditing={() => cityRef.current?.focus()}
            autoCapitalize="none"
            placeholder="Address"
            textContentType="fullStreetAddress"
            placeholderTextColor="#fff"
          />
        </View>

        {/* VIEW CITY */}
        <View style={{marginTop: 20}}>
          <TextInput
            ref={cityRef}
            style={{
              borderBottomColor: '#fff',
              borderBottomWidth: 1,
              height: 40,
              color: '#fff',
            }}
            onChangeText={(value) => setCity(value)}
            returnKeyType="next"
            onSubmitEditing={() => countryRef.current?.focus()}
            autoCapitalize="none"
            placeholder="City"
            textContentType="addressCity"
            placeholderTextColor="#fff"
          />
        </View>

        {/* VIEW COUNTRY */}
        <View style={{marginTop: 20}}>
          <TextInput
            ref={countryRef}
            style={{
              borderBottomColor: '#fff',
              borderBottomWidth: 1,
              height: 40,
              color: '#fff',
            }}
            onChangeText={(value) => setCountry(value)}
            returnKeyType="next"
            onSubmitEditing={() => zipcodeRef.current?.focus()}
            autoCapitalize="none"
            placeholder="Country"
            textContentType="countryName"
            placeholderTextColor="#fff"
          />
        </View>

        {/* VIEW ZIPCODE */}
        <View style={{marginTop: 20}}>
          <TextInput
            ref={zipcodeRef}
            style={{
              borderBottomColor: '#fff',
              borderBottomWidth: 1,
              height: 40,
              color: '#fff',
            }}
            onChangeText={(value) => setZipcode(value)}
            returnKeyType="send"
            onSubmitEditing={() =>
              handleSubmit(address, city, country, zipcode)
            }
            autoCapitalize="none"
            placeholder="ZipCode"
            textContentType="name"
            placeholderTextColor="#fff"
          />
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
          onPress={() => handleSubmit(address, city, country, zipcode)}>
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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
      </TouchableWithoutFeedback>
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

export default ShippingAddressScreen;
