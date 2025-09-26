import React, { useContext, useState } from 'react';
import { SearchContext } from '../../Context/SearchContext';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Input } from "../ui/input";
import logo from '../../assets/logo.svg';
import { Button } from "../ui/button";
import { Search, X, Calendar } from 'lucide-react';

const SearchForm: React.FC = () => {
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
        trecho: query.trecho,
        termo: query.termo,
        ano: query.ano,
        nome_arquivo: query.nome_arquivo,
        link_arquivo: query.link_arquivo,
        data_inicio: formatDateForInput(query.data_inicio),
        data_fim: formatDateForInput(query.data_fim),
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
            termo: '',
            ano: '',
            nome_arquivo: '',
            link_arquivo: '',
            data_inicio: '',
            data_fim: '',
        });

        // Também reseta o contexto se necessário
        setQuery({
            trecho: '',
            termo: '',
            ano: '',
            nome_arquivo: '',
            link_arquivo: '',
            data_inicio: '',
            data_fim: '',
        });
    };

    return (
        <>
            <Helmet title="Início" />
            
            <div className="flex flex-col items-center justify-center min-h-[90vh] sm:min-h-[80vh] px-2 sm:px-4">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <div className="relative mb-8">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur-2xl opacity-20 w-32 h-32 mx-auto"></div>
                        <img className="w-24 h-24 mx-auto relative z-10 drop-shadow-lg" src={logo} alt="Logo" />
                    </div>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-slate-800 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
                        Procuradoria-Geral do Estado do Pará
                    </h1>
                    <h2 className="text-lg sm:text-xl lg:text-2xl tracking-tight text-slate-600 font-medium">
                        Sistema de Busca Avançada - DOE
                    </h2>
                </div>

                {/* Search Form Card */}
                <div className="w-full max-w-5xl bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-4 sm:p-8 lg:p-10">
                    <form className="space-y-8">
                        {/* Main Search Section */}
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                                <div className="lg:col-span-3">
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Conteúdo a ser buscado
                                    </label>
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                                        <Input
                                            placeholder="Digite os termos que deseja buscar..."
                                            value={localQuery.termo}
                                            onChange={(e) => setLocalQuery({ ...localQuery, termo: e.target.value })}
                                            className="pl-10 h-14 sm:h-12 text-base border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Ano
                                    </label>
                                    <Input
                                        placeholder="2025"
                                        value={localQuery.ano}
                                        onChange={(e) => setLocalQuery({ ...localQuery, ano: e.target.value })}
                                        className="h-14 sm:h-12 text-base border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Date Range Section */}
                        <div className="bg-slate-50/50 rounded-2xl p-6 border border-slate-100">
                            <h3 className="text-lg font-semibold mb-4 text-slate-800 flex items-center">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                                Busca por período
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="col-span-1">
                                    <label className="block text-sm font-medium text-slate-600 mb-2">
                                        Data inicial
                                    </label>

                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
                                        <input
                                            type="date"
                                            value={localQuery.data_inicio}
                                            onChange={(e) => setLocalQuery({ ...localQuery, data_inicio: e.target.value })}
                                            className="h-14 sm:h-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl w-full pl-10 p-4 text-slate-600"
                                        />
                                    </div>



                                </div>


                                <div>
                                    <label className="block text-sm font-medium text-slate-600 mb-2">
                                        Data final
                                    </label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
                                        <input
                                            type="date"
                                            value={localQuery.data_fim}
                                            onChange={(e) => setLocalQuery({ ...localQuery, data_fim: e.target.value })}
                                            className="h-14 sm:h-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl w-full pl-10 p-4 text-slate-600"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-4">
                            <Button
                                onClick={handleSearch}
                                type="submit"
                                size="lg"
                                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-8 py-4 sm:py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 h-14 sm:h-auto"
                            >
                                <Search className="h-5 w-5 mr-2" />
                                Pesquisar
                            </Button>

                            <Button
                                onClick={handleClearFilters}
                                type="button"
                                variant="outline"
                                size="lg"
                                className="w-full sm:w-auto border-slate-300 text-slate-600 hover:bg-slate-50 font-medium px-8 py-4 sm:py-3 rounded-xl transition-all duration-200 h-14 sm:h-auto"
                            >
                                <X className="h-5 w-5 mr-2" />
                                Limpar filtros
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default SearchForm;
