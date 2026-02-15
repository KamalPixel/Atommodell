import React from 'react';
import { useQuiz } from '../hooks/useQuiz';
import {
  QuizMode,
  Difficulty,
  QUIZ_MODE_LABELS,
  DIFFICULTY_LABELS,
} from '../types/quiz';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Trophy,
  Zap,
  Target,
  RotateCcw,
  Play,
  CheckCircle2,
  XCircle,
  Flame,
  Award,
} from 'lucide-react';

const ElementQuiz: React.FC = () => {
  const {
    state,
    stats,
    startQuiz,
    submitAnswer,
    nextQuestion,
    endQuiz,
    setDifficulty,
    setMode,
  } = useQuiz();

  const accuracyPercentage =
    state.totalQuestions > 0
      ? Math.round((state.correctAnswers / state.totalQuestions) * 100)
      : 0;

  const renderStartScreen = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-cyan-400 mb-2">Quiz Modus</h2>
        <p className="text-gray-400">Test kunnskapen din om grunnstoffene</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="space-y-2">
          <label className="text-sm text-gray-400">Velg modus</label>
          <Select
            value={state.mode}
            onValueChange={(value: QuizMode) => setMode(value)}
          >
            <SelectTrigger className="bg-gray-800 border-cyan-400/30 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-cyan-400/30">
              {(Object.keys(QUIZ_MODE_LABELS) as QuizMode[]).map((mode) => (
                <SelectItem key={mode} value={mode} className="text-white hover:bg-cyan-400/20">
                  {QUIZ_MODE_LABELS[mode]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-400">Vanskelighetsgrad</label>
          <Select
            value={state.difficulty}
            onValueChange={(value: Difficulty) => setDifficulty(value)}
          >
            <SelectTrigger className="bg-gray-800 border-cyan-400/30 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-cyan-400/30">
              {(Object.keys(DIFFICULTY_LABELS) as Difficulty[]).map((diff) => (
                <SelectItem key={diff} value={diff} className="text-white hover:bg-cyan-400/20">
                  {DIFFICULTY_LABELS[diff]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button
        onClick={() => startQuiz(state.mode, state.difficulty)}
        className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-6 text-lg"
      >
        <Play className="w-5 h-5 mr-2" />
        Start Quiz
      </Button>

      {stats.totalGamesPlayed > 0 && (
        <Card className="bg-gray-800/50 border-cyan-400/20 mt-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-cyan-400 flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              Din Statistikk
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-white">{stats.totalGamesPlayed}</div>
                <div className="text-xs text-gray-400">Spill</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-400">
                  {stats.totalQuestionsAnswered > 0
                    ? Math.round((stats.totalCorrect / stats.totalQuestionsAnswered) * 100)
                    : 0}%
                </div>
                <div className="text-xs text-gray-400">Nøyaktighet</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-400">{stats.bestStreak}</div>
                <div className="text-xs text-gray-400">Beste Streak</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-400">
                  {Math.round(stats.averageScore)}
                </div>
                <div className="text-xs text-gray-400">Gj.snitt Poeng</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const renderQuestion = () => {
    if (!state.currentQuestion) return null;

    return (
      <div className="space-y-6">
        {/* Header med score og streak */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="border-cyan-400/50 text-cyan-400 px-3 py-1">
              <Target className="w-4 h-4 mr-1" />
              {state.totalQuestions + 1} / {Math.min(state.totalQuestions + 10, 38)}
            </Badge>
            <Badge variant="outline" className="border-purple-400/50 text-purple-400 px-3 py-1">
              <Zap className="w-4 h-4 mr-1" />
              {state.score} poeng
            </Badge>
          </div>

          {state.streak > 0 && (
            <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 animate-pulse">
              <Flame className="w-4 h-4 mr-1" />
              {state.streak} streak!
            </Badge>
          )}
        </div>

        {/* Progress bar */}
        <Progress
          value={accuracyPercentage}
          className="h-2 bg-gray-700"
        />

        {/* Spørsmål */}
        <Card className="bg-gray-800/80 border-cyan-400/30">
          <CardContent className="pt-6">
            <p className="text-xl text-white text-center mb-6">
              {state.currentQuestion.prompt}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {state.currentQuestion.options.map((option, index) => {
                const isSelected = state.selectedAnswer === option;
                const isCorrect = option === state.currentQuestion?.correctAnswer;
                const showResult = state.isAnswered;

                let buttonClass = 'bg-gray-700 hover:bg-gray-600 border-gray-600';
                if (showResult) {
                  if (isCorrect) {
                    buttonClass = 'bg-green-600/30 border-green-500 text-green-400';
                  } else if (isSelected && !isCorrect) {
                    buttonClass = 'bg-red-600/30 border-red-500 text-red-400';
                  }
                } else if (isSelected) {
                  buttonClass = 'bg-cyan-600/30 border-cyan-400';
                }

                return (
                  <Button
                    key={index}
                    variant="outline"
                    className={`h-auto py-4 px-6 text-lg transition-all duration-300 ${buttonClass} ${
                      !showResult ? 'hover:border-cyan-400 hover:bg-cyan-400/10' : ''
                    }`}
                    onClick={() => !state.isAnswered && submitAnswer(option)}
                    disabled={state.isAnswered}
                  >
                    <span className="flex items-center justify-center gap-2">
                      {showResult && isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-green-400" />
                      )}
                      {showResult && isSelected && !isCorrect && (
                        <XCircle className="w-5 h-5 text-red-400" />
                      )}
                      {option}
                    </span>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Resultat og neste knapp */}
        {state.isAnswered && (
          <div className="flex flex-col items-center gap-4">
            <div className={`text-lg font-semibold ${
              state.selectedAnswer === state.currentQuestion.correctAnswer
                ? 'text-green-400'
                : 'text-red-400'
            }`}>
              {state.selectedAnswer === state.currentQuestion.correctAnswer
                ? 'Riktig!'
                : `Feil! Riktig svar: ${state.currentQuestion.correctAnswer}`}
            </div>

            <div className="flex gap-3">
              <Button
                onClick={nextQuestion}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
              >
                Neste Spørsmål
              </Button>
              <Button
                onClick={endQuiz}
                variant="outline"
                className="border-gray-600 text-gray-400 hover:text-white"
              >
                Avslutt Quiz
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderResults = () => (
    <div className="space-y-6 text-center">
      <div className="mb-8">
        <Award className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-cyan-400 mb-2">Quiz Fullført!</h2>
        <p className="text-gray-400">Her er resultatene dine</p>
      </div>

      <Card className="bg-gray-800/50 border-cyan-400/20">
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="text-4xl font-bold text-cyan-400">{state.score}</div>
              <div className="text-sm text-gray-400">Poeng</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-400">
                {state.correctAnswers}/{state.totalQuestions}
              </div>
              <div className="text-sm text-gray-400">Riktige</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-400">{accuracyPercentage}%</div>
              <div className="text-sm text-gray-400">Nøyaktighet</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-400">{state.bestStreak}</div>
              <div className="text-sm text-gray-400">Beste Streak</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center gap-4">
        <Button
          onClick={() => startQuiz(state.mode, state.difficulty)}
          className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Spill Igjen
        </Button>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <Card className="bg-gray-900/80 border-cyan-400/20 backdrop-blur-sm">
        <CardContent className="p-6">
          {!state.isActive && state.totalQuestions === 0 && renderStartScreen()}
          {state.isActive && renderQuestion()}
          {!state.isActive && state.totalQuestions > 0 && renderResults()}
        </CardContent>
      </Card>
    </div>
  );
};

export default ElementQuiz;
