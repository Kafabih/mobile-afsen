import React from 'react';
import styled from 'styled-components/native';
import {TouchableOpacity, StyleSheet, Button, View} from 'react-native';

const Container = styled.View`
  background: #fff;
  flex: 1;
`;

const Text = styled.Text``;

class TimeManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [
        {
          key: '1',
          title: 'example title 1',
          subtitle: 'example subtitle 1',
        },
        {
          key: '2',
          title: 'example title 2',
          subtitle: 'example subtitle 2',
        },
        {
          key: '3',
          title: 'example title 3',
          subtitle: 'example subtitle 3',
        },
      ],
    };
  }

  list = () => {
    return this.state.array.map((element) => {
      return (
        <View key={element.key} style={{margin: 10, flex: 1, backgroundColor: '#fff'}}>
          <Text>{element.title}</Text>
          <Text>{element.subtitle}</Text>
        </View>
      );
    });
  };

  render() {
    return <Container>{this.list()}</Container>;
  }
}

export default TimeManagement;
var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnNormal: {
    borderColor: 'blue',
    borderWidth: 1,
    borderRadius: 10,
    height: 30,
    width: 100,
  },
  btnPress: {
    borderColor: 'blue',
    borderWidth: 1,
    height: 30,
    width: 100,
  },
});
