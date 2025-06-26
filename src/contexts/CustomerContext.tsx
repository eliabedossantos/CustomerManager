import React, { createContext, useContext, useState, ReactNode } from 'react';
import { fetchCustomers as fetchCustomersApi, createCustomer as createCustomerApi } from '../services/customer';
import { parseCustomerApiResponse, Cliente } from '../utils/parseCustomerApi';

interface CustomerContextData {
  customers: Cliente[];
  loading: boolean;
  refreshing: boolean;
  fetchCustomers: () => Promise<void>;
  addCustomer: (data: Omit<Cliente, 'vendas'>) => Promise<void>;
}

const CustomerContext = createContext<CustomerContextData>({} as CustomerContextData);

export function CustomerProvider({ children }: { children: ReactNode }) {
  const [customers, setCustomers] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  async function fetchCustomers() {
    if (loading) return;
    setLoading(true);
    const response = await fetchCustomersApi();
    const parsed = parseCustomerApiResponse(response);
    setCustomers(parsed);
    setLoading(false);
  }

  async function addCustomer(data: Omit<Cliente, 'vendas'>) {
    await createCustomerApi({
      name: data.nome,
      email: data.email,
      birth: data.nascimento,
    });
  }

  return (
    <CustomerContext.Provider value={{
      customers,
      loading,
      refreshing,
      fetchCustomers,
      addCustomer,
    }}>
      {children}
    </CustomerContext.Provider>
  );
}

export function useCustomer() {
  return useContext(CustomerContext);
} 