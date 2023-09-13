import Head from "next/head";
import styles from './styles.module.scss';
//import Swal from "sweetalert2";

import { Header } from "../../components/Header";
import { SideBar } from "../../components/Sidebar";
import { FaTrashAlt } from 'react-icons/fa';
import { Footer } from "../../components/Footer";

import { useState, useEffect } from 'react';
import { DocumentData, collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../../services/firebase";
import { Pagination } from "../../components/Pagination";
import { ActiveLink } from "../../components/Sidebar/ActiveLink";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

export type UserData = {
    id:string;
    file:string;
    name:string;
    email:string;
    phone:string;
    nacionality:string;
}

export default function Users({data}: {data: UserData[]}) {
    const router = useRouter();

    const Swal = require('sweetalert2');

    const [usersData, setUsersData] = useState<UserData[]>(data);
    const itensPerPage = 5;
    const [currentPage, setCurrentPage] = useState(0);

    const pages = Math.ceil(data.length / itensPerPage);
    const startIndex = currentPage * itensPerPage;
    const endIndex = startIndex + itensPerPage;
    const currentItems = data.slice(startIndex, endIndex);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "users"));
                const list: DocumentData[] | any = [];
                querySnapshot.forEach((doc) => {
                    list.push({id: doc.id, ...doc.data()});
                });
                setUsersData(list);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [])

    async function handleDeleteUser(id:string) {
        try {
            await deleteDoc(doc(db, "users", id));
            setUsersData(usersData.filter((item) => item.id !== id));
            router.reload();
        } catch (error) {
            console.log(error);
        }

        router.reload();

        Swal.fire({
            icon: 'success',
            html: '<h1 className="text-success">Usuário deletado com sucesso</h1>'
          })
    }

    return (
        <>
            <Head><title>MS Dashboard | Usuários</title></Head>
            
            <div className={styles.users}>
                <SideBar />
                <div className={styles.pageContent}>
                    <Header />
                    <div className="mt-4">
                        <ActiveLink href="/users/create" passHref>
                            <button className={styles.addNewUser}>+ Adicionar novo usuário</button>
                        </ActiveLink>
                        
                        <h4 className="mt-4">Usuários</h4>
                        <div className={styles.tableContainer}>
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Id</th>
                                            <th scope="col">Avatar</th>
                                            <th scope="col">Nome</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Telefone</th>
                                            <th scope="col">Nacionalidade</th>
                                            <th className="text-center" scope="col">Ação</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentItems.map(users => {
                                            return (
                                            <tr key={users.id} className={styles.tableData}>
                                                <td className={styles.idValue}>{users.id}</td>
                                                <td>
                                                    <div className={styles.imgContainer}>
                                                        <img 
                                                            src={users.file}
                                                            alt="avatar" 
                                                        />
                                                    </div>
                                                </td>
                                                <td>{users.name}</td>
                                                <td>{users.email}</td>
                                                <td>{users.phone}</td>
                                                <td>{users.nacionality}</td>
                                                <td className="text-center">
                                                    <FaTrashAlt
                                                        onClick={() => handleDeleteUser(users.id)}  
                                                        className={styles.deleteIcon} 
                                                    />
                                                </td>
                                            </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                                {data.length === 0 ? 
                                    <div className={styles.loading} >
                                        <img src="/images/loading.gif" alt="load" />
                                    </div>
                                    :
                                    ""
                                }
                            </div>
                        </div>
                        {/* Pagination */}
                        <Pagination 
                            onPages = {pages} 
                            onSetCurrentPage = {setCurrentPage}
                            onCurrentPage = {currentPage} 
                        />
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const list: DocumentData[] | any = [];
      querySnapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      const data = list.map((item: any) => ({
        id: item.id,
        file: item.file,
        name: item.name,
        email: item.email,
        phone: item.phone,
        nacionality: item.nacionality,
      }));
      return {
        props: {
          data,
        },
      };
    } catch (error) {
      console.log(error);
      return {
        props: {
          data: [],
        },
      };
    }
  };