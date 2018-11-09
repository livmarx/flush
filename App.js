/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import FetchLocation from './FetchLocation';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //   justifyContent: 'center',
    //   alignItems: 'center',
    //   backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  // map: {
  //   width: 200,
  //   height: 100,
  //   flex: 1,
  // },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

type Props = {};
export default class App extends Component<Props> {
  state = {
    userLocation: null,
  };

  getUserLocationHandler = () => {
    console.log('Button Pressed!');
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          userLocation: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          },
        });
        console.log(position);
      },
      err => console.log(err)
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome} />
        <Text style={styles.welcome} />
        <Text style={styles.welcome} />
        <Text style={styles.welcome}>FLU$H</Text>
        <FetchLocation onGetLocation={this.getUserLocationHandler} />
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <Text style={styles.welcome} />
        <Text style={styles.welcome} />
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{ width: 500, height: 500 }}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          region={this.state.userLocation}
        />
      </View>
    );
  }
}
