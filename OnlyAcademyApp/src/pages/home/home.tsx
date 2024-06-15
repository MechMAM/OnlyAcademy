import {View, Text} from 'react-native';
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
    <View>
      <Text style={{color: 'black'}}>Only Academy</Text>
      <Button
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
