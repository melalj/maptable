function appendOptions(select, options, defaultValue) {
  options.forEach((f) => {
    // Filter select
    const option = document.createElement('option');
    option.setAttribute('value', f.value);
    option.innerText = f.text;
    select.appendChild(option);
  });
  select.value = defaultValue;
}

function rangeToBool(el1, range, el2) {
  if (range === '=') {
    return parseInt(el1, 10) === parseInt(el2, 10);
  }
  if (range === '≠') {
    return parseInt(el1, 10) !== parseInt(el2, 10) && el1 !== '' && el2 !== '';
  }
  if (range === '>') {
    return parseInt(el1, 10) > parseInt(el2, 10) && el1 !== '' && el2 !== '';
  }
  if (range === '<') {
    return parseInt(el1, 10) < parseInt(el2, 10) && el1 !== '' && el2 !== '';
  }
  if (range === '≥') {
    return parseInt(el1, 10) >= parseInt(el2, 10) && el1 !== '' && el2 !== '';
  }
  if (range === '≤') {
    return parseInt(el1, 10) <= parseInt(el2, 10) && el1 !== '' && el2 !== '';
  }
  return true;
}

/* eslint no-loop-func: 0 */
function extendRecursive() {
  const dst = {};
  let src;
  const args = [].splice.call(arguments, 0);
  const toString = ({}).toString;

  while (args.length > 0) {
    src = args.splice(0, 1)[0];
    if (toString.call(src) === '[object Object]') {
      Object.keys(src).forEach((p) => {
        if (toString.call(src[p]) === '[object Object]') {
          dst[p] = extendRecursive(dst[p] || {}, src[p]);
        } else {
          dst[p] = src[p];
        }
      });
    }
  }
  return dst;
}

function keyToTile(k) {
  const upperK = k.charAt(0).toUpperCase() + k.slice(1);
  return upperK.replace(/_/g, ' ');
}

function sanitizeKey(k) {
  return k.toLowerCase()
    .replace(/ /g, '_')
    .replace(/"/g, '')
    .replace(/'/g, '');
}

function toNumber(str) {
  if (!str || str === '') return null;
  return Number(str.toString().replace(/[^0-9.]+|\s+/gmi, ''));
}

function quantile(array, percentile) {
  array.sort((a, b) => a - b);
  const index = percentile / 100.0 * (array.length - 1);
  let result;
  if (Math.floor(index) === index) {
    result = array[index];
  } else {
    const i = Math.floor(index);
    const fraction = index - i;
    result = array[i] + (array[i + 1] - array[i]) * fraction;
  }
  return result;
}

export default {
  rangeToBool,
  appendOptions,
  extendRecursive,
  sanitizeKey,
  toNumber,
  keyToTile,
  quantile,
};
