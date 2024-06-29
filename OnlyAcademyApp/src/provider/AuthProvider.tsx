import React, {
  useState,
  useEffect,
  createContext,
  PropsWithChildren,
} from 'react';
import {Session, User} from '@supabase/supabase-js';
import {supabase} from '../config/initSupabase';

type AuthProps = {
  user: User | null;
  session: Session | null;
  initialized?: boolean;
  signOut?: () => void;
  isSignedIn?: boolean;
};

export const AuthContext = createContext<Partial<AuthProps>>({});

// Custom hook to read the context values
export function useAuth() {
  return React.useContext(AuthContext);
}

export const AuthProvider = ({children}: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>();
  const [currentSession, setCurrentSession] = useState<Session | null>(null);
  const [initialized, setInitialized] = useState<boolean>(false);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

  useEffect(() => {
    // Listen for changes to authentication state
    const {data} = supabase.auth.onAuthStateChange(async (event, session) => {
      setCurrentSession(session);
      setUser(session ? session.user : null);
      setInitialized(true);
      setIsSignedIn(true);
    });
    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  // Log out the user
  const signOut = async () => {
    await supabase.auth.signOut();
    setIsSignedIn(false);
    setInitialized(false);
  };

  const value = {
    user,
    currentSession,
    initialized,
    isSignedIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
