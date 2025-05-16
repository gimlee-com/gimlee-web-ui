import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import classNames from 'classnames';

import { Image } from '../Image';
import ActionLink from '../ActionLink';
import { roundedBorder, withPropsPassthrough } from '../_HOC';
import Icon, { icons } from '../Icon';
import Lightbox from '../Lightbox';
import Slider, { SliderItem, PreviousSlideButton, NextSlideButton } from '../Slider';

import styles from './MediaGallery.scss';

const RoundedImage = compose(roundedBorder())(Image);

const MediaGallery = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const handleThumbnailClick = (index) => {
    setActiveIndex(index);
    setIsLightboxOpen(false); // close lightbox if open
    if (props.onImageChange) {
      props.onImageChange(props.images[index].path);
    }
  };

  const openLightbox = () => {
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const handleLightboxSlideChange = (newIndex) => {
    setActiveIndex(newIndex);
    if (props.onImageChange) {
      props.onImageChange(props.images[newIndex].path);
    }
  };

  if (!props.images || props.images.length === 0) {
    return null;
  }

  const activeImage = props.images[activeIndex];

  const lightboxImages = props.images.map((image, index) => ({
    src: image.fullPath || image.path,
    alt: image.alt || props.title || `Image ${index + 1}`,
    caption: image.caption,
  }));

  return (
    <div className={classNames(styles['media-gallery'], props.className)} {...props.passthrough()}>
      {/* Main Image */}
      <div className={styles['media-gallery__main-image']}>
        <ActionLink
          clickAction={openLightbox}
          className={styles['media-gallery__main-image-link']}
        >
          <RoundedImage
            alt={activeImage.alt || props.title || 'Image'}
            srcset={activeImage.path}
            className={styles['media-gallery__main-image-img']}
          />
          <div className={styles['media-gallery__zoom-indicator']}>
            <Icon icon={icons.SEARCH} />
          </div>
        </ActionLink>
      </div>

      {/* Slider for Thumbnails */}
      {props.images.length > 1 && (
        <div className={classNames(styles['media-gallery__thumbnails'], 'uk-position-relative')}>
          <Slider
            className="uk-visible-toggle"
            sets // Enable scrolling sets of thumbnails
            finite
            draggable
            pauseOnHover
          >
            <ul className="uk-slider-items uk-child-width-auto">
              {props.images.map((image, index) => (
                <SliderItem key={image.path}>
                  <ActionLink
                    clickAction={() => handleThumbnailClick(index)}
                    className={classNames(
                      styles['media-gallery__thumbnail-link'],
                      { [styles['media-gallery__thumbnail-link--active']]: index === activeIndex },
                    )}
                  >
                    <RoundedImage
                      alt={image.alt || `Thumbnail ${index + 1}`}
                      srcset={image.thumbPath || image.path}
                      className={styles['media-gallery__thumbnail-img']}
                    />
                  </ActionLink>
                </SliderItem>
              ))}
            </ul>

            {/* Prev/Next Buttons */}
            <PreviousSlideButton className="uk-position-center-left-out uk-hidden-hover" />
            <NextSlideButton className="uk-position-center-right-out uk-hidden-hover" />
          </Slider>
        </div>
      )}

      {/* Lightbox */}
      {isLightboxOpen && (
        <Lightbox
          images={lightboxImages}
          visible={isLightboxOpen}
          activeIndex={activeIndex}
          onClose={closeLightbox}
          onSlideChange={handleLightboxSlideChange}
        />
      )}
    </div>
  );
};

MediaGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      thumbPath: PropTypes.string,
      fullPath: PropTypes.string,
      alt: PropTypes.string,
      caption: PropTypes.string,
    }),
  ).isRequired,
  title: PropTypes.string,
  className: PropTypes.string,
  onImageChange: PropTypes.func,
  passthrough: PropTypes.func.isRequired,
};

MediaGallery.defaultProps = {
  title: '',
  className: null,
  onImageChange: null,
};

export default withPropsPassthrough()(MediaGallery);
