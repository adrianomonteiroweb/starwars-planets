import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import DataContext from './DataContext';

function DataProvider({ children }) {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    filterByName: { name: '' },
    filterByNumericValues: [{ column: '', comparison: '', value: '' }] });

  const getData = () => {
    fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((response) => response.json())
      .then((body) => {
        const filting = body.results.map(({ residents, ...rest }) => rest);
        setData(filting);
      });
  };

  useEffect(() => getData(), []);

  return (
    <DataContext.Provider value={ { data, setData, filters, setFilters } }>
      {children}
    </DataContext.Provider>
  );
}

DataProvider.propTypes = {
  children: PropTypes.shape(),
}.isRequired;

export default DataProvider;
