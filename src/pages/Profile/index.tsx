import { useContext, useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { ChallengesContext, ChallengesProvider } from '../../contexts/ChallengesContext';
import Head from 'next/head';
import Sidebar from '../../components/Sidebar';
import { BoxProfile } from '../../components/BoxProfile';
import { UserProvider } from '../../contexts/UserContext';

import styles from '../../styles/pages/Profile.module.css';

interface ProfileUserProps {
  user_id: number;
  user_name: string;
  token: string;
}

export default function ProfileUser(props: ProfileUserProps) {
  const { level, challengesCompleted, currentExperience } = useContext(ChallengesContext);

  return (
    <ChallengesProvider user_id={props.user_id} user_name={props.user_name} token={props.token}>
      <div className={styles.container}>
        <Head>
          <title>Profile | Move.it</title>
        </Head>

        <Sidebar activePageProfile={true} />

        <BoxProfile />
      </div>
    </ChallengesProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { 
    user_id, 
    token,
    user_name
  } = context.req.cookies;

  return {
    props: {
      user_id: Number(user_id),
      token: token,
      user_name: user_name,
    }
  }
}