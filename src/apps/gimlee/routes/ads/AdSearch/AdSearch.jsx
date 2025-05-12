import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PageContent from 'gimlee-ui-components/PageContent';
import Container from 'gimlee-ui-components/Container';
import { Grid, GridItem } from 'gimlee-ui-components/Grid';
import { Image } from 'gimlee-ui-components/Image';
import { RouterButton } from 'gimlee-ui-components/Button';
import { Card, CardBody, CardFooter } from 'gimlee-ui-components/Card';
import Section from 'gimlee-ui-components/Section/Section';
import { fetchStatusPropTypes } from 'gimlee-ui-model/api';
import { adDataPropTypes } from './model';
import { fetchAds, setSearch } from './store/adSearch';
import { fromQueryString, searchPropTypes } from './model/search';
import FiltersContainer from './containers/FiltersContainer';
import styles from './AdSearch.scss';

class AdSearch extends PureComponent {
  componentDidMount() {
    fromQueryString(this.props.location.search).then((search) => {
      this.props.setSearch(search);
      this.props.fetchAds(search);
    });
  }

  componentDidUpdate(prevProps) {
    const currentSearchQuery = this.props.location.search;
    if (currentSearchQuery !== prevProps.location.search) {
      fromQueryString(this.props.location.search).then((newSearch) => {
        this.props.setSearch(newSearch);
        this.props.fetchAds(newSearch);
      });
    }
  }

  render() {
    const { data, fetchStatus } = this.props;
    return (
      <PageContent>
        <Section className="uk-padding">
          <FiltersContainer />
        </Section>
        <Container>
          {fetchStatus.fetching && 'LOADING...'}
          <Section className="uk-container uk-container-large">
            <Grid
              nowrap={false}
              className={
                'uk-grid-column-large uk-grid-row-large uk-child-width-1-5@l uk-child-width-1-4@m ' +
                'uk-child-width-1-3@s uk-child-width-1-2 uk-grid-match'
              }
            >
              {data.content.map(ad => (
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
                          { /* invisible canvas makes the perfect square before image load */}
                          <canvas width="500" height="500" />
                          <Image
                            uk-cover=""
                            srcset={
                              `/api/media?p=/thumbs-sm${ad.mainPhotoPath}`
                            }
                            alt="img"
                          />
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
          </Section>
        </Container>
      </PageContent>
    );
  }
}

AdSearch.propTypes = {
  search: PropTypes.shape(searchPropTypes).isRequired,
  data: PropTypes.shape(adDataPropTypes).isRequired,
  fetchStatus: PropTypes.shape(fetchStatusPropTypes).isRequired,
  setSearch: PropTypes.func.isRequired,
  fetchAds: PropTypes.func.isRequired,
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
};

function mapStateToProps(state) {
  return {
    search: state.adSearch.search,
    data: state.adSearch.data,
    fetchStatus: state.adSearch.fetchStatus,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchAds: search => dispatch(fetchAds(search)),
    setSearch: search => dispatch(setSearch(search)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AdSearch));
