import React, { useState, useEffect, Component } from 'react';
import { Card } from 'react-native-shadow-cards';
import { TouchableOpacity, Text, View, StyleSheet, ScrollView, Image, Pressable } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { Button, Icon, Left } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import RNLocation from 'react-native-location';
import config from '../../store/config';

// const [buttonPress] = useState(0);

class Home extends Component {
	//digital clocks
	constructor(props) {
		super(props);

		this.state = {
			textColor: 'white',
			btnColor: '#fff',
			cardColor: '#2A7AD1',
			currentTime: null,
			currentDay: null,
			user: [],
			company: '',
			token: '',
			array: [],
			location: [],
			scheduleIn: [],
			scheduleOut: []
		};
		this.daysArray = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday' ];
	}

	UNSAFE_componentWillMount() {
		this.getCurrentTIme();
	}

	getCurrentTIme = () => {
		let hour = new Date().getHours();
		let minutes = new Date().getMinutes();
		let seconds = new Date().getSeconds();
		let am_pm = 'pm';

		if (minutes < 10) {
			minutes = '0' + minutes;
		}
		if (seconds < 10) {
			seconds = '0' + seconds;
		}

		if (hour > 12) {
			hour = hour - 12;
		}

		if (hour == 0) {
			hour = 12;
		}

		if (new Date().getHours() < 12) {
			am_pm = 'am';
		}

		this.setState({
			currentTime: hour + ':' + minutes + ':' + seconds + ' ' + am_pm
		});

		this.daysArray.map((item, key) => {
			if (key == new Date().getDay()) {
				this.setState({ currentDay: item.toString() });
			}
		});
	};

	UNSAFE_componentWillUnmount() {
		clearInterval(this.timer);
	}

	getSchedule() {
		AsyncStorage.getItem('auth').then((values) => {
			let auth = JSON.parse(values);
			this.setState({
				user: auth
			});
			config
				.get('/todayShiftEmployee', {
					params: {
						company_id: auth.user.company_id,
						user_id: auth.user.id
					},
					headers: {
						Authorization: 'Bearer ' + auth.token
					}
				})
				.then((resp) => {
					this.setState({ scheduleIn: resp.data.data.schedule_in, scheduleOut: resp.data.data.schedule_out });
					// console.log(this.state.scheduleIn);
					// console.log(this.state.scheduleOut);
				});
		});
	}

	getCheckin() {
		AsyncStorage.getItem('auth').then((value) => {
			let auth = JSON.parse(value);
			this.setState({ user: auth });
			config
				.get('/todayAttendance', {
					params: {
						company_id: auth.user.company_id
					},
					headers: {
						Authorization: 'Bearer ' + auth.token
					}
				})
				.then((resp) => {
					this.setState({ array: resp.data.data });
					// console.log(this.state.array);
				});
		});
	}

	componentDidMount() {
		this.timer = setInterval(() => {
			this.getCurrentTIme();
		}, 1000);
		this.getCheckin();
		this.getLocation();
		this.check();
		this.getSchedule();
	}

	check() {
		AsyncStorage.getItem('auth').then((value) => {
			let auth = JSON.parse(value);
			config
				.get('/check', {
					params: {
						user_id: auth.user.id
					},
					headers: {
						Authorization: 'Bearer ' + auth.token
					}
				})
				.then((resp) => {
					alert(resp.data.message);
				})
				.catch((e) => {
					alert(e.data.response);
				});
		});
	}

	getLocation() {
		RNLocation.requestPermission({
			ios: 'whenInUse',
			android: {
				detail: 'coarse'
			}
		}).then((granted) => {
			if (granted) {
				this.locationSubscription = RNLocation.subscribeToLocationUpdates((locations) => {
					let loc = {
						latitude: locations[0].latitude,
						longitude: locations[0].longitude
					};
					// loc.push['latitude'] = locations[0].latitude
					// loc.push['longitude'] = locations[0].longitude
					this.setState({ location: loc });
					// console.log(this.state.location);
				});
			}
		});
	}
	//checkin
	checkIn(location) {
		AsyncStorage.getItem('auth').then((values) => {
			let auth = JSON.parse(values);
			let headaers = {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + auth.token
			};
			let data = {
				user_id: auth.user.id,
				request: 1,
				lat: location.latitude,
				lng: location.longitude
			};
			// console.log(data);
			config
				.post('/checkin', data, {
					headers: headaers
				})
				.then((resp) => {
					console.log(resp);
				})
				.catch((e) => {
					// console.log(e);

				})
				.finally(() => {
					this.getCheckin();
					this.check();
				});
		});
	}

