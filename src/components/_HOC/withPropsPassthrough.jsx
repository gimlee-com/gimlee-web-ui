import React, { PureComponent, forwardRef } from 'react';
import except from 'except';

export default function withPropsPassthrough() {
  return (WrappedComponent) => {
    const omit = [...Object.keys(WrappedComponent.propTypes || {}), 'forwardedRef'];

    class WithPropsPassthrough extends PureComponent {
      render() {
        const { forwardedRef } = this.props;
        return (
          <WrappedComponent
            {...except(this.props, 'forwardedRef')}
            ref={forwardedRef}
            passthrough={(customOmitKeys = []) => except(this.props, omit.concat(customOmitKeys))}
          />
        );
      }
    }

    WithPropsPassthrough.propTypes = except(WrappedComponent.propTypes, 'passthrough');

    return forwardRef((props, ref) => <WithPropsPassthrough {...props} forwardedRef={ref} />);
  };
}
