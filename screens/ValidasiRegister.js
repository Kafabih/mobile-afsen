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

class ValidasiRegister extends React.Component {
  render() {
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
            Register Account
          </Text>
        </View>
        <View style={{paddingVertical: 10}}>
          <Text style={{color: '#fff', textAlign: 'left', fontSize: 18}}>
            fill in the fields below with the registered company name.
          </Text>
        </View>
        <View style={styles.formWrapper}>
          <View style={styles.formRow}>
            <TextInput
              style={styles.textInput}
              placeholder="Company Name"
              placeholderTextColor="#333"
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              ...styles.registerBtn,
              backgroundColor: '#301834',
            }}
            onPress={() => this.props.navigation.navigate('Register')}>
            <LinearGradient
              start={{x: 0.0, y: 0.5}}
              end={{x: 1.0, y: 0.5}}
              colors={['#fff', '#fff']}
              style={{borderRadius: 3}}>
              <View style={styles.circleGradient}>
                <Text style={styles.RegisterText}>Register Account</Text>
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

export default ValidasiRegister;
