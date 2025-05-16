import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { translate } from 'react-i18next';
import { compose } from 'redux';
import { parse } from 'query-string';
import PageContent from 'gimlee-ui-components/PageContent';
import { RouterButton, TYPE_LINK } from 'gimlee-ui-components/Button';
import { Card, CardBody } from 'gimlee-ui-components/Card';
import { Grid, GridItem } from 'gimlee-ui-components/Grid';
import { equalFractionChildWidths, fractionWidth } from 'gimlee-ui-components/_HOC';
import { ALIGN_ITEMS_STRETCH, FLEX_WRAP, flexContainer, JUSTIFY_CENTER } from 'gimlee-ui-components/_HOC/flexContainer';
import { VIEWPORT_LARGE, VIEWPORT_MEDIUM, VIEWPORT_SMALL } from 'gimlee-ui-components/_HOC/constant/viewport-size-css-suffix';
import LoginForm from './LoginForm';
import { renderInfoAlert } from './infoAlertRenderer';

const ContainerGrid = compose(
  flexContainer(),
  equalFractionChildWidths(1, 2, VIEWPORT_MEDIUM),
)(Grid);
const ContainerGridItem = compose(
  fractionWidth(1, 2, VIEWPORT_LARGE),
  fractionWidth(2, 3, VIEWPORT_MEDIUM),
)(GridItem);

const FormGridItem = fractionWidth(1, 2, VIEWPORT_SMALL)(GridItem);

const Login = ({ isUserLoggedInAlready, requiresVerification, resumePath, t }) => {
  if (requiresVerification) {
    return <Redirect to={`/verify?resume=${resumePath}`} />;
  } else if (isUserLoggedInAlready) {
    return <Redirect to={resumePath} />;
  }
  return (
    <PageContent>
      <ContainerGrid
        flexContainer={{
          wrap: FLEX_WRAP,
          contentJustify: JUSTIFY_CENTER,
          itemsAlign: ALIGN_ITEMS_STRETCH,
        }}
      >
        <ContainerGridItem>
          <Card>
            <CardBody>
              { renderInfoAlert(t, resumePath) }
              <Grid>
                <FormGridItem>
                  <LoginForm />
                </FormGridItem>
              </Grid>
              <Grid className="uk-flex-right">
                <GridItem>
                  {t('noAccountYet')}&nbsp;
                  <RouterButton to="/register" type={TYPE_LINK}>
                    {t('createAccount')}
                  </RouterButton>
                </GridItem>
              </Grid>
            </CardBody>
          </Card>
        </ContainerGridItem>
      </ContainerGrid>
    </PageContent>
  );
};

Login.propTypes = {
  isUserLoggedInAlready: PropTypes.bool.isRequired,
  requiresVerification: PropTypes.bool.isRequired,
  resumePath: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    isUserLoggedInAlready: state.loginSession.fetchStatus.loaded &&
      !state.loginSession.fetchStatus.fetching,
    requiresVerification: state.loginSession.user.roles.indexOf('UNVERIFIED') >= 0,
    resumePath: parse(state.router.location.search).resume || '/',
  };
}

export default connect(mapStateToProps)(translate()(Login));
