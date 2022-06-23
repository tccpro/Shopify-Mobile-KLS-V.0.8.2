
// Import React and Component
import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  Text
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SplashScreen = ({ navigation }) => {

    const [animating, setAnimating] = useState(true);

    useEffect(() => {
      setTimeout(() => {
        setAnimating(false);
        //Check if user_id is set or not
        //If not then send for Authentication
        //else send to Home Screen
          navigation.replace('Main')

      }, 2000);
    }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.backImage}
        source={require('../res/imgs/background.png')}>
        <SafeAreaView >
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Instant Karma™</Text>
          </View>

        </SafeAreaView>
      </ImageBackground>


      <ActivityIndicator
            animating={animating}
            color="#292B2D"
            size="large"
            style={styles.activityIndicator}
          />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backImage: {
    width: '100%', height: '100%'
  },

  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    marginBottom: 24,
},
  activityIndicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },

  headerText: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
  },
});