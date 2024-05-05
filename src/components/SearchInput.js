import React from 'react';
import { Input } from 'antd';

const { Search } = Input;

const SearchInput = ({ onChange }) => {
  const handleSearch = (value) => {
    onChange(value);
  };

  return (
    <Search
      placeholder="Search posts by body text"
      
      onSearch={handleSearch}
      onChange={(e) => handleSearch(e.target.value)} // Trigger onChange event on input change
      enterButton
      
      
    />
  );
};

export default SearchInput;
