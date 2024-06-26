import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {RootStack} from '../../App';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';

type HomeScreenNavigationProp = NativeStackScreenProps<RootStack, 'Home'>;

export default function Home(props: HomeScreenNavigationProp) {
  const handleCameraButton = () => {
    props.navigation.navigate('Camera');
  };
  const handlePaymentButton = () => {
    props.navigation.navigate('Payment');
  };

  return (
    <View style={styles.container}>
      <Text>Menu Principal</Text>
      {/* <Button
        icon="login"
        mode="contained"
        onPress={() => props.navigation.navigate('Login')}>
        Login
      </Button> */}
      <Button
        style={{marginTop: 20}}
        icon="camera"
        mode="contained"
        onPress={() => handleCameraButton()}>
        Open camera
      </Button>
      <Button
        style={{marginTop: 20}}
        icon="card"
        mode="contained"
        onPress={() => handlePaymentButton()}>
        Pagamento
      </Button>
      <Button
        style={{marginTop: 20}}
        icon={() => <Icon name="person" size={20} color="#900" />}
        mode="contained"
        onPress={() => props.navigation.navigate('Profile')}>
        Profile
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#151515',
    height: '100%',
  },
  fab: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    // position: 'static',
    // bottom: 512,
    // right: 10,
    height: 40,
    backgroundColor: '#2b825b',
    borderRadius: 100,
  },
});
