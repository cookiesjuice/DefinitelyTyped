import * as R from 'ramda';

() => {
  const get = (prop: string) => (obj: any): any[] => {
    const propVal = obj[prop];
    if (propVal) {
      return [propVal];
    } else {
      return [];
    }
  };

  const getStateCode: (input: any) => any[] = R.composeWith(R.chain, [
    R.compose(
      val => [val],
      R.toUpper,
    ),
    get('state'),
    get('address'),
    get('user'),
  ]);
  getStateCode({ user: { address: { state: 'ny' } } }); // => []
  getStateCode({}); // => []

  const nextThree = (num: number): number[] => [num, num + 1, num + 2];
  const onlyOverNine = (num: number): number[] => (num > 9 ? [num] : []);
  const toString = (input: any): string[] => [`${input}`];
  const split = (input: string): string[] => input.split('');

  const composed: (num: number) => string[] = R.composeWith(R.chain, [
    split,
    toString,
    onlyOverNine,
    nextThree,
  ]);
  const composed2: (num: number) => string[] = R.composeWith(R.chain)([
    split,
    toString,
    onlyOverNine,
    nextThree,
  ]);
};

() => {
  const composeWhileNotNil = R.composeWith((f, res) => R.isNil(res) ? res : f(res));

  composeWhileNotNil([R.inc, R.prop('age')])({age: 1}); // => 2
};
