import chai from 'chai';

import { buildQueryStringURL } from '../../src/index';

chai.expect();

const expect = chai.expect;

describe('buildQueryStringURL()', () => {
  it('should be a function', () => {
    expect(buildQueryStringURL).to.be.a('function');
  });

  if (this && this === this.window) {
    it('should default to using the current page\'s URL', () => {
      const url1 = buildQueryStringURL({ a: 'x' });
      const url2 = buildQueryStringURL({ a: 'x' }, window.location.href);

      expect(url1).to.deep.equal(url2);
    });
  }

  it('should return a URL with the supplied parameters', () => {
    const url = buildQueryStringURL({ a: 'x', b: 'y' }, 'http://example');

    expect(url).to.deep.equal('http://example?a=x&b=y');
  });
});
