import React from 'react';
import SearchFilter from '../../components/compontes-project/SearchFilter';
import ResultsList from '../../components/compontes-project/ResultsList';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { useNavigate } from 'react-router-dom';

const ResultsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-7xl mx-auto">
          {/* Header com botão voltar */}
          <div className="mb-6">
            <Button 
              onClick={() => navigate('/')} 
              variant="ghost" 
              className="mb-4 text-slate-600 hover:text-slate-800 hover:bg-white/50"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar à busca
            </Button>
          </div>

          {/* Filtros em card moderno */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 mb-8">
            <SearchFilter />
          </div>

          {/* Resultados */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
            <ResultsList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
