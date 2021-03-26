import { Button, Icon } from 'native-base';
import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import config from '../../store/config'
import AsyncStorage from '@react-native-async-storage/async-storage'

class menu extends React.Component {
  constructor(props) {
		super(props);

		this.state = {
			user: [],
			company: [],
			token: '',
		};
	}

  componentDidMount() {
		this.getUser();
    this.getCompany();
	}

  doLogout(){
    AsyncStorage.removeItem('auth').then((res) => {
      this.props.navigation.navigate('Login');
    });
  }

  getCompany(){
    AsyncStorage.getItem('auth').then((values) => {
			let auth = JSON.parse(values);
			this.setState({
				user: auth
			});
			config
				.get('/company', {
					params: {
						company_id: auth.user.company_id
					},
					headers: {
						Authorization: 'Bearer ' + auth.token
					}
				})
				.then((resp) => {
					this.setState({ company: resp.data.data });
					console.log(this.state.company);
				});
		});
  }

  getUser() {
		AsyncStorage.getItem('auth').then((values) => {
			let auth = JSON.parse(values);
			this.setState({
				user: auth
			});
			config
				.get('/user', {
					params: {
						company_id: auth.user.company_id,
						user_id: auth.user.id
					},
					headers: {
						Authorization: 'Bearer ' + auth.token
					}
				})
				.then((resp) => {
					this.setState({ user: resp.data.data });
          // console.log(this.state.user);
					// console.log(this.state.scheduleOut);
				});
		});
	}

  list = () => {
    return this.state.company.map((element) => {
      return <Text style={styles.textStyle}>{element.name}</Text> 
    })
  }

  render(){
    // console.log(user);
    return (
      <View style={styles.container}>
        <View style={styles.header}>
        <Button transparent onPress={() => navigation.openDrawer()}>
              <Icon name="menu" style={{color: '#000'}}/>
            </Button>
          <Text style={styles.textHeader}>Profile Menu</Text>
        </View>
        <View style={styles.header}>
          <View
            style={{
              width: 112,
              height: 112,
              borderRadius: 56,
              shadowColor: 'rgba(58, 20, 64, 0.76)',
              shadowOffset: {
                width: 0,
                height: 12,
              },
              shadowOpacity: 0.58,
              shadowRadius: 16.0,
  
              elevation: 12,
            }}>
            <Image
              source={{uri:'https://pbs.twimg.com/profile_images/1228001903713193984/K3g3VuzR_400x400.jpg'}}
              style={styles.image}
            />
          </View>
        </View>
        <ScrollView>
          <View style={styles.info}>
            <Text style={styles.infoText}>fullname</Text>
            <Text style={styles.textStyle}>{this.state.user.username}</Text>
            <Text>__________________________________________________</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.infoText}>Email</Text>
            <Text style={styles.textStyle}>{this.state.user.email}</Text>
            <Text>__________________________________________________</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.infoText}>Perusahaan</Text>
            {this.list()}
            <Text>__________________________________________________</Text>
          </View>
          <TouchableOpacity onPress={()=> this.doLogout()} style={styles.logoutButton}>
            <Text style={{fontSize: 14, color: '#fff', textAlign: 'center'}}>Logout</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  }
  

export default menu;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#fff',
    flex: 1,
  },
  RowContainer: {
    width: 100,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  header: {
    paddingHorizontal: 10,
    position: 'relative',
    alignItems: 'center',
    padding: 15,
    margin: 10,
  },
  textHeader: {
    fontSize: 24,
    color: '#000',
  },
  image: {
    width: 112,
    height: 112,
    borderRadius: 56,
  },
  textStyle: {
    fontSize: 18,
    color: '#000',
    textAlign: 'left',
  },
  lineStyle: {
    borderBottomColor: '#000',
    borderBottomWidth: 1,
  },
  info: {
    alignItems: 'flex-start',
    padding: 20,
  },
  infoText: {
    fontSize: 20,
    color: '#000',
    textAlign: 'left',
  },
  logoutButton: {
    paddingVertical: 10,
    paddingLeft: 10,
    backgroundColor: 'rgba(235, 59, 90, 0.56)',
    margin: 70,
    borderRadius: 56,
    shadowColor: 'rgba(58, 20, 64, 0.76)',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 12,
  },
});
