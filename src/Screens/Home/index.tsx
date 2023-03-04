import React, {useState} from 'react';
import { Task } from '../../models/Task';

import {MaterialIcons} from '@expo/vector-icons';
import {View, FlatList, StyleSheet, TouchableOpacity, Modal, Text} from 'react-native';

import Header from '../../components/Header';
import ListItems from './ListItems';
import AddItems from './AddItems';

export default function Home() {

  const tasks: Task[] = [
    {id: 1, completed: false, description: 'Tarefa 1', createdDate: new Date()},
    {id: 2, completed: true, description: 'Tarefa 2', createdDate: new Date(), completedDate: new Date()},
    {id: 3, completed: false, description: 'Tarefa 3', createdDate: new Date()},
    {id: 4, completed: true, description: 'Tarefa 4', createdDate: new Date(), completedDate: new Date()},
  ];
  const [modalVisible, setModalVisible] = useState(false);

  return (
   <View style={styles.container}>
      <Header/>

      <FlatList
        data={tasks}
        ItemSeparatorComponent={() => <View style={styles.separator}/>}
        keyExtractor={(item) => String(item.id)}
        renderItem={({item}) => <ListItems task={item}/>}
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
          cancelTask={() => setModalVisible(false)}
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