/*
노마드 코더의 Work hard travel hard app 따라가기
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
  Alert,
} from 'react-native';
import {theme} from './colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';

const STORAGE_KEY = '@toDos';

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState('');
  const [toDos, setToDos] = useState<{
    [key: string]: {text: string; working: boolean; done: boolean};
  }>({});

  const [isModal, setIsModal] = useState(false);
  const [updateText, setUpdateText] = useState('');
  const [selectKey, setSelectKey] = useState('');

  useEffect(() => {
    loadToDos();
  }, []);

  const travel = () => setWorking(false);
  const work = () => setWorking(true);
  const onChangeText = (payload: string) => {
    setText(payload);
  };

  const saveToDos = async (toSave: any) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    } catch (e) {
      console.log(e);
    }
  };

  const loadToDos = async () => {
    try {
      const storeGet = await AsyncStorage.getItem(STORAGE_KEY);
      setToDos(JSON.parse(storeGet ?? '[]'));
    } catch (e) {
      console.log(e);
    }
  };

  const toggleModal = () => {
    setIsModal(!isModal);
  };

  const updateToDo = (key: string) => {
    setSelectKey(key);
    toggleModal();
  };

  const handleUpdate = () => {
    const newToDos = {
      ...toDos,
      [selectKey]: {...toDos[selectKey], text: updateText},
    };

    setToDos(newToDos);
    saveToDos(newToDos);
    toggleModal();
  };

  const deleteToDo = (key: string) => {
    Alert.alert('Delete To Do', 'Are you sure?', [
      {text: 'Cancel'},
      {
        text: "I'm sure",
        onPress: () => {
          const newToDos = {...toDos};
          delete newToDos[key];
          setToDos(newToDos);
          saveToDos(newToDos);
        },
      },
    ]);
  };

  const addToDo = async () => {
    if (text === '') {
      return;
    }
    const newToDos = Object.assign({}, toDos, {
      [Date.now()]: {text, working, done: false},
    });
    setToDos(newToDos);
    await saveToDos(newToDos);
    setText('');
  };

  const changeCheckBox = (key: string) => {
    const newToDos = {...toDos};
    newToDos[key].done = !newToDos[key].done;
    setToDos(newToDos);
    saveToDos(newToDos);
  };

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
              <View style={styles.toDoBoxAndToDo}>
                {toDos[key].done === false ? (
                  <TouchableOpacity onPress={() => changeCheckBox(key)}>
                    <Icon
                      name="checkbox-blank-outline"
                      size={20}
                      color={theme.white}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={() => changeCheckBox(key)}>
                    <Icon
                      name="checkbox-marked-outline"
                      size={20}
                      color={theme.white}
                    />
                  </TouchableOpacity>
                )}
                <Text style={styles.toDoText}>{toDos[key].text}</Text>
              </View>
              <View style={styles.toDoUpdateBtnAndtrashBtn}>
                <TouchableOpacity onPress={() => updateToDo(key)}>
                  <Icon
                    name="lead-pencil"
                    size={20}
                    color={theme.white}
                    style={styles.toDoUpdateBtn}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteToDo(key)}>
                  <Icon
                    name="trash-can-outline"
                    size={20}
                    color={theme.white}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ) : null,
        )}
      </ScrollView>
      {/*모달창*/}
      <Modal isVisible={isModal} onBackdropPress={toggleModal}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Edit To Do</Text>
          <TextInput
            style={styles.modalInput}
            onChangeText={text => setUpdateText(text)}
            value={updateText}
          />
          <TouchableOpacity onPress={handleUpdate}>
            <Text>Update</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    paddingLeft: 15,
  },
  toDoBoxAndToDo: {
    flexDirection: 'row',
  },
  toDoUpdateBtnAndtrashBtn: {
    flexDirection: 'row',
  },
  toDoUpdateBtn: {
    paddingRight: 10,
  },
  modalContent: {
    backgroundColor: theme.white,
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  modalInput: {
    height: 70,
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.grey,
  },
});
