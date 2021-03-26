import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import addCuti from '../../screens/add_menu/addCuti';

class Proses extends React.Component {
	render(props, navigation) {
		return (
			<View style={styles.container}>
				<View>
					<Image source={require('../../assets/box.png')} style={styles.styleBox} />
				</View>
				<View>
					<Text style={styles.textEmpty}>You didn't have any request</Text>
				</View>

				
			</View>
		);
	}
}

export default Proses;

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		flex: 1,
		justifyContent: 'center',
		alignContent: 'center',
		alignItems: 'center'
	},
	textEmpty: {
		color: '#000',
		fontWeight: 'bold',
		fontSize: 24
	},
	styleBox: {
		width: 250,
		height: 250
	},
	TouchableOpacity: {
		position: 'absolute',
		width: 50,
		height: 50,
		alignItems: 'center',
		justifyContent: 'center',
		right: -20,
		bottom: 100
	},
	floatingButtonStyle: {
		resizeMode: 'contain',
		width: 50,
		height: 50
		//backgroundColor:'black'
	}
});
