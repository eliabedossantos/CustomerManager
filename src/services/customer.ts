import { MOCK_API_RESPONSE } from "./mock";
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Customer = {
  id: string;
  name: string;
  email: string;
  birth: string;
};

const STORAGE_KEY = 'created_customers';

function toMockFormat(customer: Customer) {
  return {
    info: {
      nomeCompleto: customer.name,
      detalhes: {
        email: customer.email,
        nascimento: customer.birth,
      }
    },
    estatisticas: {
      vendas: []
    }
  };
}

export async function createCustomer(data: Omit<Customer, 'id'>): Promise<Customer> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const newCustomer: Customer = {
    ...data,
    id: Math.random().toString(36).substring(2, 10),
  };

  const stored = await AsyncStorage.getItem(STORAGE_KEY);
  const arr = stored ? JSON.parse(stored) : [];
  arr.push(newCustomer);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(arr));

  return newCustomer;
}

export async function fetchCustomers(): Promise<any> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const stored = await AsyncStorage.getItem(STORAGE_KEY);
  const createdCustomers: Customer[] = stored ? JSON.parse(stored) : [];
  const createdInMockFormat = createdCustomers.map(toMockFormat);
  const all = {
    ...MOCK_API_RESPONSE,
    data: {
      ...MOCK_API_RESPONSE.data,
      clientes: [
        ...MOCK_API_RESPONSE.data.clientes,
        ...createdInMockFormat
      ]
    }
  };

  return all;
} 