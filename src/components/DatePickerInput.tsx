import React, { useState } from 'react';
import { Controller, Control, FieldError } from 'react-hook-form';
import { Button, FormControl, Text } from 'native-base';
import { Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

interface DatePickerInputProps {
    name: string;
    label?: string;
    control: Control<any>;
    error?: FieldError;
    isRequired?: boolean;
}

export default function DatePickerInput({
    name,
    label,
    control,
    error,
    isRequired = false,
}: DatePickerInputProps) {
    const [show, setShow] = useState(false);

    return (
        <FormControl isInvalid={!!error} isRequired={isRequired} mb={2}>
            {label && <FormControl.Label>{label}</FormControl.Label>}
            <Controller
                control={control}
                name={name}
                render={({ field: { value, onChange } }) => (
                <>
                    <Button
                    variant="outline"
                    onPress={() => setShow(true)}
                    _text={{ color: value ? 'black' : 'gray.400' }}
                    >
                    {value ? value : 'Select date'}
                    </Button>
                    {show && (
                        <DateTimePicker
                            value={value ? new Date(value) : new Date()}
                            mode="date"
                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                            onChange={(_, selectedDate) => {
                            setShow(Platform.OS === 'ios');
                            if (selectedDate) {
                                const formatted = selectedDate.toISOString().split('T')[0];
                                onChange(formatted);
                            }
                            }}
                            maximumDate={new Date()}
                        />
                    )}
                </>
                )}
            />
            {error && (
                <FormControl.ErrorMessage>
                {error.message}
                </FormControl.ErrorMessage>
            )}
        </FormControl>
    );
} 