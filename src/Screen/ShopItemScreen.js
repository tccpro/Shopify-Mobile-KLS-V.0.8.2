
// Import React and Component
import React, { useState, useEffect, useDebugValue } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    ActivityIndicator,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    ImageBackground,
    Text,
    ScrollView,
    TouchableHighlight
} from 'react-native';
import { ButtonGroup, CheckBox } from 'react-native-elements';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import allActions from '../stores/actions';
import client from '../service/client';

const ShopItemScreen = ({ navigation, route }) => {

 
    const [addCartText, setAddCartText] = useState('Add To Cart');
    const [itemInfo, setItemInfo] = useState();
    const [selectedIndex, updateIndex] = useState(0);
    const [checked, updateChecked] = useState(true);
    const [checked1, updateChecked1] = useState(true);
    const buttons = ['S', 'M', 'L', 'XL', 'XXL'];
    
    const dispatch = useDispatch();
    const productItem = route.params.itemInfo;
    const checkoutId = useSelector((state) => state.checkout?.checkoutItem?.id);

    useEffect(async () => {
        setItemInfo(route.params.itemInfo);

        try {
            const value = await AsyncStorage.getItem('shop_cart_items')
            if (value !== null) {
                // value previously stored
                if(value.indexOf(route.params?.itemInfo.id) != -1){
                    setAddCartText('Added To Cart')
                }     
            }
        } catch (e) {
            // error reading value
        }  
     }, []);

    const goToShopDetailItem = () => {
        navigation.navigate({name:'ShopDetail', params: {itemInfo: itemInfo}})
    }

    const goBack = () => {
        navigation.replace('ShopItemList');
    }

    const addItemToCart = () => {
        if (productItem.availableForSale) {
            const variantId = productItem.variants[0].id;
            const lineItemsToAdd = [{variantId, quantity: 1}];
            return client.checkout.addLineItems(checkoutId, lineItemsToAdd).then(res => {
              dispatch(allActions.checkoutAction.addItemCart(res));
            });
          } else {
            Toast.show({
              type: 'error',
              text1: 'Instant Karma',
              text2: 'Sold out!',
            });
          }
    }

    return (
        <View style={styles.container}>
            <ScrollView style={{ width: '100%' }}>
                <ImageBackground style={styles.backImage}>

                    <Image style={styles.itemImage} source={{uri: productItem.images[0]?.src.split('?')[0]}}>
                    </Image>
                    <Text style={styles.textItemName}>{productItem.title}</Text>
                    <View style={styles.itemPriceContainer}>
                        <Text style={styles.itemPriceText}>${productItem.variants[0].price}</Text>
                        <Text style={styles.itemSeeText}>see sizing info</Text>
                    </View>
                    <TouchableOpacity style={styles.backButtonContainer} onPress={goBack}>
                        <Image source={require('../res/imgs/back_gray_ic.png')} style={styles.backButtonImage} />
                    </TouchableOpacity>
                    <ButtonGroup
                        onPress={selectedIndex => updateIndex(selectedIndex)}
                        selectedIndex={selectedIndex}
                        buttons={buttons}
                        containerStyle={{ height: 56, backgroundColor: '#F0F2F8', padding: 6, borderWidth: 0, borderRadius: 4, marginLeft: 20, marginRight: 20, marginTop: 20 }}
                        buttonStyle={{ backgroundColor: '#F0F2F8', borderWidth: 0 }}
                        selectedButtonStyle={{ backgroundColor: '#745EFF', borderRadius: 4, }}
                        innerBorderStyle={{ width: 0 }}
                        textStyle={{ fontSize: 15 }}

                    />
                    <CheckBox
                        checkedIcon={<Image source={require('../res/imgs/radio_selected.png')} />}
                        uncheckedIcon={<Image source={require('../res/imgs/radio_unselected.png')} />}
                        left
                        title='Pick up at the concert (skip the lines!)'
                        containerStyle={{ backgroundColor: '#00000000', borderWidth: 0, marginBottom: 0, marginLeft: 20, marginRight: 20 }}
                        textStyle={{ fontWeight: '300', fontSize: 15 }}
                        wrapperStyle={{ height: 30 }}
                        checked={checked}
                        onPress={() => updateChecked(!checked)}
                    />
                    <CheckBox
                        checkedIcon={<Image source={require('../res/imgs/radio_selected.png')} />}
                        uncheckedIcon={<Image source={require('../res/imgs/radio_unselected.png')} />}
                        left
                        title='Deliver'
                        containerStyle={{ backgroundColor: '#00000000', borderWidth: 0, marginTop: 0, marginLeft: 20, marginRight: 20, }}
                        textStyle={{ fontWeight: '300', fontSize: 15 }}
                        wrapperStyle={{ height: 30 }}
                        checked={!checked1}
                        onPress={() => updateChecked(!checked1)}
                    />

                    <TouchableHighlight onPress={addItemToCart} style={{ backgroundColor: '#745EFF', padding: 16, marginLeft: 20, marginRight: 20, marginBottom: 8, borderRadius: 6, }}>
                        <Text style={styles.buttonText}>{addCartText}</Text>
                    </TouchableHighlight>
                    {/* <TouchableOpacity onPress={goToShopDetailItem} style={{ marginLeft: 20, marginRight: 20, marginBottom: 8, borderRadius: 6, alignItems: 'center', backgroundColor: 'black' }}>
                        <Image source={require('../res/imgs/apple_pay.png')}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={goToShopDetailItem} style={{ marginLeft: 20, marginRight: 20, marginBottom: 8, marginBottom: 20, borderRadius: 6, alignItems: 'center', backgroundColor: '#ffc43a' }}>
                        <Image source={require('../res/imgs/paypal_pay.png')}></Image>
                    </TouchableOpacity> */}

                </ImageBackground>
            </ScrollView>
        </View>
    );
};

export default ShopItemScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backImage: {
        width: '100%', height: '100%', backgroundColor: 'white',
    },
    backButtonContainer: {
        position: 'absolute',
        top: 32,
        left: 16,
        width: 32,
        height: 32,
    },
    backButtonImage: {
        resizeMode: 'contain'
    },
    itemImage: {
        width: '100%',
        height: 300,
        resizeMode: 'contain',
        // backgroundColor: '#F0F2F8',
    },
    textItemName: {
        fontSize: 20,
        color: '#292B2D',
        fontWeight: '400',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 24,
        marginBottom: 8,

    },
    itemPriceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 20,
        marginRight: 20,
    },
    itemPriceText: {
        fontSize: 36,
        color: '#745EFF',
        fontWeight: '400',
    },
    itemSeeText: {
        fontSize: 14,
        color: '#745EFF',
        textAlignVertical: 'bottom',
        fontWeight: '400',
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 16,
        fontWeight: '500'
    }

});