import React from 'react';
import { VStack, Button, Heading, Center } from 'native-base';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import InputText from '../../components/InputText';
import DatePickerInput from '../../components/DatePickerInput';
import { customerSchema, CustomerFormData } from '../../schemas/customer';
import { useCustomer } from '../../hooks/contexts';
import { Alert } from 'react-native';

export default function CreateCustomerScreen() {
    const { addCustomer } = useCustomer();

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<CustomerFormData>({
        resolver: zodResolver(customerSchema),
        defaultValues: {
            name: '',
            email: '',
            birth: '',
        },
    });

    const onSubmit = async (data: CustomerFormData) => {
        try {
            await addCustomer({
                nome: data.name,
                email: data.email,
                nascimento: data.birth,
            });
            Alert.alert('Success', 'Customer created successfully!');
            reset();
        } catch (error) {
            console.log(error);
            Alert.alert('Error', 'Error creating customer!');
        }
    };

    return (
        <Center flex={1} px="4" bg="white">
            <VStack space={6} w="full" maxW="400px">
                <Heading size="lg" color="primary.600" textAlign="center">
                    Create a new customer
                </Heading>
                <VStack space={4}>
                    <InputText
                        name="name"
                        label="Name"
                        placeholder="Enter name"
                        control={control}
                        error={errors.name}
                        isRequired
                    />
                    <InputText
                        name="email"
                        label="E-mail"
                        placeholder="Enter e-mail"
                        control={control}
                        error={errors.email}
                        isRequired
                        keyboardType="email-address"
                    />
                    <DatePickerInput
                        name="birth"
                        label="Birth date"
                        control={control}
                        error={errors.birth}
                        isRequired
                    />
                </VStack>
                    <Button
                        onPress={handleSubmit(onSubmit)}
                        isLoading={isSubmitting}
                        isLoadingText="Saving..."
                        size="lg"
                        bg="primary.600"
                        _pressed={{ bg: 'primary.700' }}
                    >
                        Save
                    </Button>
            </VStack>
        </Center>
    );
}
