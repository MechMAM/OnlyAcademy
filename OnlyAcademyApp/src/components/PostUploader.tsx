import React, {useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Button, Card, Text} from 'react-native-paper';
import {supabase} from '../config/initSupabase';
import {useAuth} from '../provider/AuthProvider';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {RootStack} from '../App';

interface UploadFileState {
  file: null;
  uploading: boolean;
  uploadError: string | null;
  previewSource: string | null;
}

type UploadFileScreenProps = NativeStackScreenProps<RootStack, 'UploadFile'>;

const UploadFile = (props: UploadFileScreenProps) => {
  const [state, setState] = useState<UploadFileState>({
    file: null,
    uploading: false,
    uploadError: null,
    previewSource: null,
  });
  const {user} = useAuth();

  const handleCamera = async () => {
    const result = await launchCamera({
      mediaType: 'photo',
      quality: 0.5,
    });
    if (result.assets) {
      setState({
        ...state,
        file: result.assets[0],
      });
    }
  };

  const handleGallery = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.5,
    });
    if (result.assets) {
      console.log(result.assets[0]);
      setState({...state, file: result.assets[0]});
    }
  };

  const handleUpload = async () => {
    setState({...state, uploading: true});
    try {
      const contentType = state.file.type;

      const {data, error} = await supabase.storage
        .from('files')
        .upload(
          `${user.id}/${new Date().getTime()}.${state.file.fileName}`,
          state.file,
          {
            contentType,
          },
        );
      console.log(data, error);
      if (error) {
        setState({...state, uploadError: error.message});
      } else {
        await supabase
          .from('profile')
          .update({profile_picture: data?.path})
          .eq('user_id', user.id);
        setState({...state, file: null});
        props.navigation.navigate('Profile');
      }
    } catch (error) {
      console.error(error);
      setState({...state, uploadError: error.message});
    } finally {
      setState({...state, uploading: false});
    }
  };

  return (
    <View style={styles.container}>
      {state.file ? (
        <View>
          <Card style={{marginTop: 20}}>
            <Card.Cover
              source={{uri: state.file.uri}}
              resizeMode="center"
              style={styles.customCover}
            />
            <Text>Nome do arquivo: {state.file.fileName}</Text>
          </Card>
          <Button
            style={styles.buttonCustomStyle}
            onPress={handleUpload}
            mode="contained">
            Upload
          </Button>
        </View>
      ) : (
        <View>
          <Button
            style={styles.buttonCustomStyle}
            onPress={handleCamera}
            mode="contained">
            Take Photo
          </Button>
          <Button
            style={styles.buttonCustomStyle}
            onPress={handleGallery}
            mode="contained">
            Select from Gallery
          </Button>
        </View>
      )}
      {state.uploading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Text>{state.uploadError}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#151515',
    height: '100%',
  },
  buttonCustomStyle: {
    marginTop: 40,
    color: 'black',
  },
  customCover: {
    height: 250,
  },
});

export default UploadFile;
