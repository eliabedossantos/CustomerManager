import { Cliente } from './parseCustomerApi';

export function sumSales(sales: { valor: number }[]): number {
    return sales.reduce((sum, v) => sum + v.valor, 0);
}

export function averageSales(sales: { valor: number }[]): number {
    if (sales.length === 0) return 0;
    return sumSales(sales) / sales.length;
}

export function getTotalSalesPerDay(customers: Cliente[]) {
    const salesPerDay: Record<string, number> = {};
    customers.forEach((customer: Cliente) => {
        customer.vendas.forEach((sale: { data: string; valor: number }) => {
            salesPerDay[sale.data] = (salesPerDay[sale.data] || 0) + sale.valor;
        });
    });
    return Object.entries(salesPerDay)
        .map(([date, value]) => ({ date, value }))
        .sort((a, b) => a.date.localeCompare(b.date));
}

export function getTopVolumeCustomer(customers: Cliente[]) {
    let max = -Infinity;
    let top: Cliente | null = null;
    customers.forEach((c: Cliente) => {
        const total = sumSales(c.vendas);
        if (total > max) {
            max = total;
            top = c;
        }
    });
    return top;
}

export function getTopAverageCustomer(customers: Cliente[]) {
    let max = -Infinity;
    let top: Cliente | null = null;
    customers.forEach((c: Cliente) => {
        if (c.vendas.length === 0) return;
        const avg = averageSales(c.vendas);
        if (avg > max) {
                max = avg;
                top = c;
            }
        });
    return top;
}

export function getTopFrequencyCustomer(customers: Cliente[]) {
    let max = -Infinity;
    let top: Cliente | null = null;
    customers.forEach((c: Cliente) => {
        const days = new Set(c.vendas.map((s: { data: string }) => s.data));
        if (days.size > max) {
            max = days.size;
            top = c;
        }
    });
    return top;
} 