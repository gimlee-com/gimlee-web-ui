import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import debounce from 'debounce';
import { Form, FORM_STACKED, Legend, PasswordInput, SubmitButton, TextInput } from 'gimlee-ui-components/Form';
import { TYPE_PRIMARY as BUTTON_PRIMARY } from 'gimlee-ui-components/Button';
import apiService from 'gimlee-ui-service/api';
import { icons } from 'gimlee-ui-components/Icon';
import LoadingIndicator, { TYPE_PRIMARY } from 'gimlee-ui-components/LoadingIndicator';
import { inputIcon } from 'gimlee-ui-components/_HOC';
import Label from 'gimlee-ui-components/Form/Label';
import { fetchStatusPropTypes } from 'gimlee-ui-model/api';
import {
InlineContainer,
InlineMediumContainer,
InlineSpinner,
ValidInputIcon,
InvalidInputIcon,
} from '../../components';
import passwordValidator from './passwordValidator';
import { register } from './store/register';
import { renderValidationMessage } from '../../common/renderers/formRenderers';
import { EMAIL_REGEXP, USERNAME_REGEXP } from './constants';


const InputSpinner = inputIcon()(LoadingIndicator);

class BasicRegisterForm extends Component {

  constructor(props) {
    super(props);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.doRegister = this.doRegister.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.validateUsername = this.validateUsername.bind(this);
    this.validatePassword = debounce(this.validatePassword.bind(this), 50);
    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
      email: '',
      validation: {
        username: {
          valid: null,
          message: null,
          pending: false,
        },
        password: {
          valid: null,
          message: null,
          pending: false,
        },
        email: {
          valid: null,
          message: null,
          pending: false,
        },
      },
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.registerStatus.fetching && this.props.registerStatus.loaded) {
      this.props.history.push('/register/complete');
    }
  }

  handleUsernameChange(inputEvent) {
    this.setState({
      username: inputEvent.target.value,
    });
  }

  handlePasswordChange(inputEvent) {
    this.setState({
      password: inputEvent.target.value,
    });
  }

  handleConfirmPasswordChange(inputEvent) {
    this.setState({
      confirmPassword: inputEvent.target.value,
    });
    this.validatePassword();
  }

  handleEmailChange(inputEvent) {
    this.setState({
      email: inputEvent.target.value,
    });
  }

  validateUsername() {
    this.setState(prevState => ({
      validation: {
        ...prevState.validation,
        username: { pending: true },
      },
    }));

    if (!this.state.username.match(USERNAME_REGEXP)) {
      this.setState(prevState => ({
        validation: {
          ...prevState.validation,
          username: {
            valid: false,
            pending: false,
            message: this.props.t('app:auth:validation:invalidUsername'),
          },
        },
      }));
    } else {
      apiService.post('/api/auth/register/usernameAvailable', { username: this.state.username })
        .then((response) => {
          if (response.data.available) {
            this.setState(prevState => ({
              validation: {
                ...prevState.validation,
                username: { valid: true },
              },
            }));
          } else {
            this.setState(prevState => ({
              validation: {
                ...prevState.validation,
                username: {
                  valid: false,
                  message: this.props.t('app:auth:validation:usernameTaken'),
                },
              },
            }));
          }
        });
    }
  }

  validateEmail() {
    this.setState(prevState => ({
      validation: {
        ...prevState.validation,
        email: { pending: true },
      },
    }));

    if (!this.state.email.match(EMAIL_REGEXP)) {
      this.setState(prevState => ({
        validation: {
          ...prevState.validation,
          email: {
            valid: false,
            message: this.props.t('app:auth:validation:invalidEmail'),
          },
        },
      }));
    } else {
      apiService.post('/api/auth/register/emailAvailable', { email: this.state.email })
        .then((response) => {
          if (response.data.available) {
            this.setState(prevState => ({
              validation: {
                ...prevState.validation,
                email: { valid: true },
              },
            }));
          } else {
            this.setState(prevState => ({
              validation: {
                ...prevState.validation,
                email: {
                  valid: false,
                  message: this.props.t('app:auth:validation:emailTaken'),
                },
              },
            }));
          }
        });
    }
  }

  validatePassword() {
    if (!passwordValidator.validate(this.state.password)) {
      this.setState(prevState => ({
        validation: {
          ...prevState.validation,
          password: {
            valid: false,
            message: this.props.t('app:auth:validation:passwordNotSecure'),
          },
        },
      }));
    } else if (!this.state.confirmPassword.length) {
      this.setState(prevState => ({
        validation: {
          ...prevState.validation,
          password: { valid: null },
        },
      }));
    } else if (this.state.password !== this.state.confirmPassword) {
      this.setState(prevState => ({
        validation: {
          ...prevState.validation,
          password: {
            valid: false,
            message: this.props.t('app:auth:validation:passwordsDoNotMatch'),
          },
        },
      }));
    } else {
      this.setState(prevState => ({
        validation: {
          ...prevState.validation,
          password: { valid: true },
        },
      }));
    }
  }

  doRegister() {
    this.props.register(this.state.username, this.state.email, this.state.password);
  }

  renderUsernameInput(validationState, t) {
    return (
      <div>
        <Label for="username">{t('account:username')}</Label>
        <InlineMediumContainer>
          {validationState.valid && <ValidInputIcon icon={icons.CHECK} isInputIcon />}
          {validationState.valid === false && <InvalidInputIcon icon={icons.CAUTION} />}
          {validationState.pending && <InputSpinner isInputLoading type={TYPE_PRIMARY} />}
          { React.createElement(TextInput, {
            placeholder: t('app:auth:register:usernamePlaceholder'),
            name: 'username',
            onChange: this.handleUsernameChange,
            onBlur: this.validateUsername,
            valid: validationState.valid,
            highlightWhenValid: true,
          }) }
        </InlineMediumContainer>
        {
          validationState.valid === false && renderValidationMessage(validationState.message)
        }
      </div>
    );
  }

  renderEmailInput(validationState, t) {
    return (
      <div>
        <Label for="email">{t('account:email')}</Label>
        <InlineMediumContainer>
          {validationState.valid && <ValidInputIcon icon={icons.CHECK} isInputIcon />}
          {validationState.valid === false && <InvalidInputIcon icon={icons.CAUTION} />}
          {validationState.pending && <InputSpinner isInputLoading type={TYPE_PRIMARY} />}
          {React.createElement(TextInput, {
            placeholder: t('app:auth:register:emailPlaceholder'),
            name: 'email',
            onChange: this.handleEmailChange,
            onBlur: this.validateEmail,
            valid: validationState.valid,
            highlightWhenValid: true,
          })}

        </InlineMediumContainer>
        {
          validationState.valid === false && renderValidationMessage(validationState.message)
        }
      </div>);
  }

  renderPasswordInputs(validationState, t) {
    return (<div>
      <div className="uk-margin-small">
        <Label for="password">{t('account:password')}</Label>
        <InlineMediumContainer>
          {validationState.valid && <ValidInputIcon icon={icons.CHECK} isInputIcon />}
          {validationState.valid === false && <InvalidInputIcon icon={icons.CAUTION} />}
          <PasswordInput
            placeholder={t('app:auth:register:passwordPlaceholder')}
            name="password"
            onChange={this.handlePasswordChange}
            onBlur={this.validatePassword}
            valid={validationState.valid}
            highlightWhenValid
          />
        </InlineMediumContainer>
      </div>
      <div>
        <InlineMediumContainer>
          {validationState.valid && <ValidInputIcon icon={icons.CHECK} isInputIcon />}
          {validationState.valid === false && <InvalidInputIcon icon={icons.CAUTION} />}
          <PasswordInput
            placeholder={t('app:auth:register:repeatPassword')}
            name="confirmPassword"
            onChange={this.handleConfirmPasswordChange}
            valid={validationState.valid}
            highlightWhenValid
          />
        </InlineMediumContainer>
      </div>
      {
        validationState.valid === false && renderValidationMessage(validationState.message)
      }
    </div>);
  }

  renderSubmitButton(t) {
    const isRegisterPending = this.props.registerStatus.fetching;
    const isFormInvalid = Object.keys(this.state.validation)
      .some(k => !this.state.validation[k].valid);
    return (<SubmitButton
      type={BUTTON_PRIMARY}
      disabled={isRegisterPending || isFormInvalid}
      value={t('app:auth:register:doRegister')}
    />);
  }

  render() {
    const t = this.props.t;
    return (<Form layout={FORM_STACKED} onSubmit={this.doRegister}>
      <Legend>{t('app:auth:register:register')}</Legend>
      <div className="uk-margin">
        { this.renderUsernameInput(this.state.validation.username, t) }
      </div>
      <div className="uk-margin">
        { this.renderEmailInput(this.state.validation.email, t) }
      </div>
      { this.renderPasswordInputs(this.state.validation.password, t) }
      <div className="uk-margin-medium">
        {this.renderSubmitButton(t)}
        {this.props.registerStatus.fetching && (
          <InlineContainer><InlineSpinner small /><small>{t('app:auth:register:pending')}</small></InlineContainer>)
        }
      </div>
    </Form>);
  }
}

BasicRegisterForm.propTypes = {
  t: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  register: PropTypes.func.isRequired,
  registerStatus: PropTypes.shape(fetchStatusPropTypes).isRequired,
};

function mapStateToProps(state) {
  return {
    registerStatus: state.registration.registerStatus,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ register }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter((translate()(BasicRegisterForm))));
