import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import classNames from 'classnames';

import { Span, Div } from '../../_Wrappers';
import { circleBorder, customMargin, withPropsPassthrough } from '../../_HOC';
import { Grid, GUTTER_SMALL } from '../../Grid';
import { ALIGN_ITEMS_BOTTOM, FLEX_NOWRAP, flexContainer, JUSTIFY_LEFT, JUSTIFY_RIGHT } from '../../_HOC/flexContainer';
import { chatItem as chatItemPrototype, chatItemPropTypes } from '../model';
import Avatar from './Avatar';
import MessageContent from './MessageContent';
import styles from './Message.scss';

const MessageGrid = compose(
  flexContainer(),
  customMargin(),
)(Grid);

const Timestamp = circleBorder()(Span);

class Message extends PureComponent {

  constructor(props) {
    super(props);

    this.messageContentMouseEnterHandler = this.messageContentMouseEnterHandler.bind(this);
    this.messageContentMouseLeaveHandler = this.messageContentMouseLeaveHandler.bind(this);
    this.renderAuthorInfo = this.renderAuthorInfo.bind(this);

    this.state = {
      messageContentHovered: false,
    };
  }

  messageContentMouseEnterHandler() {
    this.setState({
      messageContentHovered: true,
    });
  }

  messageContentMouseLeaveHandler() {
    this.setState({
      messageContentHovered: false,
    });
  }

  renderAuthorInfo() {
    const { author, timestamp, measuredHeight } = this.props;
    const { messageContentHovered } = this.state;

    return (
      <Fragment>
        { !messageContentHovered &&
        <Avatar
          key="avatar"
          className={styles['avatar-container']}
          displayName={author.displayName}
          avatar={author.avatar}
          messageContentHeight={measuredHeight - 10}
        />
        }
        {messageContentHovered &&
        <Div key="meta" className={styles['timestamp-container']}>
          <Timestamp className={styles.timestamp}>{timestamp.format('HH:mm')}</Timestamp>
        </Div>
        }
      </Fragment>
    );
  }

  render() {
    const {
      own, data, timestamp, lastEdited, sending, passthrough,
    } = this.props;

    return (
      <MessageGrid
        className={classNames(
          styles.message,
          )}
        removeMargins={['all']}
        flexContainer={{
          wrap: FLEX_NOWRAP,
          itemsAlign: ALIGN_ITEMS_BOTTOM,
          contentJustify: own ? JUSTIFY_RIGHT : JUSTIFY_LEFT,
        }}
        gutter={GUTTER_SMALL}
        {...passthrough()}
      >
        { !own &&
          this.renderAuthorInfo()
        }
        {
          <MessageContent
            ref={(ref) => { this.ref = ref; }}
            data={data}
            own={own}
            timestamp={timestamp}
            lastEdited={lastEdited}
            sending={sending}
            onMouseEnter={this.messageContentMouseEnterHandler}
            onMouseLeave={this.messageContentMouseLeaveHandler}
          />
        }
        { own &&
          this.renderAuthorInfo()
        }
      </MessageGrid>
    );
  }
}

Message.propTypes = {
  measuredHeight: PropTypes.number.isRequired,
  passthrough: PropTypes.func.isRequired,
  ...chatItemPropTypes,
};

Message.defaultProps = {
  ...chatItemPrototype,
};

export default withPropsPassthrough()(Message);
