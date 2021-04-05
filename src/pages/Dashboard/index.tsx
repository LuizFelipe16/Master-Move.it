import { FormEvent, useContext, useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import { ChallengesProvider } from '../../contexts/ChallengesContext';
import { CountdownProvider } from '../../contexts/CountdownContext';
import { UserProvider } from '../../contexts/UserContext';

import { CompletedChallenges } from "../../components/CompletedChallenges";
import { Countdown } from "../../components/Countdown";
import { ExperienceBar } from "../../components/ExperienceBar";
import { Profile } from "../../components/Profile";
import { ChallengeBox } from "../../components/ChallengeBox";

import styles from '../../styles/pages/Home.module.css';
import axios from 'axios';
import Sidebar from '../../components/Sidebar';
import api from '../../services/api';
import { ToastContainer } from 'react-toastify';

interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  user_id: number;
  token: string;
  user_name: string;
  user_gender: string;
}

export default function Home(props: HomeProps) {
  //exemplo de uso
  function handleSignUpToNewsletter(e: FormEvent) {
    e.preventDefault();

    axios.post('/api/subscribe', { email: 'luiz@gmail.com' })
  }

  return (
    <UserProvider>
      <ChallengesProvider user_id={props.user_id} user_name={props.user_name} token={props.token} user_gender={props.user_gender}>
        <div className={styles.container}>
          <Head>
            <title>Inicio | Move.it</title>
          </Head>

          <Sidebar activePageHome={true} />

          <ExperienceBar />

          <CountdownProvider>
            <section>
              <div>
                <Profile />

                <CompletedChallenges />

                <Countdown />
              </div>

              <div>
                <ChallengeBox />
              </div>
            </section>
          </CountdownProvider>
        </div>

        <ToastContainer />
      </ChallengesProvider>
    </UserProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // tudo que é feito aqui é feito no servidor node e nada disso na web
  // next surgiu com isso
  // google nao vai esperar voce pegar as informações do backend no proprio componente pra renderizar
  //então voce usa esse metodo que é algo que acontece antes do componente ser montado
  // para pegar os dados e retornar pro componente

  const {
    user_id,
    token,
    user_name,
    user_gender
  } = context.req.cookies;

  return {
    props: {
      user_id: Number(user_id),
      token: token,
      user_name: user_name,
      user_gender: user_gender,
    }
  }
}