import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem, DrawerContentComponentProps } from '@react-navigation/drawer';
import CreateCustomerScreen from '../../screens/Customer/CreateCustomerScreen';
import { View, Text } from 'react-native';
import { useAuth } from '../../hooks/contexts';
import ListCustomerScreen from '../../screens/Customer/ListCustomerScreen';
import SalesStatiticsScreen from '../../screens/Statistics/SalesStatiticsScreen';

const Drawer = createDrawerNavigator();

function HomeScreen() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Welcome!</Text>
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
                    drawerLabel: "Create a customer",
                    headerTitle: "Create a customer"
                }}
            />
            <Drawer.Screen 
                name="ListCustomers" 
                component={ListCustomerScreen} 
                options={{
                    drawerLabel: "Customers",
                    headerTitle: "Customers"
                }}
            />
            <Drawer.Screen 
                name="Statistics" 
                component={SalesStatiticsScreen} 
                options={{
                    drawerLabel: "Sales Statistics",
                    headerTitle: "Sales Statistics"
                }}
            />

        </Drawer.Navigator>
    );
}