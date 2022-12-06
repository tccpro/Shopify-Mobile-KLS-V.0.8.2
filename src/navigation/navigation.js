import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Image, Linking} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-toast-message';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Client from 'shopify-buy';
import fetchAllInfo from '../service/shopify';
import ServiceListScreen from '../Screen/ServiceListScreen';
import ConcertTypeScreen from '../Screen/ConcertTypeScreen';
import ConcertPriceScreen from '../Screen/ConcertPriceScreen';
import ConcertPurchasedScreen from '../Screen/ConcertPurchasedScreen';
import ShopCollectionScreen from '../Screen/ShopCollectionScreen';
import ShopItemScreen from '../Screen/ShopItemScreen';
import ShopDetailScreen from '../Screen/ShopDetailScreen';
import SplashScreen from '../Screen/SplashScreen';
import SignInScreen from '../Screen/SignInScreen';
import SignUpScreen from '../Screen/SignUpScreen';
import ForgotPasswordScreen from '../Screen/ForgotPasswordScreen';
import VerifyScreen from '../Screen/VerifyScreen';
import ConcertSelectScreen from '../Screen/ConcertSelectScreen';
import ShopItemListScreen from '../Screen/ShopItemListScreen';
import ConcertCartScreen from '../Screen/ConcertCartScreen';
import BandListScreen from '../Screen/BandListScreen';
import BandItemListScreen from '../Screen/BandItemListScreen';
import EventListScreen from '../Screen/EventListScreen';
import WebViewScreen from '../Screen/WebViewScreen';
import SmileScreen from '../Screen/SmileScreen';
import MoreScreen from '../Screen/MoreScreen';
import SkypilotScreen from '../Screen/SkypilotScreen';
import allActions from '../stores/actions';
import {SHOP_URL, API_URL, ACCESS_TOKEN} from '../config/config';
import { AsyncStorage } from 'react-native';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Auth = ({navigation}) => {
  // Stack Navigator for Login and Sign up Screen
  return (
    <Stack.Navigator initialRouteName="SignInScreen">
      <Stack.Screen
        name="SignInScreen"
        component={SignInScreen}
        options={{title: 'Sign In'}}
      />
      <Stack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{title: 'Sign Up'}}
      />
      <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
        options={{title: 'Forgot Password?'}}
      />
      <Stack.Screen
        name="VerifyScreen"
        component={VerifyScreen}
        options={{title: 'Verify your account'}}
      />
    </Stack.Navigator>
  );
};

const Main = () => {
  return (
    <Stack.Navigator initialRouteName="ServiceList">
      <Stack.Screen
        name="ServiceList"
        component={ServiceListScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BandList"
        component={BandListScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EventList"
        component={EventListScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BandItemList"
        component={BandItemListScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ConcertSelectScreen"
        component={ConcertSelectScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="ConcertType" component={ConcertTypeScreen} />
      <Stack.Screen
        name="ConcertPrice"
        component={ConcertPriceScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ConcertPurchased"
        component={ConcertPurchasedScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ShopCollection"
        component={ShopCollectionScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ShopItemList"
        component={ShopItemListScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ShopItem"
        component={ShopItemScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ShopDetail"
        component={ShopDetailScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ConcertCart"
        component={ConcertCartScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="WebView"
        component={WebViewScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Smile"
        component={SmileScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Skypilot"
        component={SkypilotScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const MoreScreenNav = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="MoreScreen">
      <Stack.Screen
        name="MoreScreen"
        component={MoreScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Auth"
        component={Auth}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const Nav = ({navigation}) => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#000000',
      }}>
      <Tab.Screen
        name="Home"
        component={Main}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size, focused}) => (
            <MaterialCommunityIcons
              name="home"
              color={focused ? '#FF7400' : color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Loyalty"
        component={SmileScreen}
        // listeners={{
        //   tabPress: e => {
        //     e.preventDefault();
        //     Linking.openURL('https://app.smile.io/');
        //   },
        // }}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size, focused}) => (
            <Image
              source={
                focused
                  ? require('../res/imgs/ic_loyalty_normal.png')
                  : require('../res/imgs/ic_loyalty_unselected.png')
              }
              size={size}></Image>
          ),
        }}
      />
      <Tab.Screen
        name="My Concert"
        component={SkypilotScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size, focused}) => (
            <Image
              source={
                focused
                  ? require('../res/imgs/ic_play.png')
                  : require('../res/imgs/ic_play_unselected1.png')
              }
              size={size}></Image>
          ),
        }}
      />
      <Tab.Screen
        name="More"
        component={MoreScreenNav}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size, focused}) => (
            <MaterialCommunityIcons
              name="more"
              color={focused ? '#4472C4' : color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const MainNavigation = () => {

  const dispatch = useDispatch();
  fetchAllInfo();
  
  const checkout = useSelector((state) => state.checkout?.checkoutItem);
  const auth_state = useSelector((state) => state.auth?.auth_state);
  const client = Client.buildClient({
    domain: SHOP_URL,
    storefrontAccessToken: ACCESS_TOKEN
  });

  if (checkout === undefined || checkout.completedAt !== null) {
    client.checkout.create().then((res) => {
      dispatch(allActions.checkoutAction.createCheckout(res));
    });
  }

  let __userData;

  const initToken = async () => {
    
    try {
      
      const AsyncToken = await AsyncStorage.getItem('__userData');

      if (AsyncToken !== null) {

        __userData = JSON.parse(AsyncToken); // Parse 

        console.log(AsyncToken);
        
        if (!__userData.token) return; 
        else if (__userData.is_google) return; // Google auth(App.js) => return

        //Check email & pass and get token, update token, restore again.
        async () => {
          fetch(API_URL, {
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
                      "email": `${__userData.email}`,
                      "password": `${__userData.pass}`
                    }
                  }
                }),
          }).then(res =>
            res.json()
          ).then(res => {
            console.log(res.data.customerAccessTokenCreate);
            if (res.data.customerAccessTokenCreate.customerUserErrors.length > 0) {
              dispatch(allActions.customerAction.signout_customer);
            } else if (res.customerAccessToken != null) {
              dispatch(allActions.customerAction.signin_customer({
                id: __userData.id,
                email: __userData.email,
                pass: __userData.pass,
                token: res.data.customerAccessTokenCreate.customer.accessToken,
                expiresAt: res.data.customerAccessTokenCreate.customer.expiresAt
              }));
            }
          }).catch(err => {
            console.log(err);
            dispatch(allActions.customerAction.signout_customer);
          });
        }
      } 
    } catch (error) {
    
      console.log(error);
    }
  
  };

  useEffect(async () => {
    
    await initToken();
  
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        {/* Auth Navigator: Include Login and Signup */}
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Main"
          component={Nav}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
      <Toast ref={ref => Toast.setRef(ref)} />
    </NavigationContainer>
  );
}; 

export default MainNavigation;
