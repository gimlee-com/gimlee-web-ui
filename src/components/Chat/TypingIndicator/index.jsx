import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import styles from './TypingIndicator.scss';
import {
  flexContainer,
  ALIGN_ITEMS_MIDDLE,
  FLEX_WRAP, JUSTIFY_CENTER,
} from '../../_HOC/flexContainer';
import text, { TEXT_STYLE_META } from '../../_HOC/text';

const Wrapper = flexContainer()('div');
const DotsContainer = flexContainer()('div');
const SmallMetaText = text({ style: TEXT_STYLE_META })('small');

function renderWhoIsTypingText(whoIsTyping, t) {
  if (whoIsTyping.length === 1) {
    return t('chat:typingIndicator:onePersonTyping', { name: whoIsTyping.join(', ') });
  } else if (whoIsTyping.length === 2) {
    return t('chat:typingIndicator:twoPersonsTyping', {
      first: whoIsTyping[0],
      second: whoIsTyping[1],
    });
  } else if (whoIsTyping.length > 2) {
    return t('chat:typingIndicator:multiplePeopleTyping', {
      last: whoIsTyping[whoIsTyping.length - 1],
    });
  }
  return '';
}

const TypingIndicator = props => (
  <Wrapper
    flexContainer={{
      wrap: FLEX_WRAP,
      itemsAlign: ALIGN_ITEMS_MIDDLE,
    }}
    className={styles.wrapper}
  >
    {!!props.whoIsTyping.length &&
    <div>
      <DotsContainer
        flexContainer={{
          inline: true,
          wrap: FLEX_WRAP,
          contentJustify: JUSTIFY_CENTER,
        }}
        className={styles['dots-container']}
      >
        <span className={styles.dot} />
        <span className={styles.dot} />
        <span className={styles.dot} />
      </DotsContainer>
      <SmallMetaText>
        {renderWhoIsTypingText(props.whoIsTyping, props.t)}
      </SmallMetaText>
    </div>
    }
  </Wrapper>
);

TypingIndicator.propTypes = {
  whoIsTyping: PropTypes.arrayOf(PropTypes.string),
  t: PropTypes.func.isRequired,
};

TypingIndicator.defaultProps = {
  whoIsTyping: [],
};

export default translate()(TypingIndicator);
