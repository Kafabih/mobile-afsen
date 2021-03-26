import * as React from 'react';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Container, Content, Text, Header, Left, Body, Title, Right, Icon, Button, Footer, ListItem, Thumbnail, H3 } from 'native-base';
import Animated from 'react-native-reanimated';
import { DrawerActions } from '@react-navigation/native';

function SideBar({ progress, ...props }) {
	const translateX = Animated.interpolateNode(progress, {
		inputRange: [ 0, 1 ],
		outputRange: [ -100, 0 ]
	});
	return (
		<Container>
			<Header style={{ backgroundColor: '#fff', borderBottomWidth: 0}}>
                {/* <Left><Text style={{fontWeight: 'bold'}}>Attendance</Text></Left> */}
                
				<Right>
					<Button transparent onPress={() => props.navigation.dispatch(DrawerActions.closeDrawer())}>
						<Icon name="menu" style={{color: '#000'}}/>
					</Button>
				</Right>
			</Header>
			<Content contentContainerStyle={{flex: 1}}>
                <ListItem thumbnail>
                    <Left>
                        <Thumbnail source={{
                            uri: 'https://pbs.twimg.com/profile_images/1228001903713193984/K3g3VuzR_400x400.jpg'
                        }}/>
                    </Left>
                    <Body>
                        <H3>Kafabih</H3>
                        <Text>Wibu</Text>
                    </Body>
                </ListItem>
				<DrawerContentScrollView {...props}>
					<Animated.View style={{ transform: [ { translateX } ] }}>
						<DrawerItemList {...props} />
						{/* <DrawerItem
							label="Rate Us"
							icon={({ color, size }) => (
								<Icon
									name="star"
									style={{ fontSize: size, color: color }}
									onPress={() => props.navigation.navigate('Home')}
								/>
							)}
						/> */}
					</Animated.View>
				</DrawerContentScrollView>
			</Content>
            <Footer />
		</Container>
	);
}
export default SideBar;
