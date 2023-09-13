import styles from './styles.module.scss';
import { Input } from "../../components/Input";
import { FaCloudUploadAlt, FaTimes } from "react-icons/fa";
import { useState, useEffect, useContext, FormEvent } from 'react';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { db, storage } from '../../services/firebase';
import { useRouter } from 'next/router';
import AuthContext from '../../contexts/AuthContext';
import { doc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { destroyCookie } from 'nookies';
//import Swal from 'sweetalert2';

interface UpdateFormUserProps {
    onOpenForm:boolean;
    onSetOpenForm:any;
}

export function UpdateFormUser({ onOpenForm, onSetOpenForm }: UpdateFormUserProps) {
    const { user } = useContext(AuthContext);

    const Swal = require('sweetalert2');

    const [file, setFile] = useState<null | any>(null);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [nacionality, setNacionality] = useState('');
    const [age, setAge] = useState('');
    const [country, setCountry] = useState('');

    const router = useRouter();

    function handleCloseUpdateForm () {
        onSetOpenForm(false);
    }

    const Id:any = user && user.length > 0 ? user[0].id : null;

    async function handleUpdateUserData(e:FormEvent) {
        e.preventDefault();

        if(file) {
                const storageRef = ref(storage, `loggedUserData/${Id}/${file.name}`);
                const uploadTask = uploadBytesResumable(storageRef, file);

                await uploadTask;
                const fileUrl:any = await getDownloadURL(storageRef);

                await setDoc(doc(db, "loggedUserData", Id), {
                    file:fileUrl,
                });

                const userReference = doc(db, 'loggedUserData', Id);
                await updateDoc(userReference, {
                    file:fileUrl,
                    name:name,
                    phone:phone,
                    address:address,
                    nacionality:nacionality,
                    age:age,
                    country:country
                })
                
        } else {
            await setDoc(doc(db, 'loggedUserData', Id), {
                timeStamp: serverTimestamp()
            });

            const userReference = doc(db, 'loggedUserData', Id);
            await updateDoc(userReference, {
                name:name,
                phone:phone,
                address:address,
                nacionality:nacionality,
                age:age,
                country:country
            })
            console.log('Usuário não atualizado ocorreu um erro.')
        }

        setFile(null);
        setName('');
        //setEmail('');
        setPhone('');
        setAddress('');
        setNacionality('');
        setAge('');
        setCountry('');

        Swal.fire({
            icon: 'success',
            html: '<h1 className="text-success">Usuário atualizado com sucesso</h1>'
          })

          //router.push('/');
          router.reload();
          destroyCookie(null, 'loggedUser');
          alert('Faça o login novamente');
           
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
            {onOpenForm && (
                <div className={`mt-5 ${styles.formContainer}`}>
                    <div className='d-flex justify-content-between align-items-center'>
                        <h3>Atualizar Usuário</h3>
                        <FaTimes onClick={handleCloseUpdateForm} className={styles.closeFormIcon} />
                    </div>
                    <form onSubmit={handleUpdateUserData} className='mt-5'>
                        <div className='row mb-3'>
                            <div className='col-md-6 mb-5'>
                                <span>Imagem:</span>
                                <label htmlFor='file'>
                                    <FaCloudUploadAlt className={styles.icon} />
                                </label>
                                <input
                                    required = {false}
                                    type="file" 
                                    id='file'
                                    onChange={(e:any) => setFile(e.target.files[0])} 
                                />
                            </div>
                            <div className='d-flex flex-column gap-2 col-md-6'>
                                <label htmlFor="name">Nome</label>
                                <Input
                                    required = {false}
                                    type="text" 
                                    placeholder="John Doe" 
                                    id="name"
                                    value={name}
                                    onChange={(e:any) => setName(e.target.value)} 
                                />
                            </div>
                        </div>
                        <div className='row mb-3'>
                            <div className='d-flex flex-column gap-2 col-md-12'>
                                <label htmlFor="phone">Telefone</label>
                                <Input
                                    required = {false}
                                    type="text" 
                                    placeholder="40028922" 
                                    id="phone"
                                    value={phone}
                                    onChange={(e:any) => setPhone(e.target.value)}  
                                />
                            </div>
                        </div>
                        <div className='row mb-3'>
                            <div className='d-flex flex-column gap-2 col-md-6'>
                                <label htmlFor='nacionality'>Nacionalidade</label>
                                <Input
                                    required = {false}
                                    type="text" 
                                    placeholder='Americano' 
                                    id='nacionality'
                                    value={nacionality}
                                    onChange={(e:any) => setNacionality(e.target.value)}  
                                />
                            </div>
                            <div className='d-flex flex-column gap-2 col-md-6'>
                                <label htmlFor="address">Endereço</label>
                                <Input
                                    required = {false}
                                    type="text" 
                                    placeholder="Rua lorem porto" 
                                    id="address"
                                    value={address}
                                    onChange={(e:any) => setAddress(e.target.value)}  
                                />
                            </div>
                        </div>
                        <div className='row mb-3'>
                            <div className='d-flex flex-column gap-2 col-md-6'>
                                <label htmlFor='age'>Idade</label>
                                <Input
                                    required = {false}
                                    type="number" 
                                    placeholder='27' 
                                    id='age'
                                    value={age}
                                    onChange={(e:any) => setAge(e.target.value)}  
                                />
                            </div>
                            <div className='d-flex flex-column gap-2 col-md-6'>
                                <label htmlFor="country">Páis</label>
                                <Input 
                                    required = {false}
                                    type="text" 
                                    placeholder="USA" 
                                    id="country"
                                    value={country}
                                    onChange={(e:any) => setCountry(e.target.value)}  
                                />
                            </div>
                        </div>
                        <button type='submit'>Atualizar</button>
                    </form>
                </div>
            )}
        </>
    )
}