import Head from 'next/head';
import styles from './styles.module.scss';
//import Swal from 'sweetalert2';

import { SideBar } from '../../../components/Sidebar';
import { Header } from '../../../components/Header';
import { FaCloudUploadAlt } from 'react-icons/fa'
import { Input } from '../../../components/Input';
import { Footer } from '../../../components/Footer';

import { useState, useEffect, FormEvent } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db, storage } from '../../../services/firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';


export default function CreateUser() {

    const Swal = require('sweetalert2');

    const router = useRouter();

    const [file, setFile] = useState<null | any>(null);
    const [userName, setUserName] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [nacionality, setNacionality] = useState('');

    async function handleCreateNewUser(e:FormEvent) {
        e.preventDefault();

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);

            if (file) {
                const storageRef = ref(storage, `users/${res.user.uid}/${file.name}`);
                const uploadTask = uploadBytesResumable(storageRef, file);

                await uploadTask;
                const fileUrl = await getDownloadURL(storageRef);

                await setDoc(doc(db, "users", res.user.uid), {
                    file:fileUrl,
                    userName,
                    name,
                    email,
                    phone,
                    password,
                    address,
                    nacionality
                });

                router.push('/users');
            } else {
                await setDoc(doc(db, 'users', res.user.uid), {
                    userName,
                    name,
                    email,
                    phone,
                    password,
                    address,
                    nacionality,
                    timeStamp: serverTimestamp()
                });
            }
        } catch (error) {
            alert(error)
            console.log(error)
        }

        setFile(null);
        setUserName('');
        setName('');
        setEmail('');
        setPhone('');
        setPassword('');
        setAddress('');
        setNacionality('');

        Swal.fire({
            icon: 'success',
            html: '<h1 className="text-success">Usuário cadastrado com sucesso</h1>'
          })
    }

    async function uploadFile(file:any) {
        const metadata = {
            contentType: 'image/jpeg'
        };

        const storageRef = ref(storage, 'images/' + file.name);
        const fileData = new Blob([file], {type: "image/jpg"});

        const uploadTask = uploadBytesResumable(storageRef, fileData, metadata);

        let downloadUrl: string | undefined; // variável local para armazenar o URL da imagem

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                switch(snapshot.state) {
                    case "paused":
                        console.log("Upload is paused");
                        break;
                    case "running":
                        console.log("Upload is running");
                        break;
                    default:
                        break;
                }
            },
            (error) => {
                console.log(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    downloadUrl = url; // atualiza a variável local
                });
            }
        );

        await uploadTask;

        if(downloadUrl) {
            setFile((prev:any) => ({...prev, img:downloadUrl}));
        }
    };

    useEffect(() => {
        if (file) {
            uploadFile(file)
        }
    }, [file]);

    return (
        <>
            <Head><title>MS Dashboard | Criar usuário</title></Head>

            <div className={styles.createUser}>
                <SideBar />

                <div className={styles.pageContent}>
                    <Header />
                    <h4 className='mt-4'>Adicionar novo usuário</h4>
                    <div className={styles.formContainer}>
                        <div className={styles.imgContainer}>
                            <img src={file ? URL.createObjectURL(new Blob([file], {type:'image/png'}))
                             : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg' }
                                alt="upload"
                            />
                        </div>
                        <form onSubmit={handleCreateNewUser} className='d-flex flex-column gap-4'>
                            <div className='row'>
                               <div className='col-md-6 mb-3'>
                                    <span>Imagen: 
                                        <label htmlFor='file'><FaCloudUploadAlt className={styles.icon} /></label>
                                    </span>
                                    <Input 
                                        type="file" 
                                        id='file'
                                        onChange={(e: any) => setFile(e.target.files[0])}
                                    />
                               </div>
                               <div className={`d-flex flex-column gap-2 col-md-6 ${styles.inputBox}`}>
                                    <label htmlFor="name">Nome de usuário</label>
                                    <Input 
                                        type="text" 
                                        placeholder='john_doe' 
                                        id='name'
                                        value={userName}
                                        onChange={(e:any) => setUserName(e.target.value)} 
                                    />
                               </div>
                            </div>
                            <div className='row'>
                               <div className={`d-flex flex-column gap-2 col-md-6 ${styles.inputBox}`}>
                                    <label htmlFor='name_surname'>Nome e Sobrenome</label>
                                    <Input 
                                        type="text" 
                                        id='name_surname' 
                                        placeholder='John doe'
                                        value={name}
                                        onChange={(e:any) => setName(e.target.value)} 
                                    />
                               </div>
                               <div className={`d-flex flex-column gap-2 col-md-6 ${styles.inputBox}`}>
                                    <label htmlFor="email">E-mail</label>
                                    <Input 
                                        type="email" 
                                        placeholder='johndoe@gmail.com' 
                                        id='email'
                                        value={email}
                                        onChange={(e:any) => setEmail(e.target.value)} 
                                    />
                               </div>
                            </div>
                            <div className='row'>
                               <div className={`d-flex flex-column gap-2 col-md-6 ${styles.inputBox}`}>
                                    <label htmlFor='number'>Telefone</label>
                                    <Input 
                                        type="text" 
                                        id='number' 
                                        placeholder='40028922'
                                        value={phone}
                                        onChange={(e:any) => setPhone(e.target.value)} 
                                    />
                               </div>
                               <div className={`d-flex flex-column gap-2 col-md-6 ${styles.inputBox}`}>
                                    <label htmlFor="password">Senha</label>
                                    <Input 
                                        type="password" 
                                        placeholder='********' 
                                        id='password'
                                        value={password}
                                        onChange={(e:any) => setPassword(e.target.value)} 
                                    />
                               </div>
                            </div>
                            <div className='row'>
                               <div className={`d-flex flex-column gap-2 col-md-6 ${styles.inputBox}`}>
                                    <label htmlFor='address'>Endereço</label>
                                    <Input 
                                        type="text" 
                                        id='adress' 
                                        placeholder='Rua lorem porto'
                                        value={address}
                                        onChange={(e:any) => setAddress(e.target.value)} 
                                    />
                               </div>
                               <div className={`d-flex flex-column gap-2 col-md-6 ${styles.inputBox}`}>
                                    <label htmlFor="nacionality">Nacionalidade</label>
                                    <Input 
                                        type="text"
                                        id='nacionality' 
                                        placeholder='brasileiro' 
                                        value={nacionality}
                                        onChange={(e:any) => setNacionality(e.target.value)}
                                    />
                               </div>
                            </div>
                            <button type='submit'>Enviar</button>
                        </form>
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    )
}