export function getParams(pageURL) {
  const url = pageURL || window.location.href;
  const queryString = url.split('?')[1];
  const rawParams = typeof queryString === 'string' && queryString.length > 0 ?
    queryString.split('&') : '';
  const params = {};

  for (let i = 0; i < rawParams.length; i++) {
    const rawParam = rawParams[i];
    const param = rawParam.split('=');
    let paramName = param[0];
    const paramValue = param[1];

    if (paramName.indexOf('[]') === -1) {
      // Handle literal params
      if (paramValue && paramValue !== '') {
        params[paramName] = decodeURIComponent(paramValue);
      }
    }
    else {
      // Handle array params
      paramName = paramName.replace(/[\[|\]]/g, '');

      if (params[paramName] === undefined) {
        params[paramName] = [];
      }

      params[paramName].push(decodeURIComponent(paramValue));
    }
  }

  return Object.keys(params).length > 0 ? params : null;
}

export function getParam(param, pageURL) {
  const params = getParams(pageURL);

  return params ? params[param] : null;
}

export function buildQueryString(params) {
  const queryString = [];

  for (const param in params) {
    if (params.hasOwnProperty(param)) {
      const paramName = encodeURIComponent(param);
      const paramValue = params[param];

      if (paramValue !== undefined) {
        if (paramValue instanceof Array) {
          /* eslint-disable no-loop-func */
          paramValue.map((v) => {
            queryString.push(paramName + '[]=' +
              (v === undefined || v === null ? '' : encodeURIComponent(v)));
          });
        }
        else {
          queryString.push(paramName + '=' +
            (paramValue === null ? '' : encodeURIComponent(paramValue)));
        }
      }
    }
  }

  return queryString.join('&');
}

export function buildQueryStringURL(params, pageURL) {
  const url = (pageURL || window.location.href).split('?')[0];

  const queryString = buildQueryString(params);

  return url + (queryString.length > 0 ? '?' + queryString : '');
}

export function replaceParam(param, value, pageURL) {
  const params = getParams(pageURL) || {};

  params[param] = value;

  return buildQueryStringURL(params, pageURL);
}

export function removeParam(param, pageURL) {
  const params = getParams(pageURL) || {};

  delete params[param];

  return buildQueryStringURL(params, pageURL);
}
