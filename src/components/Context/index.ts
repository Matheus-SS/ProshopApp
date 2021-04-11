import React from 'react';

interface AuthContext {
  signIn: (username: string, password: string) => void;
  signOut: () => void;
  signUp: () => void;
  user: string | null;
}
export const AuthContext = React.createContext<AuthContext>({} as AuthContext);
