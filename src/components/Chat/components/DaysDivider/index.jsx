import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { compose } from 'redux';
import moment from 'moment';
import classNames from 'classnames';
import { withPropsPassthrough } from '../../../_HOC';
import Label, { LABEL_SIZE_SMALL } from '../../../Label';
import renderDate from '../../util/renderDate';
import styles from './DaysDivider.scss';

class DaysDivider extends PureComponent {
  render() {
    const { date, passthrough, t } = this.props;
    return (
      <div {...passthrough()}>
        <h5 className={classNames('uk-text-center uk-heading-line', styles.heading)}>
          <Label size={LABEL_SIZE_SMALL} className={styles.label}>
            {renderDate(date, t)}
          </Label>
        </h5>
      </div>
    );
  }
}

DaysDivider.propTypes = {
  date: PropTypes.instanceOf(moment).isRequired,
  t: PropTypes.func.isRequired,
  passthrough: PropTypes.func.isRequired,
};

export default compose(
  withPropsPassthrough(),
  translate(),
)(DaysDivider);
