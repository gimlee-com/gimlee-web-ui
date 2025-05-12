import { compose } from 'redux';
import { SubmitButton } from 'gimlee-ui-components/Form';
import { circleBorder, inline, inputIcon, mediumWidth, smallWidth } from 'gimlee-ui-components/_HOC';
import LoadingIndicator from 'gimlee-ui-components/LoadingIndicator';
import text, { TEXT_COLOR_DANGER, TEXT_COLOR_SUCCESS } from 'gimlee-ui-components/_HOC/text';
import { Div, Image } from 'gimlee-ui-components/_Wrappers';
import Icon from 'gimlee-ui-components/Icon';

// Forms
const SmallSubmitButton = smallWidth()(SubmitButton);
const ValidInputIcon = compose(
  inputIcon(),
  text({ color: TEXT_COLOR_SUCCESS }),
)(Icon);
const InvalidInputIcon = compose(
  inputIcon(),
  text({ color: TEXT_COLOR_DANGER }),
)(Icon);

// Loading indicators
const InlineSpinner = inline()(LoadingIndicator);

// Containers
const InlineContainer = inline()(Div);
const InlineMediumContainer = mediumWidth()(InlineContainer);
const InlineSmallContainer = smallWidth()(InlineContainer);

// Images
const CircleImage = circleBorder()(Image);

export {
  InlineContainer,
  InlineMediumContainer,
  InlineSmallContainer,
  InlineSpinner,
  InvalidInputIcon,
  SmallSubmitButton,
  ValidInputIcon,
  CircleImage,
};
