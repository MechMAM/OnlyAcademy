import {View, Text} from 'react-native';
import React from 'react';
import {Button} from 'react-native-paper';

// function TelaCamera() {
//   const device = useCameraDevice('back');
//   const {hasPermission} = useCameraPermission();

//   if (!hasPermission) {
//     return (
//       <>
//         <Text>Não há permissão</Text>
//       </>
//     );
//   }
//   // if (device == null) {
//   //   return <NoCameraDeviceError />;
//   // }
//   return (
//     <Camera style={StyleSheet.absoluteFill} device={device} isActive={true} />
//   );
// }

export default function App() {
  // const {requestPermission} = useCameraPermission();
  // requestPermission();

  // const cameraView = () => {
  //   return <TelaCamera />;
  // };

  return (
    <View>
      <Text>Hello World</Text>
      <Button
        icon="camera"
        mode="contained"
        onPress={() => console.log('Botão pressionado')}>
        Open camera
      </Button>
    </View>
  );
}
