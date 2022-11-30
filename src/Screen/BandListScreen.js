import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
	TouchableWithoutFeedback,
    ImageBackground,
    Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WheelPicker } from "react-native-wheel-picker-android";
import { wheelPickerData } from '../constants/londonrooftop';
import allActions from '../stores/actions';
import client from '../service/client';
const BandListScreen = ({ navigation }) => {
	const [selectedItem, setselectedItem] = useState(0);
	const dispatch = useDispatch();
	const onItemSelected = selectedItem => {
		setselectedItem(selectedItem)
	};
	const {collections} = useSelector((state) => state.collection.collections);
	const newcollections = collections.filter((item) => item.metafields.filter((i) => i.value == 'event').length > 0);
	const goBack = () => {
		navigation.goBack();
	}
	//
	const goToBandItemList = () => {
		const collectionId = newcollections[0].id;
		client.collection.fetchWithProducts(collectionId).then((collection) => {
			dispatch(allActions.productAction.getConcertProducts(collection.products));
		});
		dispatch(allActions.navigationAction.setArtistTitle(wheelPickerData[selectedItem]));
		navigation.navigate({name: 'BandItemList', params: {band: selectedItem, title: wheelPickerData[selectedItem]}});
	}
	
	return (
		<View style={styles.container}>
			<ImageBackground 
			source={require('../res/imgs/background.png')} 
			style={styles.backImage}>
				<SafeAreaView  style={{backgroundColor: '#ffffff50', flex: 1}}>
				<View style={styles.headerContainer}>
					<Text style={styles.headerText}>Instant Karma™</Text>
					<TouchableOpacity style={styles.backBtnContainer} onPress={goBack}>
						<Image source={require("../res/imgs/back_black.png")} />
					</TouchableOpacity>
				</View>
				<View style={styles.titleWrapper}>
					<Text style={styles.titleText}>Shop by Artist</Text>
				</View>
				<View style={styles.storeItemView}>
					<TouchableWithoutFeedback onPress={goToBandItemList} style={styles.storeItem}>
						<View style={{width: '90%', height: 400}}>
						<WheelPicker
							selectedItem={selectedItem}
							data={wheelPickerData}
							onItemSelected={onItemSelected}
							selectedItemTextSize={30}
							itemTextSize={28}
							style={{width: '90%', height: 400}}
						/>
						</View>
					</TouchableWithoutFeedback>
				</View>
				</SafeAreaView>
			</ImageBackground>
		</View>
	);
};

export default BandListScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	backImage: {
		width: '100%', 
		height: '100%'
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
		fontWeight: 'bold'
	},
	backBtnContainer: {
		position: 'absolute',
		top: 20,
		left: 20,
		paddingTop: 10,
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
		paddingVertical: 10
	},
	storeItemView: {
		marginTop: 48,
		alignItems: 'center'
	},
	storeItem: {
		width: '90%',
		height: 150
	}
});
