import React, { PureComponent } from 'react';
import classNames from 'classnames';
import TextArea from '../../Form/TextArea';
import { flexContainer } from '../../_HOC/flexContainer';
import styles from './MessageTextArea.scss';

const FlexTextArea = flexContainer()(TextArea);

class MessageTextArea extends PureComponent {
  render() {
    return (
      <FlexTextArea
        {...this.props}
        flexContainer={{}}
        className={classNames(this.props.className, styles.textarea)}
      />
    );
  }
}

MessageTextArea.propTypes = TextArea.propTypes;
MessageTextArea.defaultProps = TextArea.defaultProps;

export default MessageTextArea;

