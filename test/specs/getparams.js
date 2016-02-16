import chai from 'chai';

import { getParams } from '../../src/index';

chai.expect();

const expect = chai.expect;

describe('getParams()', () => {
  it('should be a function', () => {
    expect(getParams).to.be.a('function');
  });

  if (this && this === this.window) {
    it('should default to using the current page\'s URL', () => {
      const params1 = getParams();
      const params2 = getParams(window.location.href);

      expect(params1).to.deep.equal(params2);
    });
  }

  it('should use the supplied URL if available', () => {
    const params = getParams('http://example?a=1&b=2');

    expect(params).to.deep.equal({ a: '1', b: '2' });
  });

  it('should return all URL parameters as an object', () => {
    const params = getParams('http://example?a=1&b=2');

    expect(params).to.be.a('object');
  });

  it('should return null if there are no non-null URL parameters', () => {
    const params1 = getParams('http://example');
    const params2 = getParams('http://example?');
    const params3 = getParams('http://example?a=');

    expect(params1).to.deep.equal(null);
    expect(params2).to.deep.equal(null);
    expect(params3).to.deep.equal(null);
  });

  it('should return array parameters as an array', () => {
    const params = getParams('http://example?a[]=x&a[]=y');

    expect(params.a).to.be.a('array');
    expect(params.a).to.deep.equal(['x', 'y']);
  });
});
