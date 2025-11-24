import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card } from '../../components/ui/card';
import { Separator } from '../../components/ui/separator';
import { FileText, Calendar, Info, AlertCircle } from 'lucide-react';

const AboutPage: React.FC = () => {
    return (
        <>
            <Helmet title="Sobre" />
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        {/* Título Principal */}
                        <div className="text-center mb-12">
                            <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-slate-800 via-blue-800 to-indigo-800 bg-clip-text text-transparent leading-tight pb-2">
                                Sobre o Acervo Histórico Digital
                            </h1>
                        </div>

                        {/* Card Principal */}
                        <Card className="bg-white/80 backdrop-blur-sm shadow-2xl border border-white/20 p-6 sm:p-8 lg:p-10 mb-6">
                            <div className="space-y-6">
                                {/* Introdução */}
                                <div className="flex items-start gap-4">
                                    <FileText className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                                    <div>
                                        <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
                                            Este sistema disponibiliza o acesso ao acervo histórico do Diário Oficial do Estado (DOE), publicado pela Imprensa Oficial do Estado do Pará (IOEPA). A base de dados compreende edições digitalizadas a partir de 1951 até a atualidade.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Como realizar a busca */}
                        <Card className="bg-white/80 backdrop-blur-sm shadow-2xl border border-white/20 p-6 sm:p-8 lg:p-10 mb-6">
                            <div className="space-y-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <Calendar className="h-6 w-6 text-blue-600" />
                                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
                                        Como realizar a busca
                                    </h2>
                                </div>
                                <Separator />
                                <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
                                    A ferramenta permite a pesquisa textual por assunto em todo o acervo ou o uso de filtros temporais específicos. É possível refinar a consulta por:
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-base sm:text-lg text-slate-700 ml-4">
                                    <li>Ano específico;</li>
                                    <li>Data exata (dia/mês/ano);</li>
                                    <li>Intervalos personalizados (entre dias, meses ou anos).</li>
                                </ul>
                            </div>
                        </Card>

                        {/* Regra Importante */}
                        <Card className="bg-white/80 backdrop-blur-sm shadow-2xl border border-white/20 p-6 sm:p-8 lg:p-10 mb-6">
                            <div className="space-y-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <AlertCircle className="h-6 w-6 text-amber-600" />
                                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
                                        Regra Importante: Data do Ato x Data da Publicação
                                    </h2>
                                </div>
                                <Separator />
                                <p className="text-base sm:text-lg text-slate-700 leading-relaxed mb-4">
                                    Para fins de pesquisa, o sistema considera exclusivamente a <strong className="text-slate-900">data de publicação</strong> (circulação do Diário), e não a data de assinatura do ato normativo.
                                </p>
                                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                                    <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
                                        <strong className="text-slate-900">Exemplo prático:</strong> Se você procura um Decreto assinado em 30/12/1950, mas que foi publicado no DOE apenas em 12/01/1951, você deverá buscar pelo período de <strong className="text-slate-900">1951</strong> (data da publicação).
                                    </p>
                                </div>
                            </div>
                        </Card>

                        {/* Disponibilidade das Edições */}
                        <Card className="bg-white/80 backdrop-blur-sm shadow-2xl border border-white/20 p-6 sm:p-8 lg:p-10">
                            <div className="space-y-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <Info className="h-6 w-6 text-indigo-600" />
                                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
                                        Disponibilidade das Edições
                                    </h2>
                                </div>
                                <Separator />
                                <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
                                    O sistema opera com atualização <strong className="text-slate-900">D-1</strong>. Isso significa que não há integração em tempo real com a edição do dia corrente (D-0). O acervo disponível para consulta abrange de <strong className="text-slate-900">1951 até o dia imediatamente anterior à data atual</strong>.
                                </p>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AboutPage;

