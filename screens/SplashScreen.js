import React, {useEffect} from 'react';
import {SafeAreaView, StatusBar, Image, Text} from 'react-native';
import {StackActions} from '@react-navigation/native';

function SplashScreen({navigation, route}) {
  useEffect(() => {
    setTimeout(() => {
      navigation.dispatch(StackActions.replace('Login'));
    }, 3000); //3detik
  });
  return (
    <SafeAreaView
      style={{
        backgroundColor: '#fff',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <StatusBar hidden />
      <Image source={require('../assets/Afsen-Logo.png')} style={{width: 250, height: 250}}/>
    </SafeAreaView>
  );
}

export default SplashScreen;
