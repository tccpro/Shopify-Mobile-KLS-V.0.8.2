
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

const VerifyScreen = ({ navigation }) => {

  const goToConcert = () => {
    navigation.navigate('ConcertType')
  }

  const goToShopCollection = () => {
    navigation.navigate('ShopCollection')
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../res/imgs/background.png')} style={styles.backImage}>
        <Image source={require('../res/imgs/artist.png')} style={styles.artistImage}></Image>
        <Text style={styles.textTitle}>The Grimm</Text>
        <TouchableOpacity
          style={styles.normalButton}
          onPress={goToConcert}
        >
          <Text style={styles.buttonText}>Get audio concert</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.normalButton}
          onPress={goToShopCollection}
        >
          <Text style={styles.buttonText}>Get artist memorabilla</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default VerifyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backImage: {
    width: '100%', height: '100%'
  },
  artistImage: {
    resizeMode: 'stretch',
    width: '100%',
    height: '50%',
  },
  textTitle: {
    color: '#292B2D',
    fontSize: 16,
    marginTop: 32,
    marginLeft: 24,
    fontWeight: 'bold'
  },
  normalButton: {
    borderRadius: 6,
    tintColor: '#745EFF',
    backgroundColor: '#745EFF',
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
  }
});