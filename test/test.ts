import { expect } from 'chai';
import { dictonaryReplacer, dictonaryReplacerForLoops, dictonaryReplacer3 } from '../src/main';


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
  it('two variables', () => {
    const dictionary = {
        temp: 'temporary',
        name: 'John Doe'
    };
    const result = dictonaryReplacer(dictionary, '\$temp\$ here comes the name \$name\$');
    expect(result).to.equal('temporary here comes the name John Doe');
  });
  it('two variables without text between', () => {
    const dictionary = {
        temp: 'temporary',
        name: 'John Doe'
    };
    const result = dictonaryReplacer(dictionary, '\$temp\$\$name\$');
    expect(result).to.equal('temporaryJohn Doe');
  });
  it('two variables with text before first variable', () => {
    const dictionary = {
        temp: 'temporary',
        name: 'John Doe'
    };
    const result = dictonaryReplacer(dictionary, 'text before \$temp\$ here comes the name \$name\$');
    expect(result).to.equal('text before temporary here comes the name John Doe');
  });
  it('two variables with text after last variable', () => {
    const dictionary = {
        temp: 'temporary',
        name: 'John Doe'
    };
    const result = dictonaryReplacer3(dictionary, 'text before \$temp\$ here comes the name \$name\$ text after');
    expect(result).to.equal('text before temporary here comes the name John Doe text after');
  });
  it('test timing', () => {
    const dictionary: {[key: string]: string} = {};
    let text = '';
    const num = 20000;
    console.log(num);
    for(let index = 0; index < num; index++) {
        dictionary[`${index}`] = index.toString();
        text += `bla$${index}$bla`;
    }
    console.time('dictonaryReplacer');
    dictonaryReplacer(dictionary, text);
    console.timeEnd('dictonaryReplacer');

    console.time('dictonaryReplacerForLoops');
    dictonaryReplacerForLoops(dictionary, text);
    console.timeEnd('dictonaryReplacerForLoops');
    console.time('dictonaryReplacer3');
    dictonaryReplacer3(dictionary, text);
    console.timeEnd('dictonaryReplacer3');

    expect(true).to.equal(true);
  });
});
