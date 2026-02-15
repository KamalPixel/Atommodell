import React, { useState, useMemo } from 'react';
import { elementData, Element } from '../data/elementData';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Search, Filter, X, Atom } from 'lucide-react';
import { Button } from './ui/button';

interface FilterState {
  category: string;
  state: string;
  period: string;
}

const CATEGORIES = [
  { value: 'all', label: 'Alle kategorier' },
  { value: 'alkali metal', label: 'Alkalimetall' },
  { value: 'alkaline earth metal', label: 'Jordalkalimetall' },
  { value: 'transition metal', label: 'Overgangsmetall' },
  { value: 'post-transition metal', label: 'Post-overgangsmetall' },
  { value: 'metalloid', label: 'Halvmetall' },
  { value: 'nonmetal', label: 'Ikke-metall' },
  { value: 'noble gas', label: 'Edelgass' },
  { value: 'lanthanide', label: 'Lantanid' },
  { value: 'actinide', label: 'Aktinid' },
];

const STATES = [
  { value: 'all', label: 'Alle tilstander' },
  { value: 'Solid', label: 'Fast' },
  { value: 'Liquid', label: 'Flytende' },
  { value: 'Gas', label: 'Gass' },
];

const PERIODS = [
  { value: 'all', label: 'Alle perioder' },
  { value: '1', label: 'Periode 1' },
  { value: '2', label: 'Periode 2' },
  { value: '3', label: 'Periode 3' },
  { value: '4', label: 'Periode 4' },
  { value: '5', label: 'Periode 5' },
  { value: '6', label: 'Periode 6' },
  { value: '7', label: 'Periode 7' },
];

const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    'alkali metal': 'bg-pink-500/20 text-pink-400 border-pink-500/30',
    'alkaline earth metal': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    'transition metal': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
    'post-transition metal': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    'metalloid': 'bg-violet-500/20 text-violet-400 border-violet-500/30',
    'nonmetal': 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
    'noble gas': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    'lanthanide': 'bg-fuchsia-500/20 text-fuchsia-400 border-fuchsia-500/30',
    'actinide': 'bg-sky-500/20 text-sky-400 border-sky-500/30',
  };
  return colors[category] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
};

const translateCategory = (category: string): string => {
  const translations: Record<string, string> = {
    'alkali metal': 'Alkalimetall',
    'alkaline earth metal': 'Jordalkalimetall',
    'transition metal': 'Overgangsmetall',
    'post-transition metal': 'Post-overgangsmetall',
    'metalloid': 'Halvmetall',
    'nonmetal': 'Ikke-metall',
    'noble gas': 'Edelgass',
    'lanthanide': 'Lantanid',
    'actinide': 'Aktinid',
    'unknown': 'Ukjent',
  };
  return translations[category] || category;
};

const translateState = (state: string): string => {
  const translations: Record<string, string> = {
    'Solid': 'Fast',
    'Liquid': 'Flytende',
    'Gas': 'Gass',
  };
  return translations[state] || state;
};

const ElementSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterState>({
    category: 'all',
    state: 'all',
    period: 'all',
  });
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);

  const filteredElements = useMemo(() => {
    return elementData.filter((element) => {
      // Search filter
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        searchQuery === '' ||
        element.name.toLowerCase().includes(searchLower) ||
        element.symbol.toLowerCase().includes(searchLower) ||
        element.atomicNumber.toString().includes(searchLower);

      // Category filter
      const matchesCategory =
        filters.category === 'all' || element.category === filters.category;

      // State filter
      const matchesState =
        filters.state === 'all' || element.state === filters.state;

      // Period filter
      const matchesPeriod =
        filters.period === 'all' || element.period.toString() === filters.period;

      return matchesSearch && matchesCategory && matchesState && matchesPeriod;
    });
  }, [searchQuery, filters]);

  const hasActiveFilters =
    filters.category !== 'all' ||
    filters.state !== 'all' ||
    filters.period !== 'all' ||
    searchQuery !== '';

  const clearFilters = () => {
    setSearchQuery('');
    setFilters({ category: 'all', state: 'all', period: 'all' });
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <Card className="bg-gray-900/80 border-cyan-400/20 backdrop-blur-sm mb-6">
        <CardContent className="p-6">
          {/* Search input */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Søk etter navn, symbol eller atomnummer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-800 border-cyan-400/30 text-white placeholder:text-gray-500 focus:border-cyan-400"
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-400 flex items-center gap-1">
                <Filter className="w-4 h-4" />
                Kategori
              </label>
              <Select
                value={filters.category}
                onValueChange={(value) =>
                  setFilters((prev) => ({ ...prev, category: value }))
                }
              >
                <SelectTrigger className="bg-gray-800 border-cyan-400/30 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-cyan-400/30">
                  {CATEGORIES.map((cat) => (
                    <SelectItem
                      key={cat.value}
                      value={cat.value}
                      className="text-white hover:bg-cyan-400/20"
                    >
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-400">Tilstand</label>
              <Select
                value={filters.state}
                onValueChange={(value) =>
                  setFilters((prev) => ({ ...prev, state: value }))
                }
              >
                <SelectTrigger className="bg-gray-800 border-cyan-400/30 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-cyan-400/30">
                  {STATES.map((st) => (
                    <SelectItem
                      key={st.value}
                      value={st.value}
                      className="text-white hover:bg-cyan-400/20"
                    >
                      {st.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-400">Periode</label>
              <Select
                value={filters.period}
                onValueChange={(value) =>
                  setFilters((prev) => ({ ...prev, period: value }))
                }
              >
                <SelectTrigger className="bg-gray-800 border-cyan-400/30 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-cyan-400/30">
                  {PERIODS.map((p) => (
                    <SelectItem
                      key={p.value}
                      value={p.value}
                      className="text-white hover:bg-cyan-400/20"
                    >
                      {p.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Active filters indicator */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-400">
              Viser {filteredElements.length} av {elementData.length} grunnstoffer
            </p>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/10"
              >
                <X className="w-4 h-4 mr-1" />
                Nullstill filtre
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Results grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {filteredElements.map((element) => (
          <Card
            key={element.atomicNumber}
            className={`bg-gray-800/50 border-cyan-400/20 hover:border-cyan-400/50 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/10 ${
              selectedElement?.atomicNumber === element.atomicNumber
                ? 'border-cyan-400 shadow-lg shadow-cyan-500/20'
                : ''
            }`}
            onClick={() =>
              setSelectedElement(
                selectedElement?.atomicNumber === element.atomicNumber
                  ? null
                  : element
              )
            }
          >
            <CardContent className="p-3 text-center">
              <div className="text-xs text-gray-500 mb-1">
                {element.atomicNumber}
              </div>
              <div className="text-2xl font-bold text-cyan-400 mb-1">
                {element.symbol}
              </div>
              <div className="text-xs text-gray-300 truncate">{element.name}</div>
              <Badge
                variant="outline"
                className={`mt-2 text-[10px] ${getCategoryColor(element.category)}`}
              >
                {translateCategory(element.category)}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No results */}
      {filteredElements.length === 0 && (
        <div className="text-center py-12">
          <Atom className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">Ingen grunnstoffer funnet</p>
          <p className="text-gray-500 text-sm mt-2">
            Prøv å endre søket eller filtrene
          </p>
        </div>
      )}

      {/* Selected element details */}
      {selectedElement && (
        <Card className="mt-6 bg-gray-800/80 border-cyan-400/30">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-4xl font-bold text-cyan-400">
                    {selectedElement.symbol}
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      {selectedElement.name}
                    </h3>
                    <p className="text-sm text-gray-400">
                      Atomnummer {selectedElement.atomicNumber}
                    </p>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedElement(null)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              <div>
                <p className="text-xs text-gray-500">Atomvekt</p>
                <p className="text-white">{selectedElement.atomicWeight}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Kategori</p>
                <p className="text-white">
                  {translateCategory(selectedElement.category)}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Tilstand</p>
                <p className="text-white">{translateState(selectedElement.state)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Oppdaget</p>
                <p className="text-white">{selectedElement.yearDiscovered}</p>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-xs text-gray-500">Elektronkonfigurasjon</p>
              <p className="text-cyan-400 font-mono">
                {selectedElement.electronConfiguration}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ElementSearch;
