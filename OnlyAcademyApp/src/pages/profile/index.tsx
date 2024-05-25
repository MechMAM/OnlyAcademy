import React from 'react';
import {View, Text} from 'react-native';
import {Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';
import {faker} from '@faker-js/faker';

interface ProfilePageProps {
  // Add props if needed
}

const ProfilePage: React.FC<ProfilePageProps> = () => {
  const avatarUrl: string = faker.image.avatar();
  const avatarImageSource = {uri: avatarUrl};

  const postImageUrl: string = faker.image.url();
  const postImageSource = {uri: postImageUrl};

  return (
    <View>
      <Avatar.Image size={100} source={avatarImageSource} />
      <Text style={{color: 'black'}}>{faker.person.fullName()}</Text>
      <Button mode="outlined" style={{marginTop: 20}}>
        Edit Profile
      </Button>

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
  );
};

export default ProfilePage;
