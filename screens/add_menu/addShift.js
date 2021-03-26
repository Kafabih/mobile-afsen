import {
	Body,
	Button,
	CheckBox,
	Container,
	Header,
	Icon,
	Left,
	ListItem,
	Right,
	Title,
	Footer,
	Form,
	Picker,
	Content
} from 'native-base';
import React from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import DocumentPicker from 'react-native-document-picker';

class addShift extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			date: '',
			selected: '',
			singleFileOBJ: ''
		};
	}
	async SingleFilePicker() {
		try {
			const res = await DocumentPicker.pick({
				type: [ DocumentPicker.types.allFiles ]
			});

			this.setState({ singleFileOBJ: res });
		} catch (err) {
			if (DocumentPicker.isCancel(err)) {
				Alert.alert('Canceled');
			} else {
				Alert.alert('Unknown Error: ' + JSON.stringify(err));
				throw err;
			}
		}
	}
	onValueChange(value) {
		this.setState({
			selected: value
		});
	}

	render(props) {
		return (
			<Container>
				<ScrollView>
					<Header>
						<Left style={{ flex: 0.1 }}>
							<Button transparent onPress={() => this.props.navigation.goBack()}>
								<Icon name="arrow-back" style={{ color: '#fff' }} />
							</Button>
						</Left>
						<Body style={styles.styleBody}>
							<Title>Add Request Change Shift</Title>
						</Body>
						<Right style={{ flex: 0.1 }} />
					</Header>

					<View style={styles.titleView1}>
						<Text style={styles.title1}>Pilih Karyawan</Text>
						<Content>
							<Form>
								<Picker
									mode="dropdown"
									Header="Select your SIM"
									iosIcon={
										<Icon name="arrow-dropdown-circle" style={{ color: '#007aff', fontSize: 25 }} />
									}
									style={{ width: undefined }}
									selectedValue={this.state.selected}
									onValueChange={this.onValueChange.bind(this)}
								>
									<Picker.Item label="Pilih Karyawan" />
									<Picker.Item label="Wallet" value="key0" />
									<Picker.Item label="ATM Card" value="key1" />
									<Picker.Item label="Debit Card" value="key2" />
									<Picker.Item label="Credit Card" value="key3" />
									<Picker.Item label="Net Banking" value="key4" />
								</Picker>
							</Form>
						</Content>
					</View>
					
					<View style={styles.titleView1}>
						<Text style={styles.title1}>Pilih shift yang mau diganti</Text>
						<Content>
							<Form>
								<Picker
									mode="dropdown"
									Header="Select your SIM"
									iosIcon={
										<Icon name="arrow-dropdown-circle" style={{ color: '#007aff', fontSize: 25 }} />
									}
									style={{ width: undefined }}
									selectedValue={this.state.selected}
									onValueChange={this.onValueChange.bind(this)}
								>
									<Picker.Item label="Pilih Shift" />
									<Picker.Item label="Wallet" value="key0" />
									<Picker.Item label="ATM Card" value="key1" />
									<Picker.Item label="Debit Card" value="key2" />
									<Picker.Item label="Credit Card" value="key3" />
									<Picker.Item label="Net Banking" value="key4" />
								</Picker>
							</Form>
						</Content>
					</View>
					<View style={styles.titleView1}>
						<Text style={styles.title2}>Pilih shift karyawan yg sudah dipilih</Text>
						<Content>
							<Form>
								<Picker
									mode="dropdown"
									Header="Select your SIM"
									iosIcon={
										<Icon name="arrow-dropdown-circle" style={{ color: '#007aff', fontSize: 25 }} />
									}
									style={{ width: undefined }}
									selectedValue={this.state.selected}
									onValueChange={this.onValueChange.bind(this)}
								>
									<Picker.Item label="Pilih Shift" />
									<Picker.Item label="Wallet" value="key0" />
									<Picker.Item label="ATM Card" value="key1" />
									<Picker.Item label="Debit Card" value="key2" />
									<Picker.Item label="Credit Card" value="key3" />
									<Picker.Item label="Net Banking" value="key4" />
								</Picker>
							</Form>
						</Content>
					</View>
					<View style={{ margin: 15, padding: 10 }}>
					<Text style={styles.text}>
							File Name: {this.state.singleFileOBJ.name ? this.state.singleFileOBJ.name : ''}
						</Text>

						<Text style={styles.text}>
							file Type: {this.state.singleFileOBJ.type ? this.state.singleFileOBJ.type : ''}
						</Text>

						<Text style={styles.text}>
							File Size: {this.state.singleFileOBJ.size ? this.state.singleFileOBJ.size : ''}
						</Text>

						<Text style={styles.text}>
							File URI: {this.state.singleFileOBJ.uri ? this.state.singleFileOBJ.uri : ''}
						</Text>
						<TouchableOpacity
							activeOpacity={0.5}
							style={styles.button}
							onPress={this.SingleFilePicker.bind(this)}
						>
							<Text style={styles.buttonText}>Upload Evidence</Text>
						</TouchableOpacity>
						
					</View>
					<View />
				</ScrollView>
				<Footer style={styles.footerStyle}>
					<Button style={styles.btnFooter}>
						<View style={styles.circleGradientFooter}>
							<Icon name="document-outline" style={styles.iconBtnFooter} />
							<Text style={styles.txtBtnFooter}>Save to Draft</Text>
						</View>
					</Button>
					<Button style={styles.btnFooter}>
						<View style={styles.circleGradientFooter}>
							<Icon name="send-outline" style={styles.iconBtnFooter} />
							<Text style={styles.txtBtnFooter}>Send Request</Text>
						</View>
					</Button>
				</Footer>
			</Container>
		);
	}
}

