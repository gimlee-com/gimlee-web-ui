import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import commonmark from 'commonmark';

import Container from 'gimlee-ui-components/Container';
import PageContent from 'gimlee-ui-components/PageContent';
import { Breadcrumb, Breadcrumbs } from 'gimlee-ui-components/Breadcrumbs';
import { ActionButton, RouterButton, TYPE_LINK } from 'gimlee-ui-components/Button';
import { NavbarActionItem, NavbarItem } from 'gimlee-ui-components/Navbar';
import { Grid, GridItem } from 'gimlee-ui-components/Grid';
import Icon from 'gimlee-ui-components/Icon';
import { BACK } from 'gimlee-ui-components/Icon/icons';
import MediaGallery from 'gimlee-ui-components/MediaGallery';

import { fetchAdDetails, updateCurrentPhoto } from './store/adDetails';
import { adDetailsPropTypes } from './model/adDetails';
import { clearCustomRenderer, setCustomNavRenderers } from '../../Nav/store/customNavRenderers';
import styles from './AdDetails.scss';

function getMediaUrl(basePath, size = 'full') {
  if (!basePath) {
    return '';
  }
  switch (size) {
    case 'xs': // 160px width thumb
      return `/api/media?p=/thumbs-xs${basePath}`;
    case 'sm': // 270px width thumb
      return `/api/media?p=/thumbs-sm${basePath}`;
    case 'md': // 570px width thumb
      return `/api/media?p=/thumbs-md${basePath}`;
    case 'full':
    default:
      return `/api/media?p=${basePath}`; // Full image
  }
}


