import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Input} from 'react-native-elements';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../store/config'

// axios.get('http://http://e7a917f8bcfb.ngrok.io/get_barang').then((res) => {
//   console.warn(res);
//   console.log(res)
// })

class Login extends React.Component {
  state = {
    username: '',
    password: ''
  }

  onChangeHandle(state, value){
    this.setState({
      [state]: value
    })
  }
  doLogin(){
    const {username, password} = this.state;
    if (username && password){
      const req = {
        email: username,
        password: password,
      };
      config.post('/login', req).then((res) =>{
        
        let auth = JSON.stringify(res.data.data)
        AsyncStorage.setItem('auth', auth).then(() => {
          this.props.navigation.navigate('Homepage');
          alert('Login Successfull!!');
        }).catch((e) => {
          console.log(e);
          alert('Username or Password is wrong');
        })
    });
    }
    
    
  }
  render(props) {
    const {username, password, loading} = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>Attendance</Text>
        <Image
          source={require('../assets/Afsen-Icon.png')}
          resizeMode="center"
          style={styles.image}
        />
        <View style={styles.formWrapper}>
          <View style={styles.formRow}>
            <Input
              style={{color: 'black'}}
              value={username}
              onChangeText={(value) => this.onChangeHandle('username', value)}
              placeholder="Username"
              leftIcon={{
                type: 'font-awesome',
                name: 'user',
                color: 'black',
              }}
            />
          </View>
          <View style={styles.formRow}>
            <Input
              value={password}
              onChangeText={(value) => this.onChangeHandle('password', value)}
              style={{color: 'black'}}
              placeholder="Password"
              leftIcon={{
                type: 'font-awesome',
                name: 'lock',
                color: 'black',
              }}
              secureTextEntry={true}
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              ...styles.loginBtn,
              backgroundColor: '#fff',
            }}
            onPress={() => this.doLogin()}>
            <LinearGradient
              start={{x: 0.0, y: 0.5}}
              end={{x: 1.0, y: 0.5}}
              colors={['#fff', '#fff']}
              style={{borderRadius: 3}}>
              <View style={styles.circleGradient}>
                <Text style={styles.loginText}>login</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  formWrapper: {
    width: '80%',
  },
  formRow: {
    marginBottom: 10,
  },
  textInput: {
    backgroundColor: '#151A7D',
    height: 40,
    paddingHorizontal: 10,
    color: '#C3C5F1',
  },
  loginBtn: {
    paddingVertical: 10,
    paddingLeft: 10,
  },
  loginText: {
    textAlign: 'center',
    color: '#DEDFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  titleText: {
    textAlign: 'center',
    color: '#000',
    fontSize: 48,
  },
  image: {
    width: 300,
    height: 200,
    marginVertical: 20,
  },
  circleGradient: {
    margin: 2,
    backgroundColor: '#151A7D',
    borderRadius: 3,
    paddingLeft: 5,
  },
  registerText: {
    textAlign: 'center',
    color: '#B1AFAF',
    fontSize: 18,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  resetpwText: {
    textAlign: 'center',
    color: '#DEDFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  register: {
    paddingHorizontal: 15,
  },
  resetpw: {
    paddingHorizontal: 15,
  },
});

export default Login;
