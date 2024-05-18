import {View} from 'react-native';
import React from 'react';
import {Button, Divider, Text} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

export default function Payment() {
  const navigation = useNavigation();

  return (
    <View>
      <Button mode="contained" onPress={() => navigation.navigate('Home')}>
        Plano gratuito
      </Button>
      <Text style={{color: 'black'}}>Conteúdo grátis pra sempre</Text>
      <Divider style={{marginTop: 20, marginBottom: 20}} />
      <Button mode="contained">Plano Pop</Button>
      <Text style={{color: 'black'}}>Plano intermediário, R$ 5,00 mensais</Text>
      <Divider style={{marginTop: 20, marginBottom: 20}} />
      <Button mode="contained">Plano Premium</Button>
      <Text style={{color: 'black'}}>
        Tudo que você sempre quis por apenas R$ 9,90
      </Text>
      <Divider style={{marginTop: 20, marginBottom: 20}} />
    </View>
  );
}
