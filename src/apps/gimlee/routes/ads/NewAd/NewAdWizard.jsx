import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { SubmitButton } from 'gimlee-ui-components/Form';
import ActionLink from 'gimlee-ui-components/ActionLink';
import Page from 'gimlee-ui-components/Page';
import withTooltip from 'gimlee-ui-components/_HOC/withTooltip';
import animations from 'gimlee-ui-components/constant/animations';
import Container from 'gimlee-ui-components/Container';
import api from 'gimlee-ui-service/api';
import {
  ALIGN_CONTENT_MIDDLE,
  FLEX_DIRECTION_COLUMN,
  FLEX_WRAP,
  flexContainer,
  JUSTIFY_CENTER,
} from 'gimlee-ui-components/_HOC/flexContainer';

import { ActionButton, TYPE_PRIMARY, TYPE_TEXT } from 'gimlee-ui-components/Button';
import PageContent from 'gimlee-ui-components/PageContent';
import { updateAccessToken } from 'gimlee-ui-store/loginSession';
import Icon from 'gimlee-ui-components/Icon/Icon';
import { icons } from 'gimlee-ui-components/Icon';
import { NewAdSteps } from './components/NewAdSteps';
import AdTypeStep from './steps/AdTypeStep';
import { goToStep, initWizard, skipStep, unskipStep } from './store/newAd';
import {
  STEP_AD_TYPE,
  STEP_AVAILABILITY,
  STEP_BASIC_DETAILS,
  STEP_MAIN_PHOTO,
  STEP_MEDIA,
  STEP_PRICING,
} from './model/step';
import convertToStepInfo from './util/convertToStepInfo';
import stepsStateProto, { stepsStatePropTypes } from './model/stepsState';
import stepsValidationProto, { validationStatePropTypes } from './model/validationState';
import { clearCustomRenderer, setCustomNavRenderers } from '../../Nav/store/customNavRenderers';
import { stepValid } from './util/stepValidators';
import styles from './NewAdWizard.scss';

const STEPS_ORDERED = [
  STEP_AD_TYPE,
];

const ButtonsContainer = flexContainer()('div');

const FlexContainer = flexContainer()(Container);

class NewAdWizard extends Component {

  constructor(props) {
    super(props);
    this.renderSteps = this.renderSteps.bind(this);
    this.renderWizardControls = this.renderWizardControls.bind(this);
    this.isFirstStep = this.isFirstStep.bind(this);
    this.isLastStep = this.isLastStep.bind(this);
    this.previousStep = this.previousStep.bind(this);
    this.nextStep = this.nextStep.bind(this);
    this.skipStep = this.skipStep.bind(this);
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    this.props.initWizard();
    this.props.goToStep(STEP_AD_TYPE);
  }

  componentDidUpdate(prevProps) {
    const { t } = this.props;
    const hasStepChanged = prevProps.currentStep !== this.props.currentStep;
    const hasStepValidationChanged = prevProps.currentStep
      && (
        stepValid(prevProps.currentStep, prevProps.stepsValidation)
        !== stepValid(this.props.currentStep, this.props.stepsValidation,
        )
      );
    if (hasStepChanged || hasStepValidationChanged) {
      this.props.setCustomNavRenderers({
        center: this.renderSteps,
        right: () => (
          <ActionButton type={TYPE_TEXT} className="uk-flex" action={this.props.history.goBack}>
            <Icon className={styles.cancelButtonIcon} icon={icons.CLOSE} />
            {t('common:cancel')}
          </ActionButton>
        ),
      });
    }
  }

  componentWillUnmount() {
    this.props.clearCustomNavRenderers();
  }

  isFirstStep() {
    return STEPS_ORDERED.indexOf(this.props.currentStep) === 0;
  }

  isLastStep() {
    return STEPS_ORDERED.indexOf(this.props.currentStep) === STEPS_ORDERED.length - 1;
  }

  nextStep() {
    const currentStepIndex = STEPS_ORDERED.indexOf(this.props.currentStep);
    if (currentStepIndex !== STEPS_ORDERED.length - 1) {
      this.props.unskipStep(STEPS_ORDERED[currentStepIndex]);
      this.props.goToStep(STEPS_ORDERED[currentStepIndex + 1]);
    }
  }

  skipStep() {
    const currentStepIndex = STEPS_ORDERED.indexOf(this.props.currentStep);
    if (currentStepIndex !== STEPS_ORDERED.length - 1) {
      this.props.skipStep(STEPS_ORDERED[currentStepIndex]);
      this.props.goToStep(STEPS_ORDERED[currentStepIndex + 1]);
    }
  }

  previousStep() {
    const currentStepIndex = STEPS_ORDERED.indexOf(this.props.currentStep);
    if (currentStepIndex !== 0) {
      this.props.goToStep(STEPS_ORDERED[currentStepIndex - 1]);
    }
  }

