import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import CameraScreen from './components/Camera';
import Home from './pages/home/home';
import Payment from './pages/;ayments/Payment';
import ProfilePage from './pages/profile';

export type RootStack = {
  Home: undefined;
  Camera: undefined;
  Payment: undefined;
  Profile: undefined;
};

const Stack = createStackNavigator<RootStack>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="Payment" component={Payment} />
        <Stack.Screen name="Profile" component={ProfilePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
