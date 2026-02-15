import { useState, useCallback, useEffect } from 'react';
import { elementData, Element } from '../data/elementData';
import {
  QuizMode,
  Difficulty,
  QuizQuestion,
  QuizState,
  QuizStats,
  DIFFICULTY_OPTIONS,
} from '../types/quiz';

const STORAGE_KEY = 'periodic-table-quiz-stats';

const getInitialStats = (): QuizStats => ({
  totalGamesPlayed: 0,
  totalQuestionsAnswered: 0,
  totalCorrect: 0,
  bestStreak: 0,
  averageScore: 0,
  lastPlayed: null,
  modeStats: {
    'symbol-to-name': { played: 0, correct: 0 },
    'name-to-symbol': { played: 0, correct: 0 },
    'properties': { played: 0, correct: 0 },
    'electron-config': { played: 0, correct: 0 },
  },
});

const loadStats = (): QuizStats => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Failed to load quiz stats:', e);
  }
  return getInitialStats();
};

const saveStats = (stats: QuizStats): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  } catch (e) {
    console.error('Failed to save quiz stats:', e);
  }
};

const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const generateQuestion = (
  mode: QuizMode,
  difficulty: Difficulty,
  usedElements: Set<number>
): QuizQuestion | null => {
  const availableElements = elementData.filter(
    (el) => !usedElements.has(el.atomicNumber)
  );

  if (availableElements.length === 0) return null;

  const targetElement =
    availableElements[Math.floor(Math.random() * availableElements.length)];
  const optionCount = DIFFICULTY_OPTIONS[difficulty];

  let prompt: string;
  let correctAnswer: string;
  let otherElements: Element[];

  switch (mode) {
    case 'symbol-to-name':
      prompt = `Hva heter grunnstoffet med symbolet "${targetElement.symbol}"?`;
      correctAnswer = targetElement.name;
      otherElements = elementData.filter(
        (el) => el.atomicNumber !== targetElement.atomicNumber
      );
      break;

    case 'name-to-symbol':
      prompt = `Hva er symbolet for ${targetElement.name}?`;
      correctAnswer = targetElement.symbol;
      otherElements = elementData.filter(
        (el) => el.atomicNumber !== targetElement.atomicNumber
      );
      break;

    case 'properties':
      prompt = `Hvilket grunnstoff har atomnummer ${targetElement.atomicNumber} og er en ${translateCategory(targetElement.category)}?`;
      correctAnswer = targetElement.name;
      otherElements = elementData.filter(
        (el) => el.atomicNumber !== targetElement.atomicNumber
      );
      break;

    case 'electron-config':
      prompt = `Hvilket grunnstoff har elektronkonfigurasjonen "${targetElement.electronConfiguration}"?`;
      correctAnswer = targetElement.name;
      otherElements = elementData.filter(
        (el) => el.atomicNumber !== targetElement.atomicNumber
      );
      break;

    default:
      return null;
  }

  const wrongAnswers = shuffleArray(otherElements)
    .slice(0, optionCount - 1)
    .map((el) =>
      mode === 'name-to-symbol' ? el.symbol : el.name
    );

  const options = shuffleArray([correctAnswer, ...wrongAnswers]);

  return {
    id: `${Date.now()}-${targetElement.atomicNumber}`,
    mode,
    correctAnswer,
    options,
    prompt,
    elementData: {
      symbol: targetElement.symbol,
      name: targetElement.name,
      atomicNumber: targetElement.atomicNumber,
      category: targetElement.category,
    },
  };
};

const translateCategory = (category: string): string => {
  const translations: Record<string, string> = {
    'alkali metal': 'alkalimetall',
    'alkaline earth metal': 'jordalkalimetall',
    'transition metal': 'overgangsmetall',
    'post-transition metal': 'post-overgangsmetall',
    'metalloid': 'halvmetall',
    'nonmetal': 'ikke-metall',
    'noble gas': 'edelgass',
    'lanthanide': 'lantanid',
    'actinide': 'aktinid',
    'unknown': 'ukjent',
  };
  return translations[category] || category;
};