	//checkout
	checkOut(location) {
		AsyncStorage.getItem('auth').then((values) => {
			let auth = JSON.parse(values);
			let headaers = {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + auth.token
			};
			let data = {
				user_id: auth.user.id,
				request: 2,
				lat: location.latitude,
				lng: location.longitude
			};
			// console.log(data);
			config
				.post('/checkin', data, {
					headers: headaers
				})
				.then((resp) => {
					console.log(resp);
				})
				.catch((e) => {
					// console.log(e);

				})
				.finally(() => {
					this.getCheckin();
					this.check();
				});
		});
	}

	//Info Attendance
	list = () => {
		return this.state.array.map((element) => {
			return (
				<ScrollView key={element.key}>
					<View style={styles.info}>
						<View key={element.key}>
							<Text style={styles.infoText}>{element.name}</Text>
							<Text style={styles.textStyle}>{element.position_name}</Text>
						</View>
						<View>
							<Text style={{ fontSize: 24, marginTop: 10, marginLeft: 160 }}>
								{this.formatTime(element.checkin_time)}
							</Text>
						</View>
					</View>
				</ScrollView>
			);
		});
	};

	statusCheckCard(status, scheduleIn, scheduleOut) {
		let { location } = this.state;
		status = this.check.status;
		scheduleIn = this.getSchedule.scheduleIn;
		scheduleOut = this.getSchedule.scheduleOut;
		// console.log(this.state.scheduleIn);
		if (status == 1) {
			return (
				<Card style={styles.card1}>
					<Text style={(styles.TextLeft, { color: this.state.textColor, alignItems: 'flex-start' })}>
						<Text style={{ fontSize: 18 }}>{this.state.currentDay}</Text>
						<Text>yes</Text>
					</Text>
					<Text
						style={{
							color: 'fff',
							fontSize: 20,
							fontWeight: 'bold',
							paddingBottom: 10
						}}
					>
						{this.state.currentTime}
					</Text>
					<Text style={styles.schedule}>
						Schedule In: {this.state.scheduleIn}
					</Text>
					<Text style={styles.schedule}>Schedule Out: {this.state.scheduleOut}</Text>
					<View style={{ alignItems: 'flex-end', bottom: 40 }}>
						<TouchableOpacity
							style={styles.button1}
							onPress={() => {
								this.checkIn(location);
								this.onButtonPress();
							}}
						>
							<MaterialCommunityIcons name={'fingerprint'} size={30} color="#01a699" />
						</TouchableOpacity>
					</View>
				</Card>
			);
		} else if (status == 2) {
			return (
				<Card style={styles.card2}>
					<Text style={(styles.TextLeft, { color: this.state.textColor, alignItems: 'flex-start' })}>
						<Text style={{ fontSize: 18 }}>{this.state.currentDay}</Text>
						<Text>aha</Text>
					</Text>
					<Text
						style={{
							color: 'fff',
							fontSize: 20,
							fontWeight: 'bold',
							paddingBottom: 10
						}}
					>
						{this.state.currentTime}
					</Text>
					<Text style={styles.schedule}>
						Schedule In: {this.state.scheduleIn}
					</Text>
					<Text style={styles.schedule}>Schedule Out: {this.state.scheduleOut}</Text>
					<View style={{ alignItems: 'flex-end', bottom: 40 }}>
						<TouchableOpacity
							style={styles.button2}
							onPress={() => {
								this.checkIn(location);
								this.onButtonPress();
							}}
						>
							<MaterialCommunityIcons name={'fingerprint'} size={30} color="#01a699" />
						</TouchableOpacity>
					</View>
				</Card>
			);
		} else if (status == 3) {
			return (
				<Card style={styles.card3}>
					<Text style={(styles.TextLeft, { color: this.state.textColor, alignItems: 'flex-start' })}>
						<Text style={{ fontSize: 18 }}>{this.state.currentDay}</Text>
					</Text>
					<Text
						style={{
							color: 'fff',
							fontSize: 20,
							fontWeight: 'bold',
							paddingBottom: 10
						}}
					>
						{this.state.currentTime}
					</Text>
					<Text style={styles.schedule}>
						Schedule In: {this.state.scheduleIn}
					</Text>
					<Text style={styles.schedule}>Schedule Out: {this.state.scheduleOut}</Text>
					<View style={{ alignItems: 'flex-end', bottom: 40 }}>
						<TouchableOpacity
							style={styles.button3}
							onPress={() => {
								this.checkIn(location);
								this.onButtonPress();
							}}
						>
							<MaterialCommunityIcons name={'fingerprint'} size={30} color="#01a699" />
						</TouchableOpacity>
					</View>
				</Card>
			);
		} else if (status == 4) {
			return (
				<Card style={styles.card4}>
					<Text style={(styles.TextLeft, { color: this.state.textColor, alignItems: 'flex-start' })}>
						<Text style={{ fontSize: 18 }}>{this.state.currentDay}</Text>
					</Text>
					<Text
						style={{
							color: 'fff',
							fontSize: 20,
							fontWeight: 'bold',
							paddingBottom: 10
						}}
					>
						{this.state.currentTime}
					</Text>
					<Text style={styles.schedule}>
						Schedule In: {this.state.scheduleIn}
					</Text>
					<Text style={styles.schedule}>Schedule Out: {this.state.scheduleOut}</Text>
					<View style={{ alignItems: 'flex-end', bottom: 40 }}>
						<TouchableOpacity
							style={styles.button4}
							onPress={() => {
								this.checkOut(location);
								this.onButtonPress();
							}}
						>
							<MaterialCommunityIcons name={'fingerprint'} size={30} color="#01a699" />
						</TouchableOpacity>
					</View>
				</Card>
			);
		} else {
			return (
				<Card style={styles.card5}>
					<Text style={(styles.TextLeft, { color: this.state.textColor, alignItems: 'flex-start' })}>
						<Text style={{ fontSize: 18 }}>{this.state.currentDay}</Text>
					</Text>
					<Text
						style={{
							color: '#fff',
							fontSize: 20,
							fontWeight: 'bold',
							paddingBottom: 10
						}}
					>
						{this.state.currentTime}
					</Text>
					<Text style={styles.schedule}>
						Schedule In: {this.state.scheduleIn}
					</Text>
					<Text style={styles.schedule}>Schedule Out: {this.state.scheduleOut}</Text>
					<View style={{ alignItems: 'flex-end', bottom: 40 }}>
						<TouchableOpacity
							style={styles.button5}
							onPress={() => {
								this.checkIn(location);
								this.onButtonPress();
							}}
						>
							<MaterialCommunityIcons name={'fingerprint'} size={30} color="#01a699" />
						</TouchableOpacity>
					</View>
				</Card>
			);
		}
	}

