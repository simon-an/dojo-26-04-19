import { expect } from 'chai';
import { dictonaryReplacer } from '../src/main';

describe('tests ', () => {
  it('empty string', () => {
    const dictionary = {};
    const result = dictonaryReplacer(dictionary, '');
    expect(result).to.equal('');
  });
  it('one variable', () => {
    const dictionary = {
        temp: 'temporary'
    };
    const result = dictonaryReplacer(dictionary, '\$temp\$');
    expect(result).to.equal('temporary');
  });
});
