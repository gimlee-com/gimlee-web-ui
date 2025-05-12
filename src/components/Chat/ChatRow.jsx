import React, { memo, PureComponent } from 'react';
import { areEqual } from 'react-window';
import { Message } from './Message';
import DaysDivider from './components/DaysDivider';

function areChatItemsEqual(prevProps, newProps) {
  return areEqual(prevProps, newProps) && prevProps.data === newProps.data;
}

class ChatRow extends PureComponent {

  render() {
    const { data, index, style } = this.props;
    const chatItem = data[index];

    if (style.height) {
      if (chatItem.type === 'DAYS-DIVIDER') {
        return (
          <DaysDivider date={chatItem.timestamp} style={style} />
        );
      }
      return (
        <Message
          style={style}
          measuredHeight={style.height}
          {...data[index]}
          id={chatItem.id}
          author={chatItem.author}
          data={chatItem.data}
          own={chatItem.own}
          sending={chatItem.sending}
          timestamp={chatItem.timestamp}
          lastEdited={chatItem.lastEdited}
        />
      );
    }
    return null;
  }
}

export default memo(ChatRow, areChatItemsEqual);
