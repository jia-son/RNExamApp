import React from 'react';
import {StyleSheet, View, Text, ScrollView, Dimensions} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function App(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>Seoul</Text>
      </View>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weather}>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>온도</Text>
          <Text style={styles.description}>날씨 상태</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>온도</Text>
          <Text style={styles.description}>날씨 상태</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>온도</Text>
          <Text style={styles.description}>날씨 상태</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>온도</Text>
          <Text style={styles.description}>날씨 상태</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDD224',
  },
  city: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cityName: {
    fontSize: 40,
    fontWeight: '600',
  },
  weather: {},
  day: {
    width: SCREEN_WIDTH,
    alignItems: 'center',
  },
  temp: {
    marginTop: 50,
    fontSize: 100,
  },
  description: {
    marginTop: -10,
    fontSize: 35,
  },
});
