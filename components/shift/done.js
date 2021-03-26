import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

class Done extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<View>
				<Image source={require('../../assets/404.png')} style={styles.styleBox} />
			</View>
			<View>
				<Text style={styles.textEmpty}>There is no document</Text>
			</View>
			</View>
		);
	}
}

export default Done;

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		flex: 1,
		justifyContent: 'center',
		alignContent: 'center',
		alignItems: 'center'
	},
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
