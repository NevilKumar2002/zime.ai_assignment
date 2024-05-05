// Filters.js
import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

const Filters = ({ options, onChange }) => {
  const handleChange = (selectedTags) => {
    onChange(selectedTags);
  };

  return (
    <Select
      mode="multiple" // Enable multi-select
      allowClear
      style={{ width: '100%' }}
      placeholder="Select tags"
      onChange={handleChange}

    >
      {options.map((tag) => (
        <Option key={tag} value={tag}>
          {tag}
        </Option>
      ))}
    </Select>
  );
};

export default Filters;
