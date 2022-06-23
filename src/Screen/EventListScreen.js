/*eslint-disable*/
import React, {useState, useEffect} from 'react';
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
import {SafeAreaView} from 'react-native-safe-area-context';
import {WheelPicker} from 'react-native-wheel-picker-android';
import allActions from '../stores/actions';
import client from '../service/client';

const EventListScreen = ({navigation}) => {
  const [eventList, setEventList] = useState([]);
  const [selectedItem, setselectedItem] = useState(0);

  const {collections} = useSelector((state) => state.collection.collections);
  const newcollections = collections.filter((item) => item.metafields.filter((i) => i.value == 'event').length > 0);
  const dispatch = useDispatch();

  useEffect(async () => {
    const eventListArr = [];
    newcollections?.map((item) => {
      eventListArr.push(item.title);
    });
    setEventList(eventListArr);
  }, [collections]);

  const onItemSelected = selectedItem => {
    setselectedItem(selectedItem);
  };

  const goBack = () => {
    navigation.goBack();
  };

  const goToBandItemList = () => {
    dispatch(allActions.navigationAction.setEventTitle(newcollections[selectedItem].title))
    const collectionId = newcollections[selectedItem].id;
    client.collection.fetchWithProducts(collectionId).then((collection) => {
      dispatch(allActions.productAction.getConcertProducts(collection.products));
    });
    navigation.navigate({
      name: 'ConcertSelectScreen',
    });
  };
  
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../res/imgs/background.png')}
        style={styles.backImage}>
        <SafeAreaView style={{backgroundColor: '#ffffff50', flex: 1}}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Instant Karma™</Text>
          <TouchableOpacity style={styles.backBtnContainer} onPress={goBack}>
            <Image source={require('../res/imgs/back_black.png')} />
          </TouchableOpacity>
        </View>
        <View
          style={styles.titleWrapper}>
          <Image source={require('../res/imgs/music_black.png')}></Image>
          <Text
            style={styles.titleText}>
            Shop by Event
          </Text>
        </View>

        <View style={{marginTop: 48, alignItems: 'center'}}>
          {eventList.length > 0 && 
            <TouchableWithoutFeedback onPress={goToBandItemList} style={styles.storeItem}>
              <View style={{width: '90%', height: 150}}>
              <WheelPicker
                selectedItem={selectedItem}
                data={eventList}
                onItemSelected={onItemSelected}
                selectedItemTextSize={20}
                itemTextSize={18}
                style={{width: '100%', height: 150}}
                backgroundColor={'#00ffffff'}
              />
              </View>
            </TouchableWithoutFeedback>
          }
          <View
            style={{
              width: '90%',
              alignItems: 'flex-start',
              marginTop: 50, 
              paddingTop: 8,
              paddingBottom: 8,
              paddingStart: 16,
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 18, marginBottom: 4}}>
              {newcollections[selectedItem].title}
            </Text>
            <Text style={{marginBottom: 4}}>
              Position: {newcollections[selectedItem].description.split('+')[0]}
            </Text>
            <Text style={{marginBottom: 4}}>
              Time: {newcollections[selectedItem].description.split('+')[1]}
            </Text>
            {/* <Text>
              Full Event Name: {eventData[selectedItem].full_eventname}
            </Text>
            <TouchableOpacity onPress={goToBuyTicket}>
              <Text style={{fontSize: 14, color: '#000', marginTop: 8}}>
                Buy Ticket
              </Text>
            </TouchableOpacity> */}
          </View>
        </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

export default EventListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomContainer: {
    flex: 1,
  },
  backImage: {
    width: '100%',
    height: '100%',
  },
  buttonText: {
    fontSize: 17,
    color: 'black',
    textAlign: 'center',
    marginLeft: 8,
    fontWeight: 'bold',
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
  titleText: {
    color: '#000',
    fontSize: 28,
    marginLeft: 12,
    paddingVertical: 10
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
		backgroundColor: '#ffffff90',
  }
});
