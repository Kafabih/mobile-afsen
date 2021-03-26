import axios from 'axios';
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Button,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import RNLocation from 'react-native-location'
import moment from "moment";

// RNLocation.configure({
//   distanceFilter: 0,
// })

// const repoUrl = "https://github.com/timfpark/react-native-location";
class ResetScreen extends React.Component {
  
  // constructor() {
  //   super();
  //   this.state = {
  //     location: null
  //   };
  // }

  // componentDidMount(){
  //   RNLocation.requestPermission({
  //     ios: "whenInUse",
  //     android: {
  //       detail: "coarse"
  //     }
  //   }).then(granted => {
  //       if (granted) {
  //         this.locationSubscription = RNLocation.subscribeToLocationUpdates(locations => {
  //           console.log(locations[0].latitude, locations[0].longitude);
  //           /* Example location returned
  //           {
  //             speed: -1,
  //             longitude: -0.1337,
  //             latitude: 51.50998,
  //             accuracy: 5,
  //             heading: -1,
  //             altitude: 0,
  //             altitudeAccuracy: -1
  //             floor: 0
  //             timestamp: 1446007304457.029,
  //             fromMockProvider: false
  //           }
  //           */
  //         })
  //       }
  //     })
  // }
  

  

  // info = () => {
  //   if (!this.state.data.data) {
  //     console.log('no');
  //   } else {
  //     console.log('ada');
  //     let array = this.state.data.data;
  //     return array.map((element) => {
  //       return(
  //         <View>
	// 					<View key={element.id}>
	// 						<Text >{element.nama_barang}</Text>
	// 					</View>
	// 				</View>
  //       )
  //     })
  //   }
  // }
  
  render(props) {
    
    return (
      <View style={styles.container}>
        <View>
          <Text
            style={{
              color: '#fff',
              textAlign: 'left',
              fontWeight: 'bold',
              fontSize: 48,
            }}>
            AFEDIGI
          </Text>
        </View>
        <View style={{paddingVertical: 20}}>
          <Text style={{color: '#fff', textAlign: 'left', fontSize: 24}}>
            Reset Password
          </Text>
        </View>
        <View style={{paddingVertical: 10}}>
          
          <Text style={{color: '#fff', textAlign: 'left', fontSize: 18}}>
            
          </Text>
        </View>
        <View style={styles.formWrapper}>
          <View style={styles.formRow}>
            <TextInput
              style={styles.textInput}
              placeholder="Email Address"
              placeholderTextColor="#333"
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              ...styles.registerBtn,
              backgroundColor: '#301834',
            }}>
            <LinearGradient
              start={{x: 0.0, y: 0.5}}
              end={{x: 1.0, y: 0.5}}
              colors={['#fff', '#fff']}
              style={{borderRadius: 3}}>
              <View style={styles.circleGradient}>
                <Text style={styles.RegisterText}>Send Instruction</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            paddingTop: 20,
            color: '#B1AFAF',
            fontSize: 15,
            textDecorationLine: 'underline',
          }}
          onPress={() => this.props.navigation.navigate('Login')}>
          Back to Login Page
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#301834',
    paddingTop: 10,
  },
  formWrapper: {
    width: '80%',
  },
  formRow: {
    marginBottom: 10,
  },
  textInput: {
    backgroundColor: '#ddd',
    height: 40,
    paddingHorizontal: 10,
    color: '#333',
  },
  circleGradient: {
    margin: 2,
    backgroundColor: '#301834',
    borderRadius: 5,
    paddingLeft: 5,
  },
  registerBtn: {
    paddingVertical: 10,
    paddingLeft: 10,
  },
  RegisterText: {
    textAlign: 'center',
    color: '#B1AFAF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ResetScreen;
