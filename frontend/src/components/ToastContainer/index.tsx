import React, { FC } from 'react';
import { useTransition } from 'react-spring';
import { ToastMessage } from '../../hooks/Toast';

import Toast from './Toast';

import { Container } from './styles';

interface ToastContainerProps {
  messages: ToastMessage[];
}

const ToastContainer: FC<ToastContainerProps> = ({ messages }) => {
  const messagesWithTransitions = useTransition(
    messages,
    message => message.id,
    {
      from: { right: '-110%' },
      enter: { right: '0%' },
      leave: { right: '-110%' },
    },
  );

  return (
    <Container>
      {messagesWithTransitions.map(({ item: message, key, props }) => (
        <Toast key={key} message={message} style={props} />
      ))}
    </Container>
  );
};

export default ToastContainer;
