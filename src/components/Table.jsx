import React, { useContext } from 'react';
import { Button, Form, Table } from 'react-bootstrap';

import DataContext from '../context/DataContext';
import Th from './Th';
import Tr from './Tr';

function IsTable() {
  const { data, filters, setFilters } = useContext(DataContext);
  const { filterByName: { name } } = filters;
  const { filterByNumericValues } = filters;
  const { column, comparison, value } = filterByNumericValues;
  let newData = [];
  if (data) newData = data;
  const headings = newData.length > 0 ? Object.keys(newData[0]) : [];

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
    filterByNumericValues.forEach((filter) => {
      if (filter.column !== children[1].value) {
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
      }
    });
  }

  return (
    <>
      <Form onSubmit={ handleSubmit }>
        <Form.Control
          type="text"
          data-testid="name-filter"
          placeholder="Planet"
          onChange={ handleChange }
        />
        <Form.Select testid="column-filter" size="sm">
          <option value="poputation">poputation</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </Form.Select>
        <Form.Select testid="comparison-filter" size="sm">
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </Form.Select>
        <Form.Control
          type="number"
          data-testid="value-filter"
        />
        <Button
          type="submit"
          data-testid="button-filter"
          variant="outline-dark"
          size="sm"
        >
          Filtrar
        </Button>
      </Form>
      <Table striped bordered hover variant="dark">
        {/* <thead> */}
        <tr>
          { headings.map((header) => <Th key={ header } header={ header } />) }
        </tr>
        {/* </thead> */}
        {/* <tbody> */}
        { newData
          .filter((isData) => isData.name.includes(name))
          .filter((isData) => (
            comparison === 'maior que' ? isData[column] > value : isData))
          .filter((isData) => (
            comparison === 'menor que' ? isData[column] < value : isData))
          .filter((isData) => (
            comparison === 'igual a' ? isData[column] === value : isData))
          .map((isData) => <Tr key={ isData.name } data={ isData } />) }
        {/* </tbody> */}
      </Table>
    </>
  );
}

export default IsTable;
