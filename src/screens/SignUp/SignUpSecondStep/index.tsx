import React, { useState } from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  StatusBar,
  TouchableWithoutFeedback,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { PasswordInput } from '../../../components/PasswordInput';
import { Button } from '../../../components/Button';

import {
  Container,
  Header,
  Steps,
  Title,
  Subtitle,
  Form,
  FormTitle,
} from './styles';
import { useTheme } from 'styled-components';
import api from '../../../services/api';

interface Params {
  user: {
    name: string;
    email: string;
    driverLicense: string;
  };
}

export function SignUpSecondStep() {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const navigation = useNavigation<any>();
  const route = useRoute();
  const theme = useTheme();

  const { user } = route.params as Params;

  function handleBack() {
    navigation.goBack();
  }

  async function handleRegister() {
    if (!password || !passwordConfirm) {
      return Alert.alert(
        'Senha não informada',
        'Informe a senha e a confirmação'
      );
    }

    if (password != passwordConfirm) {
      return Alert.alert('Senhas diferentes', 'As senhas diferem entre si');
    }

    await api
      .post('/users', {
        name: user.name,
        email: user.email,
        password,
        driver_license: user.driverLicense,
      })
      .then(() => {
        navigation.navigate('Confirmation', {
          title: 'Conta criada!',
          message: `É só fazer login\ne aproveitar.`,
          nextScreenRoute: 'SignIn',
        });
      })
      .catch(() => {
        Alert.alert('Ops...', 'Não foi possível cadastrar');
      });
  }

  return (
    <KeyboardAvoidingView behavior='position' enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <StatusBar
            barStyle='dark-content'
            backgroundColor='transparent'
            translucent
          />
          <Header>
            <BackButton onPress={handleBack} />

            <Steps>
              <Bullet active />
              <Bullet />
            </Steps>
          </Header>

          <Title>Crie sua{'\n'}conta</Title>
          <Subtitle>
            Faça seu cadastro de{'\n'}
            forma rápida e fácil.
          </Subtitle>

          <Form>
            <FormTitle>2. Senha</FormTitle>

            <PasswordInput
              iconName='lock'
              placeholder='Senha'
              onChangeText={setPassword}
              value={password}
            />
            <PasswordInput
              iconName='lock'
              placeholder='Repetir senha'
              onChangeText={setPasswordConfirm}
              value={passwordConfirm}
            />
          </Form>

          <Button
            title='Cadastrar'
            color={theme.colors.success}
            onPress={handleRegister}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
