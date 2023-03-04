import React from 'react';

import {View,Text,Image, StyleSheet, Platform} from 'react-native' 

export default function Header() {
  
  return (
   <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../../assets/logo.png')}
          style={styles.logo} 
          resizeMode={'cover'}
        />
        <Text style={styles.title}>Lista de Tarefas</Text>
      </View>
   </View>
  );
}

const styles = StyleSheet.create({
    container:{
        width: '100%',
        backgroundColor: '#55B659',
        paddingTop: Platform.select({ios: 30, android: 35, web: 0})
    },
    header:{
      paddingVertical: 8,
      paddingHorizontal: 15,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 20
    },
    logo:{
      width: 40,
      height: 40
    },
    title:{
        color: '#fff',
        fontSize: 22
    }
})