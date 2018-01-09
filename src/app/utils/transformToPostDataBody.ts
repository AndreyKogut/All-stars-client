import * as R from 'ramda';

const transformToPostDataBody = (data: { [key: string]: string | string[] }) => R.pipe(
  R.keys,
  R.reduce((sum: string, key: string) => {
    if (typeof data[key] === 'string') {
      return `${sum}${key}=${data[key]}&`;
    }

    return R.reduce((transformedArray, value) => `${transformedArray}${key}=${value}&` , '', data[key]);
  }, ''),
  R.slice(0, -1),
)(data);

export default transformToPostDataBody;
