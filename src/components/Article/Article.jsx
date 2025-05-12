import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withPropsPassthrough from '../_HOC/withPropsPassthrough';
import './Article.scss';

const Article = props => (
  <article
    className={classNames('uk-article', props.className)}
    {...props.passthrough()}
  >
    { props.title && (<h1 styleName="title" className="uk-article-title">{props.title}</h1>) }
    { props.meta && (<p className="uk-article-meta uk-text-background">{props.meta}</p>) }
    {props.children}
  </article>
);

Article.propTypes = {
  title: PropTypes.node,
  meta: PropTypes.node,
  children: PropTypes.node,
  className: PropTypes.string,
  passthrough: PropTypes.func.isRequired,
};

Article.defaultProps = {
  title: null,
  meta: null,
  children: null,
  className: null,
};

export default withPropsPassthrough(Article);
