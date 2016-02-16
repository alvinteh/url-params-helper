import chai from 'chai';

import { getParam } from '../../src/index';

chai.expect();

const expect = chai.expect;

describe('getParam()', () => {
  it('should be a function', () => {
    expect(getParam).to.be.a('function');
  });

  if (this && this === this.window) {
    it('should default to using the current page\'s URL', () => {
      const params1 = getParam('a');
      const params2 = getParam('a', window.location.href);

      expect(params1).to.deep.equal(params2);
    });
  }

  it('should use the supplied URL if available', () => {
    const param = getParam('a', 'http://example?a=1');

    expect(param).to.deep.equal('1');
  });

  it('should return null if the specified parameter does not exist or is empty', () => {
    const param1 = getParam('a', 'http://example');
    const param2 = getParam('a', 'http://example?');
    const param3 = getParam('a', 'http://example?a=');

    expect(param1).to.deep.equal(null);
    expect(param2).to.deep.equal(null);
    expect(param3).to.deep.equal(null);
  });

  it('should return array parameters as an array', () => {
    const param = getParam('a', 'http://example?a[]=x&a[]=y');

    expect(param).to.be.a('array');
    expect(param).to.deep.equal(['x', 'y']);
  });
});
