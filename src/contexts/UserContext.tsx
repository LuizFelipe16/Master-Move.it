import Cookies from 'js-cookie';
import { GetServerSideProps } from 'next';
import { createContext, ReactNode, useEffect, useState } from 'react';
import api from '../services/api';

interface UsersContextData {
  name: string;
  email: string;
  user_id: number;
  token: string;
  challenges: Array<Challenges>;
}

interface UsersProviderProps {
  children?: ReactNode;
  level?: number;
  token?: string;
}

interface Challenges {
  id: number;
  amount: number;
  type: string;
  description: string;
}

export const UserContext = createContext({} as UsersContextData);

export function UserProvider({ children, ...rest }: UsersProviderProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [user_id, setUserId] = useState(0);

  const [challenges, setChallenges] = useState([]);

  const id = Cookies.get('user_id');
  const token = Cookies.get('token');

  async function handleGetChallenges() {
    await api.get(`/tasks/${id}`, {
      headers: {
        Authorization: `bearer ${token}`
      }
    }).then((response) => {
      setChallenges(response.data);
    });
  }

  useEffect(() => {
    handleGetChallenges();
  }, []);

  return (
    <UserContext.Provider
      value={{
        name,
        email,
        user_id,
        token,
        challenges
      }}
    >
      {children}
    </UserContext.Provider>
  );
}