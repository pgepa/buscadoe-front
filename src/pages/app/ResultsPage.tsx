import React from 'react';
import SearchFilter from '../../components/compontes-project/SearchFilter';
import ResultsList from '../../components/compontes-project/ResultsList';

const ResultsPage: React.FC = () => {
  return (
    <div>
      <SearchFilter />
      <ResultsList />
    </div>
  );
};

export default ResultsPage;
