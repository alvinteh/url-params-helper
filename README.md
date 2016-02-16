url-params-helper
=========

A JavaScript utility that allows for easy retrieval and manipulation of URL parameters.

Usage
-------

    getParams(
      [pageURL]     String indicating the URL to retrieve parameters from. Defaults to the current page URL.
    )

Returns an object dictionary with key value pairs of URL parameter names and values, or null if there are no
URL parameters.

    getParam(
      param           String indicating the URL parameter name.
      [, pageURL]     String indicating the URL to retrieve parameters from. Defaults to the current page URL.
    )

Returns the value of the specified URL parameter, or null if it does not exist and/or is empty.

    buildQueryString(
      params          Object with key value pairs of URL parameter names and values.
    )

Returns a query string with the specified URL parameters. Null-value parameters will be included in the returned query string, but undefined parameters will not.

    buildQueryStringURL(
      params          Object with key value pairs of URL parameter names and values.
      [, pageURL]     String indicating the URL to retrieve parameters from. Defaults to the current page URL.
    )

Returns a query string URL with the specified URL parameters. Null-value parameters will be included in the returned query string URL, but undefined parameters will not.

    removeParam(
      param           String indicating the URL parameter name.
      [, pageURL]     String indicating the URL to retrieve parameters from. Defaults to the current page URL.
    )

Returns a URL with the specified URL parameter removed.

    replaceParam(
      param,          String indicating the URL parameter name.
      value           Mixed value for the URL parameter.
      [, pageURL]     String indicating the URL to retrieve parameters from. Defaults to the current page URL.
    )

Returns a URL with the specified URL parameter replaced. If the URL parameter does not already exist, it will be set.

License
-------
Copyright 2016 Alvin Teh.
Licensed under the MIT license.
