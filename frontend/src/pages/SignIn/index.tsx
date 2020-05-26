import React, { FC, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

import { useAuth } from '../../hooks/Auth';
import { useToast } from '../../hooks/Toast';

import validationErrors from '../../utils/validationErrors';

import { Container, Content, AnimationContainer, Background } from './styles';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: FC = () => {
  const { signIn, user } = useAuth();
  const { addToast } = useToast();
  const formRef = useRef<FormHandles>(null);

  console.log(user);

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Insira seu e-mail')
            .email('Esse e-mail não é válido'),
          password: Yup.string().required('Insira sua senha'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({ email: data.email, password: data.password });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          console.log(error);
          const validations = validationErrors(error);
          formRef.current?.setErrors(validations);
          return;
        }

        addToast({
          type: 'error',
          title: 'Autenticação',
          description:
            'Não foi possível fazer login. Verifique suas credenciais',
        });
      }
    },
    [addToast, signIn],
  );

  return (
    <Container>
      <AnimationContainer>
        <Content>
          <img src={logoImg} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu login</h1>

            <Input name="email" icon={FiMail} placeholder="E-mail" />

            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />

            <Button type="submit">Entrar</Button>

            <a href="forgot">Esqueci minha senha</a>
          </Form>

          <Link to="/signup">
            <FiLogIn />
            Criar conta
          </Link>
        </Content>
      </AnimationContainer>
      <Background />
    </Container>
  );
};

export default SignIn;
