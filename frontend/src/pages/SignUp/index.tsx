import React, { FC, useCallback, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft, FiUser, FiLock, FiMail } from 'react-icons/fi';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useToast } from '../../hooks/Toast';
import api from '../../services/api';

import validationErrors from '../../utils/validationErrors';

import { Container, Content, AnimationContainer, Background } from './styles';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

interface SignUpData {
  name: string;
  email: string;
  password: string;
}

const SignUp: FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignUpData) => {
      try {
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

        await api.post('/users', data);

        addToast({
          type: 'success',
          title: 'Cadastro realizado',
          description: 'Agora você pode fazer login no GoBarber!',
        });

        history.push('/');
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
          description: 'Não foi possível fazer o cadastro. Tente novamente mais tarde.',
        });
      }
    },
    [addToast],
  );

  return (
    <Container>
      <Background />
      <AnimationContainer>
        <Content>
          <img src={logoImg} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu cadastro</h1>

            <Input name="name" icon={FiUser} placeholder="Nome" />
            <Input name="email" icon={FiMail} placeholder="E-mail" />

            <Input name="password" icon={FiLock} type="password" placeholder="Senha" />

            <Button type="submit">Cadastrar</Button>
          </Form>

          <Link to="/">
            <FiArrowLeft />
            Voltar para login
          </Link>
        </Content>
      </AnimationContainer>
    </Container>
  );
};

export default SignUp;
