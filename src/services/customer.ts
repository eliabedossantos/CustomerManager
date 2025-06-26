export type Customer = {
  id: string;
  name: string;
  email: string;
  birth: string;
};

export async function createCustomer(data: Omit<Customer, 'id'>): Promise<Customer> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    ...data,
    id: Math.random().toString(36).substring(2, 10),
  };
} 