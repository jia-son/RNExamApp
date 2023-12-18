## 노마드 코더의 React Native 따라가기

- 본 강의는 expo를 사용하여 진행되나,  
   강의를 수강하는 본인은 **_react-native-cli를 사용_**했음을 알림

- **언제나 공식 문서는 빛과 소금이다.**  
   모르는 게 있고 헷갈리는 게 있다면 공식 문서부터 살펴보자.

  > <https://reactnative.dev/docs/getting-started>

- 더는 지원하지 않는 컴포넌트 등은 아래 사이트에서 패키지를 골라 다운로드해 쓰면 된다.
  > react native 공식 커뮤니티  
  > <https://reactnative.directory/>  
  > <br>
  > expo docs  
  > <https://docs.expo.dev/>

<br>

---

<br>

<details>
<summary>리액트 네이티브에 대하여</summary>

<br>

리액트와 리액트 네이티브는 사용하는 방식에서 닮은 점이 많기 때문에, 우선 그 차이점에 대해 확고히 해두는 것이 좋다.

<br>

**리액트 네이티브는 인터페이스**로, 개발자와 운영 체제 사이에 존재한다.  
만일 개발자가 리액트 네이티브를 활용해 코드를 작성하면 코드는 IOS 또는 JAVA 안드로이드 코드로 번역된다.

리액트 네이티브에는 브라우저가 존재하지 않기 때문에,  
만일 개발자가 버튼 컴포넌트를 만든다고 하면 리액트 네이티브는 IOS와 Android에 각각 버튼 생성을 요청하는 메세지를 보내게 된다.  
대신 bridge라는 게 존재한다.  
즉, 리액트 네이티브는 브릿지를 거쳐 사용자의 코드를 번역하는 번역기 역할을 한다.

<br>

이제 리액트 네이티브가 운영 체제와 어떻게 통신하는지를 좀 더 자세히 살펴보자.

<br>

![react native-운영체제 통신](./img/react_native_통신.png 'react native-운영체제 통신')

1. 위의 이미지에서 event는 사용자가 화면의 버튼을 누르는 것이라고 가정함
2. event는 네이티브 쪽(IOS, Android)에 기록됨.
3. 네이티브가 이벤트를 감지하면, 그에 관환 데이터를 수집하고 브릿지를 통해 메세지를 전달함. ex) 화면에 어느 곳에서 이벤트가 발생했는가?
4. 리액트 네이티브는 해당 정보를 바탕으로 json을 생성하여 자바스크립트로 메세지를 전달함
5. 자바스크립트. 즉, 개발자는 메세지를 받아 메소드를 실행하고 다시 네이티브로 메세지를 전달함

_추후 종이에 한 번 더 직접 그려보기_

<br>

**앱의 구조**

앱의 구조는 다음 그림과 같다.

![react native-앱 구조](./img/react_native_앱%20구조.png 'react native-앱 구조')

</details>

<br>

<details>
<summary>리액트 네이티브 시작하기</summary>

<br>

공식 사이트를 참고하여 진행.

- react-native-cli를 전역으로 설치했다가 에러 발생.  
   전역 설치한 것 삭제하고 재설치

- JDK 11 사용하다가 에러 발생.  
   공식에서 권장하는대로 JDK 17로 변경

- cmd에서 프로젝트 생성후 npx react-native run-android 명령어 실행 안됨.  
   공식에서 권장하는대로 npm start를 통해 메트로를 실행하여 해결

---

<br>

1. 프로젝트 생성하기

   - **_npx react-native@latest init [프로젝트명]_**

   이때, react native가 설치되어 있지 않을 경우 자동으로 설치하겠느냐는 문구가 뜸.

<br>

2. 에뮬레이터 실행
   - 안드로이드 스튜디오에서 미리 에뮬레이터 켜두기.  
     공식에서 권장하는 대로 안드로이드 티라미수(API 33) 사용.

<br>

3. 메트로 실행

   - 프로젝트 폴더 터미널에서  
     **_npm start_**  
     입력하여 메트로 실행.

   정상적으로 실행이 완료되면 IOS, Android 등 어느 환경으로 실행시킬지 선택지가 뜨기 때문에 개발자 환경에 따라 단축키 입력하기.

