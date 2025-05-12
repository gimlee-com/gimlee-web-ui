import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ALIGN_CONTENT_MIDDLE, flexContainer } from '../../_HOC/flexContainer';
import { PRIMARY, DEFAULT } from '../../Card/Card';
import RoundedCard from '../components/RoundedCard';
import styles from './MessageCard.scss';

const RoundedFlexCard = flexContainer()(RoundedCard);

class MessageCard extends Component {
  render() {
    return (
      <RoundedFlexCard
        flexContainer={{
          contentAlign: ALIGN_CONTENT_MIDDLE,
        }}
        className={classNames(
          styles['message-card'],
          this.props.own ? styles.own : styles.others,
        )}
        bodyPadding
        type={this.props.own ? PRIMARY : DEFAULT}
      >
        {this.props.children}
      </RoundedFlexCard>
    );
  }
}

MessageCard.propTypes = {
  children: PropTypes.node,
  own: PropTypes.bool,
};

MessageCard.defaultProps = {
  children: null,
  own: false,
};

export default MessageCard;
