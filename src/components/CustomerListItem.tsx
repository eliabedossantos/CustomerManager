import React from 'react';
import { Box, Text, HStack, VStack, Badge } from 'native-base';
import { getMissingLetter } from '../utils/missingLetter';

interface CustomerListItemProps {
    nome: string;
    email: string;
    nascimento: string;
}

function formatDate(iso: string) {
    if (!iso) return '';
    const [year, month, day] = iso.split('-');
    return `${year}/${month}/${day}`;
}

export default function CustomerListItem({ nome, email, nascimento }: CustomerListItemProps) {
    return (
        <Box borderBottomWidth={1} borderColor="gray.200" py={4} px={3} mb={2} bg={'blue.100'} rounded={8}>
            <HStack justifyContent="space-between" alignItems="center">
                <VStack maxW={'80%'}>
                    <Text bold fontSize="md">{nome}</Text>
                    <Text color="gray.500">{email}</Text>
                    <Text color="gray.400" fontSize="sm">
                        {formatDate(nascimento)}
                    </Text>
                </VStack>
                <Badge colorScheme="info" variant="solid">
                    {getMissingLetter(nome)}
                </Badge>
            </HStack>
        </Box>
    );
} 