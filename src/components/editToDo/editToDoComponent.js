import React, {Component} from 'react';
import {BackHandler, ToastAndroid, StyleSheet, View} from 'react-native';
import InputComponent from '../reusableComponent/inputComponent';
import AppRoutes from '../../../appRoutes';
import CustomFab from '../reusableComponent/customFab';

class EditTodo extends Component {
  state = {
    todo_id: this.props.navigation.state.params.todo_id,
    todo_title: this.props.navigation.state.params.todo_title,
    todo_note: this.props.navigation.state.params.todo_note,
    db: this.props.navigation.state.params.database,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPressButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.onBackPressButton,
    );
  }

  onBackPressButton = () => {
    if (this.state.todo_title !== '' || this.state.todo_note !== '') {
      this.state.db.executeSql(
        'UPDATE todo set todo_title = ?, todo_note = ? where todo_id = ?',
        [this.state.todo_title, this.state.todo_note, this.state.todo_id],
        result => {
          console.log('Is row affected: ', result.rowsAffected);
        },
        error => {
          console.log('Error while inserting todo: ', error);
        },
      );
      ToastAndroid.show('Updated!', ToastAndroid.SHORT);
    }
    this.props.navigation.navigate(AppRoutes.DASHBOARD);
    return true;
  };

  handleTitleChange = value => {
    this.setState({todo_title: value});
  };

  handleNoteChange = value => {
    this.setState({todo_note: value});
  };

  handleFabClick() {
    this.state.db.executeSql(
      'Delete from todo where todo_id = ?',
      [this.state.todo_id],
      result => {
        console.log('Is row affected: ', result.rowsAffected);
      },
      error => {
        console.log('Error while deleting todo: ', error);
      },
    );
    ToastAndroid.show('Trased!', ToastAndroid.SHORT);
    this.props.navigation.navigate(AppRoutes.DASHBOARD);
    return true;
  }

  render() {
    return (
      <View style={styles.container}>
        <InputComponent
          titleValue={this.state.todo_title}
          onTitleChange={this.handleTitleChange}
          noteValue={this.state.todo_note}
          onNoteChange={this.handleNoteChange}
        />
        <CustomFab fabClick={() => this.handleFabClick()} iconName="trash" />
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
});

export default EditTodo;