<br>

4. 환경 변수 지정하는 법

   - 프로젝트 폴더 터미널에서  
      **npm install react-native-config,**  
      **npm install react-native-dotenv,**  
      입력하여 라이브러리 다운로드

   - .env 파일 생성하여 환경 변수 추가

   - android > settings.gradle에 다음 내용 추가

   ```javascript
   include ':react-native-config'
   project(':react-native-config').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-config/android')
   ```

   - android > app > build.gradle에 다음 내용 추가

   ```javascript
   apply from: project(':react-native-config').projectDir.getPath() + "/dotenv.gradle"
   ```

   - 사용할 때에는 다음과 같이 사용

   ```javascript
   import Config from 'react-native-config';
   ```

---

위의 과정은 react native-cli 환경에서 프로젝트를 생성 및 실행하는 경우로, expo를 사용할 경우 다른 참고 자료를 통해 진행해야 한다.  
사용할 만한 자료는 하단의 참조 링크를 확인.

> 벨로그 자료  
> <https://velog.io/@holidenty/React-Native-React-Native-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EC%8B%9C%EC%9E%91%ED%95%98%EA%B8%B0>  
> <br>
> 노마드 코더 강의  
> <https://nomadcoders.co/react-native-for-beginners/lectures/3117>  
> <br>
> cli와 expo 차이점  
> <https://lasbe.tistory.com/171>

</details>

<br>

<details>
<summary><strong>(X) 사용 안함 </strong> expo 라이브러리 RN-cli에서 사용하기</summary>

<br>

**_이유 :_**  
~~추후 진행할 프로젝트를 위해 react native-cli 환경에서 강의를 따라가고 있으나,~~  
~~강의 자체는 expo로 진행이 되고 있어 자연스럽게 expo 라이브러리를 활용하고 있는 상태.~~  
~~강의를 좀 더 수월하게 따라가기 위해 expo 라이브러리를 가져와 사용하는 방법을 찾게 되었다.~~

~~아래의 참조 링크를 확인하자.~~

> ~~<https://adjh54.tistory.com/41>~~

=> 충돌이 심하게 나서 리액트 네이티브 커뮤니티 라이브러리 사용하기로 함

</details>

<br>

<details>
<summary>리액트 네이티브 룰 알아보기</summary>

<br>

- 리액트 네이티브는 웹이 아니기 때문에 HTML을 사용할 수 없다.  
   _ex) div..._  
   대신 View라는 게 있는데, 이건 컨테이너이고 대부분은 View를 사용하게 된다.  
   그리고 이 View는 항상 import해줘야 한다. (react-native에서 가져올 수 있다!)

- react native에 있는 모든 text는 text component에 들어가야 한다.  
   : 위와 마찬가지 이유로 span이나 p, h1, h2...가 없기 때문

- react native에서는 일부 style을 사용할 수 없다.  
   _ex) border..._  
   그리고
  ```javascript
  // 쉼표는 꼭 포함해주기. 빼니까 오류 떴다.
  const styles = StyleSheet.create({
     변수명 : {
        스타일 지정,
     },
  });
  ```
  StyleSheet.create({}) 라는 기능이 있는데,  
  개인적으로 스타일 시트를 분리할 수 있어서 좋아보인다.

<br>

🌿 추가적으로 StatusBar는 화면 상의 시간, 와이파이, 배터리 등을 나타내는 부분인데,  
이 컴포넌트는 상태바와 소통할 수 있는 방법이 되며 우리가 사용자에게 띄우고자 하는 화면 중간에 이 코드를 넣는다 하여 화면에 상태바가 랜더링되지는 않는다.  
예시는 다음과 같다.

```javascript
export default function App(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hellooooooooooooo!!</Text>
      <StatusBar barStyle={'default'} />
    </View>
  );
}
```

</details>

<br>

<details>
<summary>StatusBar 컴포넌트 알아보기</summary>

<br>

