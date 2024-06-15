import {View} from 'react-native';
import React from 'react';
import {Button, Divider, Text} from 'react-native-paper';
import {RootStack} from '../../App';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';

type PaymentScreenNavigationProp = NativeStackScreenProps<RootStack, 'Payment'>;

export default function Payment(props: PaymentScreenNavigationProp) {
  return (
    <View>
      <Button
        mode="contained"
        onPress={() => props.navigation.navigate('Home')}>
        Plano gratuito
      </Button>
      <Text style={{color: 'black'}}>Conteúdo grátis pra sempre</Text>
      <Divider style={{marginTop: 20, marginBottom: 20}} />
      <Button
        mode="contained"
        onPress={() => props.navigation.navigate('PremiumForm')}>
        Plano Premium
      </Button>
      <Text style={{color: 'black'}}>
        Tudo que você sempre quis por apenas R$ 4,90 mensais
      </Text>
      <Divider style={{marginTop: 20, marginBottom: 20}} />
    </View>
  );
}
