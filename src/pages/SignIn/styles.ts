import styled from 'styled-components';
import { shade } from 'polished';

import signInBackgroundImg from '../../assets/sign-in-background.png';

export const Container = styled.div`
  /* assume a altura total da viewport da tela */
  height: 100vh;

  display: flex; /* ficam um ao lado do outro (background e content) */
  align-items: stretch; /* estica o maximo que puder */
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* centraliza ao eixo vertical e horizontal */
  /* place-content: center; */
  justify-content: center;

  width: 100%;
  max-width: 700px;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }

    input {
      background: #232129;
      border: 2px solid #232129;
      color: #f4ede8;
      border-radius: 10px;
      padding: 16px;
      width: 100%;

      &::placeholder {
        color: #666360;
      }

      & + input {
        margin-top: 5px;
      }
    }

    button {
      background: #ff9000;
      height: 56px;
      border: 0;
      border-radius: 10px;
      padding: 0 16px;
      color: #312e38;
      width: 100%;
      font-weight: 500;
      margin-top: 16px;
      transition: background-color 0.2s;

      &:hover {
        background: ${shade(0.2, '#ff9000')}
      }

    }

    a {
      display: block;
      margin-top: 24px;
      color: #f4ede8;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#f4ede8')}
      }
    }
  }

  /** referencia apenas as ancoras fora do form e não olha para os niveis adentro  */
  > a {
    display: block;
    margin-top: 24px;
    color: #ff9000;
    text-decoration: none;
    transition: color 0.2s;

    display: flex;
    align-items: center;

    & svg {
      margin-right: 16px;
    }

    &:hover {
      color: ${shade(0.2, '#ff9000')}
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${signInBackgroundImg}) no-repeat center;
  background-size: cover;
`;
