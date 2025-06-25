import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { Control, Controller, FieldError } from 'react-hook-form';

interface InputTextProps {
  name: string;
  label?: string;
  placeholder?: string;
  control: Control<any>;
  error?: FieldError;
  secureTextEntry?: boolean;
  isRequired?: boolean;
  keyboardType?: 'default' | 'email-address';
}

export default function InputText({
  name,
  label,
  placeholder,
  control,
  error,
  secureTextEntry = false,
  isRequired = false,
  keyboardType = 'default',
}: InputTextProps) {
  return (
    <View style={{ marginBottom: 16 }}>
      {label && (
        <Text style={styles.label}>
          {label} {isRequired && <Text style={{ color: 'red' }}>*</Text>}
        </Text>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[
              styles.input,
              error ? styles.inputError : {},
            ]}
            placeholder={placeholder}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            autoCapitalize="none"
          />
        )}
      />
      {error && <Text style={styles.error}>{error.message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    marginBottom: 4,
    fontWeight: 'bold',
    color: '#222',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  inputError: {
    borderColor: 'red',
  },
  error: {
    color: 'red',
    marginTop: 4,
    fontSize: 13,
  },
}); 