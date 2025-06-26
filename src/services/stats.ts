import { fetchCustomers } from './customer';
import { parseCustomerApiResponse, Cliente } from '../utils/parseCustomerApi';

function getTotalSalesPerDay(customers: Cliente[]) {
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

function getTopVolumeCustomer(customers: Cliente[]) {
  let max = -Infinity;
  let top: Cliente | null = null;
  customers.forEach((c: Cliente) => {
    const total = c.vendas.reduce((sum: number, s: { valor: number }) => sum + s.valor, 0);
    if (total > max) {
      max = total;
      top = c;
    }
  });
  return top;
}

function getTopAverageCustomer(customers: Cliente[]) {
  let max = -Infinity;
  let top: Cliente | null = null;
  customers.forEach((c: Cliente) => {
    if (c.vendas.length === 0) return;
    const avg = c.vendas.reduce((sum: number, s: { valor: number }) => sum + s.valor, 0) / c.vendas.length;
    if (avg > max) {
      max = avg;
      top = c;
    }
  });
  return top;
}

function getTopFrequencyCustomer(customers: Cliente[]) {
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

export async function fetchStats() {
  await new Promise(res => setTimeout(res, 1000));
  const customerApiResponse = await fetchCustomers();
  const customers = parseCustomerApiResponse(customerApiResponse);

  return {
    totalSalesPerDay: getTotalSalesPerDay(customers),
    topVolumeCustomer: getTopVolumeCustomer(customers),
    topAverageCustomer: getTopAverageCustomer(customers),
    topFrequencyCustomer: getTopFrequencyCustomer(customers),
  };
} 