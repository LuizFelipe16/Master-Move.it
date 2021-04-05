import { useState, useEffect, useContext } from 'react';
import { AiFillCheckCircle } from 'react-icons/ai';
import { FaPlay } from 'react-icons/fa';
import { FiX, FiCheckCircle } from 'react-icons/fi';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountdownContext } from '../contexts/CountdownContext';

import styles from '../styles/components/Countdown.module.css';

export function Countdown() {
  const { 
    minutes, 
    seconds, 
    hasFinished, 
    isActive, 
    resetCountdown, 
    startCountdown 
  } = useContext(CountdownContext);
  
  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>

        <span>:</span>

        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      { hasFinished ? (
        <button
          disabled
          className={styles.countdownButton}
        >
          Ciclo Finalizado <FiCheckCircle style={{ marginLeft: '1rem' }}  size={22} color="#4cd62b" />
        </button>
      ) : (
          <>
            { isActive ? (
              <button
                onClick={resetCountdown}
                type="button"
                className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
              >
                Abandonar Ciclo <FiX style={{ marginLeft: '1rem' }} size={23} />
              </button>
            ) : (
                <button
                  onClick={startCountdown}
                  type="button"
                  className={styles.countdownButton}
                >
                  Iniciar um Ciclo <FaPlay style={{ marginLeft: '1rem' }} color="#fff" />
                </button>
              )}
          </>
        )}
    </div>
  );
}