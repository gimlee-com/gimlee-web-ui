import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import classNames from 'classnames';
import { validation } from 'gimlee-ui-model/forms';
import { Grid, GridItem } from 'gimlee-ui-components/Grid';
import Card from 'gimlee-ui-components/Chat/components/RoundedCard';
import { CardBody } from 'gimlee-ui-components/Card';
import Overlay from 'gimlee-ui-components/Overlay/Overlay';
import { ActionButton } from 'gimlee-ui-components/Button';
import { AD_TYPE_BUY, AD_TYPE_FOUND, AD_TYPE_LOST, AD_TYPE_OTHER, AD_TYPE_SELL } from '../../model/adType';
import { goToStep, updateAdType } from '../store/newAd';
import styles from './AdTypeStep.scss';

class AdTypeStep extends Component {

  constructor(props) {
    super(props);
    this.handleAdTypeSelected = this.handleAdTypeSelected.bind(this);
    this.renderAdTypeCard = this.renderAdTypeCard.bind(this);
  }

  handleAdTypeSelected(adType) {
    this.props.updateAdType(adType);
  }

  renderAdTypeCard(type) {
    const { t } = this.props;
    const adType = (() => {
      switch (type) {
        case AD_TYPE_SELL:
          return 'SELL';
        case AD_TYPE_BUY:
          return 'BUY';
        case AD_TYPE_LOST:
          return 'LOST';
        case AD_TYPE_FOUND:
          return 'FOUND';
        case AD_TYPE_OTHER:
          return 'OTHER';
        default:
          return '';
      }
    })();

    return (
      <Card
        className={classNames(
          'uk-overflow-hidden uk-width-expand uk-border-rounded uk-light',
          'uk-box-shadow-medium uk-box-shadow-hover-large',
        )}
        onClick={() => this.handleAdTypeSelected(type)}
      >
        <CardBody className="uk-padding-remove">
          <div className="uk-cover-container">
            <ActionButton
              className="uk-padding-remove"
              action={() => this.handleAdTypeSelected(type)}
            >
              { /* invisible canvas that shapes the container before the image loads */}
              <canvas width={300} height="300" />
              <h1>{adType}</h1>
            </ActionButton>
          </div>
        </CardBody>
        <Overlay
          style={{ cursor: 'pointer' }}
          className={'uk-position-cover'}
        >
          <h3 className={styles.heading}>{t(`app:ads:adType:${type}`)}</h3>
        </Overlay>
      </Card>
    );
  }

  render() {
    return (
      <div className="uk-margin uk-flex uk-flex-center uk-margin-large-bottom">
        <div>
          <Grid className="uk-width-xlarge">
            <GridItem className="uk-width-1-2">
              {this.renderAdTypeCard(AD_TYPE_SELL)}
            </GridItem>
            <GridItem className="uk-width-1-2">
              {this.renderAdTypeCard(AD_TYPE_BUY)}
            </GridItem>
          </Grid>
          <Grid className="uk-width-xlarge">
            <GridItem className="uk-width-1-2">
              {this.renderAdTypeCard(AD_TYPE_LOST)}
            </GridItem>
            <GridItem className="uk-width-1-2">
              {this.renderAdTypeCard(AD_TYPE_FOUND)}
            </GridItem>
          </Grid>
        </div>
      </div>
    );
  }
}

AdTypeStep.propTypes = {
  updateAdType: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    updateAdType: adType => dispatch(updateAdType(adType, { ...validation, valid: true })),
    goToStep: step => dispatch(goToStep(step)),
  };
}

export default connect(null, mapDispatchToProps)(translate()(AdTypeStep));
