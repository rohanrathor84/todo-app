import React, {Component} from 'react';
// import {Card} from 'native-base';
import {Icon} from 'native-base';
import LottieView from 'lottie-react-native';
import {FlatList} from 'react-native-gesture-handler';
import {
  ToastAndroid,
  TouchableOpacity,
  BackHandler,
  Alert,
  StyleSheet,
  View,
  Text,
  Dimensions,
} from 'react-native';
import {openDatabase, DEBUG} from 'react-native-sqlite-storage';
import CustomHeader from '../reusableComponent/customHeader';
import CustomFab from '../reusableComponent/customFab';
import AppRoutes from '../../../appRoutes';
// import AsyncStorage from '@react-native-community/async-storage';
// import {selectAllTodos} from '../../store/database';
const screenWidth = Dimensions.get('screen').width;

const database_name = 'ToDo.db';
const database_version = '1.0';
const database_displayname = 'ToDo Offline Database';

const db = openDatabase(database_name, database_version, database_displayname);

export default class Dashboard extends Component {
  _focusDoneSubscribe; //declaring variable that will be listener for the back button when in focus
  _blurGoingSubscribe; //declaring variable that will be listener for the back button when blur

  state = {
    flatListItems: [],
    refreshFlatlist: false,
  };

  constructor(props) {
    super(props);
    this._focusDoneSubscribe = props.navigation.addListener(
      'didFocus',
      payload =>
        BackHandler.addEventListener(
          'hardwareBackPress',
          this.onBackButtonPressAndroid,
        ),
    ); //this assigns the listener

    // Sqlite debugging true
    DEBUG(true);

    // Database creation
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS todo(todo_id INTEGER PRIMARY KEY AUTOINCREMENT, todo_title VARCHAR(50), todo_note VARCHAR(500), is_task_completed integer default 0, created_at text, modified_at text)',
      );
    });
  }

  componentDidMount() {
    this._blurGoingSubscribe = this.props.navigation.addListener(
      'willBlur',
      payload =>
        BackHandler.removeEventListener(
          'hardwareBackPress',
          this.onBackButtonPressAndroid,
        ),
    );
    // Database select query call
    db.executeSql('select * from todo', [], res => {
      let tempArr = [];
      for (let i = 0; i < res.rows.length; i++) {
        tempArr.push(res.rows.item(i));
      }
      console.log('Todo array:', tempArr);
      this.setState({
        flatListItems: tempArr,
      });
    });
  }

  onBackButtonPressAndroid = () => {
    Alert.alert(
      'Exiting App',
      'Confirm quitting the app?',
      [
        {text: 'CANCEL', style: 'cancel'},
        {text: 'QUIT', onPress: () => BackHandler.exitApp()},
      ],
      {cancelable: false},
    );
    return true;
  };

  componentWillUnmount() {
    this._focusDoneSubscribe && this._focusDoneSubscribe.remove();
    this._blurGoingSubscribe && this._blurGoingSubscribe.remove();
  }

  handleFabClick() {
    ToastAndroid.show('Add todo!', ToastAndroid.SHORT);
    this.props.navigation.navigate(AppRoutes.ADDTODO, {database: db});
  }

  onCardTouch(item) {
    ToastAndroid.show(item.todo_title, ToastAndroid.SHORT);
    this.props.navigation.navigate(AppRoutes.EDITTODO, {
      database: db,
      todo_id: item.todo_id,
      todo_title: item.todo_title,
      todo_note: item.todo_note,
    });
  }

  handleDelete(todo_id) {
    this.animation.play();
    setTimeout(() => {
      this.animation.reset();

      db.executeSql(
        'Delete from todo where todo_id = ?',
        [todo_id],
        result => {
          console.log('Is row affected: ', result.rowsAffected);
        },
        error => {
          console.log('Error while deleting todo: ', error);
        },
      );
      db.executeSql('select * from todo', [], res => {
        let tempArr = [];
        for (let i = 0; i < res.rows.length; i++) {
          tempArr.push(res.rows.item(i));
        }
        console.log('Todo array:', tempArr);
        this.setState({
          flatListItems: tempArr,
          refreshFlatlist: !this.state.refreshFlatlist,
        });
      });
      ToastAndroid.show('Trased!', ToastAndroid.SHORT);
    }, 2000);
  }

  flatListRenderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => this.onCardTouch(item)}
        style={{
          alignItems: 'center',
          marginBottom: this.state.flatListItems.length - 1 == index ? 16 : 0,
        }}
        activeOpacity={1}>
        <View
          key={item.todo_id}
          style={{
            height: screenWidth / 3.5,
            width: '95%',
            marginBottom: 16,
            elevation: 6,
            backgroundColor: '#ffffff',
            borderRadius: 3,
            borderColor: '#bdbdbd',
            borderWidth: 1,
          }}>
          <View
            style={{
              justifyContent: 'flex-start',
              flexDirection: 'column',
              alignItems: 'stretch',
              flex: 1,
            }}>
            <View
              style={{
                justifyContent: 'flex-start',
                flexDirection: 'row',
                alignItems: 'stretch',
                flex: 4,
              }}>
              <View style={styles.card}>
                <Text
                  style={styles.cardHeader}
                  ellipsizeMode="tail"
                  numberOfLines={1}>
                  {item.todo_title}
                </Text>
                <Text
                  style={styles.cardBody}
                  ellipsizeMode="tail"
                  numberOfLines={1}>
                  {item.todo_note}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={{
                alignSelf: 'flex-end',
                justifyContent: 'flex-end',
              }}
              onPress={() => this.handleDelete(item.todo_id)}>
              {/* <Icon name="trash" /> */}

              <LottieView
                source={require('../../assets/my_delete.json')}
                autoPlay={false}
                style={{
                  alignSelf: 'flex-end',
                  height: '70%',
                  width: '15%',
                  justifyContent: 'center',
                }}
                ref={animation => {
                  this.animation = animation;
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  render() {
    console.log('Rohan: ', this.props.PAGE_TYPE);
    return (
      <View style={styles.container}>
        <CustomHeader />
        <FlatList
          data={this.state.flatListItems}
          renderItem={(item, index) => this.flatListRenderItem(item, index)}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{marginTop: 16}}
          extraData={this.state.refreshFlatlist}
        />
        <CustomFab fabClick={() => this.handleFabClick()} iconName="add" />
        {/* <Fab
          direction="up"
          style={styles.fab}
          position="bottomRight"
          onPress={() => this.handleFabClick()}>
          <Icon name="add" />
        </Fab> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    flex: 1,
    flexDirection: 'column',
  },
  flatList: {
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    margin: 8,
    flexDirection: 'column',
    flex: 1,
  },
  card: {
    padding: 16,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    flex: 3,
  },
  cardHeader: {
    fontSize: 24,
    color: 'black',
    marginBottom: 4,
  },
  cardBody: {
    fontSize: 16,
    color: 'green',
  },
  fab: {
    backgroundColor: '#F8692B',
  },
});

// import React, {Component} from 'react';
// import {Button, Icon, Text, View} from 'native-base';

// class Dashboard extends Component {
//   state = {};
//   render() {
//     return (
//       <View
//         style={{
//           justifyContent: 'center',
//           flexDirection: 'column',
//           flex: 1,
//           alignItems: 'center',
//         }}>
//         <View
//           style={{
//             marginBottom: 12,
//           }}>
//           <Button iconLeft rounded>
//             <Icon name="add" />
//             <Text>Add ToDo</Text>
//           </Button>
//         </View>
//         <View style={{}}>
//           <Button iconLeft rounded>
//             <Icon name="list" />
//             <Text>Show ToDo</Text>
//           </Button>
//         </View>
//       </View>
//     );
//   }
// }

// export default Dashboard;

// flatListData = () => {
//   // console.log(AsyncStorage.getItem('todos'));
//   // AsyncStorage.getItem('todos').then(value => {
//   //   const data = JSON.parse(value);
//   //   console.log(data.Title, data.Note);
//   //   return [{title: data.Title, note: data.Note}];
//   // });
//   // return [
//   //   {title: 'Devin', note: "data"},
//   //   {title: 'Dan'},
//   //   {title: 'Dominic'},
//   //   {title: 'Jackson'},
//   //   {title: 'James'},
//   //   {title: 'Joel'},
//   //   {title: 'John'},
//   //   {title: 'Jillian'},
//   //   {title: 'Jimmy'},
//   //   {title: 'Julie'},
//   // ];
//   //console.log('Todo data: ', selectAllTodos(db));
// };
