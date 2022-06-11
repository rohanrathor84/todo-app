import React, {Component} from 'react';
import {Icon, Fab} from 'native-base';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';

const screenWidth = Dimensions.get('screen').width;

class CustomFab extends Component {
  state = {};
  render() {
    return (
      <Fab
        direction="up"
        style={styles.fab}
        position="bottomRight"
        onPress={this.props.fabClick}>
        <Icon name={this.props.iconName} />
      </Fab>
      // <View style={{justifyContent: 'flex-end', margin: 24}}>
      //   <TouchableOpacity style={styles.fab} onPress={this.props.fabClick}>
      //     <Text style={{fontSize: 24, color: '#ffffff'}}>+</Text>
      //   </TouchableOpacity>
      // </View>
    );
  }
}

const styles = StyleSheet.create({
  fab: {
    backgroundColor: '#F8692B',
    // height: screenWidth / 7,
    // width: screenWidth / 7,
    // borderRadius: screenWidth / 14,
    // alignItems: 'center',
    // justifyContent: 'center',
    // alignSelf: 'flex-end',
    // position: 'absolute',
  },
});

export default CustomFab;
