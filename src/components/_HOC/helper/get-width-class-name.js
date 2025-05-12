import {
  TYPE_AUTO,
  TYPE_EXPAND, TYPE_FIXED,
  TYPE_FRACTION,
} from './width-constants';

export default function getWidthClassName(classNamePrefix, widthProps) {
  let widthProp;
  switch (widthProps.widthType) {
    case TYPE_AUTO:
    case TYPE_EXPAND:
      widthProp = widthProps.widthType;
      break;
    case TYPE_FIXED:
      widthProp = widthProps.size;
      break;
    case TYPE_FRACTION:
      widthProp = `${widthProps.fraction.nominator}-${widthProps.fraction.denominator}`;
      break;
    default:
      widthProp = TYPE_EXPAND;
  }

  const viewportSizeSuffix = widthProps.viewportSize ? widthProps.viewportSize : '';

  return classNamePrefix + widthProp + viewportSizeSuffix;
}
