import React from 'react';
import { Input as NativeBaseInput, FormControl, WarningOutlineIcon } from 'native-base';
import { Control, Controller, FieldError } from 'react-hook-form';

interface InputProps {
    name: string;
    label?: string;
    placeholder?: string;
    control: Control<any>;
    error?: FieldError;
    type?: 'text' | 'password';
    isRequired?: boolean;
}

export default function Input({ 
    name, 
    label, 
    placeholder, 
    control, 
    error, 
    type = 'text',
    isRequired = false 
}: InputProps) {
    return (
        <FormControl isInvalid={!!error} isRequired={isRequired}>
            {label && <FormControl.Label>{label}</FormControl.Label>}
            <Controller
                name={name}
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <NativeBaseInput
                        placeholder={placeholder}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        type={type}
                        size="lg"
                        _focus={{
                            borderColor: 'primary.500',
                            backgroundColor: 'transparent',
                        }}
                        variant='underlined'
                    />
                )}
            />
            {error && (
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                    {error.message}
                </FormControl.ErrorMessage>
            )}
        </FormControl>
    );
} 