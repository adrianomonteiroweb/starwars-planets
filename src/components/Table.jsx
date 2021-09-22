import React, { useContext } from 'react';

import DataContext from '../context/DataContext';
import Th from './Th';
import Tr from './Tr';

function IsTable() {
  const { data, filters, setFilters } = useContext(DataContext);
  const { filterByName: { name } } = filters;
  const { filterByNumericValues } = filters;
  const {
    column,
    comparison,
    value } = filterByNumericValues[filterByNumericValues.length - 1];
  const headings = data.length > 0 ? Object.keys(data[0]) : [];
  const newData = data.length > 0 ? data : [];

  function handleChange({ target }) {
    setFilters({
      ...filters,
      filterByName: {
        name: target.value,
      },
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { target: { children } } = e;
    if (filterByNumericValues[0].column !== '') {
      setFilters({
        ...filters,
        filterByNumericValues: [
          ...filters.filterByNumericValues,
          {
            column: children[1].value,
            comparison: children[2].value,
            value: children[3].value,
          }],
      });
    } else {
      setFilters({
        ...filters,
        filterByNumericValues: [{
          column: children[1].value,
          comparison: children[2].value,
          value: children[3].value,
        }],
      });
    }
  }

  return (
    <>
      <form onSubmit={ handleSubmit }>
        <input
          type="text"
          data-testid="name-filter"
          placeholder="Planet"
          onChange={ handleChange }
        />
        <select data-testid="column-filter" size="sm">
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
        <select data-testid="comparison-filter" size="sm">
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          type="number"
          data-testid="value-filter"
        />
        <button
          type="submit"
          data-testid="button-filter"
        >
          Filtrar
        </button>
      </form>
      <table>
        <thead>
          <tr>
            { headings.map((header) => <Th key={ header } header={ header } />) }
          </tr>
        </thead>
        <tbody>
          { newData
            .filter((isData) => isData.name.includes(name))
            .filter((isData) => (
              comparison === 'maior que' ? isData[column] > Number(value) : isData))
            .filter((isData) => (
              comparison === 'menor que' ? isData[column] < Number(value) : isData))
            .filter((isData) => (
              comparison === 'igual a' ? isData[column] === value : isData))
            .map((isData) => <Tr key={ isData.name } data={ isData } />) }
        </tbody>
      </table>
    </>
  );
}

export default IsTable;
