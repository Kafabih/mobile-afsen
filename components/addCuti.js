import { Body, Button, CheckBox, Container, FooterTab, Header, Icon, Left, ListItem, Right, Title } from 'native-base';
import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import * as Progress from 'react-native-progress';
import DatePicker from 'react-native-datepicker';
import { TextInput } from 'react-native-gesture-handler';

class addCuti extends React.Component {
	constructor(props) {
		super(props);
		this.state = { date: '' };
	}

	render(props) {
		return (
			<ScrollView style={{height: 'auto'}}>
				<Container style={{height: 2000}}>
					<Header>
						<Left style={{ flex: 0.1 }}>
							<Button transparent onPress={() => this.props.navigation.goBack()}>
								<Icon name="arrow-back" style={{ color: '#fff' }} />
							</Button>
						</Left>
						<Body style={styles.styleBody}>
							<Title>Add Request Cuti</Title>
						</Body>
						<Right style={{ flex: 0.1 }} />
					</Header>

					<View style={styles.titleView1}>
						<Text style={styles.title1}>Tipe Cuti</Text>
						<View style={styles.view1}>
							<Button style={{ ...styles.btnView1 }} activeOpacity={0.8}>
								<View style={styles.circleGradient}>
									<Text style={styles.txtBtn}>test</Text>
								</View>
							</Button>

							<Button style={{ ...styles.btnView1 }} activeOpacity={0.8}>
								<View style={styles.circleGradient}>
									<Text style={styles.txtBtn}>test</Text>
								</View>
							</Button>
							<Button style={{ ...styles.btnView1 }} activeOpacity={0.8}>
								<View style={styles.circleGradient}>
									<Text style={styles.txtBtn}>test</Text>
								</View>
							</Button>
						</View>
					</View>
					<View style={styles.view1}>
						<Button style={{ ...styles.btnView1 }} activeOpacity={0.8}>
							<View style={styles.circleGradient}>
								<Text style={styles.txtBtn}>test</Text>
							</View>
						</Button>

						<Button style={{ ...styles.btnView1 }} activeOpacity={0.8}>
							<View style={styles.circleGradient}>
								<Text style={styles.txtBtn}>test</Text>
							</View>
						</Button>
						<Button style={{ ...styles.btnView1 }} activeOpacity={0.8}>
							<View style={styles.circleGradient}>
								<Text style={styles.txtBtn}>test</Text>
							</View>
						</Button>
					</View>
					<View>
						<Progress.Bar progress={0.5} width={310} style={styles.pBar} />
						<Text style={{ top: 15, left: 60, fontWeight: 'bold', fontSize: 14 }}>
							Cuti Besar yang tersisa: 11 Hari
						</Text>
					</View>
					<View style={{ flexDirection: 'row' }}>
						<View style={styles.datePickerView}>
							<Text style={styles.datePickerText}>Start Date</Text>
							<DatePicker
								style={{ width: 150, bottom: -10 }}
								date={this.state.date}
								mode="date"
								placeholder="select date"
								format="DD-MM-YYYY"
								confirmBtnText="Confirm"
								cancelBtnText="Cancel"
								customStyles={{
									dateIcon: {
										position: 'absolute',
										left: 0,
										top: 4,
										marginLeft: 0
									},
									dateInput: {
										marginLeft: 36
									}
									// ... You can check the source to find the other keys.
								}}
								onDateChange={(date) => {
									this.setState({ date: date });
								}}
							/>
						</View>
						<View style={{ width: '80%', alignSelf: 'center', top: 30, left: -100 }}>
							<Text style={styles.datePickerText}>End Date</Text>
							<DatePicker
								style={{ width: 150, bottom: -10 }}
								date={this.state.date}
								mode="date"
								placeholder="select date"
								format="DD-MM-YYYY"
								confirmBtnText="Confirm"
								cancelBtnText="Cancel"
								customStyles={{
									dateIcon: {
										position: 'absolute',
										left: 0,
										top: 4,
										marginLeft: 0
									},
									dateInput: {
										marginLeft: 36
									}
									// ... You can check the source to find the other keys.
								}}
								onDateChange={(date) => {
									this.setState({ date: date });
								}}
							/>
						</View>
					</View>
					<View style={styles.descriptionView}>
						<Text style={styles.descriptionText}>Description</Text>
						<TextInput style={styles.inputDescription} />
					</View>
					<ListItem style={{ margin: 80, paddingLeft: 20, height: 50 }}>
						<CheckBox checked={false} />
						<Body style={{paddingLeft: 20}}>
							<Text>
								Saya sudah lapor kepada TL dan diperbolehkan untuk membuat pengajuan cuti sesuai dengan
								data yang saya buat di atas
							</Text>
						</Body>
					</ListItem>
                    <View style={{margin: 20}}>
                        <Text>test</Text>
                    </View>
				</Container>
			</ScrollView>
		);
	}
}

export default addCuti;

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
	}
});
