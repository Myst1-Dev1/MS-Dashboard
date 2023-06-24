import { createContext, useState, useEffect, ReactNode, SetStateAction, Dispatch } from 'react';
import { useRouter } from 'next/router';
import { auth, db } from '../services/firebase';
import { doc, getDoc} from 'firebase/firestore';
import { signInWithEmailAndPassword } from 'firebase/auth';

const AuthContext = createContext({} as AuthContextData);

type AuthContextData = {
    user:LoggedUserData[];
    setUser:Dispatch<SetStateAction<LoggedUserData[]>>;
    signIn:(email:string,password:string) => void;
    signOut:() => void;
}

type LoggedUserData = {
    id:string;
    name: string;
    file:string;
    address:string;
    age:string;
    country:string;
    email:string;
    nacionality:string;
    phone:string;
}

interface AuthProviderProps {
    children:ReactNode;
}

export function AuthProvider({ children }:AuthProviderProps) {
  const [user, setUser] = useState<LoggedUserData[]>([]);

  const router = useRouter();

useEffect(() => {
    const fetchData = async (userId:any) => {
        try {
            const userDoc = await getDoc(doc(db, "loggedUserData", userId));
            if(userDoc.exists()) {
              setUser([userDoc.data() as LoggedUserData]);
            } else {
              console.log('Usuário não encontrado');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const userUid = auth.currentUser?.uid;
    const storedUser = localStorage.getItem('loggedUser');

    if (storedUser) {
      setTimeout(() => {setUser([JSON.parse(storedUser) as LoggedUserData]);}, 10);
    } else if (user !== undefined) {
      fetchData(userUid);
    } else {
      // ID do usuário logado não disponível, faça o tratamento adequado
      console.log("um erro ocorreu");
    }
}, [])

useEffect(() => {
  // Armazene os dados do usuário logado no armazenamento local sempre que o estado do usuário for atualizado
  if (user.length > 0) {
    setTimeout(() => {
      localStorage.setItem('loggedUser', JSON.stringify(user[0]));
    }, 1000);
  }
}, [user]);

const signIn = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    const userUid:any = auth.currentUser?.uid;
    const userDoc = await getDoc(doc(db, "loggedUserData", userUid));;
    const userData:any = userDoc.exists() ? { id: userDoc.id, ...userDoc.data() } : null;
    if (userData) {
      setUser([userData]);
      localStorage.setItem('loggedUser', JSON.stringify(userData));
    }
    router.push('/dashboard');
  } catch (error) {
    console.log('Erro ao fazer login:', error);
  }
};

  const signOut = async () => {
    try {
      await auth.signOut();
      router.push('/');
    } catch (error) {
      console.log('Erro ao fazer logout:', error);
    }
    localStorage.removeItem('loggedUser');
  };

  return (
    <AuthContext.Provider value={{ user,setUser, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
