import React, {FC, InputHTMLAttributes} from 'react';

import { Container } from './styles'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string; // torna a prop name obrigatória para o nosso input
}

const Input: FC<InputProps> = (props) => <Container><input {...props} /></Container>

export default Input;
