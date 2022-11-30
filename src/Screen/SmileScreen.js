import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
function GetRewardsScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Get Rewards</Text>
      </View>
    );
  }  
  function EarnIKCashScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Earn IK Cash</Text>
      </View>
    );
  }
const Tab = createMaterialTopTabNavigator();
export default class Smilecreen extends Component {
  render() {
    return (
        <View style={styles.container}>
            <ImageBackground
                style={styles.backImage}
                source={require('../res/imgs/background.png')}>
                <SafeAreaView style={{flex: 1}}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>Instant Karma™</Text>
                </View>

                <View style={styles.bodyContainer}>
                    <View style={styles.headerContainer}>
                        <Text numberOfLines={2} style={styles.bodyTitleText}>Join our community and start{"\n"}earning sweet discounts!</Text>
                    </View>

                    <View style={{flex:1, marginTop:8, marginBottom:8}}>
                    <Tab.Navigator
                        screenOptions={({ route }) => ({
                            tabBarActiveTintColor: '#000000',
                            tabBarInactiveTintColor: 'gray',
                        })}
                    >
                        <Tab.Screen
                            name="GetRewards"
                            component={GetRewardsScreen}
                            options={{ tabBarLabel: 'GET REWARDS' }}
                        />
                        <Tab.Screen
                            name="EarnIKCash"
                            component={EarnIKCashScreen}
                            options={{ tabBarLabel: 'EARN IK™ CASH' }}
                        />
                    </Tab.Navigator>
                    </View>

                    <TouchableOpacity
                        press={() => {}}
                        >
                        <Text style={styles.createBtnContainer}>CREATE ACCOUNT</Text>
                    </TouchableOpacity>
                </View>
                </SafeAreaView>
            </ImageBackground>
        </View>
    );
  }
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
        marginBottom: 0,
    },
    headerText: {
        color: 'black',
        fontSize: 24,
        fontWeight: 'bold',
    },
    bodyContainer: {
        flex: 1,
        marginLeft: 24,
        marginRight: 24,
        marginBottom: 8,
        backgroundColor: '#ffffffff', 
    },
    bodyTitleText: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#555555',
        fontSize: 18,
        marginLeft: 24,
        marginEnd: 24,
        marginTop: 24,
    },
    createBtnContainer: {
        padding: 16,
        marginLeft: 16,
        marginRight: 16,
        marginBottom: 0,
        borderRadius: 2,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        backgroundColor: '#000',
    },
});
