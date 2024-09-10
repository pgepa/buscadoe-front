import React, { useContext, useEffect, useState } from 'react';
import { SearchContext } from '../../Context/SearchContext';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { AiFillFilePdf } from 'react-icons/ai';
import { api } from '../../lib/axios';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "../../components/ui/pagination";

interface AtosData {
    id: number;
    trecho: string;
    nome_arquivo: string;
    link_arquivo: string;
    termo: string;
    ano: string;
    data_inicio: string;
    data_fim: string;
}

const ResultsList: React.FC = () => {
    const { query } = useContext(SearchContext)!;
    const [data, setData] = useState<AtosData[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);  // Current page
    const [limit] = useState<number>(25);         // Results per page
    const [totalPages, setTotalPages] = useState<number>(1); // Total pages

    useEffect(() => {
        if (query) {
            fetchResults(1); // Start search from page 1 whenever query changes
        }
    }, [query]);

    useEffect(() => {
        if (query) {
            fetchResults(page); // Fetch results when page changes
        }
    }, [page]);

    const fetchResults = async (pagina: number) => {
        setLoading(true);
        setError(null);

        const queryString = new URLSearchParams({
            termo: query.termo,
            page: pagina.toString(),  // Current page
            limit: limit.toString(), // Results limit
        }).toString();

        try {
            const response = await api.get(`/buscar?${queryString}`);
            const fetchedData = response.data.resultados; // Adjust based on the API response
            setData(fetchedData);
            setTotalPages(Math.ceil(response.data.total / limit)); // Total pages based on total results
        } catch (err) {
            setError('Erro ao buscar dados. Verifique os parâmetros de busca.');
            console.error('Erro ao buscar dados:', err);
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    const renderPaginationItems = () => {
        const items = [];
        const startPage = Math.max(page - 2, 1);
        const endPage = Math.min(page + 2, totalPages);

        for (let i = startPage; i <= endPage; i++) {
            items.push(
                <PaginationItem key={i}>
                    <PaginationLink
                        size="sm"
                        onClick={() => handlePageChange(i)}
                        className={i === page ? "active-class" : ""}
                    >
                        {i}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        return items;
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
                            className="flex justify-start gap-2 items-center leading-7 text-blue-600 hover:underline"
                        >
                            <AiFillFilePdf className="text-red-600" />
                            Abrir documento
                        </a>
                    </CardFooter>
                </Card>
            ))}

            <Pagination className=" bottom-0  dark:bg-transparent py-2">
                <PaginationContent>
                    {page > 1 && (
                        <PaginationPrevious size="sm" onClick={() => handlePageChange(page - 1)}>
                            {page === 2 ? 'Primeira Página' : 'Anterior'}
                        </PaginationPrevious>
                    )}
                    {renderPaginationItems()}
                    {page < totalPages && (
                        <PaginationNext size='sm' onClick={() => handlePageChange(page + 1)}>
                            Próxima
                        </PaginationNext>
                    )}
                </PaginationContent>
                <div className="text-sm mt-2 text-gray-600">
                    Página {page} de {totalPages}
                </div>
            </Pagination>
        </div>
    );
};

export default ResultsList;
