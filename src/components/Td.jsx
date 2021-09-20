import React from 'react';
import PropTypes from 'prop-types';

function Td({ value }) {
  return (
    <td>
      { value }
    </td>
  );
}

Td.propTypes = {
  value: PropTypes.string,
}.isRequired;

export default Td;
