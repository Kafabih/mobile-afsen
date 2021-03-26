import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Card, Badge } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { Searchbar, DataTable } from 'react-native-paper';
import config from '../../store/config';
import AsyncStorage from '@react-native-async-storage/async-storage';

class TimeOff extends React.Component {
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
		this.getCuti();
	}

	getCuti() {
		AsyncStorage.getItem('auth').then((values) => {
			let auth = JSON.parse(values);
			this.setState({
				user: auth
			});
			config
				.get('/cutipermissions', {
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

	status() {
		this.state.array.map((element) => {
			if (element.status_id == 0) {
				<Badge value="waiting" status="warning" />;
			} else if (element.status_id == 1) {
				<Badge value="accepted" status="primary" />;
			} else {
				<Badge value="denied" status="error" />;
			}
		});
	}

	dataTable = () => {
		return this.state.array.map((element) => {
			if (element.status_id == 0) {
				return (
					<DataTable.Row key={element.key}>
						<DataTable.Cell style={{ padding: 10 }}>{element.name}</DataTable.Cell>
						<DataTable.Cell style={{ padding: 10 }}>{element.cuti_name}</DataTable.Cell>
						<DataTable.Cell style={{ padding: 10 }}>{element.code}</DataTable.Cell>
						<DataTable.Cell style={{ padding: 10 }}>{element.start_date}</DataTable.Cell>
						<DataTable.Cell style={{ padding: 10 }}>{element.expired_date}</DataTable.Cell>
						<DataTable.Cell style={{ padding: 10 }}>
							<Badge value="waiting" status="warning" />
						</DataTable.Cell>
					</DataTable.Row>
				);
			} else if (element.status_id == 1) {
				<DataTable.Row key={element.key}>
					<DataTable.Cell style={{ padding: 10 }}>{element.name}</DataTable.Cell>
					<DataTable.Cell style={{ padding: 10 }}>{element.cuti_name}</DataTable.Cell>
					<DataTable.Cell style={{ padding: 10 }}>{element.code}</DataTable.Cell>
					<DataTable.Cell style={{ padding: 10 }}>{element.start_date}</DataTable.Cell>
					<DataTable.Cell style={{ padding: 10 }}>{element.expired_date}</DataTable.Cell>
					<DataTable.Cell style={{ padding: 10 }}>
						<Badge value="accepted" status="primary" />
					</DataTable.Cell>
				</DataTable.Row>;
			} else {
				<DataTable.Row key={element.key}>
						<DataTable.Cell style={{ padding: 10 }}>{element.name}</DataTable.Cell>
						<DataTable.Cell style={{ padding: 10 }}>{element.cuti_name}</DataTable.Cell>
						<DataTable.Cell style={{ padding: 10 }}>{element.code}</DataTable.Cell>
						<DataTable.Cell style={{ padding: 10 }}>{element.start_date}</DataTable.Cell>
						<DataTable.Cell style={{ padding: 10 }}>{element.expired_date}</DataTable.Cell>
						<DataTable.Cell style={{ padding: 10 }}>
							<Badge value="denied" status="error" />
						</DataTable.Cell>
					</DataTable.Row>
			}
		});
	};

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<View style={styles.headerContent}>
						<View style={{ width: 150 }}>
							<Text style={styles.headerText}>Time Off</Text>
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
										<Text style={styles.textTableTitle}>Employee</Text>
									</DataTable.Title>
									<DataTable.Title style={{ padding: 20, flex: 1 }}>
										<Text style={styles.textTableTitle}>Cuti Name</Text>
									</DataTable.Title>
									<DataTable.Title style={{ padding: 20, flex: 1 }}>
										<Text style={styles.textTableTitle}>Code Cuti</Text>
									</DataTable.Title>
									<DataTable.Title style={{ padding: 20, flex: 1 }}>
										<Text style={styles.textTableTitle}>Start Date</Text>
									</DataTable.Title>
									<DataTable.Title style={{ padding: 20, flex: 1 }}>
										<Text style={styles.textTableTitle}>End Date</Text>
									</DataTable.Title>
									<DataTable.Title style={{ padding: 20, flex: 1 }}>
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

export default TimeOff;

const styles = StyleSheet.create({
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
