import React, { useContext, useState } from 'react';
import { SearchContext } from '../../Context/SearchContext';
import { useNavigate } from 'react-router-dom';
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Search, X } from 'lucide-react';


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
        <form className="flex flex-col sm:flex-row items-center gap-2 flex-wrap">

            <span className="text-lg font-semibold">Pesquisar:</span>
            <Input
                placeholder="Informe o conteúdo a ser buscado"
                value={localQuery.termo}
                onChange={(e) => setLocalQuery({ ...localQuery, termo: e.target.value })}
                className="w-full sm:w-[500px]"
            />
            <Input
                placeholder="Ano"
                value={localQuery.ano}
                onChange={(e) => setLocalQuery({ ...localQuery, ano: e.target.value })}
                className="w-full sm:w-auto"
            />
            <Input
                placeholder="Data Inicial - dd/mm/aaaa"
                value={localQuery.data_inicio}
                onChange={(e) => setLocalQuery({ ...localQuery, data_inicio: e.target.value })}
                className="w-full sm:w-auto"
            />
            <Input
                placeholder="Data fim - dd/mm/aaaa"
                value={localQuery.data_fim}
                onChange={(e) => setLocalQuery({ ...localQuery, data_fim: e.target.value })}
                className="w-full sm:w-auto"
            />


            <Button onClick={handleSearch} type="submit" size="default" variant="default" className="w-full sm:w-auto">
                <Search className="h-4 w-4 mr-2" />
                Pesquisar
            </Button>

            <Button onClick={handleClearFilters} variant="outline" size="default" className="w-full sm:w-auto">
                <X className="h-4 w-4 mr-2" />
                Remover filtros
            </Button>



        </form>


    );
};

export default SearchFilter;
