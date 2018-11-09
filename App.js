/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import UserMap from './UserMap';
import { createStackNavigator } from 'react-navigation';

export default class App extends Component {
  state = {
    userLocation: null,
    // userPlaces: [],
    toiletLocations: [],
  };

  getToiletLocations = toilets => {
    const array = [];
    for (let toilet in toilets) {
      array.push(toilets[toilet]);
    }
    return array;
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
        fetch('https://global-catcher-221917.firebaseio.com/toilets.json')
          .then(res => {
            console.log('fetch succeeded', res);
            return res;
          })
          .then(res => {
            return res.json();
          })
          .then(res => {
            const toilets = res;
            let array = this.getToiletLocations(toilets);
            this.setState({ toiletLocations: array });
          })
          .catch(err => console.log(err));
        console.log(position);
      },
      err => console.log(err)
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>FLU$H</Text>
        <View style={{ marginBottom: 20 }} />
        <Button title="Get Location" onPress={this.getUserLocationHandler} />
        <UserMap
          userLocation={this.state.userLocation}
          toiletLocations={this.state.toiletLocations}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcome: {
    fontSize: 50,
    color: '#39CCCC',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    marginTop: 100,
  },
});
