import { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const SessionContext = createContext();

// Session Provider
function SessionProvider(props) {
  const { value: session, setValue: setSession } = useLocalStorage(
    'sessionInfo',
    null
  );
  return <SessionContext.Provider value={{ session, setSession }} {...props} />;
}

// Use Session Hook
function useSession() {
  const context = useContext(SessionContext);
  if (!context) throw new Error('Not inside SessionProvider.');
  return context; // const { session, setSession } = useSession();
}

export { useSession, SessionProvider };
