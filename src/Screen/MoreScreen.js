import React, { Component, useState, createRef } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { 
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
   } from '@react-native-google-signin/google-signin';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

import { WebView } from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
  } from 'react-native';

import {SHOP_URL, API_URL, ACCESS_TOKEN} from '../config/config';
import allActions from '../stores/actions';

export default function MoreScreen({navigation}){
    
    const dispatch = useDispatch();   
    const auth_state = useSelector((state) => state.auth.auth_state);
    const signout = () => {
        dispatch(allActions.customerAction.signout_customer());
        navigation.navigate('Home');
        async () => {
            try {
              await GoogleSignin.revokeAccess();
              await GoogleSignin.signOut();
              setloggedIn(false);
              setuserInfo([]);
            } catch (error) {
              console.error(error);
            }
        };
    }
    
    return (
        
        <View style={styles.container}>
        
            <ImageBackground
                style={styles.backImage}
                source={require('../res/imgs/background.png')}>
        
                <SafeAreaView>
                    <View style={styles.headerContainer}>
                        <Text style={styles.headerText}>Instant Karma™</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.serviceBtnContainer}
                        onPress={
                            () => {
                                if (!auth_state) navigation.navigate('Auth');
                                else navigation.navigate('Home');
                            }
                        }
                        >
                        <Text style={styles.serviceBtnText}>Orders</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.serviceBtnContainer}
                        onPress={
                            () => {
                                if (!auth_state) navigation.navigate('Auth');
                                else navigation.navigate('Home');
                            }
                        }
                        >
                        <Text style={styles.serviceBtnText}>Payment Detail</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.serviceBtnContainer}
                        onPress={
                            () => {
                                if (!auth_state) navigation.navigate('Auth');
                                else navigation.navigate('Home');
                            }
                        }
                        >
                        <Text style={styles.serviceBtnText}>Addresses</Text>
                    </TouchableOpacity>
                    {auth_state &&
                        <TouchableOpacity
                            style={styles.serviceBtnContainer}
                            onPress={() => {signout()}}
                            >
                            <Text style={styles.serviceBtnText}>Sign Out</Text>
                        </TouchableOpacity>
                    }
                </SafeAreaView>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    backImage: {
        width: '100%',
        height: '100%',
        backgroundColor: '#eeeeee',
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
    serviceBtnContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 32,
        padding: 16,
        marginLeft: 64,
        marginRight: 64,
        borderRadius: 8,
        backgroundColor: '#ffffff90',
    },
    serviceBtnText: {
        color: '#555555',
        fontSize: 24,
        fontWeight: 'bold',
    },
});