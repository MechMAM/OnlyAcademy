import {useState} from 'react';
import {supabase} from '../config/initSupabase';
import {Image, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Text} from 'react-native-paper';
import {FileObject} from '@supabase/storage-js';

const ImageItem = ({
  item,
  userId,
  onRemoveImage,
}: {
  item: FileObject;
  userId: string;
  onRemoveImage: () => void;
}) => {
  const [image, setImage] = useState<string>('');

  supabase.storage
    .from('files')
    .download(`${item}`)
    .then(({data}) => {
      const fr = new FileReader();
      fr.readAsDataURL(data!);
      fr.onload = () => {
        setImage(fr.result as string);
      };
    });

  return (
    <View
      style={{
        flexDirection: 'column',
        margin: 1,
        alignItems: 'center',
        gap: 5,
      }}>
      <TouchableOpacity
        onPress={onRemoveImage}
        style={{marginBottom: 10, marginTop: 10}}>
        <Icon name="trash-outline" size={20} color={'#fff'} />
      </TouchableOpacity>
      {image ? (
        <Image style={{width: '100%', height: 250}} source={{uri: image}} />
      ) : (
        <View style={{width: 80, height: 80, backgroundColor: '#1A1A1A'}} />
      )}
      <Text style={{flex: 1, color: '#fff'}}>{item.name}</Text>
      {/* Delete image button */}
    </View>
  );
};

export default ImageItem;
