import React, { useState, useEffect, createRef } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {SHOP_URL, API_URL, ACCESS_TOKEN} from '../config/config';
import allActions from '../stores/actions';
import AwesomeLoading from 'react-native-awesome-loading';
import Toast from 'react-native-toast-message';
import {
  StyleSheet, 
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  ImageBackground,
} from 'react-native';
const SignUpScreen = ({ navigation }) => {
  const showMessage = (txt,type) => {
    Toast.show({
      type: type?type:'info',
      text1: txt?txt:'This is an info message!'
    });
  }
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userConfirmPassword, setUserConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const emailInputRef = createRef();
  const phoneInputRef = createRef();
  const passwordInputRef = createRef();
  const confirmPwdInputRef = createRef();
  const clearAll = () => {
  
    setFirstName('');
    setLastName('');
    setUserEmail('');
    setUserPassword('');
    setUserConfirmPassword('');
  
  }

  const handleRegister = async() => {
    
    setErrortext('');
    
    if (!firstName) {
      alert('Please input your First Name');
      return;
    }
    if (!lastName) {
      alert('Please input your Last Name');
      return;
    }
    if (!userEmail) {
      alert('Please input your email');
      return;
    }
    if (!userPassword) {
      alert('Please input your password');
      return;
    }
    if (!userConfirmPassword) {
      alert('Please confirm your password');
      return;
    }
    if (!userConfirmPassword == userPassword) {
      alert('Please re-input your password correctly');
      return;
    }
    
    setLoading(true);
    
    fetch(API_URL, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': ACCESS_TOKEN
        },
        body: JSON.stringify({
          "query": "mutation customerCreate($input: CustomerCreateInput!) { customerCreate(input: $input) { customer { firstName lastName, email, phone, acceptsMarketing } customerUserErrors { field, message, code } } }",
           "variables": {
              "input": {
                "firstName": `${firstName}`,
                "lastName": `${lastName}`,
                "email": `${userEmail}`,
                "password": `${userPassword}`,
                "acceptsMarketing": true
              }
            }
        }),
    }).then(res => {
      return res.json()
    }).then(res => {
      
      if (res.data.customerCreate.customerUserErrors.length > 0) {
      
        setLoading(false);
        alert(res.data.customerCreate.customerUserErrors[0].message);
        errorMsgBuilder(res.data.customerCreate.customerUserErrors);
      
      } else if (res.data.customerCreate.customer) {
      
        fetch(API_URL, 
          {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'X-Shopify-Storefront-Access-Token': ACCESS_TOKEN
            },
            body: JSON.stringify({
              "query": "mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) { customerAccessTokenCreate(input: $input) {customerUserErrors {code, field, message} customerAccessToken { accessToken, expiresAt } } }",
              "variables": {
                  "input": {
                    "email": `${userEmail}`,
                    "password": `${userPassword}`
                  }
                }
              }),
        }).then(res =>
          res.json()
        ).then(res => {
          
          if (res.data.customerAccessTokenCreate.customerUserErrors.length > 0) {
          
            setLoading(false);
            alert(res.data.customerAccessTokenCreate.customerUserErrors[0].message);
            errorMsgBuilder(res.data.customerAccessTokenCreate.customerUserErrors);
          
          } else if (res.data.customerAccessTokenCreate.customerAccessToken.accessToken != null) {
          
            dispatch(allActions.customerAction.signin_customer({
              email: userEmail,
              pass: userPassword,
              token: res.data.customerAccessTokenCreate.customerAccessToken.accessToken,
              expiresAt: res.data.customerAccessTokenCreate.customerAccessToken.expiresAt
            }));
          
            clearAll();
            navigation.navigate('MoreScreen');
          
            setLoading(false);
            showMessage('Suign Up Succeed!', 'success');
          }
        }).catch(err => {
        
          console.log('error',err);
          setLoading(false);
          alert('Unexpected error! please try again.');
        });
      
      } else {
      
        setLoading(false);
        alert('Unexpected error! please try again.');
      
      }
    }).catch(err => {
    
      console.log('error',err);
      setLoading(false);
      alert('Unexpected error! please try again.');
    
    });
  
  }

  const errorMsgBuilder = (arr) => {
    let msg = '';
    for (let i = 0; i < array.length; i++) msg += array[i].message;
    setErrortext(msg);
  }

  const auth_state = useSelector(state => state.auth?.auth_state);

  if (auth_state) navigation.navigate('MoreScreen');

  return (
    
    <View style={styles.container}>
       <AwesomeLoading indicatorId={17} size={50} isActive={loading} text="" />
      <ImageBackground source={require('../res/imgs/background.png')} style={styles.backImage}>
        <ScrollView contentContainer={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Instant Karma™</Text>
          </View>
          <View style={styles.formContainer}>
            <View >
              <Text >{errortext}</Text>
            </View>
            <KeyboardAvoidingView enabled>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(firstName) => setFirstName(firstName)}
                underlineColorAndroid="#f000"
                placeholder="First Name"
                placeholderTextColor="#8b9cb5"
                keyboardType="default"
                autoCapitalize="sentences"
                returnKeyType="next"
                onSubmitEditing={() =>
                  emailInputRef.current && emailInputRef.current.focus()
                }
                value={firstName}
                blurOnSubmit={false}
              />
              <TextInput
                style={styles.inputStyle}
                onChangeText={(lastName) => setLastName(lastName)}
                underlineColorAndroid="#f000"
                placeholder="Last Name"
                placeholderTextColor="#8b9cb5"
                keyboardType="default"
                autoCapitalize="sentences"
                returnKeyType="next"
                onSubmitEditing={() =>
                  emailInputRef.current && emailInputRef.current.focus()
                }
                value={lastName}
                blurOnSubmit={false}
              />
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
                onSubmitEditing={() =>
                  phoneInputRef.current &&
                  phoneInputRef.current.focus()
                }
                underlineColorAndroid="#f000"
                value={userEmail}
                blurOnSubmit={false}
              />
              {/* <TextInput
                style={styles.inputStyle}
                onChangeText={(UserPhone) =>
                  setUserPhone(UserPhone)
                }
                placeholder="Phone Number"
                placeholderTextColor="#8b9cb5"
                autoCapitalize="none"
                keyboardType="numeric"
                returnKeyType="next"
                onSubmitEditing={() =>
                  passwordInputRef.current &&
                  passwordInputRef.current.focus()
                }
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
              /> */}
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserPassword) =>
                  setUserPassword(UserPassword)
                }
                placeholder="Password" //12345
                placeholderTextColor="#8b9cb5"
                keyboardType="default"
                
                onSubmitEditing={() =>
                  confirmPwdInputRef.current &&
                  confirmPwdInputRef.current.focus()
                }
                blurOnSubmit={false}
                secureTextEntry={true}
                underlineColorAndroid="#f000"
                value={userPassword}
                returnKeyType="next"
              />

              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserConfirmPassword) =>
                  setUserConfirmPassword(UserConfirmPassword)
                }
                placeholder="Confirm Password" //12345
                placeholderTextColor="#8b9cb5"
                keyboardType="default"
                ref={confirmPwdInputRef}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                secureTextEntry={true}
                value={userConfirmPassword}
                underlineColorAndroid="#f000"
                returnKeyType="next"
              />

              <TouchableOpacity
                style={styles.normalButton}
                onPress={handleRegister}
              >
                <Text style={styles.buttonText}>CREATE ACCOUNT</Text>
              </TouchableOpacity>

            </KeyboardAvoidingView>
          </View>
        </ScrollView>
      </ImageBackground>

    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backImage: {
    width: '100%', height: '100%'
  },

  titleText: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#292B2D',
    marginTop: 20,
    marginBottom: 20,
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
    marginBottom: 70,
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
