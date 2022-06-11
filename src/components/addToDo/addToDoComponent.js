import React, {Component} from 'react';
import {BackHandler, ToastAndroid} from 'react-native';
import AppRoutes from '../../../appRoutes';
import InputComponent from '../reusableComponent/inputComponent';

class AddToDoComponent extends Component {
  state = {
    todo_id: '',
    todo_title: '',
    todo_note: '',
    db: this.props.navigation.state.params.database,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.onBackButtonPress,
    );
  }

  handleTitleChange = value => {
    this.setState({todo_title: value});
  };

  handleNoteChange = value => {
    this.setState({todo_note: value});
  };

  onBackButtonPress = () => {
    if (this.state.todo_title !== '' || this.state.todo_note !== '') {
      this.state.db.executeSql(
        'INSERT INTO todo (todo_title, todo_note) VALUES (?,?)',
        [this.state.todo_title, this.state.todo_note],
        result => {
          console.log('Is row affected: ', result.rowsAffected);
        },
        error => {
          console.log('Error while inserting todo: ', error);
        },
      );
      ToastAndroid.show('Saved!', ToastAndroid.SHORT);
    }
    this.props.navigation.navigate(AppRoutes.DASHBOARD);
    return true;
  };

  render() {
    return (
      <InputComponent
        onTitleChange={this.handleTitleChange}
        onNoteChange={this.handleNoteChange}
      />
    );
  }
}

export default AddToDoComponent;

// AsyncStorage.setItem(
//   'todos',
//   JSON.stringify({Title: this.state.Title, Note: this.state.Note}),
// );
