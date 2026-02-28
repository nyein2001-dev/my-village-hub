export interface Role {
    id: string;
    name: string;
}

export interface User {
    id: string;
    email: string;
    username: string;
    roles: string[];
    is_staff: boolean;
}

export interface AuthResponse {
    access: string;
    refresh: string;
    user: User;
}
