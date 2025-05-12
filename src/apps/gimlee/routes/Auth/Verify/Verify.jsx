import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { parse } from 'query-string';
import { translate } from 'react-i18next';
import { Redirect } from 'react-router';
import api from 'gimlee-ui-service/api';
import PageContent from 'gimlee-ui-components/PageContent';
import { Form, FORM_STACKED, SubmitButton, TextInput } from 'gimlee-ui-components/Form';
import { TYPE_PRIMARY as BUTTON_PRIMARY } from 'gimlee-ui-components/Button';
import { validation } from 'gimlee-ui-model/forms';
import { updateLoginSession } from 'gimlee-ui-store/loginSession';
import Alert, { ALERT_DANGER, ALERT_SUCCESS } from 'gimlee-ui-components/Alert';
import ActionLink from 'gimlee-ui-components/ActionLink';
import { fetchStatus } from 'gimlee-ui-model/api';
import LoadingIndicator from 'gimlee-ui-components/LoadingIndicator';

const VERIFICATION_CODE_LENGTH = 6;
const VERIFICATION_CODE_REGEXP = '[0-9]{6}';

class Verify extends PureComponent {
  constructor(props) {
    super(props);
    this.handleVerificationCodeChange = this.handleVerificationCodeChange.bind(this);
    this.validateVerificationCode = this.validateVerificationCode.bind(this);
    this.resendVerificationCode = this.resendVerificationCode.bind(this);
    this.renderExplanation = this.renderExplanation.bind(this);
    this.submit = this.submit.bind(this);

    this.state = {
      verificationCode: '',
      attemptedToEnterOnceAlready: false,
      invalidCode: false,
      validation: { ...validation },
      resendStatus: { ...fetchStatus },
    };
  }

  handleVerificationCodeChange(inputEvent) {
    const verificationCode = inputEvent.target.value;
    const attemptedToEnterOnceAlready = this.state.attemptedToEnterOnceAlready ?
      true : verificationCode.length === VERIFICATION_CODE_LENGTH;
    this.setState({
      verificationCode,
      attemptedToEnterOnceAlready,
    });
    if (attemptedToEnterOnceAlready) {
      this.validateVerificationCode(verificationCode);
    }
  }

  validateVerificationCode(verificationCode) {
    this.setState({
      validation: {
        ...validation,
        valid: !!verificationCode.match(VERIFICATION_CODE_REGEXP),
      },
    });
  }

  submit() {
    api.post('/api/auth/verifyUser', {
      code: this.state.verificationCode,
    }).then((response) => {
      if (response.data.success) {
        this.props.updateLoginSession(response);
      } else {
        this.setState({
          invalidCode: true,
        });
      }
    });
  }

  resendVerificationCode(t) {
    this.setState({
      resendStatus: { ...fetchStatus, fetching: true },
    });
    api.post('/api/auth/resendVerificationCode').then((response) => {
      if (response.data.success) {
        this.setState({
          resendStatus: { ...fetchStatus, loaded: true },
        });
      } else {
        this.setState({
          resendStatus: { ...fetchStatus, error: { message: t('app:auth:verify:resendError') } },
        });
      }
    }).catch(() => {
      this.setState({
        resendStatus: { ...fetchStatus, error: { message: t('app:auth:verify:resendError') } },
      });
    });
  }

  renderExplanation(t) {
    if (this.state.resendStatus.fetching) {
      return (
        <Fragment>
          <LoadingIndicator small className="uk-inline" />{t('app:auth:verify:resendPending')}
        </Fragment>
      );
    }
    return (
      <Fragment>
        {'Wprowadź sześciocyfrowy kod weryfikacyjny. '}
        {'Jeśli nie otrzymałeś kodu '}
        <ActionLink clickAction={() => this.resendVerificationCode(t)}>
          kliknij tutaj
        </ActionLink>
        {' a wyślemy go ponownie.'}
      </Fragment>
    );
  }

  render() {
    const { isAlreadyVerified, resumePath, t } = this.props;
    const { invalidCode } = this.state;
    const isFormInvalid = !this.state.validation.valid;
    if (isAlreadyVerified) {
      return <Redirect to={resumePath} />;
    }
    return (
      <PageContent>
        <Form layout={FORM_STACKED} onSubmit={this.submit}>
          {this.renderExplanation(t)}
          {
            this.state.resendStatus.error.message &&
            <Alert type={ALERT_DANGER}>{this.state.resendStatus.error.message}</Alert>
          }
          {
            this.state.resendStatus.loaded &&
            <Alert type={ALERT_SUCCESS}>{t('app:auth:verify:resendSuccess')}</Alert>
          }
          {
            invalidCode &&
            <Alert type={ALERT_DANGER}>Wprowadzony kod jest nieprawidłowy. Spróbuj ponownie.</Alert>
          }
          <div className="uk-margin">
            <TextInput
              maxLength={VERIFICATION_CODE_LENGTH}
              name="verificationCode"
              onChange={this.handleVerificationCodeChange}
            />
          </div>
          <div className="uk-margin">
            <SubmitButton
              disabled={isFormInvalid}
              type={BUTTON_PRIMARY}
              value={t('app:auth:verify:submitVerify')}
            />
          </div>
        </Form>
      </PageContent>
    );
  }
}

Verify.propTypes = {
  isAlreadyVerified: PropTypes.bool.isRequired,
  resumePath: PropTypes.string.isRequired,
  updateLoginSession: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    isAlreadyVerified: state.loginSession.user.roles.indexOf('UNVERIFIED') < 0,
    resumePath: parse(state.router.location.search).resume || '/',
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateLoginSession: response => updateLoginSession(
      response.data.accessToken,
      response.data.csrfToken,
      dispatch,
    ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(translate()(Verify));
