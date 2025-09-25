import React from 'react';
import SearchForm from "../../components/compontes-project/SearchForm"

const SearchPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <SearchForm />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
