import { createContext, useState, ReactNode } from 'react';

interface SearchContextType {
    query: {
        data_fim: string;
        data_inicio: string; trecho: string; nome_arquivo: string; link_arquivo: string; termo: string; ano: string;
};
    setQuery: React.Dispatch<React.SetStateAction<{ trecho: string; nome_arquivo: string; link_arquivo: string; termo: string; ano: string; data_inicio: string; data_fim: string;}>>;
}

export const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [query, setQuery] = useState<{ trecho: string; nome_arquivo: string; link_arquivo: string; termo: string; ano: string; data_inicio: string; data_fim: string; }>({
    trecho: '',
    nome_arquivo: '',
    link_arquivo: '',
    termo: '',
    ano: '',
    data_inicio: '',
    data_fim: '',
  });

  return (
    <SearchContext.Provider value={{ query, setQuery }}>
      {children}
    </SearchContext.Provider>
  );
};
