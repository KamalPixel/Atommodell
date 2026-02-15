import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import {
  Trophy,
  Target,
  Flame,
  TrendingUp,
  RotateCcw,
  Award,
  Zap,
  Brain,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { QuizStats, QUIZ_MODE_LABELS, QuizMode } from '../types/quiz';

const STORAGE_KEY = 'periodic-table-quiz-stats';

const getStats = (): QuizStats => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Failed to load quiz stats:', e);
  }
  return {
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
  };
};

const COLORS = ['#00D4FF', '#8B5CF6', '#F59E0B', '#10B981'];

const Statistics: React.FC = () => {
  const stats = getStats();

  const accuracy = useMemo(() => {
    if (stats.totalQuestionsAnswered === 0) return 0;
    return Math.round((stats.totalCorrect / stats.totalQuestionsAnswered) * 100);
  }, [stats]);

  const modeChartData = useMemo(() => {
    return (Object.keys(stats.modeStats) as QuizMode[]).map((mode, index) => ({
      name: QUIZ_MODE_LABELS[mode],
      spilt: stats.modeStats[mode].played,
      riktige: stats.modeStats[mode].correct,
      fill: COLORS[index % COLORS.length],
    }));
  }, [stats]);

  const pieData = useMemo(() => {
    return [
      { name: 'Riktige', value: stats.totalCorrect, fill: '#10B981' },
      {
        name: 'Feil',
        value: stats.totalQuestionsAnswered - stats.totalCorrect,
        fill: '#EF4444',
      },
    ];
  }, [stats]);

  const resetStats = () => {
    if (confirm('Er du sikker på at du vil nullstille all statistikk?')) {
      localStorage.removeItem(STORAGE_KEY);
      window.location.reload();
    }
  };

  const getSkillLevel = (accuracy: number): { level: string; color: string } => {
    if (accuracy >= 90) return { level: 'Mester', color: 'text-yellow-400' };
    if (accuracy >= 75) return { level: 'Ekspert', color: 'text-purple-400' };
    if (accuracy >= 60) return { level: 'Avansert', color: 'text-cyan-400' };
    if (accuracy >= 40) return { level: 'Lærer', color: 'text-green-400' };
    return { level: 'Nybegynner', color: 'text-gray-400' };
  };

  const skillLevel = getSkillLevel(accuracy);

  if (stats.totalGamesPlayed === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto p-4">
        <Card className="bg-gray-900/80 border-cyan-400/20 backdrop-blur-sm">
          <CardContent className="p-12 text-center">
            <Brain className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-400 mb-2">
              Ingen statistikk ennå
            </h2>
            <p className="text-gray-500 mb-6">
              Spill noen quizer for å se statistikken din her!
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-cyan-400 mb-2">Din Statistikk</h2>
        <p className="text-gray-400">
          Oversikt over quiz-ytelsen din
        </p>
      </div>

      {/* Skill Level Card */}
      <Card className="bg-gradient-to-r from-gray-900 to-gray-800 border-cyan-400/30">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-cyan-500/20 rounded-full">
                <Award className="w-8 h-8 text-cyan-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Ferdighetsnivå</p>
                <p className={`text-2xl font-bold ${skillLevel.color}`}>
                  {skillLevel.level}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-4xl font-bold text-white">{accuracy}%</p>
              <p className="text-sm text-gray-400">nøyaktighet</p>
            </div>
          </div>
          <Progress
            value={accuracy}
            className="mt-4 h-2 bg-gray-700"
          />
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gray-800/50 border-cyan-400/20">
          <CardContent className="p-4 text-center">
            <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">
              {stats.totalGamesPlayed}
            </div>
            <div className="text-xs text-gray-400">Spill Fullført</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-cyan-400/20">
          <CardContent className="p-4 text-center">
            <Target className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">
              {stats.totalCorrect}/{stats.totalQuestionsAnswered}
            </div>
            <div className="text-xs text-gray-400">Riktige Svar</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-cyan-400/20">
          <CardContent className="p-4 text-center">
            <Flame className="w-8 h-8 text-orange-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">
              {stats.bestStreak}
            </div>
            <div className="text-xs text-gray-400">Beste Streak</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-cyan-400/20">
          <CardContent className="p-4 text-center">
            <Zap className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">
              {Math.round(stats.averageScore)}
            </div>
            <div className="text-xs text-gray-400">Gj.snitt Poeng</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Mode Performance Chart */}
        <Card className="bg-gray-800/50 border-cyan-400/20">
          <CardHeader>
            <CardTitle className="text-lg text-cyan-400 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Ytelse per Modus
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={modeChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis
                  dataKey="name"
                  tick={{ fill: '#9CA3AF', fontSize: 10 }}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                  }}
                  labelStyle={{ color: '#F3F4F6' }}
                />
                <Bar dataKey="spilt" name="Spilt" fill="#00D4FF" radius={[4, 4, 0, 0]} />
                <Bar dataKey="riktige" name="Riktige" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Accuracy Pie Chart */}
        <Card className="bg-gray-800/50 border-cyan-400/20">
          <CardHeader>
            <CardTitle className="text-lg text-cyan-400 flex items-center gap-2">
              <Target className="w-5 h-5" />
              Svar-fordeling
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-6 mt-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <span className="text-sm text-gray-400">Riktige</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <span className="text-sm text-gray-400">Feil</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Last Played */}
      {stats.lastPlayed && (
        <Card className="bg-gray-800/50 border-cyan-400/20">
          <CardContent className="p-4">
            <p className="text-sm text-gray-400 text-center">
              Sist spilt:{' '}
              <span className="text-white">
                {new Date(stats.lastPlayed).toLocaleDateString('nb-NO', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </p>
          </CardContent>
        </Card>
      )}

      {/* Reset Button */}
      <div className="text-center">
        <Button
          variant="outline"
          onClick={resetStats}
          className="border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Nullstill Statistikk
        </Button>
      </div>
    </div>
  );
};

export default Statistics;
