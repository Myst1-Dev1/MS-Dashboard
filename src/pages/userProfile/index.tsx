import Head from 'next/head';
import styles from './styles.module.scss';

import { useState, useContext } from 'react';
import { SideBar } from '../../components/Sidebar';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

import AuthContext from '../../contexts/AuthContext';
import { ChartGainUserGraph } from '../../components/ChartGainUserGraph';

import { GraphsAndJob } from '../../components/GraphsAndJobs';
import { UpdateFormUser } from '../../components/UpdateFormUser';

export default function UserProfile() {
    const { user } = useContext(AuthContext);

    const [openForm , setOpenForm] = useState(false);

    const [file, setFile] = useState<null | any>(null);

    console.log(setFile);

    function handleOpenUpdateForm() {
        setOpenForm(true);
    }

    return (
        <>
            <Head><title>MS Dashboard | Perfil</title></Head>

            <div className={styles.userProfile}>
                <SideBar />
                <div className={styles.pageContent}>
                    <Header />
                    <div className={`row ${styles.userContainer}`}>
                        <div className={`col-md-6 d-flex gap-4 ${styles.userBox}`}>
                           
                            {user?.map(userData => {
                                return (
                                    <div key="unique-key" className='d-flex gap-5'>
                                        <div className={styles.imgContainer}>
                                        <img src={file ? URL.createObjectURL(new Blob([file], {type:'image/png'}))
                                        : `${userData.file === undefined ? '/images/uploadImage.png' : userData.file}` }
                                            alt="upload"
                                        />
                                        </div>
                                        <div className='d-flex flex-column gap-1'>
                                            <h3 data-testid="userName">{userData.name}</h3>
                                            <h6 data-testid="age"><span>Idade:</span> {userData.age}</h6>
                                            {/* <h6><span>Email:</span> {userData.email}</h6> */}
                                            <h6><span>Telefone:</span> {userData.phone}</h6>
                                            <h6><span>Nacionalidade:</span> {userData.nacionality}</h6>
                                            <h6><span>Endereço:</span> {userData.address}</h6>
                                            <h6><span>País:</span> {userData.country}</h6>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className={`col-md-6 ${styles.chartContainer}`}>
                            <h3>Ganhos (Últimos oito meses)</h3>
                            <ChartGainUserGraph />
                        </div>
                    </div>
                        <button
                            className={styles.updateUserData} 
                            onClick={handleOpenUpdateForm} 
                            type="button">
                            Atualizar +
                        </button>     

                    <UpdateFormUser onOpenForm = {openForm} onSetOpenForm = {setOpenForm} />

                    {/* Talvez mais alguma coisa */}
                    <div className={`row mt-5 gap-5 ${styles.graphsContainer}`}>
                        <GraphsAndJob />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}