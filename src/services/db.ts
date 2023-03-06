import {Platform} from 'react-native';
import * as SQLite from 'expo-sqlite';

export function openDataBase(): SQLite.WebSQLDatabase{
  if (Platform.OS === "web") {
    // @ts-ignore
    return {
      transaction: () => {
        return {
          executeSql: () => {},
        };
      },
    };
  }
  else{
    return SQLite.openDatabase("tasks.db", "1");
  }
}
