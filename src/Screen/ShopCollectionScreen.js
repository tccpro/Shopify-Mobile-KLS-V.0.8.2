import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    ImageBackground,
    Text,
    FlatList,
    Modal
} from 'react-native';
import { Icon, Overlay } from 'react-native-elements'
import { SafeAreaView } from 'react-native-safe-area-context';
import allActions  from '../stores/actions';
import client from '../service/client';

const ShopCollectionScreen = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [shopCategoryDataSource, setShopCategoryDataSource] = useState([]);
    const [totalPrice, setTotalPrice] = useState("0")
    const [dataSource, setDataSource] = useState([]);
    const dispatch = useDispatch();
    const cartItem = useSelector((state) => state.checkout?.checkoutItem?.lineItems);
	const checkoutId = useSelector((state) => state.checkout?.checkoutItem?.id);
	const checkout = useSelector((state) => state.checkout?.checkoutItem);
    const {collections} = useSelector((state) => state.collection);

	useEffect(() => {
		setDataSource(cartItem)
	}, [cartItem])

	useEffect(() => {
		setShopCategoryDataSource(collections.filter((item) => item.image !== null))
	}, [collections])

    const goBack = () => {
      navigation.popToTop();
    }

    const goToItems = (item) => {
      let collectionId = item.id;
      client.collection.fetchWithProducts(collectionId).then((collection) => {
        dispatch(allActions.productAction.getSelectedProducts(collection.products));
        navigation.navigate('ShopItemList');
      });
    }

    const goToConcertCart = () => {
      navigation.navigate('ConcertCart')
    }

    const goPurchase = () => {
      navigation.navigate({name: 'WebView', params: {url: checkout.webUrl}});
    }

    const viewCart = () => {
		setModalVisible(true);
    }

    const removeItemFromCart = (item) => {
		const lineItemIdsToRemove = [
			item.id
		];
		client.checkout.removeLineItems(checkoutId, lineItemIdsToRemove).then((checkout) => {
		dispatch(allActions.checkoutAction.addItemCart(checkout));
		});
    }

    return (
      <View style={styles.container}>
        <ImageBackground source={require('../res/imgs/background.png')} style={styles.backImage}>
          <SafeAreaView>
		  <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Instant Karma™</Text>
            <TouchableOpacity style={styles.backBtnContainer} onPress={goBack}>
              <Image source={require("../res/imgs/back_black.png")} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.cartBtnContainer} onPress={goToConcertCart}>
              <ImageBackground style={styles.cartBtnBack} source={require("../res/imgs/cart_num_back_black.png")}>
                <Text style={styles.cartNumText}>{cartItem.length}</Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>
          <View style={styles.titleWrapper}>
              <Image source={require('../res/imgs/music_purple.png')}></Image>
              <Text style={styles.titleText}>Shop Merch</Text>
          </View>
          <FlatList
              data={shopCategoryDataSource}
              style={styles.listWrapper}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.listItemWrapper}
                  onPress={() => goToItems(item)}
                >
                  <Image
                    style={styles.imageThumbnail}
                    source={{uri: item.image?.src.split('?')[0]}}
                  />
                  <Text style={styles.listItemText}>{item.title}</Text>
                </TouchableOpacity>
              )}
              numColumns={2}
              keyExtractor={(item, index) => index}
          />
          <TouchableOpacity style={styles.normalButton} onPress={viewCart}>
            <Icon
              name='shopping-bag'
              iconStyle={{ color: 'white' }}
            />
            <Text style={styles.buttonText}>
              VIEW CART
            </Text>
            <Text style={styles.viewCartText}>{cartItem.length}</Text>
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              {modalVisible &&
              <TouchableOpacity
                style={styles.modalListWrapper}
                onPress={() => setModalVisible(!modalVisible)}
              />}
                  <View style={styles.modalView}>
                      <Text style={styles.modalText}>Merch Cart</Text>
                      <Text style={{ width: '100%', height: 0.5, backgroundColor: 'gray' }}></Text>
                      <FlatList
                        data={dataSource}
                        style={styles.cartListWrapper}
                        renderItem={({ item }) => (
                          <View style={styles.cartListItemWrapper}>
                            <View style={styles.cartItemView}>
                              <Text style={styles.cartItemNameText}>{item.title}</Text>
                              <Text style={styles.cartItemPriceText}>${item.variant.price}</Text>
                            </View>
                            <View style={styles.cartItemImageWrapper}>
                              <TouchableOpacity>
                                <Image
                                  style={styles.imageCartThumbnail}
                                  source={{uri: item.variant.image.src.split('?')[0]}}
                                />
                              </TouchableOpacity>
                              <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity style={styles.cartItemEditButton}>
                                  <Icon
                                    name='edit'
                                    iconStyle={{ color: '#745EFF' }}
                                  />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.cartItemRemoveButton} onPress={() => removeItemFromCart(item)}>
                                  <Icon
                                    name='remove'
                                    iconStyle={{ color: '#745EFF' }}
                                  />
                                </TouchableOpacity>
                              </View>
                            </View>
                          </View>
                        )}
                        ListFooterComponent={
                          <View style={{ margin: 80 }}>
                          </View>
                        }
                        numColumns={1}
                        keyExtractor={(item, index) => index}
                      />
                      <View style={{width: '100%'}}>
                        <View style={styles.totalWrapper}>
                          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Total:</Text>
                          <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#745EFF' }}>${checkout.paymentDue}</Text>
                        </View>
                        <TouchableOpacity style={styles.applePay} onPress={goPurchase}>
                          {/* <Image source={require('../res/imgs/apple_pay.png')}></Image> */}
                          <Text
                            style={styles.checkoutText}>
                            Check Out
                          </Text>
                        </TouchableOpacity>
                        {/* <TouchableOpacity style={styles.paypalPay} onPress={goPurchase}>
                          <Image source={require('../res/imgs/paypal_pay.png')}></Image>
                        </TouchableOpacity> */}
                      </View>
                  </View>
              </View>
          </Modal>
		  </SafeAreaView>
        </ImageBackground>
      </View>


    );
};

