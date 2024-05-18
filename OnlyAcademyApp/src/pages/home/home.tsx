import {View, Text} from 'react-native';
import React from 'react';
import {Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

export default function Home() {
  const navigation = useNavigation();
  const handleCameraButton = () => {
    navigation.navigate('Camera');
  };
  const handlePaymentButton = () => {
    navigation.navigate('Payment');
  };
  return (
    <View>
      <Text>Hello World</Text>
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
    </View>
  );
}
