import React from 'react';
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
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Register extends React.Component {
  state = {
    username: '',
    password: '',
    loading: false,
  };

  onChangeHandle(state, value) {
    this.setState({
      [state]: value,
    });
  }

  doLogin() {
    const {username, password} = this.state;
    if (username && password) {
      const req = {
        email: username,
        password: password,
      };
      this.setState({
        loading: true,
      });
      axios.post('https://reqres.in/api/register', req).then(
        (res) => {
          console.warn(res.data);
          this.setState({
            loading: false,
          });
          AsyncStorage.setItem('token', res.data.token).then((res) => {
            // this.props.navigation.navigate('Dashboard');
            alert('Login Successfull!!');
          });
        },
        (err) => {
          this.setState({
            loading: false,
          });
          alert('Username or Password is wrong');
        },
      );
    } else {
      alert('enter username and password');
    }
  }

  render() {
    const {username, password, loading} = this.state;
    return (
      <View style={styles.container}>
        <Text
          style={{
            color: '#fff',
            textAlign: 'left',
            fontWeight: 'bold',
            fontSize: 48,
          }}>
          Register Form
        </Text>

        <View style={styles.formWrapper}>
          <View style={styles.formRow}>
            <Text
              style={{
                color: '#fff',
                textAlign: 'left',
                fontSize: 18,
              }}>
              Username
            </Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter Username"
              placeholderTextColor="#333"
              value={username}
              onChangeText={(value) => this.onChangeHandle('username', value)}
            />
          </View>
          <View style={styles.formRow}>
            <Text
              style={{
                color: '#fff',
                textAlign: 'left',
                fontSize: 18,
              }}>
              Password
            </Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter Password"
              placeholderTextColor="#333"
              secureTextEntry={true}
              value={password}
              onChangeText={(value) => this.onChangeHandle('password', value)}
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              ...styles.registerBtn,
              backgroundColor: '#301834',
            }}
            onPress={() => this.doLogin()}
            disabled={loading}>
            <LinearGradient
              start={{x: 0.0, y: 0.5}}
              end={{x: 1.0, y: 0.5}}
              colors={['#fff', '#fff']}
              style={{borderRadius: 3}}>
              <View style={styles.circleGradient}>
                <Text style={styles.RegisterText}>{loading ? 'loading...' : 'login'}</Text>
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
    justifyContent: 'flex-start',
    backgroundColor: '#301834',
    paddingTop: 30,
  },
  formWrapper: {
    paddingTop: 30,
    width: '80%',
  },
  formRow: {
    marginBottom: 20,
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

export default Register;
