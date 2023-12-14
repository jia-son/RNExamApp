// import React, {useEffect, useState} from 'react';
// import {
//   StyleSheet,
//   View,
//   Text,
//   ScrollView,
//   Dimensions,
//   ActivityIndicator,
// } from 'react-native';
// import GetLocation from 'react-native-get-location';
// import Geocoder from 'react-native-geocoding';
// import Config from 'react-native-config';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// const SCREEN_WIDTH = Dimensions.get('window').width;
// const weatherApiKey = Config.WEATHER_API_KEY!;
// Geocoder.init(Config.API_KEY as string);

// const icons: any = {
//   Clouds: 'weather-cloudy',
//   Clear: 'weather-sunny',
//   Rain: 'weather-pouring',
//   Atmosphere: 'weather-windy-variant',
//   Snow: 'weather-snowy',
//   Drizzle: 'weather-rainy',
//   Thunderstorm: 'weather-lightning-rainy',
// };

// export default function App(): React.JSX.Element {
//   const [city, setCity] = useState('Loading...');
//   const [days, setDays] = useState<
//     {temp: any; dataTime: any; weather: any; description: any}[]
//   >([]);
//   const [loading, setLoading] = useState(true);

//   const requestLocation = async () => {
//     await GetLocation.getCurrentPosition({
//       enableHighAccuracy: true,
//       timeout: 60000,
//       rationale: {
//         title: 'Location permission',
//         message: 'The app needs the permission to request your location.',
//         buttonPositive: 'Ok',
//       },
//     })
//       .then(async funLocation => {
//         const {latitude, longitude} = funLocation;

//         await Geocoder.from([latitude, longitude])
//           .then(async json => {
//             const addressComponent = json.results[0].address_components.find(
//               component => component.types.includes('locality'),
//             )?.long_name;

//             const foundCity: string = addressComponent!;
//             setCity(foundCity);

//             const lat = latitude as unknown as string;
//             const lon = longitude as unknown as string;
//             const baseUrl = Config.WEATHER_API_URL!.replace('{lat}', lat)
//               .replace('{lon}', lon)
//               .replace('{API key}', weatherApiKey);

//             const response = await fetch(`${baseUrl}`);
//             const weatherJson = await response.json();
//             const weatherList = weatherJson.list;

//             const convertUnixTimestamp = (unixTimestamp: any) => {
//               return new Date(unixTimestamp * 1000).toLocaleString('ko-KR', {
//                 timeZone: 'Asia/Seoul',
//               });
//             };

//             // if (Array.isArray(weatherList)) {
//             //   const daysArray = weatherList.map(day => ({
//             //     temp: day.main.temp,
//             //     dataTime: new Date(day.dt * 1000)
//             //       .toLocaleDateString()
//             //       .substring(0, 12),
//             //     description: day.weather[0].description,
//             //     weather: day.weather[0].main,
//             //   }));
//             if (Array.isArray(weatherList)) {
//               const daysArray = weatherList.map(day => ({
//                 temp: day.main.temp,
//                 dataTime: convertUnixTimestamp(day.dt),
//                 description: day.weather[0].description,
//                 weather: day.weather[0].main,
//               }));

//               setDays(daysArray);
//             }
//           })
//           .catch(error => console.warn(error));
//       })
//       .catch(error => {
//         const {code, message} = error;
//         console.warn(code, message);
//         if (code === 'UNAUTHORIZED') {
//           setLoading(false);
//         }
//       });
//   };

//   useEffect(() => {
//     requestLocation();
//   }, []);
//   return (
//     <View style={styles.container}>
//       <View style={styles.city}>
//         <Text style={styles.cityName}>{city}</Text>
//       </View>
//       <ScrollView
//         horizontal
//         pagingEnabled
//         showsHorizontalScrollIndicator={false}
//         contentContainerStyle={styles.weather}>
//         {days.length === 0 ? (
//           <View style={styles.day}>
//             <ActivityIndicator
//               color={'white'}
//               size={'large'}
//               style={{marginTop: 10}}
//             />
//           </View>
//         ) : (
//           days.map((day, index) => (
//             <View style={styles.day} key={index}>
//               <Text>{day.dataTime}</Text>
//               <View style={styles.weatherIcon}>
//                 <Text style={styles.temp}>
//                   {parseFloat(day.temp).toFixed(1)}°C
//                 </Text>
//                 <Icon name={icons[day.weather]} size={50} color={'white'} />
//               </View>
//               <Text style={styles.description}>{day.weather}</Text>
//               <Text style={styles.tinyText}>{day.description}</Text>
//             </View>
//           ))
//         )}
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#DE7E24',
//   },
//   city: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   cityName: {
//     fontSize: 40,
//     fontWeight: '600',
//     color: 'white',
//   },
//   weather: {},
//   day: {
//     width: SCREEN_WIDTH,
//     alignItems: 'flex-start',
//     paddingHorizontal: 20,
//   },
//   temp: {
//     marginTop: 50,
//     fontSize: 80,
//     fontWeight: '500',
//     color: 'white',
//   },
//   description: {
//     marginTop: -10,
//     marginLeft: 10,
//     fontSize: 30,
//     color: 'white',
//   },
//   tinyText: {
//     fontSize: 20,
//     color: 'white',
//     marginLeft: 10,
//   },
//   weatherIcon: {
//     flexDirection: 'row',
//     alignItems: 'baseline',
//     justifyContent: 'space-between',
//     width: '100%',
//   },
// });

