import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    ImageBackground,
  } from 'react-native';

const DATA = [
  {
    title: 'First Item',
  },
  {
    title: 'Second Item',
  },
  {
    title: 'Third Item',
  },
  {
    title: 'Forth Item',
  },
  {
    title: 'Fith Item',
  },
];

export default class SkypilotScreen extends Component {
  render() {
    return (
        <View style={styles.container}>
            <ImageBackground
                style={styles.backImage}
                source={require('../res/imgs/background.png')}>
                <SafeAreaView style={{flex: 1}}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.headerText}>Instant Karma™</Text>
                    </View>

                    <View style={styles.bodyContainer}>
                    <FlatList
                        data={DATA}
                        style={{paddingLeft: 12, paddingRight: 12, paddingTop: 12,
                        }}
                        renderItem={({item}) => (
                            <View style={styles.item} flexDirection='row'>
                                <Image
                                    source={require('../res/imgs/artist.png')}
                                    style={styles.cartItemImage} />
                                <View style={{flex:1}}>
                                    <Text style={styles.itemTitleText}>Order #1019</Text>
                                    <Text style={styles.itemDateText}>SLC, UT 11/23/2021</Text>
                                    <Text style={styles.itemDetailText}>The Grimm Concert Audio Recording</Text>

                                    <View flexDirection='row' style={styles.itemButtonsView}>
                                        <TouchableOpacity style={styles.itemButton} onPress={() => {}}>
                                            <Image style={styles.itemButton}
                                                source={require('../res/imgs/ic_play_black.png')} />
                                        </TouchableOpacity>    
                                        <TouchableOpacity style={styles.itemButton} onPress={() => {}}>
                                            <Image style={styles.itemButton}
                                                source={require('../res/imgs/ic_download.png')} />
                                        </TouchableOpacity>   
                                    </View>
                                </View>
                            </View>
                        )}
                        keyExtractor={(item, index) => index}
                    />
                    </View>
                    
                </SafeAreaView>
            </ImageBackground>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    backImage: {
        height: '100%',
        backgroundColor: '#eeeeee',
    },
    headerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 80,
        marginBottom: 0,
    },
    headerText: {
        color: 'black',
        fontSize: 24,
        fontWeight: 'bold',
    },
    bodyContainer: {
        flex: 1,
        marginLeft: 24,
        marginRight: 24,
        marginBottom: 8,
        backgroundColor: '#ffffffa0', 
    },
    item: {
        width: '100%',
        height: 150,
        marginBottom: 24,
    },
    cartItemImage: {
        width: 150,
        height: 150,
        borderWidth: 0.5,
        borderColor: 'gray',
        resizeMode: 'contain',
        marginEnd: 16,
    },
    itemTitleText: {
        fontSize: 18,
        marginTop: 8,
        fontWeight: 'bold',
        color: '#555555'
    },
    itemDateText: {
        fontSize: 13,
        marginTop: 8,
        color: '#555555'
    },
    itemDetailText: {
        flex: 1,
        fontSize: 13,
        marginEnd: 16,
        color: '#555555'
    },
    itemButton: {
        width: 24,
        height: 24,
        marginRight: 12,
        marginTop: 4,
    },
    itemButtonsView: {
        flex: 1,
        marginLeft: 12,
    }
});