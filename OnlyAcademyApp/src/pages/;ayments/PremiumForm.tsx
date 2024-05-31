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
import PaymentConfirmationModal from './PaymentConfirmationModal';
import axios from '../../config/axios';

const PremiumMonthPayment = () => {
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

  const [showModal, setShowModal] = useState(false);

  const handleSubmit = () => {
    const data = {
      plan: {id: 'PLAN_AE711F3E-F06B-465B-BCEB-93BB679542FE'},
      customer: {
        address: {
          street: street,
          number: number,
          complement: complement,
          locality: locality,
          city: city,
          region_code: 'PR',
          country: 'BRA',
          postal_code: postalCode,
        },
        email: email,
        name: name,
        tax_id: taxId,
        phones: [{area: area, country: '55', number: phoneNumber}],
        birth_date: birthDate,
        billing_info: [
          {
            card: {
              holder: {
                name: holderName,
                birth_date: birthDate,
                tax_id: taxId,
              },
              exp_year: expYear,
              exp_month: expMonth,
              number: cardNumber,
            },
            type: 'CREDIT_CARD',
          },
        ],
      },
      amount: {value: 199, currency: 'BRL'},
      reference_id: 'subscription-h',
      payment_method: [
        {type: 'CREDIT_CARD', card: {security_code: securityCode}},
      ],
      pro_rata: false,
    };

    console.log(data);

    axios
      .post(
        'https://sandbox.api.assinaturas.pagseguro.com/subscriptions',
        data,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.PAGSEGURO_TOKEN}`,
          },
        },
      )
      .then(response => {
        console.log(response.data);
        setShowModal(true);
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
        <Title style={styles.title}>Assine por R$1,99 ao mês</Title>
        <Paragraph style={styles.paragraph}>
          Preencha os campos abaixo para criar sua assinatura.
        </Paragraph>
      </Card.Content>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
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
          <Paragraph style={styles.paragraph}>Dados Pessoais</Paragraph>
          <TextInput
            style={styles.input}
            label="E-mail"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
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
            label="Número do cartão = 4012001037141112"
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
          <PaymentConfirmationModal
            visible={showModal}
            onDismiss={() => setShowModal(false)}
          />
        </View>
      </ScrollView>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    flex: 1,
    // backgroundColor: '#F5F5DC',
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
    // color: 'black',
  },
  paragraph: {
    marginBottom: 0,
    // color: 'black',
  },
  input: {
    marginBottom: 10,
    // backgroundColor: '#F5F5DC',
  },
  button: {
    marginTop: 10,
    // backgroundColor: '#6A5ACD',
  },
});

export default PremiumMonthPayment;
