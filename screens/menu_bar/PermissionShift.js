import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Card, Badge } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { Searchbar, DataTable } from 'react-native-paper';
import config from '../../store/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

class PermissionCuti extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			user: [],
			company: '',
			token: '',
			array: []
		};
	}

	componentDidMount() {
		this.getShift();
	}

	getShift() {
		AsyncStorage.getItem('auth').then((values) => {
			let auth = JSON.parse(values);
			this.setState({
				user: auth
			});
			config
				.get('/shiftpermissions', {
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
					// console.log(this.state.scheduleOut);
				})
				.catch((e) => {
					console.log(e);
				});
		});
	}

	formatDate(date) {
		return moment(date).format('DD MMMM YYYY');
	}

	dataTable = () => {
		return this.state.array.map((element) => {
			if (element.status_id == 0) {
				return (
					<DataTable.Row key={element.key}>
						<DataTable.Cell style={{ padding: 20, flex: 1 }}>{element.name1}</DataTable.Cell>
						<DataTable.Cell style={{ padding: 20, flex: 1 }}>{element.name2}</DataTable.Cell>
						<DataTable.Cell style={{ padding: 20, flex: 1 }}>
							{this.formatDate(element.date1)} {element.code1} ({element.schedule_in1} -
							{element.schedule_out1})
						</DataTable.Cell>
						<DataTable.Cell style={{ padding: 20, flex: 1 }}>
							{this.formatDate(element.date2)} {element.code2} ({element.schedule_in2} -
							{element.schedule_out2})
						</DataTable.Cell>
						<DataTable.Cell style={{ padding: 20, flex: 1 }}>
							<Badge value="waiting" status="warning" />
						</DataTable.Cell>
					</DataTable.Row>
				);
			} else if (element.status_id == 1) {
				<DataTable.Row key={element.key}>
					<DataTable.Cell style={{ padding: 20, flex: 1 }}>{element.name1}</DataTable.Cell>
					<DataTable.Cell style={{ padding: 20, flex: 1 }}>{element.name2}</DataTable.Cell>
					<DataTable.Cell style={{ padding: 20, flex: 1 }}>
						{this.formatDate(element.date1)} {element.code1} ({element.schedule_in1} -
						{element.schedule_out1})
					</DataTable.Cell>
					<DataTable.Cell style={{ padding: 20, flex: 1 }}>
						{this.formatDate(element.date2)} {element.code2} ({element.schedule_in2} -
						{element.schedule_out2})
					</DataTable.Cell>
					<DataTable.Cell style={{ padding: 10 }}>
						<Badge value="accepted" status="primary" />
					</DataTable.Cell>
				</DataTable.Row>;
			} else {
				<DataTable.Row key={element.key}>
					<DataTable.Cell style={{ padding: 20, flex: 1 }}>{element.name1}</DataTable.Cell>
					<DataTable.Cell style={{ padding: 20, flex: 1 }}>{element.name2}</DataTable.Cell>
					<DataTable.Cell style={{ padding: 20, flex: 1 }}>
						{this.formatDate(element.date1)} {element.code1} ({element.schedule_in1} -
						{element.schedule_out1})
					</DataTable.Cell>
					<DataTable.Cell style={{ padding: 20, flex: 1 }}>
						{this.formatDate(element.date2)} {element.code2} ({element.schedule_in2} -
						{element.schedule_out2})
					</DataTable.Cell>
					<DataTable.Cell style={{ padding: 20, flex: 1 }}>
						<Badge value="denied" status="error" />
					</DataTable.Cell>
				</DataTable.Row>;
			}
		});
	};

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<View style={styles.headerContent}>
						<View style={{ width: 150 }}>
							<Text style={styles.headerText}>Permission Shift</Text>
						</View>
						<View style={styles.left}>
							<TouchableOpacity style={{ ...styles.buttonDownload, backgroundColor: '#ECD424' }}>
								<Text style={styles.textButton}>Download PDF</Text>
							</TouchableOpacity>
						</View>
						<View style={styles.right}>
							<TouchableOpacity style={{ ...styles.buttonDownload, backgroundColor: '#41DB1E' }}>
								<Text style={styles.textButton}>Download Excel</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
				<View>
					<Card>
						<Searchbar placeholder="Search" />
						<Card.Divider />
						<ScrollView horizontal={true}>
							<DataTable style={{ flex: 1 }}>
								<DataTable.Header style={{ justifyContent: 'space-between' }}>
									<DataTable.Title style={{ padding: 20, flex: 1 }}>
										<Text style={styles.textTableTitle}>Pengaju</Text>
									</DataTable.Title>
									<DataTable.Title style={{ padding: 20, flex: 1, right: 40 }}>
										<Text style={styles.textTableTitle}>Pengganti</Text>
									</DataTable.Title>
									<DataTable.Title style={{ padding: 20, flex: 1, right: 100 }}>
										<Text style={styles.textTableTitle}>Shift Pengaju</Text>
									</DataTable.Title>
									<DataTable.Title style={{ padding: 20, flex: 1 }}>
										<Text style={styles.textTableTitle}>Shift Pengganti</Text>
									</DataTable.Title>
									<DataTable.Title style={{ padding: 20, flex: 1, left: 50 }}>
										<Text style={styles.textTableTitle}>Status</Text>
									</DataTable.Title>
								</DataTable.Header>
								{this.dataTable()}
								<DataTable.Pagination
									page={1}
									numberOfPages={3}
									onPageChange={(page) => {
										console.log(page);
									}}
									label="1-2 of 6"
								/>
							</DataTable>
						</ScrollView>
					</Card>
				</View>
			</View>
		);
	}
}

export default PermissionCuti;

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		flex: 1
	},
	buttonTop: {
		width: 'auto',
		marginTop: 5,
		marginRight: 10,
		backgroundColor: 'gray'
	},
	buttonSelected: {
		width: 'auto',
		marginTop: 5,
		marginRight: 10,
		backgroundColor: 'black'
	},
	notSelected: {
		width: 'auto',
		marginTop: 5,
		marginRight: 10,
		backgroundColor: 'gray'
	},
	TouchableOpacity: {
		position: 'absolute',
		width: 50,
		height: 50,
		alignItems: 'center',
		justifyContent: 'center',
		right: 30,
		bottom: 70
	},
	floatingButtonStyle: {
		resizeMode: 'contain',
		width: 50,
		height: 50
		//backgroundColor:'black'
	},
	container: {
		backgroundColor: '#fff',
		flex: 1
	},
	header: {
		backgroundColor: '#1771c5',
		height: 100,
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
	right: {
		top: 40,
		right: 180
	},
	left: {
		top: 40,
		left: 50
	},
	textButton: {
		color: '#fff',
		fontWeight: 'bold',
		textAlign: 'center',
		alignSelf: 'center'
	},
	buttonDownload: {
		height: 25,
		width: 110,
		borderRadius: 50
	},
	textTableTitle: {
		color: '#000',
		fontWeight: 'bold',
		fontSize: 16
	},
	textTableRow: {
		color: '#000',
		fontWeight: 'bold',
		fontSize: 16
	}
});
