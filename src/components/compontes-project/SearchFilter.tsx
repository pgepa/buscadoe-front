import React, { useContext, useState } from 'react';
import { SearchContext } from '../../Context/SearchContext';
import { useNavigate } from 'react-router-dom';
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Search, X, Calendar } from 'lucide-react';
import { Label } from '../ui/label';


const SearchFilter: React.FC = () => {
    const { query, setQuery } = useContext(SearchContext)!;
    
    // Função para converter data de DD/MM/YYYY para YYYY-MM-DD (para o input)
    const formatDateForInput = (dateString: string) => {
        if (!dateString) return '';
        const [day, month, year] = dateString.split('/');
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    };

    // Função para converter data de YYYY-MM-DD para DD/MM/YYYY (para a API)
    const formatDateForAPI = (dateString: string) => {
        if (!dateString) return '';
        const [year, month, day] = dateString.split('-');
        return `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`;
    };

    const [localQuery, setLocalQuery] = useState<{ trecho: string; nome_arquivo: string; link_arquivo: string; termo: string; ano: string; data_inicio: string; data_fim: string; }>({
        trecho: query.trecho || '',
        nome_arquivo: query.nome_arquivo || '',
        link_arquivo: query.link_arquivo || '',
        termo: query.termo || '',
        ano: query.ano || '',
        data_inicio: formatDateForInput(query.data_inicio || ''),
        data_fim: formatDateForInput(query.data_fim || ''),
    });
    const navigate = useNavigate();

    const handleSearch = (event: React.FormEvent) => {
        event.preventDefault();
        // Converter as datas para o formato esperado pela API antes de enviar
        const queryForAPI = {
            ...localQuery,
            data_inicio: formatDateForAPI(localQuery.data_inicio),
            data_fim: formatDateForAPI(localQuery.data_fim)
        };
        setQuery(queryForAPI);
        navigate('/results');
    };

    const handleClearFilters = () => {
        // Reseta o estado local para os valores iniciais
        setLocalQuery({
            trecho: '',
            nome_arquivo: '',
            link_arquivo: '',
            termo: '',
            ano: '',
            data_inicio: '',
            data_fim: '',
        });

        // Também reseta o contexto se necessário
        setQuery({
            trecho: '',
            nome_arquivo: '',
            link_arquivo: '',
            termo: '',
            ano: '',
            data_inicio: '',
            data_fim: '',
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full"></div>
                <h3 className="text-xl font-bold text-slate-800">Refinar busca</h3>
            </div>
    
            <form className="space-y-6">
                {/* Primeira linha - Busca principal e Ano */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                    <div className="lg:col-span-3 space-y-2">
                        <Label className="text-sm font-semibold text-slate-700">Termos de busca</Label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <Input
                                placeholder="Digite os termos que deseja buscar..."
                                value={localQuery.termo}
                                onChange={(e) => setLocalQuery({ ...localQuery, termo: e.target.value })}
                                className="pl-10 h-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-sm font-semibold text-slate-700">Ano</Label>
                        <Input
                            placeholder="2025"
                            value={localQuery.ano}
                            onChange={(e) => setLocalQuery({ ...localQuery, ano: e.target.value })}
                            className="h-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg"
                        />
                    </div>
                </div>

                {/* Segunda linha - Período */}
                <div className="bg-slate-50/50 rounded-xl p-4 border border-slate-100">
                    <Label className="text-sm font-semibold text-slate-700 mb-3 block">Período de busca</Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label className="text-xs font-medium text-slate-600">Data inicial</Label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                                <input
                                    type="date"
                                    value={localQuery.data_inicio}
                                    onChange={(e) => setLocalQuery({ ...localQuery, data_inicio: e.target.value })}
                                    className="h-10 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg pl-10 p-4 text-slate-600 w-full"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-xs font-medium text-slate-600">Data final</Label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                                <input
                                    type="date"
                                    value={localQuery.data_fim}
                                    onChange={(e) => setLocalQuery({ ...localQuery, data_fim: e.target.value })}
                                    className="h-10 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg pl-10 p-4 text-slate-600 w-full"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Botões de ação */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <Button 
                        onClick={handleSearch} 
                        type="submit" 
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-6 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                    >
                        <Search className="h-4 w-4 mr-2" />
                        Buscar novamente
                    </Button>

                    <Button 
                        onClick={handleClearFilters} 
                        variant="outline" 
                        className="border-slate-300 text-slate-600 hover:bg-slate-50 font-medium px-6 py-2.5 rounded-lg transition-all duration-200"
                    >
                        <X className="h-4 w-4 mr-2" />
                        Limpar filtros
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default SearchFilter;
