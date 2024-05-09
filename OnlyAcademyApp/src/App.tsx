import {View, Text} from 'react-native';
import React from 'react';
import {Button} from 'react-native-paper';

export default function App() {
  return (
    <View>
      <Text>Hello World</Text>
      <Button
        icon="camera"
        mode="contained"
        onPress={() => console.log('Pressed')}>
        Press me
      </Button>
    </View>
  );
}
