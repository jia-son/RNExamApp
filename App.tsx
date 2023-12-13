import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import GetLocation from 'react-native-get-location';
import Geocoder from 'react-native-geocoding';
import Config from 'react-native-config';

const SCREEN_WIDTH = Dimensions.get('window').width;
const weatherApiKey = Config.WEATHER_API_KEY!;
Geocoder.init(Config.API_KEY as string);

export default function App(): React.JSX.Element {
  const [city, setCity] = useState('Loading...');
  const [days, setDays] = useState<
    {temp: any; dataTime: any; weather: any; description: any}[]
  >([]);
  const [loading, setLoading] = useState(true);

  const requestLocation = async () => {
    await GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
      rationale: {
        title: 'Location permission',
        message: 'The app needs the permission to request your location.',
        buttonPositive: 'Ok',
      },
    })
      .then(async funLocation => {
        const {latitude, longitude} = funLocation;

        await Geocoder.from([latitude, longitude])
          .then(async json => {
            const addressComponent = json.results[0].address_components.find(
              component => component.types.includes('locality'),
            )?.long_name;

            const foundCity: string = addressComponent!;
            setCity(foundCity);

            const lat = latitude as unknown as string;
            const lon = longitude as unknown as string;
            const baseUrl = Config.WEATHER_API_URL!.replace('{lat}', lat)
              .replace('{lon}', lon)
              .replace('{API key}', weatherApiKey);

            const response = await fetch(`${baseUrl}`);
            const weatherJson = await response.json();
            const weatherList = weatherJson.list;

            if (Array.isArray(weatherList)) {
              const daysArray = weatherList.map(day => ({
                temp: day.main.temp,
                dataTime: new Date(day.dt * 1000)
                  .toLocaleDateString()
                  .substring(0, 12),
                description: day.weather[0].description,
                weather: day.weather[0].main,
              }));

              setDays(daysArray);
            }
          })
          .catch(error => console.warn(error));
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
        if (code === 'UNAUTHORIZED') {
          setLoading(false);
        }
      });
  };

  useEffect(() => {
    requestLocation();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weather}>
        {days.length === 0 ? (
          <View style={styles.day}>
            <ActivityIndicator
              color={'white'}
              size={'large'}
              style={{marginTop: 10}}
            />
          </View>
        ) : (
          days.map((day, index) => (
            <View style={styles.day} key={index}>
              <Text style={styles.temp}>
                {parseFloat(day.temp).toFixed(1)}°C
              </Text>
              {/* <Text style={styles.description}>{day.dataTime}</Text> */}
              <Text style={styles.description}>{day.weather}</Text>
              <Text style={styles.tinyText}>{day.description}</Text>
            </View>
          ))
        )}
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
    fontSize: 110,
    fontWeight: '700',
  },
  description: {
    marginTop: -10,
    fontSize: 50,
  },
  tinyText: {
    fontSize: 20,
  },
});
