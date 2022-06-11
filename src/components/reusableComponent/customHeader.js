import React, {Component} from 'react';
import {Header, Title} from 'native-base';
import {StyleSheet, View, Text} from 'react-native';
export default class CustomHeader extends Component {
  render() {
    return (
      // <Header style={styles.container}>
      //   <Title>TODO</Title>
      // </Header>
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            padding: 16,
            color: '#ffffff',
          }}>
          TODO
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8692B',
  },
});