export const useQuiz = () => {
  const [state, setState] = useState<QuizState>({
    currentQuestion: null,
    score: 0,
    totalQuestions: 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
    streak: 0,
    bestStreak: 0,
    isActive: false,
    selectedAnswer: null,
    isAnswered: false,
    difficulty: 'medium',
    mode: 'symbol-to-name',
  });

  const [stats, setStats] = useState<QuizStats>(loadStats);
  const [usedElements, setUsedElements] = useState<Set<number>>(new Set());

  useEffect(() => {
    saveStats(stats);
  }, [stats]);

  const startQuiz = useCallback((mode: QuizMode, difficulty: Difficulty) => {
    setUsedElements(new Set());
    const question = generateQuestion(mode, difficulty, new Set());

    setState({
      currentQuestion: question,
      score: 0,
      totalQuestions: 0,
      correctAnswers: 0,
      incorrectAnswers: 0,
      streak: 0,
      bestStreak: 0,
      isActive: true,
      selectedAnswer: null,
      isAnswered: false,
      difficulty,
      mode,
    });

    if (question) {
      setUsedElements(new Set([question.elementData.atomicNumber]));
    }
  }, []);

  const submitAnswer = useCallback((answer: string) => {
    if (state.isAnswered || !state.currentQuestion) return;

    const isCorrect = answer === state.currentQuestion.correctAnswer;
    const newStreak = isCorrect ? state.streak + 1 : 0;
    const newBestStreak = Math.max(newStreak, state.bestStreak);
    const pointsEarned = isCorrect
      ? 10 * (state.difficulty === 'hard' ? 3 : state.difficulty === 'medium' ? 2 : 1) +
        (newStreak > 1 ? newStreak * 2 : 0)
      : 0;

    setState((prev) => ({
      ...prev,
      selectedAnswer: answer,
      isAnswered: true,
      score: prev.score + pointsEarned,
      totalQuestions: prev.totalQuestions + 1,
      correctAnswers: prev.correctAnswers + (isCorrect ? 1 : 0),
      incorrectAnswers: prev.incorrectAnswers + (isCorrect ? 0 : 1),
      streak: newStreak,
      bestStreak: newBestStreak,
    }));

    setStats((prev) => ({
      ...prev,
      totalQuestionsAnswered: prev.totalQuestionsAnswered + 1,
      totalCorrect: prev.totalCorrect + (isCorrect ? 1 : 0),
      bestStreak: Math.max(prev.bestStreak, newBestStreak),
      lastPlayed: new Date().toISOString(),
      modeStats: {
        ...prev.modeStats,
        [state.mode]: {
          played: prev.modeStats[state.mode].played + 1,
          correct: prev.modeStats[state.mode].correct + (isCorrect ? 1 : 0),
        },
      },
    }));
  }, [state]);

  const nextQuestion = useCallback(() => {
    const question = generateQuestion(state.mode, state.difficulty, usedElements);

    if (!question) {
      // No more elements available, end quiz
      endQuiz();
      return;
    }

    setUsedElements((prev) => new Set([...prev, question.elementData.atomicNumber]));

    setState((prev) => ({
      ...prev,
      currentQuestion: question,
      selectedAnswer: null,
      isAnswered: false,
    }));
  }, [state.mode, state.difficulty, usedElements]);

  const endQuiz = useCallback(() => {
    setStats((prev) => ({
      ...prev,
      totalGamesPlayed: prev.totalGamesPlayed + 1,
      averageScore:
        (prev.averageScore * prev.totalGamesPlayed + state.score) /
        (prev.totalGamesPlayed + 1),
    }));

    setState((prev) => ({
      ...prev,
      isActive: false,
    }));
  }, [state.score]);

  const resetStats = useCallback(() => {
    const initialStats = getInitialStats();
    setStats(initialStats);
    saveStats(initialStats);
  }, []);

  return {
    state,
    stats,
    startQuiz,
    submitAnswer,
    nextQuestion,
    endQuiz,
    resetStats,
    setDifficulty: (difficulty: Difficulty) =>
      setState((prev) => ({ ...prev, difficulty })),
    setMode: (mode: QuizMode) => setState((prev) => ({ ...prev, mode })),
  };
};
