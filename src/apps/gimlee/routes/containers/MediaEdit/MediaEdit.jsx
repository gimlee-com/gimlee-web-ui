import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import api from 'gimlee-ui-service/api';
import { fetchStatus } from 'gimlee-ui-model/api';
import { withTooltip } from 'gimlee-ui-components/_HOC';
import LoadingIndicator from 'gimlee-ui-components/LoadingIndicator';
import { ActionButton, TYPE_DEFAULT, TYPE_PRIMARY } from 'gimlee-ui-components/Button';
import { HELP_ROUND_FILLED } from 'gimlee-ui-components/Icon/icons';
import Icon from 'gimlee-ui-components/Icon/Icon';
import ImageBlurTool from './components/ImageBlurTool/ImageBlurTool';
import ImageCropTool from './components/ImageCropTool/ImageCropTool';
import styles from '../../ads/NewAd/steps/MainPhotoStep.scss';

const IconWithTooltip = withTooltip()(Icon);

export const EDIT_TOOL_BLUR = 'blur-tool';
export const EDIT_TOOL_CROP = 'crop-tool';

const API_MEDIA_UPLOAD_PATH = '/api/media/upload';

class MediaEdit extends Component {
  constructor(props) {
    super(props);
    this.handleImageEdited = this.handleImageEdited.bind(this);
    this.applyEdit = this.applyEdit.bind(this);
    this.cancel = this.cancel.bind(this);

    this.state = {
      editedImageBlob: null,
      saveStatus: { ...fetchStatus },
    };
  }

  handleImageEdited(editedImageBlob) {
    this.setState({
      editedImageBlob,
    });
  }

  applyEdit() {
    this.setState({
      saveStatus: { ...fetchStatus, fetching: true },
    });

    const formData = new FormData();
    formData.append('files[]', this.state.editedImageBlob, 'edited.jpg');
    api.post(
      API_MEDIA_UPLOAD_PATH,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    ).then((response) => {
      this.setState({
        saveStatus: { ...fetchStatus, loaded: true },
      });
      this.props.onMediaEdited(response);
    });
  }

  cancel() {
    this.props.onCancel();
  }

  render() {
    const { imageUrl, editTool, title, help, t } = this.props;

    return (
      <div className="uk-flex uk-flex-column">
        <div className="uk-margin uk-align-center">
          { editTool === EDIT_TOOL_BLUR &&
            <Fragment key="blur-tool">
              { title && (<h3>{title}</h3>)}
              <ImageBlurTool
                imageUrl={`/api/media?p=${imageUrl}`}
                onImageEdited={this.handleImageEdited}
              />
            </Fragment>
          }
          { editTool === EDIT_TOOL_CROP &&
            <Fragment key="crop-tool">
              <h3>{title}{help && <IconWithTooltip
                className={styles.helpIcon}
                tooltip={{
                  pos: 'bottom',
                  title: help,
                  delay: 200,
                }}
                icon={HELP_ROUND_FILLED}
              />}
              </h3>
              <ImageCropTool
                imageUrl={`/api/media?p=${imageUrl}`}
                onImageEdited={this.handleImageEdited}
              />
            </Fragment>
          }
        </div>
        <div className="uk-margin uk-align-center">
          <ActionButton action={this.cancel} type={TYPE_DEFAULT}>
            {t('common:cancel')}
          </ActionButton>
          <ActionButton
            disabled={!this.state.editedImageBlob || this.state.saveStatus.fetching}
            type={TYPE_PRIMARY}
            action={this.applyEdit}
          >
            {
              this.state.saveStatus.fetching &&
              <span>{t('app:common:saving')} <LoadingIndicator small className="uk-inline" /></span>
            }
            { !this.state.saveStatus.fetching && t('app:common:save')}
          </ActionButton>
        </div>
      </div>
    );
  }
}

MediaEdit.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  editTool: PropTypes.oneOf([EDIT_TOOL_BLUR, EDIT_TOOL_CROP]),
  title: PropTypes.string,
  help: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  onMediaEdited: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

MediaEdit.defaultProps = {
  editTool: EDIT_TOOL_BLUR,
  title: '',
  help: '',
};

function mapStateToProps(state) {
  return {
    imageUrl: state.mediaEdit.imageUrl,
  };
}

export default connect(mapStateToProps)(translate()(MediaEdit));
