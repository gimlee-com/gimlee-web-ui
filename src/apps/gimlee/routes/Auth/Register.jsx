import React from 'react';
import { compose } from 'redux';
import PageContent from 'gimlee-ui-components/PageContent';
import { Grid, GridItem } from 'gimlee-ui-components/Grid';
import { flexContainer, ALIGN_ITEMS_STRETCH, FLEX_WRAP, JUSTIFY_CENTER } from 'gimlee-ui-components/_HOC/flexContainer';
import BasicRegisterForm from './BasicRegisterForm';

const ContainerGrid = compose(
  flexContainer(),
)(Grid);

const Register = () => (
  <PageContent>
    <ContainerGrid
      flexContainer={{
        wrap: FLEX_WRAP,
        contentJustify: JUSTIFY_CENTER,
        itemsAlign: ALIGN_ITEMS_STRETCH,
      }}
    >
      <GridItem>
        <BasicRegisterForm />
      </GridItem>
    </ContainerGrid>
  </PageContent>
);

export default Register;
