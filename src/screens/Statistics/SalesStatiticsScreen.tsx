import React from 'react';
import { ScrollView, Dimensions } from 'react-native';
import { VStack, Text, Box, Spinner } from 'native-base';
import { LineChart } from 'react-native-chart-kit';
import { useStats } from '../../hooks/contexts';
import StatsHighlight from '../../components/StatsHighlight';

export default function SalesStatiticsScreen() {
  const { loading, stats } = useStats();

  if (loading || !stats) {
    return (
      <VStack flex={1} justifyContent="center" alignItems="center">
        <Spinner size="lg" />
      </VStack>
    );
  }

  return (
    <ScrollView>
      <VStack space={6} p={4}>
        <Text fontSize="xl" bold mb={2}>Sales per Day</Text>
        {stats.totalSalesPerDay.length > 0 ? (
            <LineChart
                data={{
                    labels: stats.totalSalesPerDay.map((item: any) => item.date.slice(5)), // MM-DD
                    datasets: [{ data: stats.totalSalesPerDay.map((item: any) => item.value) }]
                }}
                width={Dimensions.get('window').width - 32}
                height={220}
                yAxisLabel="R$"
                chartConfig={{
                    backgroundColor: '#fff',
                    backgroundGradientFrom: '#fff',
                    backgroundGradientTo: '#fff',
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
                    labelColor: () => '#888',
                    style: { borderRadius: 16 },
                    propsForDots: { r: '4', strokeWidth: '2', stroke: '#007AFF' }
                }}
                bezier
                style={{ borderRadius: 16 }}
            />
        ) : (
            <Text color="gray.400">No sales data.</Text>
        )}

        <Box mt={6}>
          <Text fontSize="lg" bold mb={2}>Highlights</Text>
          <VStack space={3}>
            <StatsHighlight
              colorScheme="info"
              label="Highest Volume"
              value={
                stats.topVolumeCustomer
                  ? `${stats.topVolumeCustomer.nome} (R$ ${stats.topVolumeCustomer.vendas.reduce((sum: number, v: any) => sum + v.valor, 0)})`
                  : '-'
              }
            />
            <StatsHighlight
              colorScheme="success"
              label="Highest Average"
              value={
                stats.topAverageCustomer
                  ? `${stats.topAverageCustomer.nome} (R$ ${(stats.topAverageCustomer.vendas.reduce((sum: number, v: any) => sum + v.valor, 0) / stats.topAverageCustomer.vendas.length).toFixed(2)})`
                  : '-'
              }
            />
            <StatsHighlight
              colorScheme="warning"
              label="Most Frequent"
              value={
                stats.topFrequencyCustomer
                  ? `${stats.topFrequencyCustomer.nome} (${new Set(stats.topFrequencyCustomer.vendas.map((v: any) => v.data)).size} days)`
                  : '-'
              }
            />
          </VStack>
        </Box>
      </VStack>
    </ScrollView>
  );
}
