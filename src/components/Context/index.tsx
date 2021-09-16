import React from 'react';
interface AuthContext {
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (email: string, username: string, password: string) => Promise<void>;
  user: string | null;
}
export const AuthContext = React.createContext<AuthContext>({} as AuthContext);
