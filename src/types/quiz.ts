export type QuizMode = 'symbol-to-name' | 'name-to-symbol' | 'properties' | 'electron-config';

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface QuizQuestion {
  id: string;
  mode: QuizMode;
  correctAnswer: string;
  options: string[];
  prompt: string;
  elementData: {
    symbol: string;
    name: string;
    atomicNumber: number;
    category: string;
  };
}

export interface QuizState {
  currentQuestion: QuizQuestion | null;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  streak: number;
  bestStreak: number;
  isActive: boolean;
  selectedAnswer: string | null;
  isAnswered: boolean;
  difficulty: Difficulty;
  mode: QuizMode;
}

export interface QuizStats {
  totalGamesPlayed: number;
  totalQuestionsAnswered: number;
  totalCorrect: number;
  bestStreak: number;
  averageScore: number;
  lastPlayed: string | null;
  modeStats: Record<QuizMode, { played: number; correct: number }>;
}

export const QUIZ_MODE_LABELS: Record<QuizMode, string> = {
  'symbol-to-name': 'Symbol → Navn',
  'name-to-symbol': 'Navn → Symbol',
  'properties': 'Egenskaper',
  'electron-config': 'Elektronkonfigurasjon',
};

export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  easy: 'Lett',
  medium: 'Medium',
  hard: 'Vanskelig',
};

export const DIFFICULTY_OPTIONS: Record<Difficulty, number> = {
  easy: 3,
  medium: 4,
  hard: 5,
};
