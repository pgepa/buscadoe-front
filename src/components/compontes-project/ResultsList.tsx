import React, { useContext, useEffect, useState } from 'react';
import { SearchContext } from '../../Context/SearchContext';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { AiFillFilePdf } from 'react-icons/ai';



import { api } from '../../lib/axios';

interface AtosData {
    id: number;
    trecho: string;
    nome_arquivo: string;
    link_arquivo: string;
    termo: string;
    ano: string;

}

const ResultsList: React.FC = () => {
    const { query } = useContext(SearchContext)!;
    const [data, setData] = useState<AtosData[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (query) {
            fetchResults(); // Nova busca sempre que o query mudar
        }
    }, [query]);

    const fetchResults = async () => {
        setLoading(true);
        setError(null);

        const queryString = new URLSearchParams({
            termo: query.termo,
            ano: query.ano,
        }).toString();

        try {
            const response = await api.get(`/buscar?${queryString}`);
            const fetchedData = response.data;
            setData(fetchedData);
        } catch (err) {
            setError('Informe um termo a ser pesquisado.');
            console.error('Erro ao buscar dados:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Carregando...</div>;
    if (error) return <div>{error}</div>;
    if (!data || data.length === 0) return <div className='text-2xl font-bold tracking-tight text-justify mt-4 text-orange-500'>Não foi encontrado nenhum resultado contendo todos os termos de pesquisa.</div>;

    return (
        <div className='flex flex-col gap-4'>
            <h2 className='text-2xl font-bold tracking-tight text-justify mt-4 text-blue-700'>Resultados para a busca:</h2>
            {data.map((doe) => (
                <Card key={doe.id} className='shadow-md shadow-blue-500/40'>
                    <CardHeader className="flex-items-center flex-row justify-between space-y-0 pb-4">
                        <div className="space-y-1">
                            <CardTitle className="text-base font-medium -tracking-tight text-blue-700 dark:text-blue-300">
                                {doe.nome_arquivo}
                            </CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-1">
                        <p className="leading-7 [&:not(:first-child)]:mt-6">{doe.trecho}</p>
                    </CardContent>
                    <CardFooter className="flex justify-start gap-2">
                        <a
                            href={`http://10.96.20.15:5000${doe.link_arquivo}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className=" flex justifify-start gap-2 items-center leading-7 [&:not(:first-child)]:mt-6 text-blue-600 hover:underline"
                        >
                            <AiFillFilePdf className="text-red-600" />
                            Abrir documento
                        </a>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
};

export default ResultsList;
