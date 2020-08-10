import React, { FC } from 'react';
import { Button } from 'react-native';

import { useAuth } from '../../hooks/Auth';
import { Container } from './styles';

const Dashboard: FC = () => {
  const { signOut } = useAuth();
  return (
    <Container>
      <Button title="Sair" onPress={signOut} />
    </Container>
  );
};

export default Dashboard;
