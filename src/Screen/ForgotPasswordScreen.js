
// Import React and Component
import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  Text,
  KeyboardAvoidingView,
  TextInput
} from 'react-native';

import {SHOP_URL, API_URL, ACCESS_TOKEN} from '../config/config';
import AwesomeLoading from 'react-native-awesome-loading';
import Toast from 'react-native-toast-message';

const ForgotPasswordScreen = ({ navigation }) => {

  const showMessage = (txt,type) => {
    Toast.show({
      type: type?type:'info',
      text1: txt?txt:'This is an info message!'
    });
  }

  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const sendVerifyEmail = () => {
    setLoading(true);
    fetch(API_URL, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': ACCESS_TOKEN
        },
        body: JSON.stringify({
          "query": "mutation customerRecover($email: String!) { customerRecover(email: $email) {customerUserErrors  {code, field, message} } }",
          "variables": {
                "email": `${userEmail}`,
          }
        }),
    }).then(res =>
      res.json()
    ).then(res => {
      // navigation.navigate('Auth');
      setLoading(false);
      showMessage("Please check your email.", 'info');
    }).catch(err => {
      setLoading(false);
      console.log('error',err);
      alert('Unexpected error! please try again.');
    });
  }


  

  return (
    <View style={styles.container}>
      <AwesomeLoading indicatorId={17} size={50} isActive={loading} text="" />
      <ImageBackground source={require('../res/imgs/background.png')} style={styles.backImage}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Instant Karma™</Text>
        </View>
        <View style={styles.formContainer}>
          <KeyboardAvoidingView enabled>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserEmail) =>
                setUserEmail(UserEmail)
              }
              placeholder="Email" //dummy@abc.com
              placeholderTextColor="#8b9cb5"
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="next"
              underlineColorAndroid="#f000"
              blurOnSubmit={false}
            />
            <TouchableOpacity
              style={styles.normalButton}
              onPress={sendVerifyEmail}
            >
              <Text style={styles.buttonText}>Send Email</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </ImageBackground>
    </View>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backImage: {
    width: '100%', height: '100%'
  },

  normalButton: {
    borderRadius: 6,
    tintColor: '#000000',
    backgroundColor: '#000000',
    marginLeft: 24,
    marginRight: 24,
    marginTop: 24,
    padding: 16,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 14,
    fontWeight: '500'
  },
  inputStyle: {
    color: 'black',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#dadae8',
    marginLeft: 24,
    marginRight: 24,
    marginTop: 8,
    padding: 20,
    height: 64,
    fontSize: 12,
    backgroundColor: "rgba(255,255,255,0.6)"
  },
  formContainer: {
    backgroundColor: "rgba(255,255,255,0.7)",
    marginRight: 45,
    marginLeft: 45,
    paddingTop: 30,
    paddingBottom: 30
  },
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    marginBottom: 24,
  },
  headerText: {
      color: 'black',
      fontSize: 24,
      fontWeight: 'bold',
  }
});