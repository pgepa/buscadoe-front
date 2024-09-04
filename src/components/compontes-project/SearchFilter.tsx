import React, { useContext, useState } from 'react';
import { SearchContext } from '../../Context/SearchContext';
import { useNavigate } from 'react-router-dom';
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Search, X } from 'lucide-react';


const SearchFilter: React.FC = () => {
    const { query, setQuery } = useContext(SearchContext)!;
    const [localQuery, setLocalQuery] = useState<{ conteudo: string; descritores: string; numero: string; ano: string; tipo: string }>({
        conteudo: query.conteudo || '',
        descritores: query.descritores || '',
        numero: query.numero || '',
        ano: query.ano || '',
        tipo: query.tipo || '',
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
            conteudo: '',
            descritores: '',
            numero: '',
            ano: '',
            tipo: '',
        });

        // Também reseta o contexto se necessário
        setQuery({
            conteudo: '',
            descritores: '',
            numero: '',
            ano: '',
            tipo: '',
        });
    };

    return (
        <form className="flex flex-col sm:flex-row items-center gap-2 flex-wrap">

            <span className="text-lg font-semibold">Pesquisar:</span>
            <Input
                placeholder="Informe o conteúdo a ser buscado"
                value={localQuery.conteudo}
                onChange={(e) => setLocalQuery({ ...localQuery, conteudo: e.target.value })}
               className="w-full sm:w-[500px]"
            />
                

            <Button onClick={handleSearch} type="submit"  size="default" variant="default" className="w-full sm:w-auto">
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
