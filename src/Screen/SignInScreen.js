
// Import React and Component
import { 
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
 } from '@react-native-google-signin/google-signin';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

import React, { useState, useEffect, createRef } from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {SHOP_URL, API_URL, ACCESS_TOKEN} from '../config/config';
import allActions from '../stores/actions';
import AwesomeLoading from 'react-native-awesome-loading';
import Toast from 'react-native-toast-message';

import {
  Button,
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



const SignInScreen = ({ navigation }) => {

  useEffect(() => {

    GoogleSignin.configure({
      scopes: ['email'],
      webClientId: '58060030791-39agctp3jisjthm6ehrd5ce9i07dqj6p.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: false
    });

  }, []);

  const showMessage = (txt,type) => {
    Toast.show({
      type: type?type:'info',
      text1: txt?txt:'This is an info message!'
    });
  }

  const dispatch = useDispatch();

  const goToForgotPassword = () => {
    navigation.navigate('ForgotPasswordScreen')
  }

  
  const goToRegister = () => {
    navigation.navigate('SignUpScreen')
  }

  const handleLogin = () => {
    
    setErrortext('');

    if (!userEmail) {
      alert('Please input your email');
      return;
    }
    if (!userPassword) {
      alert('Please input your password');
      return;
    }
  
    setLoading(true);
  
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
      
      } else if (res.data.customerAccessTokenCreate.customerAccessToken.accessToken != null) {

        // fetch('https://myconcertdirect.com/apps/downloads/orders/6278380552417.js', 
        //   {
        //     method: 'GET',
        //     headers: {
        //       'Accept': 'application/json',
        //       'Content-Type': 'application/json',
        //       'X-Shopify-Storefront-Access-Token': ACCESS_TOKEN
        //     },
        //     body : "{}"          
        // }).then(response => {

        //   console.log('res', response.json());
        
        // }).then(response=>{

        // //   console.log("res => ", res);
        
        
        // // }).catch( err => {
        //   //   console.log(err);
        // }).catch(err => {
        //   console.log(err);
        // })
        
        dispatch(allActions.customerAction.signin_customer({
          email: userEmail,
          pass: userPassword,
          token: res.data.customerAccessTokenCreate.customerAccessToken.accessToken,
          expiresAt: res.data.customerAccessTokenCreate.customerAccessToken.expiresAt
        }));
        
        navigation.navigate('Home');
        
        setLoading(false);
        showMessage('Sign In Succeed!', 'success');

      }
    
    }).catch(err => {
    
      console.log('error',err);
      setLoading(false);
      alert('Unexpected error! please try again.')
    
    });
  
  }

  useEffect(() => {
    auth().onAuthStateChanged(userState => {
    
      console.log('userState from Google account', userState);
      
      if(userState) {
      
        const user = auth().currentUser;
      
        dispatch(allActions.customerAction.signin_customer({
          email: user.email,
          pass: '',
          is_google: true,
          token: '',
          expiresAt: ''
        })); 
      
      }
    });
  }, []);
  
  const getCurrentUserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      console.log('getCurrentUserInfo', userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        // user has not signed in yet
      } else {
        // some other error
      }
    }
  };

  const isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    console.log('isSignedIn', isSignedIn);
  };
  
  const getCurrentUser = async () => {
    const currentUser = await GoogleSignin.getCurrentUser();
    console.log('getCurrentUser', currentUser);
  };

  async () => {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      // google services are available
    } catch (err) {
      console.error('play services are not available');
    }
  }

  const Google_signin = async () => {
    console.log("test")
    try {
      await GoogleSignin.hasPlayServices();
  
      const {idToken} = await GoogleSignin.signIn();
      console.log(idToken);
  
    } catch (error) {

      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        alert('Cancel');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert('Signin in progress');
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert('PLAY_SERVICES_NOT_AVAILABLE');
        // play services not available or outdated
      } else {
        console.log("error", error)
        // some other error happened
      }
    }
  };
  
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const passwordInputRef = createRef();

  const auth_state = useSelector(state => state.auth?.auth_state);

  if (auth_state) navigation.navigate('MoreScreen');

  return (
    <View style={styles.container}>
      <AwesomeLoading indicatorId={17} size={50} isActive={loading} text="" />
      <ImageBackground source={require('../res/imgs/background.png')} style={styles.backImage}>
          <View style={styles.headerContainer}>
              <Text style={styles.headerText}>Instant Karma™</Text>
          </View>
        <View style={styles.formContainer}>
          <Button style={styles.googlebuttonBox} title="Google Sigin" onPress={()=>{
            Google_signin()
          }}/>
          <KeyboardAvoidingView enabled>
            
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserEmail) =>
                setUserEmail(UserEmail)
              }
              placeholder="Email/User Name" //dummy@abc.com
              placeholderTextColor="#8b9cb5"
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="next"
              onSubmitEditing={() =>
                passwordInputRef.current &&
                passwordInputRef.current.focus()
              }
              underlineColorAndroid="#f000"
              blurOnSubmit={false}
            />
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserPassword) =>
                setUserPassword(UserPassword)
              }
              placeholder="Password" //12345
              placeholderTextColor="#8b9cb5"
              keyboardType="default"
              ref={passwordInputRef}
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={false}
              secureTextEntry={true}
              underlineColorAndroid="#f000"
              returnKeyType="next"
            />
            <TouchableOpacity
              style={styles.normalButton}
              onPress={handleLogin}
            >
              <Text style={styles.buttonText}>LOG IN</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={goToForgotPassword}>
              <Text style={{
                textAlign: 'center',
                marginTop: 24,
                marginBottom: 20,
                fontSize: 9,
                textDecorationLine: 'underline'
              }}>
                  Forgot Password?
              </Text>
            </TouchableOpacity>
            <View style={styles.register}>
              <Text style={styles.registerText}>Don't have an account?</Text>
              <TouchableOpacity onPress={goToRegister} style={styles.registerButtonBox}>
                <Text style={styles.registerButtonText}>CREATE ACCOUNT</Text>
              </TouchableOpacity>
            </View>            
          </KeyboardAvoidingView>
        </View>
      </ImageBackground>

    </View>
  );
};

export default SignInScreen;

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
  },
  formContainer: {
    backgroundColor: "rgba(255,255,255,0.7)",
    marginRight: 45,
    marginLeft: 45,
    paddingTop: 30,
    paddingBottom: 30
  },
  register: {
    fontSize: 9,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  registerText: {
    fontSize: 9,
    marginRight: 5
  },
  registerButtonText: {
    fontSize: 8,
    fontWeight: 'bold',
    margin: 0
  },
  registerButtonBox: {
    borderRadius: 3,
    borderWidth: 2,
    borderColor: "rgba(0,0,0,0.6)",
    padding: 12,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 2,
    paddingBottom: 2
  },
  googlebuttonBox: {
    marginLeft: 24,
    marginRight: 24
  },
  googlebutton: {
    width: '100%',
    padding: 24
  }
});