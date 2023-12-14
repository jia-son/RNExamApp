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

// 감소 타이머
// import React, {useEffect, useState} from 'react';
// import {
//   StyleSheet,
//   View,
//   Text,
//   TouchableOpacity,
//   TextInput,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Fontisto';

// export default function App(): React.JSX.Element {
//   const [seconds, setSeconds] = useState(0);
//   const [initialTime, setInitialTime] = useState(0); // 사용자에게 값 입력받기 위해 추가
//   const [isActive, setIsActive] = useState(false);

//   useEffect(() => {
//     var interval: any;

//     if (isActive) {
//       interval = setInterval(() => {
//         // setSeconds(prevSconds => prevSconds + 1);
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
//     // setSeconds(0);
//     setSeconds(initialTime * 60);
//     setIsActive(false);
//   };

//   const handleInitialTimeChange = (text: string) => {
//     setInitialTime(parseInt(text, 10));
//     // setSeconds(parseInt(text, 10));
//     setSeconds(parseInt(text, 10) * 60); // 분 단위로 변환
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
//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.inputStyle}
//           placeholderTextColor="white"
//           placeholder="시간 입력 (분 단위)"
//           keyboardType="numeric"
//           onChangeText={handleInitialTimeChange}
//           underlineColorAndroid="white"
//         />
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
//   inputContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   inputStyle: {
//     height: 50,
//     width: '30%',
//     borderColor: 'white',
//     borderWidth: 1,
//     color: 'white',
//     textAlign: 'center',
//     borderTopWidth: 0,
//     borderLeftWidth: 0,
//     borderRightWidth: 0,
//     borderBottomWidth: 0,
//     paddingBottom: 10,
//   },
// });

// 스크롤 감소 타이머
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';

export default function App(): React.JSX.Element {
  const [seconds, setSeconds] = useState(0);
  const [initialTime, setInitialTime] = useState(0); // 사용자에게 값 입력받기 위해 추가
  const [isActive, setIsActive] = useState(false);

  const minuteArray = Array.from({length: 60}, (_, index) => index + 1);
  const secondArray = Array.from({length: 60}, (_, index) => index + 1);

  useEffect(() => {
    var interval: any;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds !== 0) {
          setSeconds(prevSeconds => prevSeconds - 1); // 증가가 아닌 감소
        } else {
          handleReset();
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setSeconds(initialTime * 60);
    setIsActive(false);
  };

  const handleMinuteSelection = (selectedMinutes: number) => {
    setInitialTime(selectedMinutes);
    setSeconds(selectedMinutes * 60);
  };

  const formattedTime = () => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(
      remainingSeconds,
    ).padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.timeContainer}>
        <Text style={styles.timeStyle}>{formattedTime()}</Text>
      </View>
      {/* 스크롤뷰 들어갈 자리 */}
      <View style={styles.scrollContainer}>
        <ScrollView contentContainerStyle={styles.scrollContentContainer}>
          {minuteArray.map((minute, index) => (
            <Text style={styles.scrollMinutes} key={index}>
              {minute}
            </Text>
          ))}
        </ScrollView>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleToggle}>
          <Text style={styles.buttonStyle}>
            {isActive ? (
              <Icon name="pause" size={50} color={'white'} />
            ) : (
              <Icon name="play" size={50} color={'white'} />
            )}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleReset}>
          <Text style={styles.buttonStyle}>
            <Icon name="stop" size={50} color={'white'} />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#252321',
  },
  timeContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  timeStyle: {
    fontSize: 50,
    fontWeight: '400',
    color: 'white',
  },
  buttonStyle: {
    fontSize: 50,
    fontWeight: '400',
    color: 'white',
    paddingBottom: 100,
  },
  scrollMinutes: {
    color: 'white',
    fontSize: 25,
  },
  scrollContentContainer: {
    flexDirection: 'column',
  },
  scrollContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