export default ShopCollectionScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	bottomContainer: {
		flex: 1,
	},
	backImage: {
		width: '100%',
		height: '100%'
	},
	normalButton: {
		backgroundColor: '#745EFF',
		padding: 12,
		borderRadius: 25,
		position: 'absolute',
		bottom: 24,
		left: 32,
		right: 32,
		flexDirection: 'row',
		alignItems: 'center',
		paddingLeft: 16,
		justifyContent: 'space-between',
	},
	buttonText: {
		fontSize: 17,
		color: '#FFFFFF',
		textAlign: 'center',
		marginLeft: 8,
		fontWeight: 'bold'
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
		height: '100%'
	},
	cartNumText: {
		textAlign: 'center',
		textAlignVertical: 'center',
		height: '100%',
		color: "white"
	},
	imageThumbnail: {
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		height: 156,
		resizeMode: 'stretch',
	},
	imageCartThumbnail: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 100,
		height: 100,
		resizeMode: 'contain',
	},
	modalView: {
		backgroundColor: "white",
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		padding: 8,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
		width: '96%',
		height: '90%'
	},
	centeredView: {
		flex: 1,
		justifyContent: "flex-end",
		alignItems: "center",
	},
	modalText: {
		fontSize: 32,
		color: '#000000',
		fontWeight: 'bold',
		marginTop: 8,
		marginBottom: 8,
	},
	titleWrapper: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},
	titleText: {
		color: '#745EFF',
		fontSize: 28,
		marginLeft: 12
	},
	listWrapper: {
		paddingLeft: 12,
		paddingRight: 12,
		paddingTop: 20,
    marginBottom: 80
	},
	listItemWrapper: {
		flex: 1,
		flexDirection: 'column',
		marginLeft: 16,
		marginRight: 16,
		marginTop: 8,
		marginBottom: 30,
		alignItems: 'center'
	},
	listItemText: {
		textAlign: 'center',
		width: '100%',
		fontSize: 17,
		fontWeight: 'bold',
		marginTop: 8,
		color: 'black'
	},
	viewCartText: {
		color: '#745EFF',
		borderRadius: 10,
		width: 20,
		height: 20,
		backgroundColor: 'white',
		textAlign: 'center',
		fontWeight: 'bold'
	},
	modalListWrapper: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		backgroundColor: '#000',
		opacity: .6 
	},
	cartListWrapper: {
		paddingLeft: 12,
		paddingRight: 12,
		paddingTop: 20,
		width: '100%'
	},
	cartListItemWrapper: {
		flex: 1,
		flexDirection: 'column',
		marginLeft: 8,
		marginRight: 8,
		marginTop: 8,
		marginBottom: 8,
		borderBottomColor: 'gray',
		borderBottomWidth: 0.5,
		padding: 4,
	},
	cartItemView: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 12
	},
	cartItemNameText: {
		fontSize: 17,
		fontWeight: 'bold',
		width: '80%'
	},
	cartItemPriceText: {
		fontWeight: 'bold',
		fontSize: 17,
		color: '#745EFF'
	},
	cartItemImageWrapper: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	cartItemEditButton: {
		borderRadius: 25,
		borderColor: '#745EFF',
		borderWidth: 1,
		padding: 4
	},
	cartItemRemoveButton: {
		borderRadius: 25,
		borderColor: '#745EFF',
		borderWidth: 1,
		padding: 4,
		marginLeft: 12
	},
	cartItemSizeText: {
		textAlign: 'left',
		width: '100%',
		fontSize: 14
	},
	totalWrapper: {
		flexDirection: 'row',
		backgroundColor: '#DDDDDD',
		justifyContent: 'space-between',
		padding: 16,
		borderRadius: 4
	},
	applePay: {
		marginTop: 8,
		marginBottom: 4,
		width:'100%',
		alignItems:'center',
		backgroundColor: 'black',
		borderRadius: 4
	},
	paypalPay: {
		marginTop: 8,
		marginBottom: 4,
		width:'100%',
		alignItems:'center',
		backgroundColor: '#ffc43a',
		borderRadius: 4
	},
	checkoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 4,
		padding: 18
  },
});
