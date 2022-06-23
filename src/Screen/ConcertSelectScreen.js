/* eslint-disable */
import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  Text,
  FlatList,
  Linking,
  Platform,
} from 'react-native';
import {
  Overlay,
  ButtonGroup,
  BottomSheet,
} from 'react-native-elements';
import Toast from 'react-native-toast-message';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ConcertCartScreen from './ConcertCartScreen';
import allActions  from '../stores/actions';
import client from '../service/client';

const ConcertSelectScreen = ({navigation, route}) => {
  const [dataSource, setDataSource] = useState([]);
  const [cartVariantSource, setCartVariantSource] = useState([]);
  const [variantOptionSource, setVariantOptionSource] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptionsIndexObj, setSelectedOptionsIndexObj] = useState(null);
  const [sliderVisible, setSliderVisible] = useState(false);
  const [flag, setFlag] = useState(false);

  const proudctObj = useSelector((state) => state.product);
  const checkout = useSelector((state) => state.checkout?.checkoutItem)
  const checkoutId = useSelector((state) => state.checkout?.checkoutItem?.id)
  const cartItem = useSelector((state) => state.checkout?.checkoutItem?.lineItems)
  const title = useSelector((state) => state.navigations.eventTitle)
  const dispatch = useDispatch();

  useEffect(async () => {
    setDataSource(proudctObj.products.filter(item => item.images.length > 0 ));
    setCartVariantSource(cartItem);
  }, []);

  useEffect(() => {
    setCartVariantSource(cartItem);
  }, [cartItem])

  const goBack = () => {
    navigation.goBack();
  };
  
  const goToConcertCart = () => {
    navigation.navigate({name: 'ConcertCart', params: {name: route.name}});
  };

  const addVariantToCart = product => {
    if (cartVariantSource.length > 15) {
      alert("Can't add concert item to cart anymore");
    } else {
      if (product.availableForSale) {
        setSelectedProduct(product);
        if (product.options.filter(option => option.name !== 'Title').length > 0) {
          setVariantOptionSource(product.options.filter(option => option.name !== 'Title'));
          let defaultOptionValues = {};
          let defaultIndexObj = {};
          product.options.forEach((selector) => {
            defaultOptionValues[selector.name] = selector.values[0].value;
            defaultIndexObj[selector.name] = 0;
          });
          setSelectedOption(defaultOptionValues);
          setSelectedOptionsIndexObj(defaultIndexObj);
          toggleOverlay();
        } else {
          const variantId = product.variants[0].id;
          const lineItemsToAdd = [{variantId, quantity: 1}];
          return client.checkout.addLineItems(checkoutId, lineItemsToAdd).then(res => {
            dispatch(allActions.checkoutAction.addItemCart(res));
            setVisible(false);
          });
        }
      } else {
        Toast.show({
          type: 'error',
          text1: 'Instant Karma',
          text2: 'Sold out!',
        });
      }
    }
  };

  const addToCart = () => {
    const selectedVariant = client.product.helpers.variantForOptions(selectedProduct, selectedOption);
    const variantId = selectedVariant.id;
    const lineItemsToAdd = [{variantId, quantity: 1}];
    
    return client.checkout.addLineItems(checkoutId, lineItemsToAdd).then(res => {
      dispatch(allActions.checkoutAction.addItemCart(res));
      setVisible(false);
    });
  }

  const removeVariantFromCart = (index, item) => {
    const lineItemIdsToRemove = [ item.id ];
    client.checkout.removeLineItems(checkoutId, lineItemIdsToRemove).then((checkout) => {
      dispatch(allActions.checkoutAction.addItemCart(checkout));
    });
  };

  const goCheckout = async () => {
    navigation.navigate({name: 'WebView', params: {url: checkout.webUrl}});
  };

  const toggleOverlay = () => {
    setVisible(true);
  };

  const closeOverlay = () => {
    setVisible(false);
  }

  const updateIndex = (selectedIndex, option) => {
    let selectedOptions = selectedOption;
    let selectedOptionsIndex = selectedOptionsIndexObj;
    selectedOptions[option.name] = option.values[selectedIndex].value
    selectedOptionsIndex[option.name] = selectedIndex;
    setSelectedOptionsIndexObj(selectedOptionsIndex);
    setFlag( prev=> !prev)
  }

  const convertVariant = (values) => {
    return values.map(item => item.value);
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.backImage}
        source={require('../res/imgs/background.png')}>
        <SafeAreaView>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Instant Karma™</Text>
          <TouchableOpacity style={styles.backBtnContainer} onPress={goBack}>
            <Image source={require('../res/imgs/back_black.png')} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cartBtnContainer}
            onPress={goToConcertCart}>
            <ImageBackground
              style={styles.cartBtnBack}
              source={require('../res/imgs/cart_num_back_black.png')}>
              <Text style={styles.cartNumText}>{cartItem.length}</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
        <View style={styles.titleWrapper}>
          <Text style={styles.titleText}>
            {title}
          </Text>
        </View>
        <FlatList
          data={dataSource}
          style={{paddingLeft: 12, paddingRight: 12, paddingTop: 20}}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.productWrapper}
              onPress={() => addVariantToCart(item)}>
              <Image style={styles.imageThumbnail} source={{uri: item.images[0]?.src.split('?')[0]}} />
              <Text style={styles.productTitle}>
                {item.title}
              </Text>
              <Text
                style={styles.productPrice}>
                ${item.variants[0].price}
              </Text>
            </TouchableOpacity>
          )}
          numColumns={2}
          keyExtractor={(item, index) => index}
          ListFooterComponent={<View style={{margin: 140}}></View>}
        />

        <View style={styles.cartContainer}>
          <FlatList
            data={cartVariantSource}
            style={styles.cartItemWrapper}
            renderItem={({item, index}) => (
              <TouchableOpacity
                style={styles.cartItem}
                onPress={() => removeVariantFromCart(index, item)}>
                <Image
                  source={{uri: item.variant.image.src.split('?')[0]}}
                  style={styles.cartItemImage} />
                <View style={styles.quantityWrapper}>
                  <Text style={styles.quantityText}>{item.quantity}</Text>
                </View>
                <Text style={styles.sizeText}>
                  { (item.variant.selectedOptions.find((item) => item.name === 'Size')?.value === 'Small' ||
                    item.variant.selectedOptions.find((item) => item.name === 'Size')?.value === 'Medium' ||
                    item.variant.selectedOptions.find((item) => item.name === 'Size')?.value === 'Large')
                    ? item.variant.selectedOptions.find((item) => item.name === 'Size')?.value.substr(0, 1)
                    : item.variant.selectedOptions.find((item) => item.name === 'Size')?.value.substr(0, 3)                  
                  }
                </Text>
              </TouchableOpacity>
            )}
            horizontal
            keyExtractor={(item, index) => index}
            ListFooterComponent={<View style={{margin: 100}}></View>}
          />
          <Text style={styles.tapItemText}>
            Tap the cart item to remove
          </Text>
          <Image
            source={require('../res/imgs/music_bar_black.png')}
            style={{width: '100%', marginTop: 12}}/>
          <TouchableOpacity
            // onPress={goCheckout}
            onPress={goToConcertCart}
            style={styles.checkoutButtonWrapper}>
            <Text style={{color: '#fff', fontSize: 16}}>Check out</Text>
          </TouchableOpacity>
          <BottomSheet modalProps={{}} isVisible={sliderVisible}>
            <ConcertCartScreen Close={() => setSliderVisible(false)} />
          </BottomSheet>
        </View>
        </SafeAreaView>
      </ImageBackground>

      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <TouchableOpacity
          onPress={closeOverlay}
          style={styles.closeButton}>
          <Ionicons
            name="ios-close-circle-outline"
            size={20}
          />
        </TouchableOpacity>
        <FlatList
          data={variantOptionSource}
          extraData={selectedOptionsIndexObj}
          style={styles.overlayWrapper}
          renderItem={({item, index}) => (
            <View>
              <Text>Select {item.name}</Text>
              <ButtonGroup
                onPress={(selectedIndex) => updateIndex(selectedIndex, item)}
                selectedIndex={selectedOptionsIndexObj[item.name]}
                buttons={convertVariant(item.values)}
                buttonStyle={{backgroundColor: '#F0F2F8', borderWidth: 0}}
                selectedButtonStyle={{backgroundColor: '#000', borderRadius: 4}}
                innerBorderStyle={{width: 0}}
                textStyle={{fontSize: 14}}
              />
            </View>
          )}
          keyExtractor={(item) => item.id}
          ListFooterComponent={
            <View style={{ marginTop: 10}}>
              <TouchableOpacity
                onPress={addToCart}
                style={styles.cartButtonWrapper}>
                <Text style={{color: '#fff', fontSize: 16}}>Add To Cart</Text>
              </TouchableOpacity>
            </View>
          }
        />
      </Overlay>
    </View>
  );
};

