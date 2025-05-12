import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import classNames from 'classnames';
import { NavbarActionItem } from 'gimlee-ui-components/Navbar';
import Icon, { icons } from 'gimlee-ui-components/Icon';
import Dropdown, { MODE_CLICK } from 'gimlee-ui-components/Dropdown';
import animations from 'gimlee-ui-components/constant/animations';
import { Div } from 'gimlee-ui-components/_Wrappers';
import DropdownNav from 'gimlee-ui-components/Nav/DropdownNav';
import NavItem from 'gimlee-ui-components/Nav/NavItem';
import { RouterButton, TYPE_LINK } from 'gimlee-ui-components/Button';
import LoginForm, { MODE_COMPACT } from '../../../Auth/Login/LoginForm';
import styles from '../../DesktopNav.scss';

const NotLoggedInMenu = ({ t }) => (
  <Div>
    <NavbarActionItem clickAction={() => null}>
      <Icon icon={icons.USER} />&nbsp;
      { t('notLoggedIn') }
    </NavbarActionItem>
    <Dropdown
      className={classNames(styles.loginDropdown, 'uk-padding-remove')}
      position="bottom-right"
      mode={MODE_CLICK}
      animation={animations.SLIDE_RIGHT_SMALL}
    >
      <Div className="uk-padding">
        <LoginForm mode={MODE_COMPACT} />
      </Div>
      <Div className="uk-background-secondary uk-light">
        <Div className="uk-padding">
          <DropdownNav centered>
            <NavItem className="uk-flex uk-flex-column uk-flex-middle">
              {t('dontYouHaveAccountYet')}
              <RouterButton to="/register" type={TYPE_LINK}>
                {t('createAccount')}
              </RouterButton>
            </NavItem>
          </DropdownNav>
        </Div>
      </Div>
    </Dropdown>
  </Div>
);

NotLoggedInMenu.propTypes = {
  t: PropTypes.func.isRequired,
};

export default translate()(NotLoggedInMenu);
