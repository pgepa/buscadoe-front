import { createContext, useState, ReactNode } from 'react';

interface SearchContextType {
    query: { trecho: string; nome_arquivo: string; link_arquivo: string; termo: string; ano: string;};
    setQuery: React.Dispatch<React.SetStateAction<{ trecho: string; nome_arquivo: string; link_arquivo: string; termo: string; ano: string;}>>;
}

export const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [query, setQuery] = useState<{ trecho: string; nome_arquivo: string; link_arquivo: string; termo: string; ano: string; }>({
    trecho: '',
    nome_arquivo: '',
    link_arquivo: '',
    termo: '',
    ano: '',
  });

  return (
    <SearchContext.Provider value={{ query, setQuery }}>
      {children}
    </SearchContext.Provider>
  );
};
