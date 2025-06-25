import React, { useEffect } from 'react';
import AppRoutes from './navigation/routes/AppRoutes';
import AuthRoutes from './navigation/routes/AuthRoutes';
import { Center, Spinner } from 'native-base';
import { useAuth } from './hooks/contexts';

export default function Routes() {
  const { user, loading } = useAuth();

  useEffect

  if (loading) {
    return (
      <Center flex={1}>
        <Spinner size="lg" />
      </Center>
    );
  }

  return user ? <AppRoutes /> : <AuthRoutes />;
}