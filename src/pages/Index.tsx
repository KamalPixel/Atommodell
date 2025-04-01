
import PeriodicTable from '../components/PeriodicTable';
import { Atom } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 text-white py-4 px-4 relative overflow-hidden">
      {/* Background elements for futuristic look */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-56 h-56 rounded-full bg-purple-500 blur-[100px]"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 rounded-full bg-blue-500 blur-[100px]"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-cyan-500 blur-[120px] opacity-20"></div>
      </div>
      
      {/* Grid background */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBoMzB2MzBIMzB6IiBzdHJva2Utb3BhY2l0eT0iLjEiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIuNSIvPjxwYXRoIGQ9Ik0wIDMwaDMwdjMwSDB6IiBzdHJva2Utb3BhY2l0eT0iLjEiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIuNSIvPjxwYXRoIGQ9Ik0wIDBoMzB2MzBIMHoiIHN0cm9rZS1vcGFjaXR5PSIuMSIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9Ii41Ii8+PHBhdGggZD0iTTMwIDBoMzB2MzBIMzB6IiBzdHJva2Utb3BhY2l0eT0iLjEiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIuNSIvPjwvZz48L3N2Zz4=')] opacity-5"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Atom className="text-cyan-400 h-8 w-8" />
            <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 tracking-tight">
              Dynamsisk Periodesystem
            </h1>
            <Atom className="text-cyan-400 h-8 w-8" />
          </div>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto font-light tracking-wide">
           Sjekk ut grunnstoffene i periodesystemet med vår visualisering!. Hold musepekeren over et grunnstoff 
            for å se detaljert informasjon og atomstruktur.
          </p>
        </div>
        
        <PeriodicTable />
        
        <div className="mt-6 text-center">
          <p className="text-cyan-400/80 text-sm max-w-3xl mx-auto italic">
          Dette interaktive periodesystemet er inspirert av en fysikkoppgave. Det var da jeg fikk ideen til å visualisere det på en dynamisk måte.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
