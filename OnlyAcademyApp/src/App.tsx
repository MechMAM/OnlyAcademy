import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import CameraScreen from './components/Camera';
import Home from './pages/home/home';
import Payment from './pages/;ayments/Payment';
import ProfilePage from './pages/profile';
import PremiumForm from './pages/;ayments/PremiumForm';
import UploadFile from './components/FileUploader';
import Login from './pages/login';
import {useAuth} from './provider/AuthProvider';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import UserForm from './pages/profile/UserForm';

export type RootStack = {
  Home: undefined;
  Camera: undefined;
  Payment: undefined;
  Profile: undefined;
  PremiumForm: undefined;
  UploadFile: undefined;
  Login: undefined;
  UserForm: undefined;
};

const Stack = createStackNavigator<RootStack>();

export default function App() {
  const {isSignedIn, signOut} = useAuth();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerRight: () => (
            <TouchableOpacity onPress={signOut}>
              <Icon name="log-out-outline" size={30} color={'black'} />
            </TouchableOpacity>
          ),
        }}>
        {isSignedIn ? (
          <>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                headerTitle: 'Home',
              }}
            />
            <Stack.Screen name="Camera" component={CameraScreen} />
            <Stack.Screen name="Payment" component={Payment} />
            <Stack.Screen name="Profile" component={ProfilePage} />
            <Stack.Screen name="PremiumForm" component={PremiumForm} />
            <Stack.Screen name="UploadFile" component={UploadFile} />
            <Stack.Screen name="UserForm" component={UserForm} />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                headerShown: false,
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                headerShown: false,
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
