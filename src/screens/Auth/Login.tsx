import React from "react";
import { 
    Text,
    VStack,
    HStack,
    Button,
    Heading,
    Center,
    useToast
} from 'native-base';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from "../../navigation/types";
import { loginSchema, LoginFormData } from '../../schemas/auth';
import Input from '../../components/Input';

type LoginScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const toast = useToast();
  
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      console.log('Dados do login:', data);
      
      toast.show({
        description: "Successfully logged in!",
        placement: "top"
      });
    
      
    } catch (error) {
      toast.show({
        description: "Error logging in, please try again",
        placement: "top"
      });
    }
  };

  return (
    <Center flex={1} px="4" bg="white">
      <VStack space={8} w="full" maxW="400px">
        <VStack space={2} alignItems="center">
          <Heading size="xl" color="primary.600">
            CustomerManager
          </Heading>
          <Text fontSize="md" color="gray.600" textAlign="center">
            Sign in to continue!
          </Text>
        </VStack>

        <VStack space={4}>
          <Input
            name="email"
            label="E-mail"
            placeholder="E-mail"
            control={control}
            error={errors.email}
            isRequired
            type="text"
          />
          
          <Input
            name="password"
            label="Password"
            placeholder="Password"
            control={control}
            error={errors.password}
            type="password"
            isRequired
          />
        </VStack>

        <Button
          onPress={handleSubmit(onSubmit)}
          isLoading={isSubmitting}
          isLoadingText="Please await..."
          size="lg"
          bg="primary.600"
          _pressed={{ bg: 'primary.700' }}
        >
          Entrar
        </Button>

      </VStack>
    </Center>
  );
}