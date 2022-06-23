
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

const ShopDetailScreen = ({ navigation, route }) => {

    const goToConcert = () => {
        navigation.navigate('ConcertType')
    }

    const goToShopCollection = () => {
        navigation.navigate('ShopCollection')
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../res/imgs/background.png')} style={styles.backImage}>
                <View style={styles.itemContainer}>
                    <ImageBackground source={require('../res/imgs/item_detail.png')} style={styles.backItemImage} imageStyle={{ resizeMode: 'stretch' }}>
                        <Text style={{ textAlign: 'center', fontSize: 24, fontWeight: 'bold', marginTop: 32, color: '#292B2D' }}>Order Complete</Text>
                        <Text style={{ backgroundColor: '#F0F2F8', height: 1, marginLeft: 24, marginRight: 24, marginTop: 16 }}></Text>
                        <View style={{ flexDirection: 'row', marginLeft: 32, marginRight: 32, marginTop: 16 }}>
                            <Image source={route.params?.itemInfo.img_url} style={{ width: 64, height: 64 }}></Image>
                            <View>
                                <Text style={{ fontWeight: 'bold', marginLeft: 8, marginBottom: 4, color: '#292B2D', fontSize: 14 }}>{route.params?.itemInfo.name}</Text>
                                <Text style={{ fontWeight: '300', marginLeft: 8, marginBottom: 4, color: '#9896A9', fontSize: 14 }}>Small</Text>
                                <Text style={{ fontWeight: 'bold', marginLeft: 8, marginBottom: 4, color: '#292B2D', fontSize: 14 }}>{route.params?.itemInfo.price}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', marginLeft: 40, marginRight: 32, marginTop: 8 }}>
                            <Text style={{ fontWeight: 'bold', color: '#292B2D', width: 64, fontSize: 20, textAlignVertical: 'bottom' }}>Total:</Text>
                            <Text style={{ fontWeight: 'bold', color: '#745EFF', fontSize: 24 }}>$32.00</Text>
                        </View>
                        <Text style={{ backgroundColor: '#F0F2F8', height: 1, marginLeft: 24, marginRight: 24, marginTop: 16 }}></Text>
                        <Text style={{ fontWeight: 'bold', color: '#292B2D', fontSize: 14, marginLeft: 40, marginTop: 16 }}>Instructions</Text>
                        <Text style={{ color: '#292B2D', fontSize: 14, marginLeft: 40, marginTop: 16 }}>Show your ticket at Portal Y</Text>
                    </ImageBackground>
                </View>

                <TouchableOpacity
                    style={styles.normalButton}
                    onPress={() =>  navigation.popToTop()}
                >
                    <Text style={styles.buttonText}>Done</Text>
                </TouchableOpacity>
            </ImageBackground>
        </View>
    );
};

export default ShopDetailScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backImage: {
        width: '100%', height: '100%'
    },
    normalButton: {
        borderRadius: 6,
        tintColor: '#745EFF',
        backgroundColor: '#745EFF',
    
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
        fontWeight: '500'
        
      },
    itemContainer: {
        marginTop: 16,
        marginLeft: 8,
        marginRight: 8,
        height: 360,

        backgroundColor: '#00000000'
    },
    backItemImage: {
        width: '100%',
        height: '100%',
    }
});