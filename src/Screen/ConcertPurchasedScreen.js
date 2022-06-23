

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
  Button,
} from 'react-native';

const ConcertPurchasedScreen = ({ navigation }) => {

  const goToShopCollection = () => {
    navigation.navigate('ShopCollection')
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../res/imgs/background.png')} style={styles.backImage}>
        <View style={styles.purchasedContainer}>
            <ImageBackground source={require('../res/imgs/purchase_concert_img.png')} style={styles.backImage}>
                <Text style={styles.textTitle}>Thank you!</Text>
                <Text style={styles.textDes}>You have Instant Karma from Concert{"\n"}Direct and will receive your stream link via text within 24 hrs. $9.99 received</Text>
            </ImageBackground>
        </View>
        <TouchableOpacity
          style={styles.normalButton}
          onPress={goToShopCollection}
        >
          <Text style={styles.buttonText}>SHOP MEMORABILIA</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default ConcertPurchasedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backImage: {
    width: '100%', height: '100%'
  },
  textTitle: {
    color: '#292B2D',
    fontSize: 24,
    marginTop: 32,
    textAlign: 'center',
    fontFamily: 'Montserrat-Bold',
  },
  textDes: {
      fontSize: 14,
      color: '#292B2D',
      marginLeft: 40,
      marginRight: 40,
      marginTop: 16,
      textAlign: 'center',
      lineHeight: 24,
      fontFamily: 'Montserrat-Regular',
  },
  normalButton: {
    borderRadius: 6,
    tintColor: '#745EFF',
    backgroundColor: '#745EFF',
    borderRadius: 25,
    padding: 16,
    bottom:16,
    position: 'absolute',
    right: 24,
    left: 24,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold'
  },
  purchasedContainer: {
    margin: 16,
    height: 200,
    textAlign: 'center',
  }
});