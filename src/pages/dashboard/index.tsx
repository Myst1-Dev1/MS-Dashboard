import Head from "next/head";
import styles from './styles.module.scss';

import { SideBar } from '../../components/Sidebar';
import { Header } from '../../components/Header';
import { Summary } from "../../components/Summary";

import { BsThreeDotsVertical } from 'react-icons/bs';
import { Footer } from "../../components/Footer";
import { CircleGraph } from "./CircleGraph/circleGraph";
import { ChartGraph } from "./ChartGraph";

export default function Dashboard() {
    return (
        <>
            <Head><title>MS Dashboard | Painel</title></Head>

            <div className={styles.dashboard}>
                <SideBar />
                <div className={styles.pageContent}>
                    <Header />
                    <Summary />
                    <div className={styles.graphs}>
                        <div className={styles.totalRevenue}>
                            <div className="d-flex align-items-center justify-content-between mt-3 px-3">
                                <h4>Rendimento total</h4>
                                <BsThreeDotsVertical className={styles.icon} />
                            </div>
                            <CircleGraph>70%</CircleGraph>
                            <div className="d-flex flex-column justify-content-center align-items-center">
                                <h3>Vendas totais feitas hoje</h3>
                                <h3>R$ 420</h3>
                            </div>
                            <p className="text-center h4 mt-2 mb-0">Relatório de vendas</p>
                            <div className="d-flex align-items-center justify-content-between px-3 mt-3">
                                <div>
                                    <h6>Alvo</h6>
                                    <h6 style={{color:'#ef4444'}}>- R$ 12.4k</h6>
                                </div>
                                <div>
                                    <h6>Última semana</h6>
                                    <h6 style={{color:'#22c55e'}}>+ R$ 18.4k</h6>
                                </div>
                                <div>
                                    <h6>Último mês</h6>
                                    <h6 style={{color:'#22c55e'}}>+ R$ 25.9k</h6>
                                </div>
                            </div>
                        </div>
                        <div className={styles.totalMembers}>
                            <div className="mt-3 px-3">
                                <h4>Últimos 6 meses(Total de membros)</h4>
                                <ChartGraph />
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    )
}