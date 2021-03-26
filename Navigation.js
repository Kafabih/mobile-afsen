import * as React from 'react';
import {DrawerActions, NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator, DrawerContent} from '@react-navigation/drawer';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// stackscreen
import Login from './screens/AuthScreen';
import Homepage from './screens/HomeScreen';
import SplashScreen from './screens/SplashScreen';
import ValidasiRegister from './screens/ValidasiRegister';
import Register from './screens/RegisterScreen';
import Resetpw from './screens/ResetScreen';
import Shiftscreen from './screens/ShiftScreen';
import Salaryscreen from './screens/SalaryScreen';
import Reportscreen from './screens/ReportScreen';

// menu bottomTab screen
import Home from './screens/menu_bar/Home';
import Profile from './screens/menu_bar/Profile';
import TabComponent from './components/tab';

//menu topBar screen
import TimeOff from './screens/menu_bar/TimeOff';
import Attendance from './screens/menu_bar/Attendance';
import Calendar from './screens/menu_bar/Calendar';

//menu permission bottom bar
import PermissionCuti from './screens/menu_bar/PermissionCuti';
import PermissionShift from './screens/menu_bar/PermissionShift';
import PermissionLembur from './screens/menu_bar/PermissionLembur';
import SideBar from './screens/Sidebar';
import { Body, Button, Container, Header, Icon, Left, Right, Title } from 'native-base';

//menu add permission
import addCuti from './screens/add_menu/addCuti'
import addShift from './screens/add_menu/addShift'
import addLembur from './screens/add_menu/addLembur'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const TopBar = createMaterialTopTabNavigator();



//top bar
function TimeMenu ({navigation})  {
  return(
  <Container>
    <Header>
				<Left style={{ flex: 0.1 }}>
        <Button transparent onPress={() => navigation.openDrawer()}>
						<Icon name="menu" style={{color: '#000'}}/>
					</Button>
        </Left>
				<Body style={{ flex: 1, alignItems: 'center' }}>
					<Title>Time Management</Title>
				</Body>
				<Right style={{ flex: 0.1 }} />
			</Header>
  <TopBar.Navigator
    screenOptions={({route}) => ({
      tabBarIcon: ({focused, color, size}) => {
        let iconName;

        if (route.name === 'TimeOff') {
          iconName = focused ? 'time' : 'time-outline';
        } else if (route.name === 'Attendance') {
          iconName = focused ? 'newspaper' : 'newspaper-outline';
        } else if (route.name === 'Calendar') {
          iconName = focused ? 'calendar' : 'calendar-outline';
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: 'purple',
      inactiveTintColor: 'gray',
      showIcon: true,
      showLabel: true,
    }}>
    <TopBar.Screen name="TimeOff" component={TimeOff} options={{title: 'Time Off'}}/>
    <TopBar.Screen name="Attendance" component={Attendance} />
    <TopBar.Screen name="Calendar" component={Calendar} />
  </TopBar.Navigator>
  </Container>
  );
}


const AppDrawer = (props, navigation) => {
  return(
    <Drawer.Navigator drawerContent={props => <SideBar {...props}/>}>
      <Drawer.Screen name="Home" component={Home} options={{ drawerIcon: ({focused, color, size}) => <Icon name="home" style={{fontSize: size, color: color,}}/>}}/>
      <Drawer.Screen name="Time" component={TimeMenu} options={{ drawerIcon: ({focused, color, size}) => <Icon name="time" style={{fontSize: size, color: color,}}/>}}/>
      <Drawer.Screen name="Permission" component={PermissionMenu} options={{ drawerIcon: ({focused, color, size}) => <Icon name="pencil" style={{fontSize: size, color: color,}}/>}}/>
      <Drawer.Screen name="Profile" component={Profile} options={{ drawerIcon: ({focused, color, size}) => <Icon name="person" style={{fontSize: size, color: color,}}/>}}/>
    </Drawer.Navigator>
  );
}

//bottom bar
const HomeMenu = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="Home"
      component={Home}
      options={{
        tabBarButton: (props) => <TabComponent label="home" {...props} />,
      }}
    />
    <Tab.Screen
      name="Time"
      component={TimeMenu}
      options={{
        title: 'yesyesyse',
        tabBarButton: (props) => <TabComponent label="time" {...props} />,
      }}
    />

    <Tab.Screen
      name="Permission"
      component={PermissionMenu}
      options={{
        tabBarButton: (props) => <TabComponent label="permission" {...props} />,
      }}
    />
    <Tab.Screen
      name="Profile"
      component={Profile}
      options={{
        tabBarButton: (props) => <TabComponent label="user" {...props} />,
      }}
    />
  </Tab.Navigator>
);

//permission top bar navigation
function PermissionMenu ({navigation}) {
  return(
  <Container>
  <Header>
				<Left style={{ flex: 0.1 }}>
        <Button transparent onPress={() => navigation.openDrawer()}>
						<Icon name="menu" style={{color: '#fff', fontSize: 20}}/>
					</Button>
        </Left>
				<Body style={{ flex: 1, alignItems: 'center' }}>
					<Title>Permission</Title>
				</Body>
				<Right style={{ flex: 0.1 }} />
			</Header>
  <TopBar.Navigator>
    <TopBar.Screen 
      name="Cuti"
      component={PermissionCuti}/>
      <TopBar.Screen 
      name="Shift"
      component={PermissionShift}/>
      <TopBar.Screen 
      name="Overtime"
      component={PermissionLembur}/>
  </TopBar.Navigator>
  </Container>
  );
}

//stack
const Navigation = (props) => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Homepage"
          component={AppDrawer}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Validasi"
          component={ValidasiRegister}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Reset"
          component={Resetpw}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Shiftscreen"
          component={Shiftscreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Salaryscreen"
          component={Salaryscreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Reportscreen"
          component={Reportscreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="addCuti"
          component={addCuti}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="addShift"
          component={addShift}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="addLembur"
          component={addLembur}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
