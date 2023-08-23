import Head from "next/head";
import styles from './styles.module.scss';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FaUser, FaLock } from 'react-icons/fa';
import { auth, db } from "../../services/firebase";
import { SubmitHandler, useForm } from "react-hook-form";
import { ActiveLink } from "../../components/Sidebar/ActiveLink";
import { doc, setDoc } from "firebase/firestore";

type CreateUserFormData = {
    name:string;
    email:string;
    password:string;
    password_confirmation:string;
}

export default function SignUp() {
    const { register, handleSubmit, formState: {errors} } = useForm();

    const router = useRouter();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    async function handleSignUp(e?:FormEvent) {
        e?.preventDefault();

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);

            await setDoc(doc(db, 'loggedUserData', res.user.uid), {
                name,
                email
            })
            router.push('/');
        } catch (error) {
            alert(error);
            console.log(error)
        }

        setName('');
        setEmail('');
        setPassword('');
        setPasswordConfirmation('');   
    }

    const onSubmit:SubmitHandler<CreateUserFormData |any> = async (values) => {
        await handleSignUp()

        console.log(values);
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
                            <div className={styles.inputContainer}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className={styles.inputBox}>
                                            <input 
                                                type="text" 
                                                placeholder="Nome"
                                                value={name}
                                                {...register('name', {required:true})}
                                                onChange={e => setName(e.target.value)} 
                                            />
                                            <FaUser className={styles.icon} />
                                        </div>
                                        {errors.email && <span className="text-danger">Email inválido</span>}
                                    </div>
                                    <div className="col-md-6">
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
                                        {errors.email && <span className="text-danger">Email inválido</span>}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
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
                                        {errors.password && <span className="text-danger">Senha invalida</span>}
                                    </div>
                                    <div className="col-md-6">
                                        <div className={styles.inputBox}>
                                            <input 
                                                type="password" 
                                                placeholder="Confirme a senha"
                                                value={passwordConfirmation}
                                                {...register('password_confirmation', {required:true})}
                                                onChange={e => setPasswordConfirmation(e.target.value)} 
                                            />
                                            <FaLock className={styles.icon} />
                                        </div>
                                        {errors.password_confirmation && 
                                        <span className="text-danger">A senha não é igual</span>}
                                    </div>
                                </div>
                            </div>
                            <button className="d-flex justify-content-center align-items-center">Cadastrar</button>
                        </form>
                        <div className="mt-3 d-flex justify-content-center align-items-center flex-column">
                            <p className="mb-0">Já tem uma conta?</p>
                            <ActiveLink href="/">
                                <span>Entrar</span>
                            </ActiveLink>
                        </div>
                    </div>
            </div>
            
        </>
    )
}