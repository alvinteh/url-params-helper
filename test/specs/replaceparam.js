import chai from 'chai';

import { replaceParam } from '../../src/index';

chai.expect();

const expect = chai.expect;

describe('replaceParam()', () => {
  it('should be a function', () => {
    expect(replaceParam).to.be.a('function');
  });

  if (this && this === this.window) {
    it('should default to using the current page\'s URL', () => {
      const url1 = replaceParam('a', 'x');
      const url2 = replaceParam('a', 'x', window.location.href);

      expect(url1).to.deep.equal(url2);
    });
  }

  it('should return a URL with the replaced parameter', () => {
    const url = replaceParam('a', 'x', 'http://example?a=y');

    expect(url).to.deep.equal('http://example?a=x');
  });

  it('should return a URL with the replaced parameter if it does not already exist', () => {
    const url = replaceParam('a', 'x', 'http://example');

    expect(url).to.deep.equal('http://example?a=x');
  });
});
