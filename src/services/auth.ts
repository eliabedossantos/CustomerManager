export type AuthResponse = {
    token: string;
    user: {
        email: string;
        name: string;
    };
};

export type AuthError = {
    message: string;
};

export async function login(email: string, password: string): Promise<AuthResponse> {
    await new Promise((resolve) => setTimeout(resolve, 1200));
    
    if (email === 'admin@admin.com' && password === '123456') {
        return {
            token: 'fake-demo-token',
            user: {
                email,
                name: 'Admin User',
            },
        };
    }
    throw { message: 'Invalid email or password.' };
} 