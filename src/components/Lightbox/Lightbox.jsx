import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import UIkit from 'uikit';
import { withPropsPassthrough } from '../_HOC';

const Lightbox = (props) => {
  const lightboxRef = useRef(null);

  const destroyLightbox = () => {
    if (lightboxRef.current) {
      UIkit.util.off(lightboxRef.current.panel, 'itemshow');
      UIkit.util.off(lightboxRef.current.panel, 'hidden');
      lightboxRef.current.$destroy();
      lightboxRef.current = null;
    }
  };

  useEffect(() => {
    if (props.visible) {
      destroyLightbox();

      const items = props.images.map(image => ({
        source: image.src,
        caption: image.caption,
        type: 'image',
        alt: image.alt || '',
      }));

      const lightbox = UIkit.lightboxPanel({
        items,
        index: props.activeIndex || 0,
        animation: 'slide',
        autoplay: false,
        'video-autoplay': false,
        'pause-on-hover': false,
      });

      lightboxRef.current = lightbox;

      const handleItemShow = () => {
        if (props.onSlideChange) {
          props.onSlideChange(lightbox.index);
        }
      };
      const handleHidden = () => {
        if (props.onClose) {
          props.onClose();
        }
      };

      UIkit.util.on(lightbox.panel, 'itemshow', handleItemShow);
      UIkit.util.on(lightbox.panel, 'hidden', handleHidden);

      lightbox.show(props.activeIndex || 0);
    } else {
      destroyLightbox();
    }
    return () => {
      destroyLightbox();
    };
  }, [props.visible, props.images, props.activeIndex]);

  return null;
};

Lightbox.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
    caption: PropTypes.node,
  })).isRequired,
  visible: PropTypes.bool,
  activeIndex: PropTypes.number,
  onClose: PropTypes.func.isRequired,
  onSlideChange: PropTypes.func,
  passthrough: PropTypes.func.isRequired,
};

Lightbox.defaultProps = {
  visible: false,
  activeIndex: 0,
  onSlideChange: null,
};

export default withPropsPassthrough()(Lightbox);
