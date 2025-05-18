import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withPropsPassthrough from '../_HOC/withPropsPassthrough';

const Pagination = (props) => {
  const {
    className,
    align,
    items,
    activePage,
    onPageChange,
    hasNext,
    hasPrevious,
    onNext,
    onPrevious,
    ...otherProps
  } = props;

  const classes = classNames(
    'uk-pagination',
    {
      'uk-flex-center': align === 'center',
      'uk-flex-right': align === 'right',
    },
    className,
  );

  return (
    <ul className={classes} {...otherProps.passthrough()}>
      {hasPrevious && (
        <li>
          <a
            role={'button'}
            tabIndex={0}
            onClick={(e) => { e.preventDefault(); onPrevious(); }}
          >
            <span uk-pagination-previous />
          </a>
        </li>
      )}

      {items.map((item, index) => {
        const isActive = index + 1 === activePage;
        if (item === '...') {
          return (
            <li key={`ellipsis-${item}`} className="uk-disabled">
              <span>...</span>
            </li>
          );
        }

        return (
          <li key={item} className={isActive ? 'uk-active' : null}>
            {isActive ? (
              <span>{item}</span>
            ) : (
              <a
                role={'button'}
                tabIndex="0"
                onClick={(e) => { e.preventDefault(); onPageChange(index + 1); }}
              >
                {item}
              </a>
            )}
          </li>
        );
      })}

      {hasNext && (
        <li>
          <a
            role="button"
            tabIndex={0}
            onClick={(e) => { e.preventDefault(); onNext(); }}
          >
            <span uk-pagination-next />
          </a>
        </li>
      )}
    </ul>
  );
};

Pagination.propTypes = {
  className: PropTypes.string,
  align: PropTypes.oneOf(['left', 'center', 'right']),
  items: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
  activePage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  hasNext: PropTypes.bool,
  hasPrevious: PropTypes.bool,
  onNext: PropTypes.func,
  onPrevious: PropTypes.func,
  passthrough: PropTypes.func.isRequired,
};

Pagination.defaultProps = {
  className: null,
  align: 'left',
  hasNext: false,
  hasPrevious: false,
  onNext: () => {},
  onPrevious: () => {},
};

export default withPropsPassthrough()(Pagination);
