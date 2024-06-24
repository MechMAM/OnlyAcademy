import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';
import {faker} from '@faker-js/faker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {ScrollView} from 'react-native-gesture-handler';
import {useAuth} from '../../provider/AuthProvider';
import {supabase} from '../../config/initSupabase';

interface ProfilePageProps {
  // Add props if needed
}

interface UploadFileState {
  firstName: string | null;
  lastName: string | null;
  bio: string | null;
}

const ProfilePage: React.FC<ProfilePageProps> = () => {
  const avatarUrl: string = faker.image.avatar();
  const avatarImageSource = {uri: avatarUrl};

  const postImageUrl: string = faker.image.url();
  const postImageSource = {uri: postImageUrl};
  const [profile, setProfile] = useState<UploadFileState>({
    firstName: '',
    lastName: '',
    bio: '',
  });
  const {user} = useAuth();

  useEffect(() => {
    const getData = async () => {
      let {data: fetchedProfile, error} = await supabase
        .from('profile')
        .select('first_name, last_name, bio')
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
      });
    };
    getData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View>
        <Avatar.Image size={100} source={avatarImageSource} />
        <Text
          style={{
            color: 'white',
          }}>{`${profile.firstName} ${profile.lastName}`}</Text>
        <Card style={{marginTop: 20}}>
          {/* <Card.Cover source={postImageSource} /> */}
          <Card.Content>
            <Title>Sobre mim: </Title>
            <Paragraph>{profile.bio}</Paragraph>
          </Card.Content>
        </Card>

        {/* Display user's posts */}
        <Card style={{marginTop: 20}}>
          <Card.Cover source={postImageSource} />
          <Card.Content>
            <Title>{faker.lorem.lines({min: 1, max: 1})}</Title>
            <Paragraph>{faker.lorem.paragraph()}</Paragraph>
          </Card.Content>
        </Card>

        {/* Add more components for followers, following, etc. */}
      </View>
      <View style={styles.fab}>
        <TouchableOpacity>
          <Icon name="user-edit" size={20} color={'#fff'} />
        </TouchableOpacity>
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
    position: 'absolute',
    bottom: 512,
    right: 10,
    height: 40,
    backgroundColor: '#2b825b',
    borderRadius: 100,
  },
});
