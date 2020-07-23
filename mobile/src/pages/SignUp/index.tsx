import React, { FC, useCallback, useRef } from 'react';
import {
  Image,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Alert,
} from 'react-native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Feather';
import validationErrors from '../../utils/validationErrors';
import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.png';
import {
  Container,
  Title,
  BackToSignInButton,
  BackToSignInButtonText,
} from './styles';

interface SignUpData {
  name: string;
  email: string;
  password: string;
}

const SignIn: FC = () => {
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const handleSignUp = useCallback(async (data: SignUpData) => {
    try {
      // eslint-disable-next-line no-unused-expressions
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string().min(8, 'Senha deve ter no mínimo 8 dígitos'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      // await api.post('/users', data);

      Alert.alert('Cadastro realizado', 'Você já pode fazer login');

      navigation.goBack();
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        console.log(error);
        const validations = validationErrors(error);
        // eslint-disable-next-line no-unused-expressions
        formRef.current?.setErrors(validations);
        return;
      }

      Alert.alert(
        'Autenticação',
        'Não foi possível fazer o cadastro. Tente novamente mais tarde.',
      );
    }
  }, []);

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <Container>
            <Image source={logoImg} />

            <View>
              {/* View por volta para acompanhar animação do KeyboardAvoidingView */}
              <Title>Criar sua conta</Title>
            </View>

            <Form onSubmit={handleSignUp} ref={formRef}>
              <Input
                name="name"
                icon="user"
                placeholder="Nome"
                autoCapitalize="words"
                returnKeyType="next"
                onSubmitEditing={() => emailInputRef.current?.focus()}
              />
              <Input
                ref={emailInputRef}
                name="email"
                icon="mail"
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
                onSubmitEditing={() => passwordInputRef.current?.focus()}
              />
              <Input
                ref={passwordInputRef}
                name="password"
                icon="lock"
                placeholder="Senha mínimo 6 dígitos"
                returnKeyType="send"
                secureTextEntry
                onSubmitEditing={() => formRef.current?.submitForm()}
                textContentType="newPassword"
              />
            </Form>
            <Button onPress={() => formRef.current?.submitForm()}>
              Entrar
            </Button>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      <BackToSignInButton onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={20} color="#fff" />
        <BackToSignInButtonText>Voltar para login</BackToSignInButtonText>
      </BackToSignInButton>
    </>
  );
};

export default SignIn;
