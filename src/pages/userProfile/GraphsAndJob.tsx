import React from 'react';
import { FaGraduationCap, FaSuitcase } from 'react-icons/fa';
import styles from './styles.module.scss';
import { CircleGraph } from '../dashboard/CircleGraph/circleGraph';

export function GraphsAndJob() {
    return (
        <>
            <div className={`col-md-4 ${styles.graphBox}`}>
                            <h5>Compatibilidade</h5>
                            <div><CircleGraph>75%</CircleGraph></div>
                            <h6>Anos de experiência: <span>6</span></h6>
                            <div className="mt-4">
                                <h6>Habilidades necessárias</h6>
                                <div className='d-flex justify-content-center align-items-center gap-5'>
                                    <div className='d-flex flex-column gap-3 mt-3'>
                                        <div className={styles.skillBox}><h6>UX Design</h6></div>
                                        <div className={styles.skillBox}><h6>UX Design</h6></div>
                                        <div className={styles.skillBox}><h6>UX Design</h6></div>
                                    </div>
                                    <div className='d-flex flex-column gap-3 mt-3'>
                                        <div className={styles.skillBox}><h6>UX Research</h6></div>
                                        <div className={styles.skillBox}><h6>UX Research</h6></div>
                                        <div className={styles.skillBox}><h6>UX Research</h6></div>
                                    </div>
                                </div>
                            </div>
            </div>
            <div className={`col-md-4 ${styles.cultureFit}`}>
                <h5>Ajuste cultural</h5>
                <CircleGraph>50%</CircleGraph>
                <div className='d-flex justify-content-center align-items-center gap-5'>
                        <div className='d-flex flex-column gap-3 mt-3'>
                            <div className={styles.skillBox}><h6>Diversidade</h6></div>
                            <div className={styles.skillBox}><h6>Igualdade</h6></div>
                            <div className={styles.skillBox}><h6>Inovador</h6></div>
                            <div className={styles.skillBox}><h6>Movido a energia</h6></div>
                        </div>
                        <div className='d-flex flex-column gap-3 mt-3'>
                            <div className={styles.skillBox}><h6>Crescimento</h6></div>
                            <div className={styles.skillBox}><h6>Trabalho em equipe</h6></div>
                            <div className={styles.skillBox}><h6>Beneficios</h6></div>
                            <div className={styles.skillBox}><h6>Dirigido por missão</h6></div>
                        </div>
                    </div>
            </div>
            <div className={`col-md-4 ${styles.jobDetails}`}>
                <div className='d-flex justify-content-center align-items-center gap-3'>
                    <FaGraduationCap className={styles.icon} />
                    <h6 className='mb-0'>Detalhes do trabalho</h6>
                </div>
                <div className='mt-3 border-bottom border-light'>
                    <h6>Tipo de emprego: <span>Permanente</span></h6>
                    <h6>Gerente: <span>John Doe</span></h6>
                    <h6>Data de ingresso: <span>24 de março de 2021</span></h6>
                </div>
                <div className='mt-3'>
                    <div className='d-flex justify-content-center align-items-center gap-3'>
                        <FaSuitcase className={styles.icon} />
                        <h6 className='mb-0'>Experiência</h6>
                    </div>
                    <h6 className='mt-3'>ST Designer de interior</h6>
                    <h6>Magma Corporation Design</h6>
                    <h6>Janeiro de 2017 - março de 2020</h6>
                    <h6>3 anos e 2 meses</h6>
                    <h6 className='mt-3'>Wallmart</h6>
                    <h6>Operador de caixa</h6>
                    <h6>Maio de 2014 - fevereiro de 2016</h6>
                    <h6>2 anos de 4 meses</h6>
                </div>
            </div>
        </>
    )
}