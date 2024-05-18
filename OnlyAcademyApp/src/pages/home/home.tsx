import {View, Text} from 'react-native';
import React from 'react';
import {Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

export default function Home() {
  const navigation = useNavigation();
  const handleCameraButton = () => {
    navigation.navigate('Camera');
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
    </View>
  );
}
