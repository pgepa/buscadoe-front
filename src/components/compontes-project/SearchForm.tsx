import React, { useContext, useState } from 'react';
import { SearchContext } from '../../Context/SearchContext';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Input } from "../ui/input";
import logo from '../../assets/logo.svg';
import { Button } from "../ui/button";
import { Search, X } from 'lucide-react';

const SearchForm: React.FC = () => {
    const { query, setQuery } = useContext(SearchContext)!;
    const [localQuery, setLocalQuery] = useState<{ trecho: string; nome_arquivo: string; link_arquivo: string; termo: string; ano: string; data_inicio: string; data_fim: string; }>({
        trecho: query.trecho,
        termo: query.termo,
        ano: query.ano,
        nome_arquivo: query.nome_arquivo,
        link_arquivo: query.link_arquivo,
        data_inicio: query.data_inicio,
        data_fim: query.data_fim,
    });
    const navigate = useNavigate();

    const handleSearch = (event: React.FormEvent) => {
        event.preventDefault();
        setQuery(localQuery);
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
            ano:'',
            nome_arquivo: '',
            link_arquivo: '',
            data_inicio: '',
            data_fim: '',
        });
    };

    return (
        <>
            <Helmet title="Início" />
            <form  className="flex flex-col gap-4 items-center p-4 sm:p-6 md:p-8 ">

                <img className="w-24 h-24" src={logo} alt="Logo" />
                <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2 text-violet-800">Procuradoria-Geral do Estado do Pará</h1>
                <h2 className="text-lg sm:text-xl tracking-tight text-violet-600">Sistema de Busca Avançada - DOE</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl">                                                  
                        

                    <Input
                        placeholder="Informe o conteúdo a ser buscado"
                        value={localQuery.termo}
                        onChange={(e) => setLocalQuery({ ...localQuery, termo: e.target.value })}
                        className="w-full sm:col-span-2 md:col-span-3"
                    />
                    <Input
                        placeholder="Ano"
                        value={localQuery.ano}
                        onChange={(e) => setLocalQuery({ ...localQuery, ano: e.target.value })}
                        className="w-full"
                    />
                    <Input
                        placeholder="Data Inicial - dd/mm/aaaa"
                        value={localQuery.data_inicio}
                        onChange={(e) => setLocalQuery({ ...localQuery, data_inicio: e.target.value })}
                        className="w-full"
                    />
                    <Input
                        placeholder="Data Fim - dd/mm/aaaa"
                        value={localQuery.data_fim}
                        onChange={(e) => setLocalQuery({ ...localQuery, data_fim: e.target.value })}
                        className="w-full"
                    />

                </div>

                <div className="flex flex-row gap-4 items-center mt-4">

                    <Button onClick={handleSearch} type="submit" variant='default'  size="lg">
                        <Search className="h-4 w-4 mr-2" />
                        Pesquisar
                    </Button>

                    <Button
                        onClick={handleClearFilters}
                        type="button"
                        variant="secondary"
                        size="lg"
                        className="flex items-center"
                    >
                        <X className="h-4 w-4 mr-2" />
                        Remover filtros
                    </Button>

                </div>


            </form>


        </>

    );
};

export default SearchForm;
