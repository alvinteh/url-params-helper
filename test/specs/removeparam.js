import chai from 'chai';

import { removeParam } from '../../src/index';

chai.expect();

const expect = chai.expect;

describe('removeParam()', () => {
  it('should be a function', () => {
    expect(removeParam).to.be.a('function');
  });

  if (this && this === this.window) {
    it('should default to using the current page\'s URL', () => {
      const url1 = removeParam('a');
      const url2 = removeParam('a', window.location.href);

      expect(url1).to.deep.equal(url2);
    });
  }

  it('should return a URL without the removed parameter', () => {
    const url = removeParam('a', 'http://example?a=x');

    expect(url).to.deep.equal('http://example');
  });

  it('should return a URL without the removed parameter if it does not already exist', () => {
    const url = removeParam('a', 'http://example');

    expect(url).to.deep.equal('http://example');
  });
});
