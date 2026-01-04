// Auth Types
export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface AuthService {
  login(email: string, password: string): Promise<AuthResponse>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<User | null>;
  getToken(): Promise<string | null>;
}

// Mock Implementation
const MOCK_USER: User = {
  id: 'usr_123456',
  email: 'demo@smartdoc.ai',
  name: 'Demo User',
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export class MockAuthService implements AuthService {
  private tokenKey = 'smartdoc_auth_token';
  private userKey = 'smartdoc_user';

  async login(email: string, _password: string): Promise<AuthResponse> {
    await delay(1000); // Simulate network request
    
    // In a real app, we would validate credentials here
    const token = 'mock_jwt_token_' + Math.random().toString(36).substring(7);
    const user = { ...MOCK_USER, email };

    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.userKey, JSON.stringify(user));

    return { user, token };
  }

  async logout(): Promise<void> {
    await delay(500);
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
  }

  async getCurrentUser(): Promise<User | null> {
    const userStr = localStorage.getItem(this.userKey);
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }

  async getToken(): Promise<string | null> {
    return localStorage.getItem(this.tokenKey);
  }
}

// Export a singleton instance
export const authService = new MockAuthService();
