import React from 'react';
import { compose } from 'redux';
import { equalFractionChildWidths, fractionWidth } from 'gimlee-ui-components/_HOC';
import { VIEWPORT_MEDIUM, VIEWPORT_LARGE } from 'gimlee-ui-components/_HOC/constant/viewport-size-css-suffix';
import { Card, CardBody } from 'gimlee-ui-components/Card';
import PageContent from 'gimlee-ui-components/PageContent';
import { Grid, GridItem } from 'gimlee-ui-components/Grid';
import { flexContainer, ALIGN_ITEMS_STRETCH, FLEX_WRAP, JUSTIFY_CENTER } from 'gimlee-ui-components/_HOC/flexContainer';
import BasicRegisterForm from './BasicRegisterForm';

const ContainerGrid = compose(
    flexContainer(),
    equalFractionChildWidths(1, 2, VIEWPORT_MEDIUM),
)(Grid);
const ContainerGridItem = compose(
    fractionWidth(1, 1, VIEWPORT_LARGE),
)(GridItem);

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
        <ContainerGridItem>
          <Card>
            <CardBody>
              <BasicRegisterForm />
            </CardBody>
          </Card>
        </ContainerGridItem>
      </GridItem>
    </ContainerGrid>
  </PageContent>
);

export default Register;
