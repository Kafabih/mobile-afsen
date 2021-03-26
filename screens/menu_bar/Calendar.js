import React, { Component } from 'react';
import {View, StyleSheet} from 'react-native';
import _ from 'lodash';
import { Calendar } from 'react-native-big-calendar'

const events = [
  {
    title: 'Meeting',
    start: new Date(2020, 1, 11, 10, 0),
    end: new Date(2020, 1, 11, 10, 30),
  },
  {
    title: 'Coffee break',
    start: new Date(2020, 1, 11, 15, 45),
    end: new Date(2020, 1, 11, 16, 30),
  },
];



class CalendarPage extends Component {
  
 

  render(){
    return(
      <View style={styles.container}>
        <Calendar events={events} height={600}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  icLockRed: {
    width: 13/2,
    height: 9,
    position: 'absolute',
    top: 2,
    left: 1
  }
});

export default CalendarPage;
