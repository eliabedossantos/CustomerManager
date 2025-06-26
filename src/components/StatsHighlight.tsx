import React from 'react';
import { Box, Badge, Text } from 'native-base';

interface StatsHighlightProps {
  colorScheme: string;
  label: string;
  value: string;
}

export default function StatsHighlight({ colorScheme, label, value }: StatsHighlightProps) {
  return (
    <Box>
      <Badge colorScheme={colorScheme} mb={1}>{label}</Badge>
      <Text>{value}</Text>
    </Box>
  );
} 