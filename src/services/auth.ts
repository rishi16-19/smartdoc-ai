import {
  CognitoUser,
  AuthenticationDetails,
  CognitoUserSession
} from "amazon-cognito-identity-js";
import { userPool } from "../auth/cognito";

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
  signUp(email: string, password: string): Promise<void>;
  confirmSignUp(email: string, code: string): Promise<void>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<User | null>;
  getToken(): Promise<string | null>;
}

class CognitoAuthService implements AuthService {
  private tokenKey = "smartdoc_auth_token";
  private userKey = "smartdoc_user";

  async signUp(email: string, password: string): Promise<void> {
    return new Promise((resolve, reject) => {
      userPool.signUp(email, password, [], [], (err) => {
        if (err) {
          console.error("Cognito signup error:", err);
          reject(err);
          return;
        }
        resolve();
      });
    });
  }

  async confirmSignUp(email: string, code: string): Promise<void> {
    const user = new CognitoUser({
      Username: email,
      Pool: userPool
    });

    return new Promise((resolve, reject) => {
      user.confirmRegistration(code, true, (err) => {
        if (err) {
          console.error("Cognito confirmation error:", err);
          reject(err);
          return;
        }
        resolve();
      });
    });
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    const user = new CognitoUser({
      Username: email,
      Pool: userPool
    });

    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password
    });

    return new Promise((resolve, reject) => {
      user.authenticateUser(authDetails, {
        onSuccess: (session: CognitoUserSession) => {
          const token = session.getIdToken().getJwtToken();

          const currentUser: User = {
            id: session.getIdToken().payload.sub,
            email,
            name: email.split("@")[0]
          };

          localStorage.setItem(this.tokenKey, token);
          localStorage.setItem(this.userKey, JSON.stringify(currentUser));

          resolve({ user: currentUser, token });
        },
        onFailure: (err) => {
          console.error("Cognito login error:", err);
          reject(err);
        }
      });
    });
  }

  async logout(): Promise<void> {
    const cognitoUser = userPool.getCurrentUser();
    if (cognitoUser) {
      cognitoUser.signOut();
    }

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

export const authService = new CognitoAuthService();
