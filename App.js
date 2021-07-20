import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, FlatList, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Header from './components/header';
import TodoItem from './components/todo';
import AddTodo from './components/addTodo';
import Sandbox from './components/sandbox';


export default function App() {
  const [todos, setTodos] = useState([
    { text: 'buy coffee', key: '1' },
    { text: 'create an app', key: '2' },
    { text: 'play on the switch', key: '3' }
  ]);
  const pressHandler= (key) => {
    setTodos((prevTodos) => {
        return prevTodos.filter(todo =>todo.key != key);
    });
  }
  const submitHandler = (text) => {
    if(text.length > 3){
      setTodos((prevTodos) => {
        return[
          {text: text, key: Math.random().toString()},
          ...prevTodos
        ]
      })
    }else{
      Alert.alert('OOPS!','Must be greater than 3',[
          {text:'Understood',onPress: () => console.log('Alert Canceled ')}
      ]);
    }
     
  }
  return (
  //  <Sandbox />
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
    }}>
        <View style={styles.container}>
          <Header />
            <View style={styles.content}>
            <AddTodo  submitHandler={submitHandler}/>
            <View style={styles.list}>
          <FlatList 
          data={todos}
          renderItem={({item}) => (
              <TodoItem item={item} pressHandler={pressHandler} />
          )}
          />
            </View>
            </View>
          <StatusBar style="auto" />
        </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 40,
    flex:1,
  },
  list: {
    marginTop: 20,
    flex: 1
  }
});
