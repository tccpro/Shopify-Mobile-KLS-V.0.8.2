import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ServiceListScreen = ({navigation}) => {
  const goToConcert = () => {
    navigation.navigate('EventList');
  };

  const goToShopByBand = () => {
    navigation.navigate('BandList');
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('./../res/imgs/background.png')}
        style={styles.backImage}>
        <SafeAreaView>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Instant Karma™</Text>
        </View>
        <TouchableOpacity
          style={styles.serviceBtnContainer}
          onPress={goToConcert}>
          {/* <Image source={require('./../res/imgs/music_black.png')} /> */}
          <Text style={styles.serviceBtnText}>Shop by Event</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.serviceBtnContainer}
          onPress={goToShopByBand}>
          <Text style={styles.serviceBtnText}>Shop by Artist</Text>
        </TouchableOpacity>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

export default ServiceListScreen;

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
    padding: 8,
    marginLeft: 32,
    marginRight: 32,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#ffffff90',
  },
  serviceBtnText: {
    color: 'black',
    fontSize: 26,
    marginLeft: 16,
  },
});
