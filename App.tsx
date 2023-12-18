// // 스크롤 감소 타이머
// 노마드 코더의 Work hard travel hard app 따라가기
/*
1. TextInput 컴포넌트를 다루는 방법
2. 데이터를 유지시키는 방법 (아마도 핸드폰에 저장하기..?)
3. state 사용법
*/
import React, {useEffect, useState} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import {theme} from './colors';

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState('');
  const [toDos, setToDos] = useState<{
    [key: string]: {text: string; working: boolean};
  }>({}); // 타입 명시해주기
  const travel = () => setWorking(false);
  const work = () => setWorking(true);
  const onChangeText = (payload: string) => {
    setText(payload);
  };

  const addToDo = () => {
    if (text === '') {
      return;
    }
    // todo 저장
    const newToDos = Object.assign({}, toDos, {
      [Date.now()]: {text, working},
    });
    setToDos(newToDos);
    setText('');
  };

  useEffect(() => {
    console.log(toDos);
  }, [toDos]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'default'} />
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text
            style={{
              ...styles.btnText,
              color: working ? theme.white : theme.grey,
            }}>
            Work
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text
            style={{
              ...styles.btnText,
              color: !working ? theme.white : theme.grey,
            }}>
            Travel
          </Text>
        </TouchableOpacity>
      </View>
      <TextInput
        onSubmitEditing={addToDo}
        onChangeText={onChangeText}
        value={text}
        placeholderTextColor={theme.grey}
        placeholder={working ? 'Add a To Do' : 'Where do you want to go?'}
        style={styles.input}
      />
      <ScrollView>
        {Object.keys(toDos).map(key =>
          toDos[key].working === working ? (
            <View style={styles.toDo} key={key}>
              <Text style={styles.toDoText}>{toDos[key].text}</Text>
            </View>
          ) : null,
        )}
      </ScrollView>
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
    fontSize: 38,
    fontWeight: '600',
  },
  input: {
    backgroundColor: theme.white,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 20,
    fontSize: 15,
  },
  toDo: {
    backgroundColor: theme.grey,
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  toDoText: {
    color: theme.white,
    fontSize: 16,
    fontWeight: '500',
  },
});

// 여기는 여러가지 버튼 컴포넌트 사용 예시
{
  /* <TouchableHighlight
          underlayColor="red"
          activeOpacity={1}
          onPress={() => console.log('pressd')}>
          <Text style={styles.btnText}>Travel</Text>
        </TouchableHighlight> */
}
{
  /* <TouchableWithoutFeedback onPress={() => console.log('pressd')}>
          <Text style={styles.btnText}>Travel</Text>
        </TouchableWithoutFeedback> */
}
{
  /* <Pressable onPress={() => console.log('pressd')}>
          <Text style={styles.btnText}>Travel</Text>
        </Pressable> */
}
