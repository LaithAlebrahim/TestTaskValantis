import React, { useState } from 'react';

const FilterForm = ({ onFilter }) => {
  const [filterType, setFilterType] = useState('');
  const [filterValue, setFilterValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if(filterType==='All'){
      onFilter({ type: filterType });
    }
    onFilter({ type: filterType, value: filterValue });
  };
  const inputType = filterType === 'price' ? 'number' : 'text';

  // Check if both filter type and value are provided
  const isFilterButtonDisabled = (!filterType || !filterValue.trim()) && filterType!== 'All';

  return (
    <form onSubmit={handleSubmit}>
      <select value={filterType} onChange={e => setFilterType(e.target.value)}>
        <option value="">Select Filter...</option>
        <option value="product">Product Name</option>
        <option value="price">Price</option>
        <option value="All">All</option>
      </select>
      <input
        type={inputType}
        placeholder="Filter Value"
        value={filterType==='All'?'' : filterValue}
        disabled={filterType==='All'}
        onChange={e => setFilterValue(e.target.value)}
        min={inputType === 'number' ? '0' : undefined}
        step={inputType === 'number' ? '0.1' : undefined}

      />
      <button type="submit" disabled={isFilterButtonDisabled}>Apply Filter</button>
    </form>
  );
};

export default FilterForm;
