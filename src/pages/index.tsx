import Head from "next/head";
import styles from './login.module.scss';

import { FaUser, FaLock } from 'react-icons/fa';
import { FormEvent, useContext, useState} from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";
import { ActiveLink } from "../components/Sidebar/ActiveLink";
import AuthContext from "@/contexts/AuthContext";

type LoginFormData = {
    email:string;
    password:string;
}

export default function Login() {
    const { signIn, user } = useContext(AuthContext);

    const { register, handleSubmit, formState: {errors} } = useForm();

    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSignIn(e?:FormEvent) {
        e?.preventDefault()

        signIn(email, password);
        localStorage.setItem('isLoggedIn', 'true');

    }


    const onSubmit:SubmitHandler<LoginFormData | any> = (values) => {
        handleSignIn();

        console.log(values)
    }

    return (
        <>
            <Head><title>MS Dashboard</title></Head>
            
            <div className={styles.login}>
                    <div className={styles.formContainer}>
                        <h1 className="text-center">MS Dashboard</h1>
                        <div className={styles.imgContainer}>
                            <img src="/images/loginUserIcon.png" alt="user-icon" />
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="mt-3 d-flex flex-column gap-3">
                            <div className="d-flex flex-column justify-content-center align-items-center">
                                <div className={styles.inputBox}>
                                    <input 
                                        type="email" 
                                        placeholder="E-mail"
                                        value={email}
                                        {...register('email', {required:true})}
                                        onChange={e => setEmail(e.target.value)} 
                                    />
                                    <FaUser className={styles.icon} />
                                </div>
                                {errors.email && 
                                <span className="text-danger">
                                    {email === '' ? 'Preencha todos os campos' : 'Email invalido'}
                                </span>}
                            </div>
                            <div className="d-flex flex-column justify-content-center align-items-center">
                                <div className={styles.inputBox}>
                                    <input 
                                        type="password" 
                                        placeholder="Senha"
                                        value={password}
                                        {...register('password', {required:true})}
                                        onChange={e => setPassword(e.target.value)} 
                                    />
                                    <FaLock className={styles.icon} />
                                </div>
                                {errors.password && 
                                <span className="text-danger">
                                    {password === '' ? 'Preencha todos os campos' : 'Senha invalida'}
                                </span>}
                            </div>
                            <button 
                                type="submit" 
                                className="d-flex justify-content-center align-items-center"
                            >   
                                Entrar
                            </button>
                        </form>
                        <div className="mt-3 d-flex justify-content-center align-items-center flex-column">
                            <p className="mb-0">Não tem uma conta?</p>
                            <ActiveLink href="/signUp" passHref>
                                <span>Inscreva-se</span>
                            </ActiveLink>
                        </div>
                    </div>
            </div>
            
        </>
    )
}