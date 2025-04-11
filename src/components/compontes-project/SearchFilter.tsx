import React, { useContext, useState } from 'react';
import { SearchContext } from '../../Context/SearchContext';
import { useNavigate } from 'react-router-dom';
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Search, X } from 'lucide-react';
import { Label } from '../ui/label';


const SearchFilter: React.FC = () => {
    const { query, setQuery } = useContext(SearchContext)!;
    const [localQuery, setLocalQuery] = useState<{ trecho: string; nome_arquivo: string; link_arquivo: string; termo: string; ano: string; data_inicio: string; data_fim: string; }>({
        trecho: query.trecho || '',
        nome_arquivo: query.nome_arquivo || '',
        link_arquivo: query.link_arquivo || '',
        termo: query.termo || '',
        ano: query.ano || '',
        data_inicio: query.data_inicio || '',
        data_fim: query.data_fim || '',

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
        <>
            <h3 className="text-base font-bold mb-2 text-blue-800/90">Filtros:</h3>
    
            <form className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-2 mt-2'>

                <div className='space-y-2'>
                    <Label className='font-semibold text-sm text-blue-800/80'>Busca:</Label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <Search className="h-4 w-4 text-gray-500" />
                        </span>
                        <Input
                            placeholder="Busca por termos"
                            value={localQuery.termo}
                            onChange={(e) => setLocalQuery({ ...localQuery, termo: e.target.value })}
                            className='pl-10 col-span-1 sm:col-span-2 lg:col-span-3'
                        />

                    </div>
                </div>

                <div className='space-y-2'>
                    <Label className='font-semibold text-sm text-blue-800/80'>Ano:</Label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <Search className="h-4 w-4 text-gray-500" />
                        </span>
                        <Input
                            placeholder="Ano"
                            value={localQuery.ano}
                            onChange={(e) => setLocalQuery({ ...localQuery, ano: e.target.value })}
                            className='pl-10 col-span-1'
                        />

                    </div>
                </div>

                <div className='space-y-2'>
                    <Label className='font-semibold text-sm text-blue-800/80'>Período inicial:</Label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <Search className="h-4 w-4 text-gray-500" />
                        </span>
                        <Input
                            placeholder="dd/mm/aaaa"
                            value={localQuery.data_inicio}
                            onChange={(e) => setLocalQuery({ ...localQuery, data_inicio: e.target.value })}
                            className='pl-10 col-span-1'
                        />

                    </div>
                </div>

                <div className='space-y-2'>
                    <Label className='font-semibold text-sm text-blue-800/80'>Período final:</Label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <Search className="h-4 w-4 text-gray-500" />
                        </span>
                        <Input
                            placeholder="dd/mm/aaaa"
                            value={localQuery.data_fim}
                            onChange={(e) => setLocalQuery({ ...localQuery, data_fim: e.target.value })}
                            className='pl-10 col-span-1'
                        />

                    </div>
                </div>

                <Button onClick={handleSearch} type="submit" size="default" variant="default" className="mt-8 bg-blue-800/80 hover:bg-blue-800/90 text-white flex items-center">
                    <Search className="h-4 w-4 mr-2" />
                    Pesquisar
                </Button>

                <Button onClick={handleClearFilters} variant="outline" size="default" className="mt-8">
                    <X className="h-4 w-4 mr-2" />
                    Remover filtros
                </Button>



            </form>

        </>
    );
};

export default SearchFilter;
