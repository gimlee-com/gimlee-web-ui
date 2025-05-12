import UIkit from 'uikit';

export default (items, index) => {
  UIkit.lightboxPanel({
    animation: 'slide',
    autoplay: false,
    index,
    items,
  }).show();
};
