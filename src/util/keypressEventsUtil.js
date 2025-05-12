function getKeyCodeFromEvent(e) {
  return e.key || e.keyCode;
}

export function isSpace(e) {
  const key = getKeyCodeFromEvent(e);

  if (e.ctrlKey || e.altKey) {
    return false;
  }

  return key === ' ' || key === 32;
}

export function isEnter(e) {
  const key = getKeyCodeFromEvent(e);

  if (e.ctrlKey || e.altKey) {
    return false;
  }

  return key === 'Enter' || key === 13;
}

export function isAlphaNumeric(e) {
  const key = getKeyCodeFromEvent(e);

  if (e.ctrlKey) {
    return false;
  }

  return (
    [
      'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
      'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
      'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
      'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
      '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    ].indexOf(key) >= 0
  );
}
