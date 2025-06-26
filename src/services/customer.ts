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
            { data: "2024-01-08", valor: 75 }
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
        duplicado: { nomeCompleto: "Carlos Eduardo" },
        estatisticas: { vendas: [] }
      },
      {
        info: {
          nomeCompleto: "Juliana Costa",
          detalhes: {
            email: "juliana.c@example.com",
            nascimento: "1990-12-10"
          }
        },
        estatisticas: {
          vendas: [
            { data: "2024-01-04", valor: 220 },
            { data: "2024-01-10", valor: 180 },
            { data: "2024-01-12", valor: 90 }
          ]
        },
        comentarios: ["Cliente recorrente"],
        duplicado: { nomeCompleto: "Juliana Costa" }
      },
      {
        info: {
          nomeCompleto: "Bruno Silva",
          detalhes: {
            email: "bruno.s@example.com",
            nascimento: "1985-03-22"
          }
        },
        estatisticas: {
          vendas: [
            { data: "2024-02-02", valor: 320 }
          ]
        },
        extra: { test: "thats a test" }
      },
      {
        info: {
          nomeCompleto: "Fernanda Albuquerque",
          detalhes: {
            email: "fer.alb@example.com",
            nascimento: "1995-07-30"
          }
        },
        estatisticas: { vendas: [] },
        duplicado: { nomeCompleto: "Fernanda Albuquerque" }
      },
      {
        info: {
          nomeCompleto: "Mariana Lopes",
          detalhes: {
            email: "mariana.l@example.com",
            nascimento: "1989-04-18"
          }
        },
        estatisticas: {
          vendas: [
            { data: "2024-01-05", valor: 250 },
            { data: "2024-02-15", valor: 300 },
            { data: "2024-02-15", valor: 100 }
          ]
        },
        comentarios: ["teste teste"]
      },
      {
        info: {
          nomeCompleto: "Alphonso B. Creighton D. Foxy Jamz Kvult Reqswing",
          detalhes: {
            email: "alphonso@example.com",
            nascimento: "1980-08-08"
          }
        },
        estatisticas: {
          vendas: [
            { data: "2024-03-30", valor: 233 },
            { data: "2024-04-01", valor: 112 }
          ]
        }
      }
    ]
  },
  meta: { registroTotal: 9, pagina: 1 },
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