expo에서 imort하는 StatusBar가 있고, react native에서 import하는 StatusBar 컴포넌트가 있다.  
두 가지는 이름이 동일한데 왜 한 곳에서 가져오지 않고 나뉘어져 있는 걸까?

그리고 왜 RN에는 Navigation이 없는 걸까?

<br>

공식 사이트를 들어가보면 아주 예전 버전에서는 보다 더 많은 컴포넌트를 지원하고 있었다.  
그러나 사용 가능한 컴포넌트를 전부 지원하는 건 유지 관리와 업데이트가 어렵다는 것을 깨닫게 되었고, 그 이후부터는 컴포넌트와 API를 간략화하기 시작했다.

대신, 이렇듯 간략화되어 더는 사용할 수 없는 컴포넌트에 대해서는 community packages중에서 골라 직접 다운로드해 사용하는 것으로 권장 사항을 변경하게 되었다.  
_(이것 또한 확장이라 볼 수 있을까?)_

<br>

좌우지간에 **React Native Directory**를 방문해보면 해당 커뮤니티에 여러 패키지가 업로드되어 있는 것을 볼 수 있다.

> <https://reactnative.directory/>

커뮤니티를 활용하는 것은 어떤 점에서 이로울까?  
그건 바로 옵션의 다양성에 있다.

기존에는 공식에서 제공해주는 것만 사용해야 했다면, 이제는 사용자들이 직접 옵션을 추가하고 좀 더 사용하기 간편하게 만든 패키지가 여럿 있기 때문에 자신에게 더 필요한 것을 골라 이용하면 된다는 장점이 생겼다고 볼 수 있다.

고르는 건 신중하게 하자.

그 외에 react native가 제공하고 있지도 않고, 커뮤니티에서도 찾기 힘든 부분이 있다면 expo를 사용하면 된다.  
그들은 독자적으로 컴포넌트와 api를 개발하고 있기 때문에 사용하기 편한 여러 기능들을 찾아볼 수 있다.  
심지어 무료!

<br>

자, 그럼 이제 다시 첫 의문으로 돌아가보자.

**_expo에서 imort하는 StatusBar가 있고, react native에서 import하는 StatusBar 컴포넌트가 있다.  
두 가지는 이름이 동일한데 왜 한 곳에서 가져오지 않고 나뉘어져 있는 걸까?_**

그 이유는 expo가 react native의 일부 컴포넌트와 api를 복제하고 개선했기 때문이다.  
따라서 두 곳에서 제공하는 StatusBar는 기본적으로 동일하나, api에 따라 약간의 차이가 발생함으로 본인이 알아서 필요에 따라 골라 쓰면 되겠다!

</details>

<br>

<details>
<summary>강의 따라가며 쫌쫌따리 정리</summary>

<br>

1. 기본적으로 모든 View 컴포넌트는 Flex Container이다.
   - 모바일에서 Flex Direction의 기본값은 Column이다.
   - 대부분의 경우 모바일 환경에서 개발자는 너비와 높이에 기반해 레이아웃을 만들지 않는다. Flex로 조절한다. (이건 플러터에서 해봤던 개념이다!)

<br>

2. 리액트 네이티브에서는 다양한 색상을 지원하기 위해 CSS에서 사용했던 색상의 이름이나, HEX 코드, 또는 RGB 값을 사용할 수 있다.  
   개인적으로는 HEX 코드가 더 편한 것 같다.

<br>

3. 리액트 네이티브에서는 웹처럼 자동 스크롤을 지원하지 않는다. 모든 것이 component로 되어 있기 떄문이다. (이것도 플러터에서 익혔던 개념이다.)
   - 스크롤을 사용하고 싶을 때에는?  
      ScrollView라는 컴포넌트를 활용하자.
   - 스크롤뷰 컴포넌트에서는 기본적으로 활용하는 style이 먹히지 않는다. 사용할 거라면 Container Style을 사용할 것.
     - 또한, 스크롤뷰는 Flex 요소를 필요로 하지 않는다.

</details>

<!-- <details>
<summary>리액트 네이티브 시작하기</summary>

<br>

</details> -->

---

<details>
<summary>날씨 체크 앱 전체 코드</summary>

