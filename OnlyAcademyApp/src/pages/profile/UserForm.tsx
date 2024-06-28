import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {TextInput, Button, Text} from 'react-native-paper';
import {DatePickerModal} from 'react-native-paper-dates';
import {supabase} from '../../config/initSupabase';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {RootStack} from '../../App';
import {ScrollView} from 'react-native-gesture-handler';
import {useAuth} from '../../provider/AuthProvider';

type UserFormScreenNavigationProps = NativeStackScreenProps<
  RootStack,
  'UserForm'
>;

const UserForm = (props: UserFormScreenNavigationProps) => {
  const [id, setId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [birthdate, setBirthdate] = useState<Date | null>(null);
  const [open, setOpen] = useState(false);
  const {user} = useAuth();

  const onDismissSingle = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirmSingle = React.useCallback(
    params => {
      setOpen(false);
      setBirthdate(params.date);
    },
    [setOpen, setBirthdate],
  );

  useEffect(() => {
    const getData = async () => {
      let {data: fetchedId, error} = await supabase
        .from('profile')
        .select('id')
        .eq('user_id', user.id);
      if (error) {
        console.log(error);
        return;
      }
      setId(fetchedId[0].id);
    };
    getData();
  }, [user]);

  const handleSubmit = async () => {
    try {
      console.log(id);
      const {data, error} = await supabase
        .from('profile')
        .upsert([
          {
            id: id,
            user_id: user?.id,
            first_name: firstName,
            last_name: lastName,
            bio: bio,
            location: location,
            birthdate: birthdate?.toISOString(),
          },
        ])
        .select();

      if (error) {
        console.error('Error inserting user:', error);
      } else {
        console.log('User inserted:', data);
        props.navigation.navigate('Home');
      }
    } catch (error) {
      console.error('Error inserting user:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* <View> */}
      <TextInput
        label="Digite seu Nome"
        value={firstName}
        onChangeText={setFirstName}
        style={styles.input}
      />
      <TextInput
        label="Digite seu Sobrenome"
        value={lastName}
        onChangeText={setLastName}
        style={styles.input}
      />
      <TextInput
        label="Conte sobre você"
        value={bio}
        onChangeText={setBio}
        style={styles.input}
        multiline={true}
      />
      <TextInput
        label="Qual sua localização"
        value={location}
        onChangeText={setLocation}
        style={styles.input}
      />
      <Button
        mode="contained"
        onPress={() => setOpen(true)}
        buttonColor="#2b825b"
        textColor="#fff"
        style={styles.input}>
        Data de Nascimento
      </Button>
      <Text style={styles.texto}>
        Data de nascimento: {birthdate?.toISOString()}
      </Text>
      <DatePickerModal
        locale="pt-br"
        mode="single"
        visible={open}
        onDismiss={onDismissSingle}
        date={birthdate || new Date()}
        onConfirm={onConfirmSingle}
      />
      <Button
        mode="contained"
        onPress={handleSubmit}
        style={styles.input}
        buttonColor="#36099f"
        textColor="#fff">
        Atualizar informações
      </Button>
      {/* </View> */}
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
});

export default UserForm;
