import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

class Draft extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<View>
				<Image source={require('../../assets/alarm-clock.png')} style={styles.styleBox} />
			</View>
			<View>
				<Text style={styles.textEmpty}>Not Found</Text>
			</View>
			</View>
		);
	}
}

export default Draft;

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