export default ConcertSelectScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
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
    top: Platform.OS === 'ios' ? 16:0,
    textAlign: 'center',
    textAlignVertical: 'center',
    height: '100%',
    color: '#FFF',
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 156,
    borderRadius: 2,
    resizeMode: 'contain',
  },
  cartContainer: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 170,
    height: 240,
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 3,
    backgroundColor: 'white',
  },
  cartItem: {
    flex: 1,
    margin: 4,
    width: 70,
    height: 100
  },
  cartItemImage: {
    width: '100%',
    height: 70,
    borderWidth: 0.5,
    borderColor: 'gray',
    resizeMode: 'contain',
  },
  sizeText: {
    position: 'absolute',
    top: 0,
    right: 3,
    fontSize: 12
  },
  quantityText: {
    fontSize: 12
  },
  quantityWrapper: {
    position: 'absolute',
    top: 2,
    left: 2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#a6a6a6',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  productWrapper: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 16,
    marginRight: 16,
    marginTop: 8,
    marginBottom: 8,
    alignItems: 'center',
  },
  productTitle: {
    textAlign: 'center',
    width: '100%',
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 8,
    backgroundColor: '#ffffff90',
  },
  productPrice: {
    textAlign: 'center',
    width: '100%',
    fontSize: 15,
    color: '#000',
    backgroundColor: '#ffffff90',
  },
  checkoutButtonWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    color: '#fff',
    alignItems: 'center',
    backgroundColor: '#000',
    height: 60,
  },
  cartItemWrapper: {
    paddingLeft: 10, 
    paddingRight: 10, 
    paddingTop: 10, 
    backgroundColor: '#FFF'
  },
  cartButtonWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    color: '#fff',
    alignItems: 'center',
    backgroundColor: '#000',
    height: 40
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff90',
  },
  titleText: {
    color: '#000',
    fontSize: 28,
    marginLeft: 12,
    paddingVertical: 10,
  },
  tapItemText: {
    color: '#000',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 12,
  },
  overlayWrapper: {
    height: 200,
    width: 330 ,
    flexGrow: 0
  },
  closeButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    zIndex: 10
  }
});
