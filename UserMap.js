import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

const userMap = props => {
  let userLocationMarker = null;
  if (props.userLocation) {
    userLocationMarker = <MapView.Marker coordinate={props.userLocation} />;
  }
  const userMarkers = props.userPlaces.map(place => {
    return <MapView.Marker coordinate={place} key={place.id} />;
  });
  return (
    <View style={styles.mapContainer}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 40.74043,
          longitude: -73.9839,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        region={props.userLocation}
      >
        {userLocationMarker}
        {props.toiletLocations.map(location => {
          return <MapView.Marker coordinate={location} key={location.id} />;
        })}
        {userMarkers}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    width: '100%',
    height: 300,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default userMap;
