import React, {useState} from 'react';
import {
  Button as PaperButton,
  Card,
  Paragraph,
  TextInput,
  Title,
} from 'react-native-paper';

import {StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
// import PaymentConfirmationModal from './PaymentConfirmationModal';
import axios from '../../config/axios';
import {RootStack} from '../../App';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {PaperSelect} from 'react-native-paper-select';

type PremiumFormScreenNavigationProp = NativeStackScreenProps<
  RootStack,
  'PremiumForm'
>;

const PremiumFormCustomer = (props: PremiumFormScreenNavigationProp) => {
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [locality, setLocality] = useState('');
  const [city, setCity] = useState('');
  const [regionCode, setRegionCode] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [taxId, setTaxId] = useState('');
  const [area, setArea] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [holderName, setHolderName] = useState('');
  const [expMonth, setExpMonth] = useState('');
  const [expYear, setExpYear] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [securityCode, setSecurityCode] = useState('');
  const [clientId, setClientId] = useState('');

  // const [showModal, setShowModal] = useState(false);

  const handleSubmit = () => {
    const data = {
      plan: {id: 'planId'},
      customer: {id: 'CUST_UUID'},
      coupon: {id: 'couponId'},
      amount: {value: 490, currency: 'BRL'},
      best_invoice_date: {day: 1, month: 12},
      reference_id: 'subscription-t',
      payment_method: {type: 'CREDIT_CARD', card: {security_code: '123'}},
      pro_rata: false,
    };

    axios
      .post(
        'https://sandbox.api.assinaturas.pagseguro.com/subscriptions',
        data,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.PAGSEGURO_VENDORTOKEN}`,
          },
        },
      )
      .then(response => {
        // console.log(process.env.PAGSEGURO_VENDORTOKEN, process.env.PLAN_ID);
        console.log(response.data);
        props.navigation.navigate('Home');
        // setShowModal(true);
      })
      .catch(error => {
        if (error.response) {
          console.error('Erro de resposta do servidor:', error.response.data);
        } else if (error.request) {
          console.error('Sem resposta do servidor:', error.request);
        } else {
          console.error('Erro ao configurar a requisição:', error.message);
        }
      });
  };

  return (
    <Card style={styles.card}>
      <Card.Content style={styles.cardContent}>
        <Title style={styles.title}>Assine por R$4,99 ao mês</Title>
        <Paragraph style={styles.paragraph}>
          Preencha os campos abaixo para criar sua assinatura.
        </Paragraph>
      </Card.Content>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <Paragraph style={styles.paragraph}>Selecione o cliente</Paragraph>
          <PaperSelect
            label="Select Gender"
            value={clientId}
            onSelection={(value: any) => {
              setId({
                ...gender,
                value: value.text,
                selectedList: value.selectedList,
                error: '',
              });
            }}
            arrayList={[...gender.list]}
            selectedArrayList={gender.selectedList}
            errorText={gender.error}
            multiEnable={false}
            dialogTitleStyle={{color: 'red'}}
            checkboxColor="yellow"
            checkboxLabelStyle={{color: 'red', fontWeight: '700'}}
            textInputBackgroundColor="yellow"
            textInputColor="red"
            outlineColor="black"
            theme={{
              colors: {
                placeholder: 'black',
              },
            }}
          />
          <TextInput
            style={styles.input}
            label="Nome"
            value={name}
            onChangeText={setName}
            mode="outlined"
          />
          <TextInput
            style={styles.input}
            label="CPF"
            value={taxId}
            onChangeText={setTaxId}
            mode="outlined"
          />
          <TextInput
            style={styles.input}
            label="DDD"
            value={area}
            onChangeText={setArea}
            mode="outlined"
          />
          <TextInput
            style={styles.input}
            label="Número de Telefone"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            mode="outlined"
          />
          <TextInput
            style={styles.input}
            label="Data de Nascimento (YYYY-MM-DD)"
            value={birthDate}
            onChangeText={setBirthDate}
            mode="outlined"
          />
          <Paragraph style={styles.paragraph}>Dados de Endereço</Paragraph>
          <TextInput
            style={styles.input}
            label="Rua"
            value={street}
            onChangeText={setStreet}
            mode="outlined"
          />
          <TextInput
            style={styles.input}
            label="Numero"
            value={number}
            onChangeText={setNumber}
            mode="outlined"
          />
          <TextInput
            style={styles.input}
            label="Complemento"
            value={complement}
            onChangeText={setComplement}
            mode="outlined"
          />
          <TextInput
            style={styles.input}
            label="Bairro"
            value={locality}
            onChangeText={setLocality}
            mode="outlined"
          />
          <TextInput
            style={styles.input}
            label="Cidade"
            value={city}
            onChangeText={setCity}
            mode="outlined"
          />
          <TextInput
            style={styles.input}
            label="Estado"
            value={regionCode}
            onChangeText={setRegionCode}
            mode="outlined"
          />
          <TextInput
            style={styles.input}
            label="CEP"
            value={postalCode}
            onChangeText={setPostalCode}
            mode="outlined"
          />
          <Paragraph style={styles.paragraph}>Dados do Cartão</Paragraph>
          <TextInput
            style={styles.input}
            label="Nome no Cartão"
            value={holderName}
            onChangeText={setHolderName}
            mode="outlined"
          />
          <TextInput
            style={styles.input}
            label="Ano de expiração"
            value={expYear}
            onChangeText={setExpYear}
            mode="outlined"
          />
          <TextInput
            style={styles.input}
            label="Mês de expiração"
            value={expMonth}
            onChangeText={setExpMonth}
            mode="outlined"
          />
          <TextInput
            style={styles.input}
            label="Número do cartão = 5555666677778884"
            value={cardNumber}
            onChangeText={setCardNumber}
            mode="outlined"
          />
          <TextInput
            style={styles.input}
            label="Código de segurança"
            value={securityCode}
            onChangeText={setSecurityCode}
            mode="outlined"
          />
          <PaperButton
            style={styles.button}
            onPress={handleSubmit}
            mode="contained">
            Assinar
          </PaperButton>
          {/* <PaymentConfirmationModal
            visible={showModal}
            onDismiss={() => setShowModal(false)}
          /> */}
        </View>
      </ScrollView>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    flex: 1,
    backgroundColor: 'white',
  },
  cardContent: {
    padding: 16,
  },
  scrollViewContent: {
    flexGrow: 1,
    // padding: 16,/////
  },
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
  },
  paragraph: {
    marginBottom: 0,
    color: 'black',
  },
  input: {
    marginBottom: 10,
    backgroundColor: '#F5F5DC',
  },
  button: {
    marginTop: 10,
    backgroundColor: '#6A5ACD',
  },
});

export default PremiumFormCustomer;
