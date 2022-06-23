// Import React and Component
import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  Text,
  ScrollView,
} from 'react-native';
import {Card, ListItem, Button, Icon} from 'react-native-elements';

const ConcertPriceScreen = ({navigation}) => {
  const goBack = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.backImage}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Instant Karma™</Text>
          <TouchableOpacity style={styles.backBtnContainer} onPress={goBack}>
            <Image source={require('../res/imgs/back_black.png')} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.cartBtnContainer}>
            <ImageBackground
              style={styles.cartBtnBack}
              source={require('../res/imgs/cart_num_back.png')}>
              <Text style={styles.cartNumText}>0</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
        <Image
          source={require('../res/imgs/artist.png')}
          style={styles.artistImage}></Image>
        <ScrollView style={{flex: 1, padding: 20}}>
          <Text style={styles.textTitle}>
            <Image source={require('../res/imgs/music_ic.png')}></Image> The
            Grimm Concert
          </Text>
          <Text style={styles.concertDes}>December 25, 2019</Text>
          <Text style={styles.concertDes}>Lynn Doe</Text>
          <Text style={styles.concertDes}>
            3939 Broken Bone Road, Tooele UT
          </Text>
          <Text style={styles.priceText}>$9.99</Text>
          <TouchableOpacity
            style={styles.normalButton}
            onPress={() => navigation.navigate('ConcertPurchased')}>
            <Text style={styles.buttonText}>ADD TO CART</Text>
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default ConcertPriceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#eeeeee',
  },
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#745EFF',
    height: 80,
    marginBottom: 1,
  },
  headerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },

  backBtnContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    paddingTop: 10,
  },
  cartBtnContainer: {
    position: 'absolute',
    top: 16,
    right: 24,
    width: 40,
    height: 48,
  },

  cartBtnBack: {
    width: '100%',
    height: '100%',
  },
  cartNumText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    height: '100%',
    color: '#745EFF',
  },
  artistImage: {
    resizeMode: 'stretch',
    width: '100%',
  },
  textTitle: {
    color: '#000000',
    fontSize: 18,
    marginTop: 16,
    marginBottom: 24,
    fontWeight: 'bold',
    // fontFamily: 'Montserrat-Bold'
  },
  normalButton: {
    borderRadius: 25,
    tintColor: '#745EFF',
    backgroundColor: '#745EFF',
    padding: 16,
    marginTop: 32,
    marginBottom: 32,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 14,
    // fontFamily: 'Montserrat-SemiBold',
  },
  concertDes: {
    color: '#292B2D',
    fontSize: 14,
    marginBottom: 8,
    // fontFamily: 'Montserrat-Regular'
  },
  priceText: {
    color: '#745EFF',
    fontSize: 36,
    fontWeight: 'bold',
    // fontFamily: 'Montserrat-Bold',
    marginBottom: 16,
  },
});
