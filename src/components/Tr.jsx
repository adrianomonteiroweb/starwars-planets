import React from 'react';
import PropTypes from 'prop-types';

import Td from './Td';

function Tr({ data }) {
  return (
    <tr>
      { Object.values(data).map((value) => <Td key={ value } value={ value } />) }
    </tr>
  );
}

Tr.propTypes = {
  data: PropTypes.arrayOf(),
}.isRequired;

export default Tr;
