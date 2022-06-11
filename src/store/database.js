import React, {Component} from 'react';
import {openDatabase, enablePromise, DEBUG} from 'react-native-sqlite-storage';
import {View} from 'native-base';
import {ToastAndroid} from 'react-native';

const database_name = 'ToDo.db';
const database_version = '1.0';
const database_displayname = 'ToDo Offline Database';
// const database_size = 200000;
class Database extends Component {
  constructor(props) {
    super(props);
    // DEBUG(true);
    // enablePromise(true);
    // openDatabase(
    //   database_name,
    //   database_version,
    //   database_displayname,
    // ).transaction(function(txn) {
    //   txn.executeSql(
    //     "SELECT name FROM sqlite_master WHERE type='table' AND name='todo'",
    //     [],
    //     function(tx, res) {
    //       console.log('Item: ', res.rows.length);
    //       if (res.rows.length === 0) {
    //         tx.executeSql('DROP TABLE IF EXISTS todo', []);
    //         tx.executeSql(
    //           'CREATE TABLE IF NOT EXISTS todo(todo_id INTEGER PRIMARY KEY AUTOINCREMENT, todo_title VARCHAR(50), todo_note VARCHAR(500))',
    //           [],
    //         );
    //       }
    //     },
    //   );
    // });
  }
  state = {};
  render() {
    return;
  }
}

export const selectAllTodos = db => {
  db.executeSql('select * from todo', [], res => {
    let tempArr = [];
    for (let i = 0; i < res.rows.length; i++) {
      tempArr.push(res.rows.item(i));
    }
    console.log('Todo array:', tempArr);
    return tempArr;
  });
};

export function createTodo(db, title, note) {
  db.executeSql(
    'INSERT INTO todo (todo_title, todo_note) VALUES (?,?)',
    [title, note],
    res => {
      console.log('Is row affected: ', res.rowsAffected);
      //   if (res.rowsAffected > 0) {
      //     ToastAndroid.show('Saved!');
      //   }
    },
  );
}

export function editTodo(db, updateTodo) {
  db.executeSql(
    'UPDATE todo set todo_title = ?, todo_note = ? where todo_id = ?',
    [this.state.todo_title, this.state.todo_note, this.state.todo_id],
    result => {
      console.log('Is row affected: ', result.rowsAffected);
    },
    error => {
      console.log('Error while inserting todo: ', error);
    },
  );
}

export function deleteTodo(db, id) {
  db.executeSql('Delete from todo where todo_id ?', [id], res => {
    console.log(res);
  });
}

export default Database;
