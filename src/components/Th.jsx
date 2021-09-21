import React from 'react';
import PropTypes from 'prop-types';

function Th({ header }) {
  return (
    <th>
      { header }
    </th>
  );
}

Th.propTypes = {
  header: PropTypes.string,
}.isRequired;

export default Th;
