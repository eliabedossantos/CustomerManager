export interface Cliente {
    nome: string;
    email: string;
    nascimento: string;
    vendas: { data: string; valor: number }[];
}

export function parseCustomerApiResponse(apiResponse: any): Cliente[] {
    if (!apiResponse?.data?.clientes) return [];

    return apiResponse.data.clientes.map((item: any) => ({
        nome: item.info?.nomeCompleto || '',
        email: item.info?.detalhes?.email || '',
        nascimento: item.info?.detalhes?.nascimento || '',
        vendas: item.estatisticas?.vendas || [],
    }));
} 