export default addShift;

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		flex: 1,
		justifyContent: 'center',
		alignContent: 'center',
		alignItems: 'center'
	},
	header: {
		backgroundColor: '#1771c5',
		height: 200,
		borderBottomLeftRadius: 30,
		borderBottomRightRadius: 30,
		paddingHorizontal: 30
	},
	view1: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: 20,
		paddingHorizontal: 8
	},
	titleView1: {
		padding: 15,
		top: 5
	},
	title1: {
		fontWeight: 'bold',
		fontSize: 24
	},
	title2: {
		fontWeight: 'bold',
		fontSize: 20
	},
	btnView1: {
		height: 50,
		width: 100,
		alignItems: 'center',
		justifyContent: 'center',
		margin: 5,
		backgroundColor: 'gray',
		borderRadius: 10
	},
	circleGradient: {
		width: 90,
		height: 40,
		backgroundColor: '#fff',
		borderRadius: -1,
		justifyContent: 'center'
	},
	txtBtn: {
		textAlign: 'center',
		color: 'black',
		fontSize: 18,
		fontWeight: 'bold'
	},
	styleBody: {
		flex: 1,
		alignItems: 'center'
	},
	pBar: {
		alignSelf: 'center',
		top: 10
	},
	datePickerView: {
		width: '80%',
		alignSelf: 'center',
		top: 30,
		paddingLeft: 20
	},
	datePickerText: {
		fontWeight: 'bold',
		fontSize: 16,
		left: 3
	},
	descriptionView: {
		width: '80%',
		alignSelf: 'center',
		top: 50
	},
	descriptionText: {
		fontWeight: 'bold',
		fontSize: 16
	},
	inputDescription: {
		borderWidth: 1,
		height: 60,
		borderColor: 'gray'
	},
	footerStyle: {
		backgroundColor: 'white',
		shadowColor: 'black',
		shadowOffset: {
			width: 0,
			height: 20
		},
		shadowOpacity: 3,
		shadowRadius: 30.0,

		elevation: 50
	},
	btnFooter: {
		height: 30,
		width: 150,
		alignItems: 'center',
		justifyContent: 'center',
		margin: 5,
		backgroundColor: 'gray',
		borderRadius: 10
	},
	circleGradientFooter: {
		width: 145,
		height: 25,
		backgroundColor: '#fff',
		borderRadius: 50,
		justifyContent: 'center'
	},
	txtBtnFooter: {
		top: -10,
		textAlign: 'center',
		color: 'black',
		fontSize: 14,
		fontWeight: 'bold'
	},
	iconBtnFooter: {
		color: 'black',
		top: 8,
		left: -10,
		fontSize: 15
	},
	button: {
		width: 170,
		paddingVertical: 5,
		paddingLeft: 10,
		backgroundColor: 'rgba(93, 234, 217, 0.75)',
		margin: 10,
		borderRadius: 50,
		shadowColor: 'rgba(58, 20, 64, 0.76)',
		shadowOffset: {
			width: 0,
			height: 12
		},
		shadowOpacity: 0.58,
		shadowRadius: 16.0,

		elevation: 12
	},

	buttonText: {
		color: '#fff',
		fontSize: 21,
		padding: 10,
		textAlign: 'center'
	},
	text: {
		color: '#000',
		fontSize: 16,
		padding: 10,
		textAlign: 'left'
	}
});
