import React, { PureComponent, createContext } from 'react';
import PropTypes from 'prop-types';
import debounce from 'debounce';

const getViewportWidth = () =>
  Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

const ViewportWidthContext = createContext(getViewportWidth());

export class ViewportWidthProvider extends PureComponent {

  constructor(props) {
    super(props);
    this.resizeHandler = debounce(this.resizeHandler.bind(this), 1000);
    this.state = { viewportWidth: getViewportWidth() };
  }

  componentDidMount() {
    window.addEventListener('resize', this.resizeHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeHandler);
  }

  resizeHandler() { this.setState({ viewportWidth: getViewportWidth() }); }

  render() {
    return (
      <ViewportWidthContext.Provider value={this.state}>
        {this.props.children}
      </ViewportWidthContext.Provider>
    );
  }
}

ViewportWidthProvider.propTypes = {
  children: PropTypes.node,
};

ViewportWidthProvider.defaultProps = {
  children: null,
};

export default function viewportWidthAware() {
  return (WrappedComponent) => {
    class ViewportWidthAware extends PureComponent {
      render() {
        return (
          <ViewportWidthContext.Consumer>
            {({ viewportWidth }) => (
              <WrappedComponent {...this.props} viewportWidth={viewportWidth} />
            )}
          </ViewportWidthContext.Consumer>
        );
      }
    }
    return ViewportWidthAware;
  };
}