  submit() {
    api.post(
      '/api/ads',
      {
        type: this.props.stepsState[STEP_AD_TYPE],
        title: this.props.stepsState[STEP_BASIC_DETAILS].title,
        description: this.props.stepsState[STEP_BASIC_DETAILS].description,
        personalInfos: this.props.stepsState[STEP_BASIC_DETAILS].personalInfos,
        contact: {
          phone: this.props.stepsState.contact.phone,
          email: this.props.stepsState.contact.email,
        },
        location: this.props.stepsState.contact.location,
        availability: this.props.stepsState[STEP_AVAILABILITY],
        pricing: this.props.stepsState[STEP_PRICING],
        mediaPaths: this.props.stepsState[STEP_MEDIA],
        mainPhotoPath: this.props.stepsState[STEP_MAIN_PHOTO],
      },
    ).then((response) => {
      this.props.updateAccessToken(response.data.accessToken);
      this.props.history.push(`/ad/${response.data.ad.id}`);
    });
  }

  renderSteps() {
    const { stepsValidation, currentStep, skippedSteps } = this.props;
    return (
      <NewAdSteps steps={
        STEPS_ORDERED.map(step =>
          convertToStepInfo(step, stepsValidation, currentStep, skippedSteps),
        )
      }
      />
    );
  }

  renderWizardControls(valid, canSkip) {
    const t = this.props.t;

    const SkipLink = withTooltip('desktop')(ActionLink);

    return (
      <div>
        <ButtonsContainer
          flexContainer={{
            inline: false,
            wrap: FLEX_WRAP,
            contentAlign: ALIGN_CONTENT_MIDDLE,
          }}
          className={styles.buttonsContainer}
        >
          {!this.isFirstStep() &&
            <ActionLink clickAction={this.previousStep}>
              {t('app:ads:previousStep')}
            </ActionLink>}
          {canSkip && !this.isLastStep() &&
            <SkipLink
              tooltip={{
                pos: 'top',
                animation: animations.SLIDE_BOTTOM_SMALL,
                title: t('app:ads:skipExplanation'),
              }}
              clickAction={this.skipStep}
            >
              {t('app:ads:skipStep')}
            </SkipLink>}
          {this.isFirstStep() && <span />}
          <SubmitButton
            type={TYPE_PRIMARY}
            value={this.isLastStep() ? t('app:ads:submit') : t('app:ads:nextStep')}
            disabled={!valid}
          />
        </ButtonsContainer>
      </div>
    );
  }

  render() {
    const { currentStep } = this.props;

    return (
      <Page>
        <PageContent>
          <FlexContainer
            className="uk-margin-medium-top"
            flexContainer={{
              inline: false,
              wrap: FLEX_WRAP,
              contentJustify: JUSTIFY_CENTER,
              direction: FLEX_DIRECTION_COLUMN,
            }}
          >
            {currentStep === STEP_AD_TYPE && <AdTypeStep
              onStepSubmit={this.nextStep}
              renderWizardControls={this.renderWizardControls}
            />}
          </FlexContainer>
        </PageContent>
      </Page>
    );
  }
}

NewAdWizard.propTypes = {
  t: PropTypes.func.isRequired,
  currentStep: PropTypes.oneOf([
    null,
    STEP_AD_TYPE,
  ]),
  initWizard: PropTypes.func.isRequired,
  goToStep: PropTypes.func.isRequired,
  skipStep: PropTypes.func.isRequired,
  unskipStep: PropTypes.func.isRequired,
  stepsState: PropTypes.shape(stepsStatePropTypes).isRequired,
  stepsValidation: PropTypes.shape(validationStatePropTypes).isRequired,
  skippedSteps: PropTypes.arrayOf(PropTypes.oneOf(STEPS_ORDERED)).isRequired,
  updateAccessToken: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  setCustomNavRenderers: PropTypes.func.isRequired,
  clearCustomNavRenderers: PropTypes.func.isRequired,
};

NewAdWizard.defaultProps = {
  currentStep: null,
};

function mapStateToProps(state) {
  let stepsState = state.newAd.stepsState;
  let stepsValidation = state.newAd.stepsValidation;
  state.newAd.skippedSteps.forEach((step) => {
    stepsState = { ...stepsState, [step]: { ...stepsStateProto[step] } };
    stepsValidation = { ...stepsValidation, [step]: { ...stepsValidationProto[step] } };
  });
  return {
    currentStep: state.newAd.currentStep,
    skippedSteps: state.newAd.skippedSteps,
    stepsState,
    stepsValidation,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    initWizard: () => dispatch(initWizard()),
    goToStep: step => dispatch(goToStep(step)),
    skipStep: step => dispatch(skipStep(step)),
    unskipStep: step => dispatch(unskipStep(step)),
    updateAccessToken: accessToken => updateAccessToken(accessToken, dispatch),
    setCustomNavRenderers: renderers => dispatch(setCustomNavRenderers(renderers)),
    clearCustomNavRenderers: () => dispatch(clearCustomRenderer()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(translate()(withRouter(NewAdWizard)));
