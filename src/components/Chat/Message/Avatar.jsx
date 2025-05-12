import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { translate } from 'react-i18next';
import { circleBorder, withTooltip } from '../../_HOC';
import { Div, Image } from '../../_Wrappers';
import { GridItem } from '../../Grid';
import styles from './Avatar.scss';

const AuthorImage = compose(
  circleBorder(),
  withTooltip('desktop'),
)(Image);

const AuthorImagePlaceholder = circleBorder()(Div);

class Avatar extends Component {

  render() {
    const { displayName, avatar, messageContentHeight, t } = this.props;
    return (
      <GridItem style={{ flexShrink: 0, alignSelf: 'stretch' }}>
        { !!avatar &&
        <AuthorImage
          className={styles.image}
          tooltip={{
            pos: 'top',
            title: displayName,
            delay: 400,
          }}
          style={{ transform: `translateY(${messageContentHeight - 32}px)` }}
          alt={t('chat:avatar:imageAltText')}
          width="32"
          height="32"
          src={avatar}
        />}
        {!avatar &&
        <AuthorImagePlaceholder
          className={styles['image-placeholder']}
          style={{ transform: `translateY(${messageContentHeight - 32}px)` }}
        />
        }
      </GridItem>);
  }
}

Avatar.propTypes = {
  displayName: PropTypes.string,
  avatar: PropTypes.string,
  messageContentHeight: PropTypes.number.isRequired,
  t: PropTypes.func.isRequired,
};

Avatar.defaultProps = {
  displayName: null,
  avatar: null,
};

export default translate()(Avatar);
