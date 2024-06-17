import React, {useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Button, Card, Paragraph, Text, Title} from 'react-native-paper';
import {supabase} from '../config/initSupabase';

interface UploadFileProps {
  // Add any props you need
}

interface UploadFileState {
  file: null;
  uploading: boolean;
  uploadError: string | null;
  previewSource: string | null;
}

const UploadFile: React.FC<UploadFileProps> = () => {
  const [state, setState] = useState<UploadFileState>({
    file: null,
    uploading: false,
    uploadError: null,
    previewSource: null,
  });

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
      console.log(process.env.SUPABASE_URL);
      const {data, error} = await supabase
        .from('profile-pictures')
        .upload(state.file.fileName, state.file, {
          cacheControl: 'public, max-age=31536000',
        });
      console.log(data);
      if (error) {
        setState({...state, uploadError: error.message});
      } else {
        setState({...state, file: null});
      }
    } catch (error) {
      setState({...state, uploadError: error.message});
    } finally {
      setState({...state, uploading: false});
    }
  };

  return (
    <View>
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
  buttonCustomStyle: {
    marginTop: 40,
    color: 'black',
  },
  customCover: {
    height: 250,
  },
});

export default UploadFile;
