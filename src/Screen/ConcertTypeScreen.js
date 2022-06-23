

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
    TouchableHighlight,
} from 'react-native';

const ConcertTypeScreen = ({ navigation }) => {

    const goToConcertType = () => {
        navigation.navigate('ConcertPrice');
    }
    return (
        <View style={styles.container}>
            <ImageBackground source={require('../res/imgs/background.png')} style={styles.backImage}>

                <Text style={styles.textTitle}>How do you want your concert?</Text>
                <View style={styles.bottomContainer}>
                <TouchableOpacity
                    style={styles.normalButton}
                    onPress={goToConcertType}
                >
                    <View
                        style={styles.btnContainer}>
                        <Image source={require('../res/imgs/phone_ic.png')} style={styles.iconImage}></Image>
                        <Text style={styles.buttonText}>
                            STREAM ON PHONE
                        </Text>
                    </View>

                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.normalButton}
                    onPress={goToConcertType}
                >
                    <View
                        style={styles.btnContainer}>
                        <Image source={require('../res/imgs/download_ic.png')} style={styles.iconImage}></Image>
                        <Text style={styles.buttonText}>
                            DOWNLOAD ON COMPUTER
                        </Text>
                    </View>
                </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    );
};

export default ConcertTypeScreen;

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
        marginTop: 32,
        marginLeft: 24,
        marginRight: 24,
        marginBottom: 5,
        textAlign: 'center',
        fontFamily: 'Montserrat-Bold',
        fontSize: 32,
        padding: 8,
    },
    normalButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 6,
        backgroundColor: '#000000',

        marginTop: 24,
        padding: 16,
        borderRadius: 25,


    },
    btnContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'stretch',
        alignSelf: 'stretch',
        borderRadius: 10,
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 14,
        fontFamily: 'Montserrat-SemiBold'
    },
    iconImage: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
        marginRight: 5
    },
    bottomContainer: {
        position: 'absolute',
        bottom: 16,
        left: 16,
        right: 16
    }
});