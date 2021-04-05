import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
// import challenges from '../../challenges.json';
import { UserContext } from "./UserContext";
import { LevelUpModal } from '../components/LevelUpModal';
import api from '../services/api';
import { notifySuccess } from '../utils/configToast';

interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChallengesContextData {
  level: number;
  currentExperience: number;
  experienceToNextLevel: number;
  challengesCompleted: number;
  activeChallenge: Challenge;
  name: string;
  photo_user: string;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completedChallenge: () => void;
  closeLevelUpModal: () => void;
}

interface ChallengesProviderProps {
  children?: ReactNode;
  level?: number;
  currentExperience?: number;
  challengesCompleted?: number;
  user_id?: number;
  token?: string;
  user_name?: string;
  user_gender?: string;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children, ...rest }: ChallengesProviderProps) {
  let [level, setLevel] = useState(0);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challengesCompleted, setChallengesCompleted] = useState(0);

  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

  const [photo_user, setPhotoUser] = useState('');

  const { challenges } = useContext(UserContext);

  const name = rest.user_name;
  const gender = rest.user_gender;
  const user_id = rest.user_id ?? null;
  const token = rest.token;

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  function genderDifinePhotoForUser(gender: string) {
    if(gender === 'male') {
      return setPhotoUser('user-male.png');
    }
    if(gender === 'female') {
      return setPhotoUser('user-female.png');
    }
    if(gender === 'neutral') {
      return setPhotoUser('user-neutral.png');
    }
  }

  useEffect(() => {
    genderDifinePhotoForUser(gender);
  }, []);

  useEffect(() => {
    if(user_id !== null) {
      api.get(`/profiles/${user_id}`, {
        headers: {
          Authorization: `bearer ${token}`
        }
      }).then((response) => {
        const profile = response.data;

        setLevel(profile.level);
        setCurrentExperience(profile.xp);
        setChallengesCompleted(profile.tasks_completed);
      });
    }
  }, [user_id]);

  //enviar notificação
  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    // //informações que precisam ser guardadas no cookie
    Cookies.set('level', String(level));
    Cookies.set('currentExperience', String(currentExperience));
    Cookies.set('challengesCompleted', String(challengesCompleted));

  }, [level, currentExperience, challengesCompleted]);

  async function levelUp() {
    setLevel(level + 1);
    setIsLevelUpModalOpen(true);

    await api.put(`/profiles/${user_id}`, {
      level: ++level,
      xp: currentExperience,
      tasks_completed: challengesCompleted,
    }, {
      headers: {
        Authorization: `bearer ${token}`
      }
    }).then((response) => {
      notifySuccess(response.data.message);
    });
  }

  function closeLevelUpModal() {
    setIsLevelUpModalOpen(false);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    
    const challenge = challenges[randomChallengeIndex];

    const challengeZero = {
      amount: 0,
      description: 'Primeiro você deve criar um Desafio',
      type: 'eye'
    }

    setActiveChallenge(!challenge ? challengeZero : challenge);

    new Audio('/notification.mp3').play();

    // enviar notificação
    // https://developer.mozilla.org/pt-BR/docs/Web/API/notificacoes
    if (Notification.permission === 'granted') {
      new Notification('Novo Desafio', {
        body: `Valendo muito xp para você!`
      });
    }
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  async function completedChallenge() {
    if (!activeChallenge) {
      return;
    }

    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;

      levelUp();
    }

    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);

    await api.put(`/profiles/${user_id}`, {
      level: level,
      xp: finalExperience,
      tasks_completed: challengesCompleted + 1,
    }, {
      headers: {
        Authorization: `bearer ${token}`
      }
    }).then((response) => {
      notifySuccess(response.data.message);
    });
  }

  return (
    <ChallengesContext.Provider
      value={{
        level,
        levelUp,
        experienceToNextLevel,
        currentExperience,
        challengesCompleted,
        name,
        photo_user,
        startNewChallenge,
        activeChallenge,
        resetChallenge,
        completedChallenge,
        closeLevelUpModal,
      }}
    >
      {children}

      {
        isLevelUpModalOpen && <LevelUpModal />
      }
    </ChallengesContext.Provider>
  );
}