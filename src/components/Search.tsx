// src/components/Search.tsx
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const Search = () => {
  const [term, setTerm] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?term=${term}`);
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Search..."
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default Search;
