import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, withRouter } from 'react-router-dom';
import { translate } from 'react-i18next';
import { AnimatePresence } from 'framer-motion';
import classNames from 'classnames';
import except from 'except';
import UIkit from 'uikit';
import Page from '../../components/Page';
import { Div } from '../../components/_Wrappers';
import { withPropsPassthrough } from '../../components/_HOC';
import { FLEX_DIRECTION_COLUMN, FLEX_NOWRAP, flexContainer } from '../../components/_HOC/flexContainer';
import Icon, { icons } from '../../components/Icon';
import Navbar, { NavbarActionItem, NavbarLeft, NavbarRight } from '../../components/Navbar';
import { NavbarDropdownNav, NavItem } from '../../components/Nav';
import ActionLink from '../../components/ActionLink';
import ChatPrototype from './ChatPrototype/ChatPrototype';
import Dropdown, { MODE_CLICK } from '../../components/Dropdown';
import animations from '../../components/constant/animations';
import styles from './Prototypes.scss';


const Wrapper = flexContainer()(Div);
const FlexPage = flexContainer()(Page);

const Container = flexContainer()(Div);

const RouteWrapper = props => (
  <Container
    style={{ flex: '1 1 auto' }}
    flexContainer={{
      wrap: FLEX_NOWRAP,
      direction: FLEX_DIRECTION_COLUMN,
    }}
    {...props.passthrough()}
  >
    {props.children}
  </Container>
);

const RouteWrapperComponent = withPropsPassthrough()(RouteWrapper);

RouteWrapper.propTypes = {
  children: PropTypes.node,
  passthrough: PropTypes.func.isRequired,
};

RouteWrapper.defaultProps = {
  children: null,
};

RouteWrapperComponent.propTypes = except(RouteWrapper.propTypes, 'passthrough');

const DevPlayground = withRouter(translate()(({ location }) => (
  <Wrapper flexContainer={{ direction: FLEX_DIRECTION_COLUMN }} style={{ flex: '1 1 auto' }}>
    <Navbar className={classNames('uk-light', styles.header, styles['small-header-height'])}>
      <NavbarLeft>
        <NavbarActionItem isLogo className={styles['small-header-height']}>
          logo
        </NavbarActionItem>
      </NavbarLeft>
      <NavbarRight>
        <Div>
          <NavbarActionItem clickAction={() => null} className={styles['small-header-height']}>
            <Icon icon={icons.USER} />&nbsp;
            User
          </NavbarActionItem>
          <Dropdown
            position="bottom-right"
            mode={MODE_CLICK}
            animation={animations.SLIDE_TOP_SMALL}
          >
            <NavbarDropdownNav>
              <NavItem>
                <ActionLink clickAction={UIkit.util.noop}>Wyloguj</ActionLink>
              </NavItem>
            </NavbarDropdownNav>
          </Dropdown>
        </Div>
      </NavbarRight>
    </Navbar>
    <AnimatePresence exitBeforeEnter>
      <FlexPage
        key={location}
        flexContainer={{
          wrap: FLEX_NOWRAP,
          direction: FLEX_DIRECTION_COLUMN,
        }}
        style={{ flex: '1 1 auto' }}
      >
        <Switch
          location={{ ...location, key: '' }}
          wrapperComponent={RouteWrapperComponent}
        >
          <Route
            key={'prototypes-chat'}
            exact
            path="/_prototypes/chat/:chatId" // Add chatId route param
            render={
                props =>
                  <ChatPrototype chatId={props.match.params.chatId} />
            }
          />
        </Switch>
      </FlexPage>
    </AnimatePresence>
  </Wrapper>
)));
export default DevPlayground;
