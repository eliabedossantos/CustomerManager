export type Customer = {
  id: string;
  name: string;
  email: string;
  birth: string;
};

const FAKE_API_RESPONSE = {
    data: {
      clientes: [
        {
          info: {
            nomeCompleto: "Ana Beatriz",
            detalhes: {
              email: "ana.b@example.com",
              nascimento: "1992-05-01"
            }
          },
          estatisticas: {
            vendas: [
              { data: "2024-01-01", valor: 150 },
              { data: "2024-01-02", valor: 50 }
            ]
          }
        },
        {
          info: {
            nomeCompleto: "Carlos Eduardo",
            detalhes: {
              email: "cadu@example.com",
              nascimento: "1987-08-15"
            }
          },
          duplicado: {
            nomeCompleto: "Carlos Eduardo"
          },
          estatisticas: {
            vendas: []
          }
        }
      ]
    },
    meta: { registroTotal: 2, pagina: 1 },
    redundante: { status: "ok" }
  };
  
export async function fetchCustomers(): Promise<typeof FAKE_API_RESPONSE> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return FAKE_API_RESPONSE;
} 

export async function createCustomer(data: Omit<Customer, 'id'>): Promise<Customer> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    ...data,
    id: Math.random().toString(36).substring(2, 10),
  };
} 