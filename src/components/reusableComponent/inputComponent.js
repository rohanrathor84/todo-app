import React, {Component} from 'react';
import {Input} from 'native-base';
import {StyleSheet, View} from 'react-native';

class InputComponent extends Component {
  state = {};

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.parentTitle}>
          <Input
            placeholder="Title"
            placeholderTextColor="white"
            backgroundColor="#F55432"
            multiline={true}
            value={this.props.titleValue}
            style={styles.titleInput}
            onChangeText={this.props.onTitleChange}
          />
        </View>
        <View style={styles.parentNote}>
          <Input
            placeholder="Note"
            placeholderTextColor="white"
            backgroundColor="#F5C632"
            multiline={true}
            value={this.props.noteValue}
            style={styles.noteInput}
            onChangeText={this.props.onNoteChange}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    flex: 6,
  },
  parentTitle: {
    flex: 1,
  },
  parentNote: {
    flex: 5,
  },
  titleInput: {
    fontSize: 36,
    color: 'white',
    textAlignVertical: 'top',
  },
  noteInput: {
    fontSize: 24,
    color: 'white',
    textAlignVertical: 'top',
  },
});

export default InputComponent;
