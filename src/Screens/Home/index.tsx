import React, {useState, useEffect} from 'react';
import { Task } from '../../models/Task';

import {MaterialIcons} from '@expo/vector-icons';
import {View, FlatList, StyleSheet, TouchableOpacity, Modal} from 'react-native';

import Header from '../../components/Header';
import ListItems from './ListItems';
import AddItems from './AddItems';

import {dateToDatabaseString, stringToDate} from '../../utils/formattedDate';

import { openDataBase } from '../../services/db';

const db = openDataBase();

function useForceUpdate() {
  const [value, setValue] = useState(0);
  return [() => setValue(value + 1), value];
}


export default function Home() {
  const forceUpdate = useForceUpdate();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  function getItems(){
    db.transaction((tx) => {
      tx.executeSql("select * from tasks where completed = 0 ", [], (_, { rows }) =>{
        const notCompletedTasks =  rows._array.map((item) => new Task(item.id, item.completed === 1, item.description, stringToDate(item.created_date), item.completed_date ? stringToDate(item.completed_date) : undefined));

        tx.executeSql("select * from tasks where completed = 1 order by completed_date desc ", [], (_, { rows }) =>{
          const completedTasks =  rows._array.map((item) => new Task(item.id, item.completed === 1, item.description, stringToDate(item.created_date), item.completed_date ? stringToDate(item.completed_date) : undefined));

          setTasks(() => [...notCompletedTasks, ...completedTasks])
        });
      });
    })
  }

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(`
        create table if not exists tasks (
          id integer primary key not null, 
          completed int not null, 
          description text not null,
          created_date text not null,
          completed_date text
        );
      `, [],
      (_, result) => {
        console.log('RESULT ADD '+JSON.stringify(result));
        getItems();
      },
      (_,error) => {
        console.log('ERROR ADD '+JSON.stringify(error));
        return false
      });
    });
  }, []);

  function addItem(task: Task){
    db.transaction((tx) => {
      tx.executeSql(`
          insert into tasks (completed, description, created_date)
          values(0, ?, ?)
        `, [task.description, dateToDatabaseString(new Date())],
        (_, result) => {
          console.log('RESULT ADD '+JSON.stringify(result));
        },
        (_,error) => {
          console.log('ERROR ADD '+JSON.stringify(error));
          return false
        },
      ),
      null,
      forceUpdate;
      getItems();
    });
  }

  function updateItem(task: Task){
    const updatedCompleted = task.completed ? 0 : 1;

    db.transaction((tx) => {
      tx.executeSql(`
        update tasks set completed = ?, completed_date = ?
        where id = ?
       `, 
        [updatedCompleted, dateToDatabaseString(new Date()), task.id || 0],
        (_, result) => {
          console.log('RESULT UPDATED '+JSON.stringify(result));
        },
        (_,error) => {
          console.log('ERROR UPDATED '+JSON.stringify(error));
          return false
        }
      ),
      getItems()
    })
  }

  return (
   <View style={styles.container}>
      <Header/>

      <FlatList
        data={tasks}
        ItemSeparatorComponent={() => <View style={styles.separator}/>}
        keyExtractor={(item) => String(item.id)}
        renderItem={({item}) => <ListItems task={item} updateItem={updateItem}/>}
      />

      <TouchableOpacity style={styles.fab} activeOpacity={0.8} onPress={() => setModalVisible(true)} >
        <MaterialIcons
          name={'add'}
          size={40}
          color='#fff'
        />
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType={"slide"} transparent statusBarTranslucent={true}>
        <AddItems
          closeModal={() => setModalVisible(false)}
          addTask={addItem}
        />
      </Modal>
   </View>
  );
}

const size = 65;

const styles = StyleSheet.create({
  container:{
    flex: 1
  },
  separator:{
    width: '100%',
    height: 1,
    backgroundColor: '#000'
  },
  fab:{
    backgroundColor: '#55B659',
    width: size,
    height: size,
    position: 'absolute',
    right: 16,
    bottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: (size/2),
    elevation: 5
  }
})