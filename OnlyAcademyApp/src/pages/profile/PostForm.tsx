import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {TextInput, Button, Text, Card} from 'react-native-paper';
import {supabase} from '../../config/initSupabase';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {RootStack} from '../../App';
import {ScrollView} from 'react-native-gesture-handler';
import {useAuth} from '../../provider/AuthProvider';
import {launchImageLibrary} from 'react-native-image-picker';

type PostFormScreenNavigationProps = NativeStackScreenProps<
  RootStack,
  'PostForm'
>;

interface UploadFileState {
  file: null;
  uploading: boolean;
  uploadError: string | null;
  previewSource: string | null;
}

const PostForm = (props: PostFormScreenNavigationProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const {user} = useAuth();
  const [state, setState] = useState<UploadFileState>({
    file: null,
    uploading: false,
    uploadError: null,
    previewSource: null,
  });
  const [post, setPost] = useState();

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

  // const handleUpload = async () => {
  // };

  const handleSubmit = async () => {
    setState({...state, uploading: true});
    let imageUrl = '';
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
        imageUrl = data.path;
        console.log(post);
        setState({...state, file: null});
      }
    } catch (error) {
      console.error(error);
      setState({...state, uploadError: error.message});
    } finally {
      setState({...state, uploading: false});
    }
    try {
      const {data, error} = await supabase
        .from('posts')
        .insert([
          {
            user_id: user?.id,
            title: title,
            content: content,
            image_url: imageUrl,
          },
        ])
        .select();

      if (error) {
        console.error('Error inserting post:', error);
      } else {
        setPost(data[0]);
        console.log('Post inserted:', data);
        props.navigation.navigate('Profile');
      }
    } catch (error) {
      console.error('Error inserting post:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Button
        style={styles.buttonCustomStyle}
        onPress={handleGallery}
        mode="contained">
        Selecione sua foto
      </Button>
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
        </View>
      ) : (
        <></>
      )}
      <TextInput
        label="Digite o título do seu post"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        label="Sobre o que você está postando?"
        value={content}
        onChangeText={setContent}
        style={styles.input}
      />
      <Button
        mode="contained"
        onPress={handleSubmit}
        style={styles.input}
        buttonColor="#36099f"
        textColor="#fff">
        Criar Post
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    padding: 16,
    backgroundColor: '#151515',
    height: '100%',
  },
  input: {
    marginVertical: 8,
  },
  texto: {
    marginVertical: 15,
    color: 'black',
  },
  buttonCustomStyle: {
    marginTop: 40,
    color: 'black',
  },
  customCover: {
    height: 250,
  },
});

export default PostForm;
