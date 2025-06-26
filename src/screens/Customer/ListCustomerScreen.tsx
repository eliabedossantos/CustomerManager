import React, { useEffect } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { VStack, Spinner } from 'native-base';
import { useCustomer } from '../../contexts/CustomerContext';
import CustomerListItem from '../../components/CustomerListItem';

export default function ListCustomerScreen() {
  const { customers, loading, fetchCustomers } = useCustomer();

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <VStack flex={1} bg="white" px={4} pt={4}>
      <FlatList
        data={customers}
        keyExtractor={(_, idx) => String(idx)}
        renderItem={({ item }) => (
          <CustomerListItem
            nome={item.nome}
            email={item.email}
            nascimento={item.nascimento}
          />
        )}
        ListFooterComponent={loading ? <Spinner mt={4} /> : null}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={() => fetchCustomers()} />
        }
      />
    </VStack>
  );
}
