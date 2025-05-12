import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import { Div } from 'gimlee-ui-components/_Wrappers/index';
import { FLEX_DIRECTION_COLUMN, FLEX_NOWRAP, flexContainer } from 'gimlee-ui-components/_HOC/flexContainer';

const Wrapper = flexContainer()(Div);

const Hello = () => (<h1>Hello</h1>);

const App = () => (
  <Wrapper
    flexContainer={{
      wrap: FLEX_NOWRAP,
      direction: FLEX_DIRECTION_COLUMN,
    }}
    style={{ flex: '1' }}
  >
    <Route path="/" component={Hello} />
  </Wrapper>
);

const AppWithRouter = withRouter(() => <App />);

export default () => <AppWithRouter />;
