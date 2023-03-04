import React from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Keyboard} from 'react-native' 

export interface AddItemsProps{
    cancelTask: () => void;
}

export default function AddItems({cancelTask}: AddItemsProps) {

    function handleCancel(){
        cancelTask();
    }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Nova Tarefa</Text>

                <TextInput
                    placeholder='Digite sua tarefa'
                    style={styles.input}
                />

                <TouchableOpacity style={[styles.buttonContainer, styles.buttonAdd]} activeOpacity={0.8}>
                    <Text style={[styles.buttonText, {color: '#fff'}]}>Cadastrar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonContainer} activeOpacity={0.8} onPress={handleCancel}>
                    <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>
            </View>
        </View>
   </TouchableWithoutFeedback>
  );
}

const size = 44;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 34
    },
    content:{
        backgroundColor: '#fff',
        width: '100%',
        gap: 20,
        paddingHorizontal: 15,
        paddingVertical: 17,
        borderRadius: 8,
        elevation: 5,
    },
    title:{
        fontSize: 18
    },
    input:{
        width: '100%',
        height: size,
        backgroundColor: '#eeee',
        borderRadius: 8,
        paddingHorizontal: 8,
        fontSize: 18
    },
    buttonContainer:{
        width: '100%',
        height: size,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
    },
    buttonAdd:{
        backgroundColor: '#55B659',
    },
    buttonText:{
        color: '#55b659',
        fontWeight: 'bold',
        fontSize: 18
    }
})