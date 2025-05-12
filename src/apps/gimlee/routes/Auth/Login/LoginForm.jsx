import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { translate } from 'react-i18next';
import debounce from 'debounce';
import { Form, FORM_STACKED, Label, PasswordInput, SubmitButton, TextInput } from 'gimlee-ui-components/Form';
import { TYPE_PRIMARY as BUTTON_PRIMARY } from 'gimlee-ui-components/Button';
import { login } from 'gimlee-ui-store/loginSession';
import Checkbox from 'gimlee-ui-components/Form/Checkbox';
import {
  InlineContainer,
  InlineSpinner,
} from '../../../components';
import { USERNAME_REGEXP } from '../constants';
import passwordValidator from '../passwordValidator';

export const MODE_COMPACT = 'compact';
export const MODE_FULL = 'full';

class LoginForm extends Component {

  constructor(props) {
    super(props);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleRememberLoginCheckboxChange = this.handleRememberLoginCheckboxChange.bind(this);
    this.validateUsername = debounce(this.validateUsername.bind(this), 100);
    this.validatePassword = debounce(this.validatePassword.bind(this), 100);
    this.doLogin = this.doLogin.bind(this);
    this.state = {
      username: '',
      password: '',
      rememberLogin: false,
      validation: {
        username: {
          valid: null,
        },
        password: {
          valid: null,
        },
      },
    };
  }

  handleUsernameChange(inputEvent) {
    this.setState({
      username: inputEvent.target.value,
    });
    this.validateUsername();
  }

  handlePasswordChange(inputEvent) {
    this.setState({
      password: inputEvent.target.value,
    });
    this.validatePassword();
  }

  handleRememberLoginCheckboxChange(inputEvent) {
    this.setState({
      rememberLogin: inputEvent.target.checked,
    });
  }

  validateUsername() {
    this.setState(prevState => ({
      validation: {
        ...prevState.validation,
        username: {
          valid: this.state.username.match(USERNAME_REGEXP),
        },
      },
    }));
  }

  validatePassword() {
    this.setState(prevState => ({
      validation: {
        ...prevState.validation,
        password: {
          valid: passwordValidator.validate(this.state.password),
        },
      },
    }));
  }

  doLogin() {
    this.props.login(this.state.username, this.state.password, this.state.rememberLogin);
  }

  renderLoginInput(t) {
    const className = this.props.mode === MODE_COMPACT ? 'uk-width-1-1' : '';
    return (
      <TextInput
        className={className}
        placeholder={t('account:username')}
        name="username"
        onChange={this.handleUsernameChange}
      />
    );
  }

  renderPasswordInput(t) {
    const className = this.props.mode === MODE_COMPACT ? 'uk-width-1-1' : '';
    return (
      <PasswordInput
        className={className}
        placeholder={t('account:password')}
        name="password"
        onChange={this.handlePasswordChange}
      />
    );
  }

  renderRememberMeCheckbox(t) {
    const labelText = this.props.mode === MODE_COMPACT ?
      ` ${t('app:auth:login:remember_short')}` : ` ${t('app:auth:login:remember')}`;
    return (
      <Label for="remember-login-checkbox">
        <Checkbox id="remember-login-checkbox" onChange={this.handleRememberLoginCheckboxChange} />
        {labelText}
      </Label>
    );
  }

  renderCompactForm({ t, isLoginPending, isFormInvalid, withRememberMeCheckbox }) {
    return (
      <Form layout={FORM_STACKED} onSubmit={this.doLogin}>
        <div className="uk-margin">
          { this.renderLoginInput(t) }
        </div>
        <div className="uk-margin">
          { this.renderPasswordInput(t) }
        </div>
        { withRememberMeCheckbox &&
        <div className="uk-margin">
          { this.renderRememberMeCheckbox(t) }
        </div>
        }
        <SubmitButton
          className="uk-width-1-1"
          disabled={isLoginPending || isFormInvalid}
          type={BUTTON_PRIMARY}
          value={t('doLogin')}
        />
        {isLoginPending && (
        <div className="uk-margin">
          <InlineContainer>
            <InlineSpinner small />
            <small>{t('app:auth:login:pending')}</small>
          </InlineContainer>
        </div>)
      }
      </Form>);
  }

  renderFullForm({ t, isLoginPending, isFormInvalid, withRememberMeCheckbox }) {
    return (
      <Form layout={FORM_STACKED} onSubmit={this.doLogin}>
        <div className="uk-margin">
          { this.renderLoginInput(t) }
        </div>
        <div className="uk-margin">
          { this.renderPasswordInput(t) }
        </div>
        { withRememberMeCheckbox &&
          <div className="uk-margin">
            { this.renderRememberMeCheckbox(t) }
          </div>
        }
        <SubmitButton
          disabled={isLoginPending || isFormInvalid}
          type={BUTTON_PRIMARY}
          value={t('doLogin')}
        />
        {isLoginPending && (
        <div className="uk-margin">
          <InlineContainer>
            <InlineSpinner small />
            <small>{t('app:auth:login:pending')}</small>
          </InlineContainer>
        </div>)
      }
      </Form>);
  }

  render() {
    const isFormInvalid = Object.keys(this.state.validation)
      .some(k => !this.state.validation[k].valid);
    const { t, loginPending, withRememberMeCheckbox } = this.props;
    switch (this.props.mode) {
      case MODE_FULL:
        return this.renderFullForm({ t, loginPending, isFormInvalid, withRememberMeCheckbox });
      case MODE_COMPACT:
      default:
        return this.renderCompactForm({ t, loginPending, isFormInvalid, withRememberMeCheckbox });
    }
  }
}

LoginForm.propTypes = {
  t: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  loginPending: PropTypes.bool.isRequired,
  withRememberMeCheckbox: PropTypes.bool,
  mode: PropTypes.oneOf([MODE_COMPACT, MODE_FULL]),
};

LoginForm.defaultProps = {
  mode: MODE_FULL,
  withRememberMeCheckbox: false,
};

function mapStateToProps(state) {
  return {
    loginPending: state.loginSession.fetchStatus.fetching,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ login }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(translate()(LoginForm));