// // 스크롤 감소 타이머
// import React, {useEffect, useState} from 'react';
// import {
//   StyleSheet,
//   View,
//   Text,
//   TouchableOpacity,
//   ScrollView,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Fontisto';

// export default function App(): React.JSX.Element {
//   const [seconds, setSeconds] = useState(0);
//   const [initialTime, setInitialTime] = useState(0);
//   const [initialMTime, setInitialMTime] = useState(0);
//   const [initialSTime, setInitialSTime] = useState(0);
//   const [isActive, setIsActive] = useState(false);

//   const minuteArray = Array.from({length: 60}, (_, index) => index);
//   const secondArray = Array.from({length: 60}, (_, index) => index);

//   useEffect(() => {
//     var interval: any;

//     if (isActive) {
//       interval = setInterval(() => {
//         if (seconds !== 0) {
//           setSeconds(prevSeconds => prevSeconds - 1); // 증가가 아닌 감소
//         } else {
//           handleReset();
//         }
//       }, 1000);
//     } else {
//       clearInterval(interval);
//     }

//     return () => clearInterval(interval);
//   }, [isActive, seconds]);

//   const handleToggle = () => {
//     setIsActive(!isActive);
//   };

//   const handleReset = () => {
//     setSeconds(initialTime * 60);
//     setIsActive(false);
//   };

//   const handleMinuteSelection = (selectedMinutes: number) => {
//     setInitialMTime(selectedMinutes);
//     setSeconds(selectedMinutes * 60);
//   };

//   const handleSecondSelection = (selectedSeconds: number) => {
//     setInitialSTime(selectedSeconds);
//     setSeconds(seconds + selectedSeconds);
//   };

//   const formattedTime = () => {
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = seconds % 60;
//     return `${String(minutes).padStart(2, '0')}:${String(
//       remainingSeconds,
//     ).padStart(2, '0')}`;
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.timeContainer}>
//         <Text style={styles.timeStyle}>{formattedTime()}</Text>
//       </View>
//       <View style={styles.scrollContainer}>
//         <View style={styles.scrollContainerFirstChild}>
//           <ScrollView
//             pagingEnabled={true}
//             showsVerticalScrollIndicator={false}
//             contentContainerStyle={styles.scrollContentContainer}
//             indicatorStyle={'white'}>
//             {minuteArray.map((minute, index) => (
//               <TouchableOpacity
//                 style={styles.touchableOpacity}
//                 key={index}
//                 onPress={() => handleMinuteSelection(minute)}>
//                 <Text style={styles.scrollMinutes}>{minute}</Text>
//               </TouchableOpacity>
//             ))}
//           </ScrollView>
//           <ScrollView
//             pagingEnabled={true}
//             showsVerticalScrollIndicator={false}
//             contentContainerStyle={styles.scrollContentContainer}
//             indicatorStyle={'white'}>
//             {secondArray.map((second, index) => (
//               <TouchableOpacity
//                 style={styles.touchableOpacity}
//                 key={index}
//                 onPress={() => handleSecondSelection(second)}>
//                 <Text style={styles.scrollMinutes}>{second}</Text>
//               </TouchableOpacity>
//             ))}
//           </ScrollView>
//         </View>
//       </View>
//       <View style={styles.buttonContainer}>
//         <TouchableOpacity onPress={handleToggle}>
//           <Text style={styles.buttonStyle}>
//             {isActive ? (
//               <Icon name="pause" size={50} color={'white'} />
//             ) : (
//               <Icon name="play" size={50} color={'white'} />
//             )}
//           </Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={handleReset}>
//           <Text style={styles.buttonStyle}>
//             <Icon name="stop" size={50} color={'white'} />
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#252321',
//   },
//   timeContainer: {
//     flex: 2,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   buttonContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//   },
//   timeStyle: {
//     fontSize: 50,
//     fontWeight: '400',
//     color: 'white',
//   },
//   buttonStyle: {
//     fontSize: 50,
//     fontWeight: '400',
//     color: 'white',
//     paddingBottom: 100,
//   },
//   scrollMinutes: {
//     height: 45,
//     color: 'white',
//     fontSize: 30,
//     paddingHorizontal: 30,
//   },
//   scrollContentContainer: {
//     flexDirection: 'column',
//     alignItems: 'center',
//   },
//   scrollContainer: {
//     flex: 1,
//   },
//   scrollContainerFirstChild: {
//     flexDirection: 'row',
//     height: 45,
//   },
//   touchableOpacity: {
//     borderColor: 'white',
//     borderLeftWidth: 1,
//     borderRightWidth: 1,
//   },
// });

// 노마드 코더의 Work hard travel hard app 따라가기
/*
1. TextInput 컴포넌트를 다루는 방법
2. 데이터를 유지시키는 방법 (아마도 핸드폰에 저장하기..?)
3. state 사용법
*/
import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import {theme} from './colors';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle={'default'} />
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.btnText}>Work</Text>
        </TouchableOpacity>
        <TouchableHighlight
          underlayColor="#DDDDDD"
          onPress={() => console.log('pressd')}>
          <Text style={styles.btnText}>Travel</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 20,
  },
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 100,
  },
  btnText: {
    color: theme.grey,
    fontSize: 38,
    fontWeight: '600',
  },
});
