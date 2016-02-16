import chai from 'chai';

import { buildQueryString } from '../../src/index';

chai.expect();

const expect = chai.expect;

describe('buildQueryString()', () => {
  it('should be a function', () => {
    expect(buildQueryString).to.be.a('function');
  });

  it('should return a query string with the supplied parameters', () => {
    const qs = buildQueryString({ a: 'x', b: 'y' });

    expect(qs).to.deep.equal('a=x&b=y');
  });

  it('should correctly handle array parameters', () => {
    const qs1 = buildQueryString({ a: ['x', 'y'] });
    const qs2 = buildQueryString({ a: ['x', undefined, 'y'] });

    expect(qs1).to.deep.equal('a[]=x&a[]=y');
    expect(qs2).to.deep.equal('a[]=x&a[]=&a[]=y');
  });

  it('should return a query string with parameters URL-encoded where applicable', () => {
    const qs = buildQueryString({ a: 'value with &' });

    expect(qs).to.deep.equal('a=value%20with%20%26');
  });

  it('should return a query string including null/empty parameters where applicable', () => {
    const qs1 = buildQueryString({ a: 'x', b: null });
    const qs2 = buildQueryString({ a: 'x', b: '' });

    expect(qs1).to.deep.equal('a=x&b=');
    expect(qs2).to.deep.equal('a=x&b=');
  });

  it('should return a query string excluding undefined parameters where applicable', () => {
    const qs = buildQueryString({ a: 'x', b: undefined });

    expect(qs).to.deep.equal('a=x');
  });
});
