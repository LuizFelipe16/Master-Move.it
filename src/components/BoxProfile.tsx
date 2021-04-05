import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';

import styles from '../styles/pages/Profile.module.css';

export function BoxProfile() {
  const { level, challengesCompleted, currentExperience } = useContext(ChallengesContext);

  return (
    <>
      <div className={styles.level}>
        <header>
          <strong> {level} </strong>
        </header>

        <div>
          <p>Avance para <br /> o próximo level!</p>
        </div>
      </div>

      <div className={styles.experience}>
        <div>
          <h1>DESAFIOS</h1>
          <p> <span> {challengesCompleted} </span> completados</p>
        </div>

        <div>
          <h1>EXPERIÊNCIA</h1>
          <p> <span> {currentExperience} </span> xp</p>
        </div>

        <img src="/logo-user.svg" alt="Logo" />
      </div>
    </>
  );
}