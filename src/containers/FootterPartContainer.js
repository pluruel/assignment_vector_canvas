import React from 'react';

import styled from 'styled-components';

import SVGImport from '../components/SVGImport';
import SVGExport from '../components/SVGExport';

const Div = styled.div`
  display: flex;
`;

const FootterPartContainer = () => {
  return (
    <Div>
      <div style={{ marginLeft: 'auto' }} />
      <SVGImport />
      <SVGExport />
    </Div>
  );
};

export default FootterPartContainer;