	onButtonPress = () => {
		this.setState({ btnColor: 'red', cardColor: '#BF2B20', textColor: '#fff' });
	};

	onCardChange = () => {
		this.onButtonPress.setState({});
	};

	formatTime(time) {
		return moment(String(time)).format('HH:mm');
	}

	render(props, navigation) {
		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<Button transparent onPress={() => this.props.navigation.openDrawer()}>
						<Icon
							name="menu"
							style={{
								color: '#fff',
								height: 20,
								width: 20,
								marginTop: 30
							}}
						/>
					</Button>
					<View style={styles.headerContent}>
						<View style={{ width: 110 }}>
							<Text style={styles.headerText}>Hi Kafabih</Text>
						</View>
						<View style={styles.viewHeaderStyle}>
							<Image source={require('../../assets/Afsen-Icon.png')} style={styles.headerImage2} />
						</View>
					</View>
				</View>
				<LinearGradient colors={[ 'rgba(0, 0, 0, 0)', 'transparent' ]} style={styles.lgCard}>
					{this.statusCheckCard()}
				</LinearGradient>

				<ScrollView>
					<View style={{ flexDirection: 'row' }}>
						<View>{this.list()}</View>
					</View>
				</ScrollView>
			</View>
		);
	}
}
export default Home;

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		flex: 1
	},
	rowContainer: {
		width: 100,
		paddingHorizontal: 10,
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	textMiddle: {
		fontSize: 20,
		fontWeight: 'bold',
		paddingBottom: 10
	},
	lineStyle: {
		borderBottomColor: 'black',
		borderBottomWidth: 1
	},
	info: {
		alignItems: 'flex-start',
		padding: 20,
		flexDirection: 'row'
	},
	infoText: {
		fontSize: 20,
		color: 'black',
		textAlign: 'left'
	},
	textStyle: {
		fontSize: 18,
		color: '#000',
		textAlign: 'left'
	},
	TextLeft: {
		alignItems: 'flex-start'
	},
	shadow: {
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5
	},
	header: {
		backgroundColor: '#1771c5',
		height: 200,
		borderBottomLeftRadius: 30,
		borderBottomRightRadius: 30,
		paddingHorizontal: 30
	},
	headerContent: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 25,
		width: 120
	},
	headerImage1: {
		height: 10,
		width: 20,
		marginTop: 30
	},
	headerImage2: {
		height: 60,
		width: 60
	},
	headerText: {
		fontSize: 20,
		color: '#fff',
		fontWeight: 'bold'
	},
	viewHeaderStyle: {
		width: 220,
		alignItems: 'flex-end'
	},
	lgCard: {
		left: 0,
		right: 0,
		height: 200,
		marginTop: -65
	},
	card1: {
		backgroundColor: '#4EB02F',
		padding: 30,
		margin: 20,
		paddingTop: 15,
		height: 150
	},
	card2: {
		backgroundColor: '#C5C727',
		padding: 30,
		margin: 20,
		paddingTop: 15,
		height: 150
	},
	card3: {
		backgroundColor: '#A82525',
		padding: 30,
		margin: 20,
		paddingTop: 15,
		height: 150
	},
	card4: {
		backgroundColor: '#253DE1',
		padding: 30,
		margin: 20,
		paddingTop: 15,
		height: 150
	},
	card5: {
		backgroundColor: '#B6B3B7',
		padding: 30,
		margin: 20,
		paddingTop: 15,
		height: 150
	},
	button1: {
		borderWidth: 1,
		borderColor: 'rgba(0,0,0,0.2)',
		alignItems: 'center',
		justifyContent: 'center',
		width: 70,
		height: 70,
		borderRadius: 50,
		backgroundColor: '#4CE11D'
	},
	button2: {
		borderWidth: 1,
		borderColor: 'rgba(0,0,0,0.2)',
		alignItems: 'center',
		justifyContent: 'center',
		width: 70,
		height: 70,
		borderRadius: 50,
		backgroundColor: '#F4F719'
	},
	button3: {
		borderWidth: 1,
		borderColor: 'rgba(0,0,0,0.2)',
		alignItems: 'center',
		justifyContent: 'center',
		width: 70,
		height: 70,
		borderRadius: 50,
		backgroundColor: '#E41C1C'
	},
	button4: {
		borderWidth: 1,
		borderColor: 'rgba(0,0,0,0.2)',
		alignItems: 'center',
		justifyContent: 'center',
		width: 70,
		height: 70,
		borderRadius: 50,
		backgroundColor: '#0F2CF1'
	},
	button5: {
		borderWidth: 1,
		borderColor: 'rgba(0,0,0,0.2)',
		alignItems: 'center',
		justifyContent: 'center',
		width: 70,
		height: 70,
		borderRadius: 50,
		backgroundColor: '#AAA6AB'
	},
	schedule: {
		color: '#fff',
		fontSize: 14,
		fontWeight: 'bold'
	}
});
