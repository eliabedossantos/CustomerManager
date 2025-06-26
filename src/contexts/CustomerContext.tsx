import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Customer, createCustomer as createCustomerService } from '../services/customer';

type CustomerContextData = {
  customers: Customer[];
  addCustomer: (data: Omit<Customer, 'id'>) => Promise<void>;
};

const CustomerContext = createContext<CustomerContextData>({} as CustomerContextData);

export function CustomerProvider({ children }: { children: ReactNode }) {
  const [customers, setCustomers] = useState<Customer[]>([]);

  async function addCustomer(data: Omit<Customer, 'id'>) {
    const newCustomer = await createCustomerService(data);
    setCustomers((prev) => [...prev, newCustomer]);
  }

  return (
    <CustomerContext.Provider value={{ customers, addCustomer }}>
      {children}
    </CustomerContext.Provider>
  );
}

export function useCustomer() {
  return useContext(CustomerContext);
} 