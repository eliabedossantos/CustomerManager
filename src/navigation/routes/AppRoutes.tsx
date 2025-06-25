import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text } from 'react-native';

const Stack = createNativeStackNavigator();

function HomeScreen() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Welcome! You are logged in.</Text>
        </View>
    );
}

export default function AppRoutes() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
    );
} 