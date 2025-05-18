import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import classNames from 'classnames';
import api from 'gimlee-ui-service/api';
import PageContent from 'gimlee-ui-components/PageContent';
import Section from 'gimlee-ui-components/Section/Section';
import { Card, CardBody, CardFooter } from 'gimlee-ui-components/Card';
import { Image } from 'gimlee-ui-components/Image';
import { Grid, GridItem } from 'gimlee-ui-components/Grid';
import { RouterButton } from 'gimlee-ui-components/Button';
import Overlay, { TYPE_PRIMARY } from 'gimlee-ui-components/Overlay/Overlay';
import styles from './Home.scss';

class Home extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      featuredAds: [],
    };
  }

  componentDidMount() {
    api.get('/api/ads/featured').then((response) => {
      this.setState({
        featuredAds: response.data.content,
      });
    });
  }

  render() {
    const { featuredAds } = this.state;
    const { t } = this.props;
    return (
      <PageContent className={styles.pageContent}>
        <Section
          className={classNames(
            styles.sectionHeading,
            'uk-background-blend-darken uk-height-large uk-padding-remove',
            'uk-flex uk-flex-middle uk-flex-center',
          )}
        >
          <div className="uk-position-relative uk-flex-1 uk-flex" style={{ alignSelf: 'stretch' }}>
            <Overlay type={TYPE_PRIMARY} className={classNames('uk-position-cover', styles.headingOverlay)} />
            <div
              className="uk-flex uk-flex-center uk-position-z-index uk-flex-1"
              style={{ alignSelf: 'center' }}
            >
              <div className={classNames('uk-flex uk-flex-column', styles.headingContainer)}>
                <h1 className="uk-light">
                  {t('app:home:title')}
                </h1>
              </div>
            </div>
          </div>
        </Section>

        <Section className={`${styles.sectionContent} uk-container uk-container-large`}>
          <Fragment>
            <h3>{t('app:home:ads:newest')}</h3>
            <Grid
              nowrap={false}
              className={
                  'uk-grid-column-large uk-grid-row-large uk-child-width-1-5@l uk-child-width-1-4@m ' +
                  'uk-child-width-1-3@s uk-child-width-1-2 uk-grid-match'
                }
            >
              {featuredAds.map(ad => (
                <GridItem key={ad.id}>
                  <RouterButton
                    to={`/ad/${ad.id}`}
                    className={
                        `${styles.cardButton} uk-box-shadow-medium uk-box-shadow-hover-large 
                    uk-padding-remove uk-border-rounded uk-text-left`
                      }
                  >
                    <Card
                      className={
                          'uk-overflow-hidden uk-width-expand uk-border-rounded'
                        }
                    >
                      <CardBody className="uk-padding-remove">
                        <div className="uk-cover-container">
                          { /* invisible canvas makes the perfect square before image load */ }
                          <canvas width="500" height="500" />
                          {ad.mainPhotoPath ? (
                            <Image
                              uk-cover=""
                              srcset={`/api/media?p=/thumbs-sm${ad.mainPhotoPath}`}
                              alt="img"
                            />
                          ) : (
                            <div className="uk-cover">
                              <span>No Image</span> {/* Placeholder text */}
                            </div>
                          )}
                        </div>
                      </CardBody>

                      <CardFooter className="uk-padding-small">
                        <article className="uk-text-truncate uk-flex">
                          <span className="uk-flex-1">{ad.title}</span>
                        </article>
                      </CardFooter>
                    </Card>
                  </RouterButton>
                </GridItem>
                ))}
            </Grid>
          </Fragment>
        </Section>
      </PageContent>
    );
  }
}

Home.propTypes = {
  t: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    canCreateEvents: state.loginSession.user.roles.indexOf('USER') >= 0,
  };
}

export default connect(mapStateToProps)(translate()(Home));
