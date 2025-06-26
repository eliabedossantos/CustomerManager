import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem, DrawerContentComponentProps } from '@react-navigation/drawer';
import CreateCustomerScreen from '../../screens/Customer/CreateCustomerScreen';
import { View, Text } from 'react-native';
import { useAuth } from '../../hooks/contexts';

const Drawer = createDrawerNavigator();

function HomeScreen() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Welcome! You are logged in.</Text>
        </View>
    );
}

function CustomDrawerContent(props: DrawerContentComponentProps) {
    const { signOut } = useAuth();
    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem
                label="Logout"
                onPress={signOut}
                labelStyle={{ color: 'red' }}
            />
        </DrawerContentScrollView>
    );
}

export default function AppRoutes() {
    return (
        <Drawer.Navigator
            initialRouteName="Home"
            drawerContent={props => <CustomDrawerContent {...props} />}
        >
            <Drawer.Screen 
                name="Home" 
                component={HomeScreen} 
            />
            <Drawer.Screen 
                name="CreateCustomer" 
                component={CreateCustomerScreen} 
                options={{
                    drawerLabel: "Create a customer"
                }}
            />

        </Drawer.Navigator>
    );
}