import * as R from 'ramda';

const transformToPostDataBody = (data: { [key: string]: string }) => R.pipe(
  R.keys,
  R.reduce((sum: string, key: string) => `${sum}${key}=${data[key]}&`, ''),
  R.slice(0, -1),
)(data);

export default transformToPostDataBody;
