import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

import signInBackgroundImg from '../../assets/sign-in-background.png';

export const Container = styled.div`
  /* assume a altura total da viewport da tela */
  height: 100vh;

  display: flex; /* ficam um ao lado do outro (background e content) */
  align-items: stretch; /* estica o maximo que puder */
`;

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* centraliza ao eixo vertical e horizontal */
  /* place-content: center; */
  justify-content: center;

  width: 100%;
  max-width: 700px;

  animation: ${appearFromLeft} 0.5s;
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

    a {
      display: block;
      margin-top: 24px;
      color: #f4ede8;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
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
      color: ${shade(0.2, '#ff9000')};
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${signInBackgroundImg}) no-repeat center;
  background-size: cover;
`;
