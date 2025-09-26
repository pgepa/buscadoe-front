import React, { useContext, useEffect, useState } from 'react';
import { SearchContext } from '../../Context/SearchContext';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { LuDownload, LuEye, LuX, LuMaximize2, LuMinimize2 } from 'react-icons/lu';
import { api } from '../../lib/axios';
import { env } from '../../env';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "../../components/ui/pagination";
import GridLoader from 'react-spinners/GridLoader';
import { SearchX } from 'lucide-react';
import { Button } from '../ui/button';

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
    const [error, setError] = useState<JSX.Element | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [limit] = useState<number>(25);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [pdfViewer, setPdfViewer] = useState<{
        isOpen: boolean;
        pdfUrl: string;
        fileName: string;
        isFullscreen: boolean;
    }>({
        isOpen: false,
        pdfUrl: '',
        fileName: '',
        isFullscreen: false
    });

    useEffect(() => {
        if (query) {
            if (!query.termo && !query.ano && !query.data_inicio && !query.data_fim) {
                setError(
                    <div className='text-xl items-center flex flex-col font-semibold text-justify mt-8 text-muted-foreground'>
                        <p>Favor informe o conteúdo a ser pesquisado.</p>
                        <SearchX className="h-12 w-12 mt-4" />
                    </div>
                );
            } else {
                fetchResults(page);
            }
        }
    }, [query, page]);

    const fetchResults = async (pagina: number) => {
        setLoading(true);
        setError(null);

        const queryString = new URLSearchParams({
            termo: query.termo,
            ano: query.ano,
            data_inicio: query.data_inicio,
            data_fim: query.data_fim,
            page: pagina.toString(),
            limit: limit.toString(),
        }).toString();

        try {
            const response = await api.get(`/buscar?${queryString}`);
            const fetchedData = response.data.resultados;
            setData(fetchedData);

            const totalResults = response.data.total;
            setTotalPages(Math.ceil(totalResults / limit));
        } catch (err) {
            setError(
                <div className='text-xl items-center flex flex-col font-semibold text-justify mt-8 text-muted-foreground'>
                    <p>Favor informe o conteúdo a ser pesquisado.</p>
                    <SearchX className="h-12 w-12 mt-4" />
                </div>
            );
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

    const handlePdfDownload = async (event: React.MouseEvent, linkArquivo: string, nomeArquivo: string) => {
        // Previne qualquer comportamento padrão do evento
        event.preventDefault();
        event.stopPropagation();
        
        try {
            const pdfUrl = `${env.VITE_API_URL}${linkArquivo}`;
            
            // Verifica se a URL é válida antes de tentar fazer o download
            new URL(pdfUrl);
            
            // Faz o download usando fetch para ter controle total
            const response = await fetch(pdfUrl);
            
            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }
            
            // Converte a resposta em blob
            const blob = await response.blob();
            
            // Cria uma URL temporária para o blob
            const blobUrl = window.URL.createObjectURL(blob);
            
            // Cria um link temporário para download
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = nomeArquivo || 'documento.pdf';
            link.style.display = 'none';
            
            // Adiciona ao DOM, clica e remove
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Limpa a URL temporária do blob
            window.URL.revokeObjectURL(blobUrl);
            
            console.log(`Download concluído: ${nomeArquivo}`);
        } catch (error) {
            console.error('Erro ao fazer download do PDF:', error);
            alert('Erro ao fazer download do arquivo PDF. Verifique sua conexão e tente novamente.');
        }
    };

    const handlePdfView = (event: React.MouseEvent, linkArquivo: string, nomeArquivo: string) => {
        event.preventDefault();
        event.stopPropagation();
        
        try {
            const pdfUrl = `${env.VITE_API_URL}${linkArquivo}`;
            
            // Verifica se a URL é válida
            new URL(pdfUrl);
            
            // Abre o visualizador integrado
            setPdfViewer({
                isOpen: true,
                pdfUrl: pdfUrl,
                fileName: nomeArquivo,
                isFullscreen: false
            });
            
            console.log(`PDF aberto no visualizador: ${nomeArquivo}`);
            
        } catch (error) {
            console.error('Erro ao abrir PDF:', error);
            alert('Erro ao abrir o arquivo PDF. Verifique o link e tente novamente.');
        }
    };

    const closePdfViewer = () => {
        setPdfViewer({
            isOpen: false,
            pdfUrl: '',
            fileName: '',
            isFullscreen: false
        });
    };

    const toggleFullscreen = () => {
        setPdfViewer(prev => ({
            ...prev,
            isFullscreen: !prev.isFullscreen
        }));
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
                        className={i === page ? "bg-blue-500 text-white" : "text-blue-500"}
                    >
                        {i}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        return items;
    };

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center py-20">
                <GridLoader size={16} color="#3b82f6" />
                <p className="mt-4 text-slate-600 font-medium">Buscando resultados...</p>
            </div>
        );
    }

    if (error) return (
        <div className="flex flex-col items-center py-12 text-center">
            {error}
        </div>
    );
    
    if (!data || data.length === 0) return (
        <div className="flex flex-col items-center py-16 text-center space-y-4">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
                <SearchX className="h-8 w-8 text-slate-400" />
            </div>
            <div className="space-y-2">
                <h3 className="text-lg font-semibold text-slate-700">Nenhum resultado encontrado</h3>
                <p className="text-slate-500 max-w-md">Não foi encontrado nenhum diário para os filtros selecionados. Tente novamente com outros parâmetros.</p>
            </div>
        </div>
    );

    return (
        <div className="space-y-4 sm:space-y-6 px-2 sm:px-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                    <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full"></div>
                    <h2 className="text-lg sm:text-xl font-bold text-slate-800">Resultados da busca</h2>
                </div>
                <div className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full self-start sm:self-auto">
                    {data.length} resultado{data.length !== 1 ? 's' : ''} encontrado{data.length !== 1 ? 's' : ''}
                </div>
            </div>
            
            <div className="space-y-4">
                {data.map((doe, index) => (
                    <Card key={doe.id} className="group hover:shadow-lg transition-all duration-200 border-slate-200 hover:border-blue-200 bg-white/80 backdrop-blur-sm">
                        <CardHeader className="pb-3">
                            <div className="flex items-start justify-between">
                                <div className="space-y-1 flex-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
                                            #{index + 1 + (page - 1) * limit}
                                        </span>
                                    </div>
                                    <CardTitle className="text-base font-semibold text-slate-800 group-hover:text-blue-700 transition-colors">
                                        {doe.nome_arquivo}
                                    </CardTitle>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <p className="text-slate-600 leading-relaxed line-clamp-3">
                                {doe.trecho}
                            </p>
                        </CardContent>
                        <CardFooter className="pt-4 border-t border-slate-100">
                            <div className="flex flex-col sm:flex-row gap-3 w-full">
                                <Button 
                                    onClick={(event) => {
                                        event.preventDefault();
                                        event.stopPropagation();
                                        handlePdfView(event, doe.link_arquivo, doe.nome_arquivo);
                                        return false;
                                    }}
                                    type="button"
                                    className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-6 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center"
                                >
                                    <LuEye className="h-4 w-4 mr-2" />
                                    Visualizar
                                </Button>
                                <Button 
                                    onClick={(event) => {
                                        event.preventDefault();
                                        event.stopPropagation();
                                        handlePdfDownload(event, doe.link_arquivo, doe.nome_arquivo);
                                        return false;
                                    }}
                                    type="button"
                                    variant="outline"
                                    className="w-full sm:w-auto border-blue-600 text-blue-600 hover:bg-blue-50 font-medium px-6 py-2.5 rounded-lg transition-all duration-200 flex items-center justify-center"
                                >
                                    <LuDownload className="h-4 w-4 mr-2" />
                                    Download
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {totalPages > 1 && (
                <div className="mt-8 bg-white/50 rounded-xl p-4 border border-slate-200">
                    <Pagination className="cursor-pointer">
                        <PaginationContent>
                            {page > 1 && (
                                <PaginationPrevious 
                                    size="sm" 
                                    onClick={() => handlePageChange(page - 1)}
                                    className="hover:bg-blue-50 hover:text-blue-700"
                                >
                                    {page === 2 ? 'Primeira' : 'Anterior'}
                                </PaginationPrevious>
                            )}
                            {renderPaginationItems()}
                            {page < totalPages && (
                                <PaginationNext 
                                    size='sm' 
                                    onClick={() => handlePageChange(page + 1)}
                                    className="hover:bg-blue-50 hover:text-blue-700"
                                >
                                    Próxima
                                </PaginationNext>
                            )}
                        </PaginationContent>
                    </Pagination>
                    <div className="text-sm mt-3 text-center text-slate-600">
                        Página {page} de {totalPages} • {data.length} resultados nesta página
                    </div>
                </div>
            )}

            {/* Visualizador de PDF Integrado */}
            {pdfViewer.isOpen && (
                <div className={`fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4 ${pdfViewer.isFullscreen ? 'p-0' : ''}`}>
                    <div className={`bg-white rounded-lg shadow-2xl flex flex-col ${pdfViewer.isFullscreen ? 'w-full h-full rounded-none' : 'w-full max-w-6xl h-[90vh]'}`}>
                        {/* Header do Visualizador */}
                        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
                            <div className="flex items-center space-x-3">
                                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                <span className="text-sm font-medium text-gray-700 ml-4 truncate max-w-md">
                                    {pdfViewer.fileName}
                                </span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Button
                                    onClick={toggleFullscreen}
                                    variant="ghost"
                                    size="sm"
                                    className="text-gray-600 hover:text-gray-800 hover:bg-gray-200"
                                >
                                    {pdfViewer.isFullscreen ? (
                                        <LuMinimize2 className="h-4 w-4" />
                                    ) : (
                                        <LuMaximize2 className="h-4 w-4" />
                                    )}
                                </Button>
                                <Button
                                    onClick={closePdfViewer}
                                    variant="ghost"
                                    size="sm"
                                    className="text-gray-600 hover:text-gray-800 hover:bg-gray-200"
                                >
                                    <LuX className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        {/* Conteúdo do PDF */}
                        <div className="flex-1 relative bg-gray-100">
                            <iframe
                                src={`${pdfViewer.pdfUrl}#toolbar=1&navpanes=1&scrollbar=1&page=1&view=FitH`}
                                className="w-full h-full border-none"
                                title={pdfViewer.fileName}
                                onLoad={() => console.log('PDF carregado no visualizador')}
                            />
                            
                            {/* Fallback se o PDF não carregar */}
                            <div className="absolute inset-0 flex items-center justify-center bg-white" style={{ zIndex: -1 }}>
                                <div className="text-center p-8">
                                    <div className="text-gray-400 mb-4">
                                        <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">Carregando PDF...</h3>
                                    <p className="text-gray-600">Aguarde enquanto o arquivo é carregado.</p>
                                </div>
                            </div>
                        </div>

                        {/* Footer com ações */}
                        <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">
                                    Visualizando: {pdfViewer.fileName}
                                </span>
                                <Button
                                    onClick={closePdfViewer}
                                    size="sm"
                                    className="bg-gray-600 hover:bg-gray-700 text-white"
                                >
                                    Fechar
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ResultsList;
