import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Button, Divider, Text} from 'react-native-paper';
import {RootStack} from '../../App';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';

type PaymentScreenNavigationProp = NativeStackScreenProps<RootStack, 'Payment'>;

export default function Payment(props: PaymentScreenNavigationProp) {
  return (
    <View style={styles.container}>
      <Button
        style={styles.buttonStyle}
        mode="contained"
        onPress={() => props.navigation.navigate('Home')}>
        Plano gratuito
      </Button>
      <Text>Conteúdo grátis pra sempre</Text>
      <Divider style={styles.buttonStyle} />
      <Button
        style={styles.buttonStyle}
        mode="contained"
        onPress={() => props.navigation.navigate('PremiumForm')}>
        Plano Premium
      </Button>
      <Text>Tudo que você sempre quis por apenas R$ 4,90 mensais</Text>
      <Divider style={styles.buttonStyle} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#151515',
    height: '100%',
  },
  buttonStyle: {
    marginBottom: 20,
    marginTop: 20,
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
  },
});