<br>

```javascript
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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SCREEN_WIDTH = Dimensions.get('window').width;
const weatherApiKey = Config.WEATHER_API_KEY!;
Geocoder.init(Config.API_KEY as string);

const icons: any = {
  Clouds: 'weather-cloudy',
  Clear: 'weather-sunny',
  Rain: 'weather-pouring',
  Atmosphere: 'weather-windy-variant',
  Snow: 'weather-snowy',
  Drizzle: 'weather-rainy',
  Thunderstorm: 'weather-lightning-rainy',
};

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

            const convertUnixTimestamp = (unixTimestamp: any) => {
              return new Date(unixTimestamp * 1000).toLocaleString('ko-KR', {
                timeZone: 'Asia/Seoul',
              });
            };

            // if (Array.isArray(weatherList)) {
            //   const daysArray = weatherList.map(day => ({
            //     temp: day.main.temp,
            //     dataTime: new Date(day.dt * 1000)
            //       .toLocaleDateString()
            //       .substring(0, 12),
            //     description: day.weather[0].description,
            //     weather: day.weather[0].main,
            //   }));
            if (Array.isArray(weatherList)) {
              const daysArray = weatherList.map(day => ({
                temp: day.main.temp,
                dataTime: convertUnixTimestamp(day.dt),
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
              <Text>{day.dataTime}</Text>
              <View style={styles.weatherIcon}>
                <Text style={styles.temp}>
                  {parseFloat(day.temp).toFixed(1)}°C
                </Text>
                <Icon name={icons[day.weather]} size={50} color={'white'} />
              </View>
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
    backgroundColor: '#DE7E24',
  },
  city: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cityName: {
    fontSize: 40,
    fontWeight: '600',
    color: 'white',
  },
  weather: {},
  day: {
    width: SCREEN_WIDTH,
    alignItems: 'flex-start',
    paddingHorizontal: 20,
  },
  temp: {
    marginTop: 50,
    fontSize: 80,
    fontWeight: '500',
    color: 'white',
  },
  description: {
    marginTop: -10,
    marginLeft: 10,
    fontSize: 30,
    color: 'white',
  },
  tinyText: {
    fontSize: 20,
    color: 'white',
    marginLeft: 10,
  },
  weatherIcon: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    width: '100%',
  },
});
```

</details>

<details>
<summary>감소 타이머 전체 코드</summary>

스크롤 타입으로 시간 선택하는 타이머

<br>

```javascript
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
  const [initialTime, setInitialTime] = useState(0);
  const [initialMTime, setInitialMTime] = useState(0);
  const [initialSTime, setInitialSTime] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const minuteArray = Array.from({length: 60}, (_, index) => index);
  const secondArray = Array.from({length: 60}, (_, index) => index);

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
    setInitialMTime(selectedMinutes);
    setSeconds(selectedMinutes * 60);
  };

  const handleSecondSelection = (selectedSeconds: number) => {
    setInitialSTime(selectedSeconds);
    setSeconds(seconds + selectedSeconds);
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
      <View style={styles.scrollContainer}>
        <View style={styles.scrollContainerFirstChild}>
          <ScrollView
            pagingEnabled={true}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContentContainer}
            indicatorStyle={'white'}>
            {minuteArray.map((minute, index) => (
              <TouchableOpacity
                style={styles.touchableOpacity}
                key={index}
                onPress={() => handleMinuteSelection(minute)}>
                <Text style={styles.scrollMinutes}>{minute}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <ScrollView
            pagingEnabled={true}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContentContainer}
            indicatorStyle={'white'}>
            {secondArray.map((second, index) => (
              <TouchableOpacity
                style={styles.touchableOpacity}
                key={index}
                onPress={() => handleSecondSelection(second)}>
                <Text style={styles.scrollMinutes}>{second}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
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
    height: 45,
    color: 'white',
    fontSize: 30,
    paddingHorizontal: 30,
  },
  scrollContentContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContainerFirstChild: {
    flexDirection: 'row',
    height: 45,
  },
  touchableOpacity: {
    borderColor: 'white',
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },
});
```

</details>