class AdDetails extends PureComponent {
  constructor(props) {
    super(props);
    this.renderTitle = this.renderTitle.bind(this);
    this.renderGoBackAndBreadcrumbs = this.renderGoBackAndBreadcrumbs.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  componentDidMount() {
    this.props.fetchAdDetails(this.props.match.params.id);
    this.props.setCustomNavRenderers({
      center: () => {},
      left: this.renderGoBackAndBreadcrumbs,
    });
  }

  componentDidUpdate(prevProps) {
    if (
        prevProps.data.id !== this.props.data.id ||
        prevProps.data.title !== this.props.data.title
    ) {
      this.props.setCustomNavRenderers({
        center: this.renderTitle,
        left: this.renderGoBackAndBreadcrumbs,
      });
    }
    if (
        this.props.data.mainPhotoPath &&
        prevProps.data.mainPhotoPath !== this.props.data.mainPhotoPath &&
        !this.props.currentPhoto
    ) {
      this.props.updateCurrentPhoto(this.props.data.mainPhotoPath);
    } else if (
        this.props.data.mediaPaths &&
        this.props.data.mediaPaths.length > 0 &&
        !this.props.currentPhoto && !this.props.data.mainPhotoPath
    ) {
      if (!prevProps.data.mediaPaths ||
          prevProps.data.mediaPaths[0] !== this.props.data.mediaPaths[0]
      ) {
        this.props.updateCurrentPhoto(this.props.data.mediaPaths[0]);
      }
    }
  }

  componentWillUnmount() {
    this.props.clearCustomNavRenderers();
  }

  goBack() {
    this.props.history.goBack();
  }

  renderTitle() {
    const { t } = this.props;
    const { title } = this.props.data;
    const locationState = this.props.location && this.props.location.state;

    return (
      <NavbarItem isLogo>
        {title}
        {locationState && locationState.justCreated &&
              ` (${t('app:adDetails:previewMode', 'preview')})`}
      </NavbarItem>
    );
  }

  renderGoBackAndBreadcrumbs() {
    const { t, data } = this.props;

    const goBackButton = (
      <NavbarActionItem clickAction={this.goBack} className={styles.goBackButton}>
        <Icon icon={BACK} />{` ${t('app:common:goBack', 'Go Back')}`}
      </NavbarActionItem>
    );

    if (!data || !data.location || !data.location.city || !data.location.city.id) {
      return <Fragment>{goBackButton}</Fragment>;
    }

    const { city } = data.location;
    const adm1 = city.adm1 || '';
    const cityId = city.id || '';
    const cityName = city.name || '';
    const cityDistrict = city.district || '';

    const adm1SearchRoute = adm1 ? `/ads/?adm1=${adm1}` : '/ads/';
    const citySearchRoute = `/ads/?cty=${cityId}`;
    const cityLabel = cityName + (cityDistrict ? `, ${cityDistrict}` : '');

    return (
      <Fragment>
        {goBackButton}
        {adm1 && cityId && (
          <NavbarItem>
            <Breadcrumbs className="uk-margin-remove">
              <Breadcrumb>
                <RouterButton to={adm1SearchRoute} type={TYPE_LINK}>
                  {adm1}
                </RouterButton>
              </Breadcrumb>
              <Breadcrumb>
                <RouterButton to={citySearchRoute} type={TYPE_LINK}>
                  {cityLabel}
                </RouterButton>
              </Breadcrumb>
            </Breadcrumbs>
          </NavbarItem>
          )}
      </Fragment>
    );
  }

  render() {
    const { t, data, fetchStatus, i18n } = this.props;

    if (fetchStatus.fetching) {
      return (<PageContent>
        <Container>
          <p>{t('app:common:loading', 'Loading...')}</p>
        </Container>
      </PageContent>);
    }

    if (!fetchStatus.loaded && fetchStatus.error && fetchStatus.error.message) {
      return (<PageContent>
        <Container>
          <p>
            {t('app:common:errorLoadingData', 'Error loading data.')}
            {typeof APP_DEV !== 'undefined' && APP_DEV && JSON.stringify(fetchStatus)}
          </p>
        </Container>
      </PageContent>);
    }

    if (!data.id && !fetchStatus.fetching) {
      return (<PageContent>
        <Container>
          <p>{t('app:adDetails:notFound', 'Ad not found.')}</p>
        </Container>
      </PageContent>);
    }

    const {
      title,
      description,
      location,
      price,
      mediaPaths = [],
    } = data;

    const reader = new commonmark.Parser();
    const writer = new commonmark.HtmlRenderer();
    const htmlDescription = description ? writer.render(reader.parse(description)) : '';

    const galleryImages = mediaPaths.map(path => ({
      path: getMediaUrl(path, 'full'),
      thumbPath: getMediaUrl(path, 'xs'),
      fullPath: getMediaUrl(path, 'full'),
      alt: title || t('app:adDetails:imageAlt', 'Ad image'),
    }));

    const amount = price && typeof price.amount === 'number' ? price.amount : null;
    const currency = price && price.currency ? price.currency : null;

    return (
      <PageContent>
        <Container className="uk-margin-medium-top">
          <Grid className="uk-grid-large" data-uk-grid>
            {/* Left Column: Image Gallery and Description */}
            <GridItem className="uk-width-1-1 uk-width-2-3@m">
              {galleryImages.length > 0 && (
                <MediaGallery
                  images={galleryImages}
                  title={title}
                  onImageChange={(imagePath) => {
                    const pathMatch = imagePath.match(/\/api\/media\?p=(?:\/thumbs-\w+)?(.+)/);
                    if (pathMatch && pathMatch[1]) {
                      this.props.updateCurrentPhoto(pathMatch[1]);
                    }
                  }}
                  className="uk-margin-bottom"
                />
                )}

              {description && (
                <div className={classNames(styles.descriptionSection, 'uk-card uk-card-default uk-card-body')}>
                  <h3 className="uk-card-title">{t('app:adDetails:description', 'Description')}</h3>
                  <div dangerouslySetInnerHTML={{ __html: htmlDescription }} />
                </div>
                )}
            </GridItem>

            {/* Right Column: Price, Location Details */}
            <GridItem className="uk-width-1-1 uk-width-1-3@m">
              {amount !== null && currency && (
                <div className={classNames(
                        styles.priceSection,
                        { [styles.arrr]: currency === 'ARRR' },
                        'uk-card uk-card-default uk-card-body uk-margin-bottom',
                    )}
                >
                  <h3 className="uk-card-title">{t('app:adDetails:price', 'Price')}</h3>
                  <p className={classNames(styles.priceValue, 'uk-text-large uk-text-bold')}>
                    {(() => {
                      try {
                        return new Intl.NumberFormat(i18n.language || 'en', { style: 'currency', currency }).format(amount);
                      } catch (e) {
                        if (e instanceof RangeError) {
                          console.info(
                                  `Invalid currency code "${currency}" for price ${amount}. Displaying raw values.`,
                                  e,
                              );
                          return `${amount} ${currency}`;
                        }
                        throw e;
                      }
                    })()}
                  </p>
                  <div className="uk-margin-top uk-button-group">
                    <ActionButton
                      type="primary"
                      size="small"
                      className="uk-margin-right"
                      action={() => console.log('Buy Now button clicked')}
                    >
                      {t('app:adDetails:buyNow', 'Buy Now')}
                    </ActionButton>
                    <ActionButton
                      type="secondary"
                      size="small"
                      action={() => console.log('Add to Cart button clicked')}
                    >
                      {t('app:adDetails:addToCart', 'Add to Cart')}
                    </ActionButton>
                  </div>
                </div>
                )}

              {location && location.city && (
                <div className={classNames(styles.locationSection, 'uk-card uk-card-default uk-card-body')}>
                  <h3 className="uk-card-title">{t('app:adDetails:location', 'Location')}</h3>
                  <ul className="uk-list uk-list-divider">
                    <li>{location.city.name}</li>
                    {location.city.district && <li>{location.city.district}</li>}
                    <li>{`${location.city.adm2}, ${location.city.adm1}`}</li>
                    <li>{location.city.country}</li>
                  </ul>
                  {location.point && location.point.length === 2 && (
                  <a href={`https://www.google.com/maps?q=${location.point[1]},${location.point[0]}`} target="_blank" rel="noopener noreferrer" className="uk-button uk-button-text uk-margin-top">
                    {t('app:adDetails:viewOnMap', 'View on Map')}
                  </a>
                      )}
                </div>
                )}
            </GridItem>
          </Grid>
        </Container>
      </PageContent>
    );
  }
}

AdDetails.propTypes = {
  data: PropTypes.shape(adDetailsPropTypes).isRequired,
  currentPhoto: PropTypes.string, // This will store the raw backend path
  fetchStatus: PropTypes.shape({
    fetching: PropTypes.bool,
    loaded: PropTypes.bool,
    error: PropTypes.object, // Changed to object to allow for error.message
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({
      justCreated: PropTypes.bool,
    }),
  }).isRequired,
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  fetchAdDetails: PropTypes.func.isRequired,
  updateCurrentPhoto: PropTypes.func.isRequired,
  setCustomNavRenderers: PropTypes.func.isRequired,
  clearCustomNavRenderers: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  i18n: PropTypes.shape({
    language: PropTypes.string,
  }),
};

AdDetails.defaultProps = {
  currentPhoto: null,
  i18n: {
    language: 'en',
  },
};

function mapStateToProps(state) {
  return {
    data: state.adDetails.data,
    currentPhoto: state.adDetails.currentPhoto,
    fetchStatus: state.adDetails.fetchStatus,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchAdDetails: adId => dispatch(fetchAdDetails(adId)),
    updateCurrentPhoto: photoPath => dispatch(updateCurrentPhoto(photoPath)),
    setCustomNavRenderers: renderers => dispatch(setCustomNavRenderers(renderers)),
    clearCustomNavRenderers: () => dispatch(clearCustomRenderer()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(translate()(AdDetails)));
