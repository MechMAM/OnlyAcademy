import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';
import {faker} from '@faker-js/faker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {ScrollView} from 'react-native-gesture-handler';
import {useAuth} from '../../provider/AuthProvider';
import {supabase} from '../../config/initSupabase';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {RootStack} from '../../App';
import {useIsFocused} from '@react-navigation/native';
import ImageItem from '../../components/ImageItem';
import {FileObject} from '@supabase/storage-js';

interface UploadFileState {
  firstName: string | null;
  lastName: string | null;
  bio: string | null;
  profile_picture: string | null;
}

type ProfilePageScreenProps = NativeStackScreenProps<RootStack, 'Profile'>;

const ProfilePage = (props: ProfilePageScreenProps) => {
  const [avatarUrl, setAvatarUrl] = useState('string');
  const [avatarImage, setAvatarImage] = useState(null);

  const postImageUrl: string = faker.image.url();
  const [profile, setProfile] = useState<UploadFileState>({
    firstName: '',
    lastName: '',
    bio: '',
    profile_picture: '',
  });
  const [posts, setPosts] = useState([]);
  const {user} = useAuth();
  const isFocused = useIsFocused();

  const getData = async () => {
    let {data: fetchedProfile, error} = await supabase
      .from('profile')
      .select('first_name, last_name, bio, profile_picture')
      .eq('user_id', user.id);
    if (error) {
      console.log(error);
      return;
    }
    setProfile({
      ...profile,
      firstName: fetchedProfile[0].first_name,
      lastName: fetchedProfile[0].last_name,
      bio: fetchedProfile[0].bio,
      profile_picture: fetchedProfile[0].profile_picture,
    });
    console.log({profile});
  };

  const getPosts = async () => {
    let {data: fetchedPosts, error} = await supabase
      .from('posts')
      .select('id, title, content, image_url, likes, shares')
      .eq('user_id', user.id);
    setPosts(fetchedPosts);
    console.log(fetchedPosts);
  };

  useEffect(() => {
    getData();
    getPosts();
  }, [isFocused]);

  useEffect(() => {
    const loadImage = async () => {
      const {data, error} = await supabase.storage
        .from('files')
        .download(`${profile.profile_picture}`)
        .then(({data}) => {
          const fr = new FileReader();
          fr.readAsDataURL(data!);
          fr.onload = () => {
            setAvatarImage(fr.result as string);
          };
        });
      if (error) {
        console.log(error);
      }
    };
    loadImage();
  }, [profile]);

  const onRemoveImage = async (url, id) => {
    const {error: error2} = await supabase.from('posts').delete().eq('id', id);
    if (error2) {
      console.log(error2);
    }
    const {error: error1} = await supabase.storage.from('files').remove([url]);
    if (error1) {
      console.log(error1);
    }
    getPosts();
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('UploadFile')}>
          <Avatar.Image size={100} source={{uri: avatarImage}} />
        </TouchableOpacity>
        <Text
          style={{
            color: 'white',
          }}>{`${profile.firstName} ${profile.lastName}`}</Text>
        <Card style={{marginTop: 20}}>
          {/* <Card.Cover source={postImageSource} /> */}
          <Card.Content>
            <View style={styles.fab}>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('UserForm')}>
                <Icon name="user-edit" size={20} color={'#fff'} />
              </TouchableOpacity>
            </View>
            <Title>Sobre mim: </Title>
            <Paragraph>{profile.bio}</Paragraph>
          </Card.Content>
        </Card>

        {/* Display user's posts */}
        <View style={styles.fab}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('PostForm')}>
            <Icon name="folder-plus" size={20} color={'#fff'} />
          </TouchableOpacity>
        </View>

        {posts.map((post, index) => (
          <View style={{marginBottom: 20}}>
            <Card style={{marginTop: 20, marginBottom: 20}}>
              <ImageItem
                key={post.id}
                item={post.image_url}
                // userId={user!.id}
                onRemoveImage={async () => {
                  console.log(post.image_url, post.id);
                  await onRemoveImage(post.image_url, post.id);
                }}
              />
              <Card.Content>
                <Title style={styles.customTitle}>{post.title}</Title>
                <Paragraph style={styles.customTitle}>{post.content}</Paragraph>
                <Paragraph>Likes: {post.likes}</Paragraph>
                <Paragraph>Shares: {post.shares}</Paragraph>
              </Card.Content>
            </Card>
          </View>
        ))}
        {/* <Card.Cover source={{uri: postImageUrl}} /> */}

        {/* Add more components for followers, following, etc. */}
      </View>
    </ScrollView>
  );
};

export default ProfilePage;

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
    margin: 20,
  },
  customTitle: {
    marginBottom: 20,
  },
});
