import React from 'react'; 
import { Task } from '../../../models/Task';

import {MaterialIcons} from '@expo/vector-icons';
import {View, Text, StyleSheet} from 'react-native';

import { formattedDate } from '../../../utils/formattedDate';

export interface ListItemsProps{
    task: Task
}

export default function ListItems({task}: ListItemsProps) {

    const stylesForItems = (props: any) => {
        return task.completed ? [props, styles.completed] : props 
    }

  return (
   <View style={styles.container}>
     <View style={styles.taskBox}>
        <MaterialIcons
            name={task.completed ? 'check-circle' : 'check-circle-outline'}
            size={25}
        />
        <Text style={stylesForItems(styles.description)}>{task.description}</Text>
     </View>

     <View style={styles.separator}/>

     <View style={styles.dateContainer}>
        <View style={styles.dateContent}>
            <Text style={stylesForItems(styles.dateTitle)}>Criado</Text>
            <Text style={stylesForItems(styles.date)}>{formattedDate(task.createdDate)}</Text>
        </View>

        {
            task.completed &&
            <View style={[styles.dateContent, {alignItems: 'flex-end'}]}>
                <Text style={stylesForItems(styles.dateTitle)}>Finalizado</Text>
                <Text style={stylesForItems(styles.date)}>{formattedDate(task.completedDate)}</Text>
            </View>
        }
     </View>
   </View>
  );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: "#fff",
        padding: 16
    },
    taskBox:{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14
    },
    description:{
        flex: 1,
        fontSize: 17
    },
    separator:{
        borderWidth: 0.8,
        borderColor: '#c9c9c9',
        marginVertical: 10
    },
    dateContainer:{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    dateContent:{
        flexDirection: 'column',
        gap: 7
    },
    dateTitle:{
        fontWeight: 'bold',
        fontSize:15
    },
    date:{

    },
    completed:{
        color: '#A8A8A8'
    }
});