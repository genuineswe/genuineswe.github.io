exports.id = "component---src-pages-index-jsxhead";
exports.ids = ["component---src-pages-index-jsxhead"];
exports.modules = {

/***/ "./.cache/context-utils.js":
/*!*********************************!*\
  !*** ./.cache/context-utils.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createServerOrClientContext: () => (/* binding */ createServerOrClientContext)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


// Ensure serverContext is not created more than once as React will throw when creating it more than once
// https://github.com/facebook/react/blob/dd2d6522754f52c70d02c51db25eb7cbd5d1c8eb/packages/react/src/ReactServerContext.js#L101
const createServerContext = (name, defaultValue = null) => {
  /* eslint-disable no-undef */
  if (!globalThis.__SERVER_CONTEXT) {
    globalThis.__SERVER_CONTEXT = {};
  }
  if (!globalThis.__SERVER_CONTEXT[name]) {
    globalThis.__SERVER_CONTEXT[name] = react__WEBPACK_IMPORTED_MODULE_0___default().createServerContext(name, defaultValue);
  }
  return globalThis.__SERVER_CONTEXT[name];
};
function createServerOrClientContext(name, defaultValue) {
  if ((react__WEBPACK_IMPORTED_MODULE_0___default().createServerContext)) {
    return createServerContext(name, defaultValue);
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createContext(defaultValue);
}


/***/ }),

/***/ "./.cache/emitter.js":
/*!***************************!*\
  !*** ./.cache/emitter.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var mitt__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mitt */ "./node_modules/mitt/dist/mitt.es.js");

const emitter = (0,mitt__WEBPACK_IMPORTED_MODULE_0__["default"])();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (emitter);

/***/ }),

/***/ "./.cache/find-path.js":
/*!*****************************!*\
  !*** ./.cache/find-path.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cleanPath: () => (/* binding */ cleanPath),
/* harmony export */   findMatchPath: () => (/* binding */ findMatchPath),
/* harmony export */   findPath: () => (/* binding */ findPath),
/* harmony export */   grabMatchParams: () => (/* binding */ grabMatchParams),
/* harmony export */   setMatchPaths: () => (/* binding */ setMatchPaths)
/* harmony export */ });
/* harmony import */ var _gatsbyjs_reach_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @gatsbyjs/reach-router */ "./node_modules/@gatsbyjs/reach-router/dist/index.modern.mjs");
/* harmony import */ var _strip_prefix__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./strip-prefix */ "./.cache/strip-prefix.js");
/* harmony import */ var _normalize_page_path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./normalize-page-path */ "./.cache/normalize-page-path.js");
/* harmony import */ var _redirect_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./redirect-utils.js */ "./.cache/redirect-utils.js");




const pathCache = new Map();
let matchPaths = [];
const trimPathname = rawPathname => {
  let newRawPathname = rawPathname;
  const queryIndex = rawPathname.indexOf(`?`);
  if (queryIndex !== -1) {
    const [path, qs] = rawPathname.split(`?`);
    newRawPathname = `${path}?${encodeURIComponent(qs)}`;
  }
  const pathname = decodeURIComponent(newRawPathname);

  // Remove the pathPrefix from the pathname.
  const trimmedPathname = (0,_strip_prefix__WEBPACK_IMPORTED_MODULE_1__["default"])(pathname, decodeURIComponent(""))
  // Remove any hashfragment
  .split(`#`)[0];
  return trimmedPathname;
};
function absolutify(path) {
  // If it's already absolute, return as-is
  if (path.startsWith(`/`) || path.startsWith(`https://`) || path.startsWith(`http://`)) {
    return path;
  }
  // Calculate path relative to current location, adding a trailing slash to
  // match behavior of @reach/router
  return new URL(path, window.location.href + (window.location.href.endsWith(`/`) ? `` : `/`)).pathname;
}

/**
 * Set list of matchPaths
 *
 * @param {Array<{path: string, matchPath: string}>} value collection of matchPaths
 */
const setMatchPaths = value => {
  matchPaths = value;
};

/**
 * Return a matchpath url
 * if `match-paths.json` contains `{ "/foo*": "/page1", ...}`, then
 * `/foo?bar=far` => `/page1`
 *
 * @param {string} rawPathname A raw pathname
 * @return {string|null}
 */
const findMatchPath = rawPathname => {
  const trimmedPathname = cleanPath(rawPathname);
  const pickPaths = matchPaths.map(({
    path,
    matchPath
  }) => {
    return {
      path: matchPath,
      originalPath: path
    };
  });
  const path = (0,_gatsbyjs_reach_router__WEBPACK_IMPORTED_MODULE_0__.pick)(pickPaths, trimmedPathname);
  if (path) {
    return (0,_normalize_page_path__WEBPACK_IMPORTED_MODULE_2__["default"])(path.route.originalPath);
  }
  return null;
};

/**
 * Return a matchpath params from reach/router rules
 * if `match-paths.json` contains `{ ":bar/*foo" }`, and the path is /baz/zaz/zoo
 * then it returns
 *  { bar: baz, foo: zaz/zoo }
 *
 * @param {string} rawPathname A raw pathname
 * @return {object}
 */
const grabMatchParams = rawPathname => {
  const trimmedPathname = cleanPath(rawPathname);
  const pickPaths = matchPaths.map(({
    path,
    matchPath
  }) => {
    return {
      path: matchPath,
      originalPath: path
    };
  });
  const path = (0,_gatsbyjs_reach_router__WEBPACK_IMPORTED_MODULE_0__.pick)(pickPaths, trimmedPathname);
  if (path) {
    return path.params;
  }
  return {};
};

// Given a raw URL path, returns the cleaned version of it (trim off
// `#` and query params), or if it matches an entry in
// `match-paths.json`, its matched path is returned
//
// E.g. `/foo?bar=far` => `/foo`
//
// Or if `match-paths.json` contains `{ "/foo*": "/page1", ...}`, then
// `/foo?bar=far` => `/page1`
const findPath = rawPathname => {
  const trimmedPathname = trimPathname(absolutify(rawPathname));
  if (pathCache.has(trimmedPathname)) {
    return pathCache.get(trimmedPathname);
  }
  const redirect = (0,_redirect_utils_js__WEBPACK_IMPORTED_MODULE_3__.maybeGetBrowserRedirect)(rawPathname);
  if (redirect) {
    return findPath(redirect.toPath);
  }
  let foundPath = findMatchPath(trimmedPathname);
  if (!foundPath) {
    foundPath = cleanPath(rawPathname);
  }
  pathCache.set(trimmedPathname, foundPath);
  return foundPath;
};

/**
 * Clean a url and converts /index.html => /
 * E.g. `/foo?bar=far` => `/foo`
 *
 * @param {string} rawPathname A raw pathname
 * @return {string}
 */
const cleanPath = rawPathname => {
  const trimmedPathname = trimPathname(absolutify(rawPathname));
  let foundPath = trimmedPathname;
  if (foundPath === `/index.html`) {
    foundPath = `/`;
  }
  foundPath = (0,_normalize_page_path__WEBPACK_IMPORTED_MODULE_2__["default"])(foundPath);
  return foundPath;
};

/***/ }),

/***/ "./.cache/gatsby-browser-entry.js":
/*!****************************************!*\
  !*** ./.cache/gatsby-browser-entry.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Link: () => (/* reexport safe */ gatsby_link__WEBPACK_IMPORTED_MODULE_3__.Link),
/* harmony export */   PageRenderer: () => (/* reexport default from dynamic */ _public_page_renderer__WEBPACK_IMPORTED_MODULE_1___default.a),
/* harmony export */   Script: () => (/* reexport safe */ gatsby_script__WEBPACK_IMPORTED_MODULE_6__.Script),
/* harmony export */   ScriptStrategy: () => (/* reexport safe */ gatsby_script__WEBPACK_IMPORTED_MODULE_6__.ScriptStrategy),
/* harmony export */   Slice: () => (/* reexport safe */ _slice__WEBPACK_IMPORTED_MODULE_5__.Slice),
/* harmony export */   StaticQuery: () => (/* reexport safe */ _static_query__WEBPACK_IMPORTED_MODULE_4__.StaticQuery),
/* harmony export */   StaticQueryContext: () => (/* reexport safe */ _static_query__WEBPACK_IMPORTED_MODULE_4__.StaticQueryContext),
/* harmony export */   collectedScriptsByPage: () => (/* reexport safe */ gatsby_script__WEBPACK_IMPORTED_MODULE_6__.collectedScriptsByPage),
/* harmony export */   graphql: () => (/* binding */ graphql),
/* harmony export */   navigate: () => (/* reexport safe */ gatsby_link__WEBPACK_IMPORTED_MODULE_3__.navigate),
/* harmony export */   parsePath: () => (/* reexport safe */ gatsby_link__WEBPACK_IMPORTED_MODULE_3__.parsePath),
/* harmony export */   prefetchPathname: () => (/* binding */ prefetchPathname),
/* harmony export */   scriptCache: () => (/* reexport safe */ gatsby_script__WEBPACK_IMPORTED_MODULE_6__.scriptCache),
/* harmony export */   scriptCallbackCache: () => (/* reexport safe */ gatsby_script__WEBPACK_IMPORTED_MODULE_6__.scriptCallbackCache),
/* harmony export */   useScrollRestoration: () => (/* reexport safe */ gatsby_react_router_scroll__WEBPACK_IMPORTED_MODULE_2__.useScrollRestoration),
/* harmony export */   useStaticQuery: () => (/* reexport safe */ _static_query__WEBPACK_IMPORTED_MODULE_4__.useStaticQuery),
/* harmony export */   withAssetPrefix: () => (/* reexport safe */ gatsby_link__WEBPACK_IMPORTED_MODULE_3__.withAssetPrefix),
/* harmony export */   withPrefix: () => (/* reexport safe */ gatsby_link__WEBPACK_IMPORTED_MODULE_3__.withPrefix)
/* harmony export */ });
/* harmony import */ var _loader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./loader */ "./.cache/loader.js");
/* harmony import */ var _public_page_renderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./public-page-renderer */ "./.cache/public-page-renderer.js");
/* harmony import */ var _public_page_renderer__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_public_page_renderer__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var gatsby_react_router_scroll__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! gatsby-react-router-scroll */ "./node_modules/gatsby-react-router-scroll/index.js");
/* harmony import */ var gatsby_link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! gatsby-link */ "./node_modules/gatsby-link/dist/index.modern.mjs");
/* harmony import */ var _static_query__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./static-query */ "./.cache/static-query.js");
/* harmony import */ var _slice__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./slice */ "./.cache/slice.js");
/* harmony import */ var gatsby_script__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! gatsby-script */ "./node_modules/gatsby-script/dist/index.modern.mjs");

const prefetchPathname = _loader__WEBPACK_IMPORTED_MODULE_0__["default"].enqueue;
function graphql() {
  throw new Error(`It appears like Gatsby is misconfigured. Gatsby related \`graphql\` calls ` + `are supposed to only be evaluated at compile time, and then compiled away. ` + `Unfortunately, something went wrong and the query was left in the compiled code.\n\n` + `Unless your site has a complex or custom babel/Gatsby configuration this is likely a bug in Gatsby.`);
}








/***/ }),

/***/ "./.cache/loader.js":
/*!**************************!*\
  !*** ./.cache/loader.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BaseLoader: () => (/* binding */ BaseLoader),
/* harmony export */   PageResourceStatus: () => (/* binding */ PageResourceStatus),
/* harmony export */   ProdLoader: () => (/* binding */ ProdLoader),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   getSliceResults: () => (/* binding */ getSliceResults),
/* harmony export */   getStaticQueryResults: () => (/* binding */ getStaticQueryResults),
/* harmony export */   publicLoader: () => (/* binding */ publicLoader),
/* harmony export */   setLoader: () => (/* binding */ setLoader)
/* harmony export */ });
/* harmony import */ var _prefetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./prefetch */ "./.cache/prefetch.js");
/* harmony import */ var _emitter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./emitter */ "./.cache/emitter.js");
/* harmony import */ var _find_path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./find-path */ "./.cache/find-path.js");




/**
 * Available resource loading statuses
 */
const PageResourceStatus = {
  /**
   * At least one of critical resources failed to load
   */
  Error: `error`,
  /**
   * Resources loaded successfully
   */
  Success: `success`
};
const preferDefault = m => m && m.default || m;
const stripSurroundingSlashes = s => {
  s = s[0] === `/` ? s.slice(1) : s;
  s = s.endsWith(`/`) ? s.slice(0, -1) : s;
  return s;
};
const createPageDataUrl = rawPath => {
  const [path, maybeSearch] = rawPath.split(`?`);
  const fixedPath = path === `/` ? `index` : stripSurroundingSlashes(path);
  return `${""}/page-data/${fixedPath}/page-data.json${maybeSearch ? `?${maybeSearch}` : ``}`;
};

/**
 * Utility to check the path that goes into doFetch for e.g. potential malicious intentions.
 * It checks for "//" because with this you could do a fetch request to a different domain.
 */
const shouldAbortFetch = rawPath => rawPath.startsWith(`//`);
function doFetch(url, method = `GET`) {
  return new Promise(resolve => {
    const req = new XMLHttpRequest();
    req.open(method, url, true);
    req.onreadystatechange = () => {
      if (req.readyState == 4) {
        resolve(req);
      }
    };
    req.send(null);
  });
}
const doesConnectionSupportPrefetch = () => {
  if (`connection` in navigator && typeof navigator.connection !== `undefined`) {
    if ((navigator.connection.effectiveType || ``).includes(`2g`)) {
      return false;
    }
    if (navigator.connection.saveData) {
      return false;
    }
  }
  return true;
};

// Regex that matches common search crawlers
const BOT_REGEX = /bot|crawler|spider|crawling/i;
const toPageResources = (pageData, component = null, head) => {
  var _pageData$slicesMap;
  const page = {
    componentChunkName: pageData.componentChunkName,
    path: pageData.path,
    webpackCompilationHash: pageData.webpackCompilationHash,
    matchPath: pageData.matchPath,
    staticQueryHashes: pageData.staticQueryHashes,
    getServerDataError: pageData.getServerDataError,
    slicesMap: (_pageData$slicesMap = pageData.slicesMap) !== null && _pageData$slicesMap !== void 0 ? _pageData$slicesMap : {}
  };
  return {
    component,
    head,
    json: pageData.result,
    page
  };
};
function waitForResponse(response) {
  return new Promise(resolve => {
    try {
      const result = response.readRoot();
      resolve(result);
    } catch (err) {
      if (Object.hasOwnProperty.call(err, `_response`) && Object.hasOwnProperty.call(err, `_status`)) {
        setTimeout(() => {
          waitForResponse(response).then(resolve);
        }, 200);
      } else {
        throw err;
      }
    }
  });
}
class BaseLoader {
  constructor(loadComponent, matchPaths) {
    this.inFlightNetworkRequests = new Map();
    // Map of pagePath -> Page. Where Page is an object with: {
    //   status: PageResourceStatus.Success || PageResourceStatus.Error,
    //   payload: PageResources, // undefined if PageResourceStatus.Error
    // }
    // PageResources is {
    //   component,
    //   json: pageData.result,
    //   page: {
    //     componentChunkName,
    //     path,
    //     webpackCompilationHash,
    //     staticQueryHashes
    //   },
    //   staticQueryResults
    // }
    this.pageDb = new Map();
    this.inFlightDb = new Map();
    this.staticQueryDb = {};
    this.pageDataDb = new Map();
    this.partialHydrationDb = new Map();
    this.slicesDataDb = new Map();
    this.sliceInflightDb = new Map();
    this.slicesDb = new Map();
    this.isPrefetchQueueRunning = false;
    this.prefetchQueued = [];
    this.prefetchTriggered = new Set();
    this.prefetchCompleted = new Set();
    this.loadComponent = loadComponent;
    (0,_find_path__WEBPACK_IMPORTED_MODULE_2__.setMatchPaths)(matchPaths);
  }
  memoizedGet(url) {
    let inFlightPromise = this.inFlightNetworkRequests.get(url);
    if (!inFlightPromise) {
      inFlightPromise = doFetch(url, `GET`);
      this.inFlightNetworkRequests.set(url, inFlightPromise);
    }

    // Prefer duplication with then + catch over .finally to prevent problems in ie11 + firefox
    return inFlightPromise.then(response => {
      this.inFlightNetworkRequests.delete(url);
      return response;
    }).catch(err => {
      this.inFlightNetworkRequests.delete(url);
      throw err;
    });
  }
  setApiRunner(apiRunner) {
    this.apiRunner = apiRunner;
    this.prefetchDisabled = apiRunner(`disableCorePrefetching`).some(a => a);
  }
  fetchPageDataJson(loadObj) {
    const {
      pagePath,
      retries = 0
    } = loadObj;
    const url = createPageDataUrl(pagePath);
    return this.memoizedGet(url).then(req => {
      const {
        status,
        responseText
      } = req;

      // Handle 200
      if (status === 200) {
        try {
          const jsonPayload = JSON.parse(responseText);
          if (jsonPayload.path === undefined) {
            throw new Error(`not a valid pageData response`);
          }
          const maybeSearch = pagePath.split(`?`)[1];
          if (maybeSearch && !jsonPayload.path.includes(maybeSearch)) {
            jsonPayload.path += `?${maybeSearch}`;
          }
          return Object.assign(loadObj, {
            status: PageResourceStatus.Success,
            payload: jsonPayload
          });
        } catch (err) {
          // continue regardless of error
        }
      }

      // Handle 404
      if (status === 404 || status === 200) {
        // If the request was for a 404/500 page and it doesn't exist, we're done
        if (pagePath === `/404.html` || pagePath === `/500.html`) {
          return Object.assign(loadObj, {
            status: PageResourceStatus.Error
          });
        }

        // Need some code here to cache the 404 request. In case
        // multiple loadPageDataJsons result in 404s
        return this.fetchPageDataJson(Object.assign(loadObj, {
          pagePath: `/404.html`,
          notFound: true
        }));
      }

      // handle 500 response (Unrecoverable)
      if (status === 500) {
        return this.fetchPageDataJson(Object.assign(loadObj, {
          pagePath: `/500.html`,
          internalServerError: true
        }));
      }

      // Handle everything else, including status === 0, and 503s. Should retry
      if (retries < 3) {
        return this.fetchPageDataJson(Object.assign(loadObj, {
          retries: retries + 1
        }));
      }

      // Retried 3 times already, result is an error.
      return Object.assign(loadObj, {
        status: PageResourceStatus.Error
      });
    });
  }
  fetchPartialHydrationJson(loadObj) {
    const {
      pagePath,
      retries = 0
    } = loadObj;
    const url = createPageDataUrl(pagePath).replace(`.json`, `-rsc.json`);
    return this.memoizedGet(url).then(req => {
      const {
        status,
        responseText
      } = req;

      // Handle 200
      if (status === 200) {
        try {
          return Object.assign(loadObj, {
            status: PageResourceStatus.Success,
            payload: responseText
          });
        } catch (err) {
          // continue regardless of error
        }
      }

      // Handle 404
      if (status === 404 || status === 200) {
        // If the request was for a 404/500 page and it doesn't exist, we're done
        if (pagePath === `/404.html` || pagePath === `/500.html`) {
          return Object.assign(loadObj, {
            status: PageResourceStatus.Error
          });
        }

        // Need some code here to cache the 404 request. In case
        // multiple loadPageDataJsons result in 404s
        return this.fetchPartialHydrationJson(Object.assign(loadObj, {
          pagePath: `/404.html`,
          notFound: true
        }));
      }

      // handle 500 response (Unrecoverable)
      if (status === 500) {
        return this.fetchPartialHydrationJson(Object.assign(loadObj, {
          pagePath: `/500.html`,
          internalServerError: true
        }));
      }

      // Handle everything else, including status === 0, and 503s. Should retry
      if (retries < 3) {
        return this.fetchPartialHydrationJson(Object.assign(loadObj, {
          retries: retries + 1
        }));
      }

      // Retried 3 times already, result is an error.
      return Object.assign(loadObj, {
        status: PageResourceStatus.Error
      });
    });
  }
  loadPageDataJson(rawPath) {
    const pagePath = (0,_find_path__WEBPACK_IMPORTED_MODULE_2__.findPath)(rawPath);
    if (this.pageDataDb.has(pagePath)) {
      const pageData = this.pageDataDb.get(pagePath);
      if (true) {
        return Promise.resolve(pageData);
      }
    }
    return this.fetchPageDataJson({
      pagePath
    }).then(pageData => {
      this.pageDataDb.set(pagePath, pageData);
      return pageData;
    });
  }
  loadPartialHydrationJson(rawPath) {
    const pagePath = (0,_find_path__WEBPACK_IMPORTED_MODULE_2__.findPath)(rawPath);
    if (this.partialHydrationDb.has(pagePath)) {
      const pageData = this.partialHydrationDb.get(pagePath);
      if (true) {
        return Promise.resolve(pageData);
      }
    }
    return this.fetchPartialHydrationJson({
      pagePath
    }).then(pageData => {
      this.partialHydrationDb.set(pagePath, pageData);
      return pageData;
    });
  }
  loadSliceDataJson(sliceName) {
    if (this.slicesDataDb.has(sliceName)) {
      const jsonPayload = this.slicesDataDb.get(sliceName);
      return Promise.resolve({
        sliceName,
        jsonPayload
      });
    }
    const url = `${""}/slice-data/${sliceName}.json`;
    return doFetch(url, `GET`).then(res => {
      const jsonPayload = JSON.parse(res.responseText);
      this.slicesDataDb.set(sliceName, jsonPayload);
      return {
        sliceName,
        jsonPayload
      };
    });
  }
  findMatchPath(rawPath) {
    return (0,_find_path__WEBPACK_IMPORTED_MODULE_2__.findMatchPath)(rawPath);
  }

  // TODO check all uses of this and whether they use undefined for page resources not exist
  loadPage(rawPath) {
    const pagePath = (0,_find_path__WEBPACK_IMPORTED_MODULE_2__.findPath)(rawPath);
    if (this.pageDb.has(pagePath)) {
      const page = this.pageDb.get(pagePath);
      if (true) {
        if (page.error) {
          return Promise.resolve({
            error: page.error,
            status: page.status
          });
        }
        return Promise.resolve(page.payload);
      }
    }
    if (this.inFlightDb.has(pagePath)) {
      return this.inFlightDb.get(pagePath);
    }
    const loadDataPromises = [this.loadAppData(), this.loadPageDataJson(pagePath)];
    if (false) {}
    const inFlightPromise = Promise.all(loadDataPromises).then(allData => {
      const [appDataResponse, pageDataResponse, rscDataResponse] = allData;
      if (pageDataResponse.status === PageResourceStatus.Error || (rscDataResponse === null || rscDataResponse === void 0 ? void 0 : rscDataResponse.status) === PageResourceStatus.Error) {
        return {
          status: PageResourceStatus.Error
        };
      }
      let pageData = pageDataResponse.payload;
      const {
        componentChunkName,
        staticQueryHashes: pageStaticQueryHashes = [],
        slicesMap = {}
      } = pageData;
      const finalResult = {};
      const dedupedSliceNames = Array.from(new Set(Object.values(slicesMap)));
      const loadSlice = slice => {
        if (this.slicesDb.has(slice.name)) {
          return this.slicesDb.get(slice.name);
        } else if (this.sliceInflightDb.has(slice.name)) {
          return this.sliceInflightDb.get(slice.name);
        }
        const inFlight = this.loadComponent(slice.componentChunkName).then(component => {
          return {
            component: preferDefault(component),
            sliceContext: slice.result.sliceContext,
            data: slice.result.data
          };
        });
        this.sliceInflightDb.set(slice.name, inFlight);
        inFlight.then(results => {
          this.slicesDb.set(slice.name, results);
          this.sliceInflightDb.delete(slice.name);
        });
        return inFlight;
      };
      return Promise.all(dedupedSliceNames.map(sliceName => this.loadSliceDataJson(sliceName))).then(slicesData => {
        const slices = [];
        const dedupedStaticQueryHashes = [...pageStaticQueryHashes];
        for (const {
          jsonPayload,
          sliceName
        } of Object.values(slicesData)) {
          slices.push({
            name: sliceName,
            ...jsonPayload
          });
          for (const staticQueryHash of jsonPayload.staticQueryHashes) {
            if (!dedupedStaticQueryHashes.includes(staticQueryHash)) {
              dedupedStaticQueryHashes.push(staticQueryHash);
            }
          }
        }
        const loadChunkPromises = [Promise.all(slices.map(loadSlice)), this.loadComponent(componentChunkName, `head`)];
        if (true) {
          loadChunkPromises.push(this.loadComponent(componentChunkName));
        }

        // In develop we have separate chunks for template and Head components
        // to enable HMR (fast refresh requires single exports).
        // In production we have shared chunk with both exports. Double loadComponent here
        // will be deduped by webpack runtime resulting in single request and single module
        // being loaded for both `component` and `head`.
        // get list of components to get
        const componentChunkPromises = Promise.all(loadChunkPromises).then(components => {
          const [sliceComponents, headComponent, pageComponent] = components;
          finalResult.createdAt = new Date();
          for (const sliceComponent of sliceComponents) {
            if (!sliceComponent || sliceComponent instanceof Error) {
              finalResult.status = PageResourceStatus.Error;
              finalResult.error = sliceComponent;
            }
          }
          if ( true && (!pageComponent || pageComponent instanceof Error)) {
            finalResult.status = PageResourceStatus.Error;
            finalResult.error = pageComponent;
          }
          let pageResources;
          if (finalResult.status !== PageResourceStatus.Error) {
            finalResult.status = PageResourceStatus.Success;
            if (pageDataResponse.notFound === true || (rscDataResponse === null || rscDataResponse === void 0 ? void 0 : rscDataResponse.notFound) === true) {
              finalResult.notFound = true;
            }
            pageData = Object.assign(pageData, {
              webpackCompilationHash: appDataResponse ? appDataResponse.webpackCompilationHash : ``
            });
            if (typeof (rscDataResponse === null || rscDataResponse === void 0 ? void 0 : rscDataResponse.payload) === `string`) {
              pageResources = toPageResources(pageData, null, headComponent);
              pageResources.partialHydration = rscDataResponse.payload;
              const readableStream = new ReadableStream({
                start(controller) {
                  const te = new TextEncoder();
                  controller.enqueue(te.encode(rscDataResponse.payload));
                },
                pull(controller) {
                  // close on next read when queue is empty
                  controller.close();
                },
                cancel() {}
              });

              // Only load this experimental module if opting in to experimental Partial Hydration
              return __webpack_require__.e(/*! import() */ "node_modules_gatsby_node_modules_react-server-dom-webpack_index_js").then(__webpack_require__.t.bind(__webpack_require__, /*! react-server-dom-webpack */ "./node_modules/gatsby/node_modules/react-server-dom-webpack/index.js", 23)).then(({
                createFromReadableStream
              }) => waitForResponse(createFromReadableStream(readableStream))).then(result => {
                pageResources.partialHydration = result;
                return pageResources;
              });
            } else {
              pageResources = toPageResources(pageData, pageComponent, headComponent);
            }
          }

          // undefined if final result is an error
          return pageResources;
        });

        // get list of static queries to get
        const staticQueryBatchPromise = Promise.all(dedupedStaticQueryHashes.map(staticQueryHash => {
          // Check for cache in case this static query result has already been loaded
          if (this.staticQueryDb[staticQueryHash]) {
            const jsonPayload = this.staticQueryDb[staticQueryHash];
            return {
              staticQueryHash,
              jsonPayload
            };
          }
          return this.memoizedGet(`${""}/page-data/sq/d/${staticQueryHash}.json`).then(req => {
            const jsonPayload = JSON.parse(req.responseText);
            return {
              staticQueryHash,
              jsonPayload
            };
          }).catch(() => {
            throw new Error(`We couldn't load "${""}/page-data/sq/d/${staticQueryHash}.json"`);
          });
        })).then(staticQueryResults => {
          const staticQueryResultsMap = {};
          staticQueryResults.forEach(({
            staticQueryHash,
            jsonPayload
          }) => {
            staticQueryResultsMap[staticQueryHash] = jsonPayload;
            this.staticQueryDb[staticQueryHash] = jsonPayload;
          });
          return staticQueryResultsMap;
        });
        return Promise.all([componentChunkPromises, staticQueryBatchPromise]).then(([pageResources, staticQueryResults]) => {
          let payload;
          if (pageResources) {
            payload = {
              ...pageResources,
              staticQueryResults
            };
            finalResult.payload = payload;
            _emitter__WEBPACK_IMPORTED_MODULE_1__["default"].emit(`onPostLoadPageResources`, {
              page: payload,
              pageResources: payload
            });
          }
          this.pageDb.set(pagePath, finalResult);
          if (finalResult.error) {
            return {
              error: finalResult.error,
              status: finalResult.status
            };
          }
          return payload;
        })
        // when static-query fail to load we throw a better error
        .catch(err => {
          return {
            error: err,
            status: PageResourceStatus.Error
          };
        });
      });
    });
    inFlightPromise.then(() => {
      this.inFlightDb.delete(pagePath);
    }).catch(error => {
      this.inFlightDb.delete(pagePath);
      throw error;
    });
    this.inFlightDb.set(pagePath, inFlightPromise);
    return inFlightPromise;
  }

  // returns undefined if the page does not exists in cache
  loadPageSync(rawPath, options = {}) {
    const pagePath = (0,_find_path__WEBPACK_IMPORTED_MODULE_2__.findPath)(rawPath);
    if (this.pageDb.has(pagePath)) {
      const pageData = this.pageDb.get(pagePath);
      if (pageData.payload) {
        return pageData.payload;
      }
      if (options !== null && options !== void 0 && options.withErrorDetails) {
        return {
          error: pageData.error,
          status: pageData.status
        };
      }
    }
    return undefined;
  }
  shouldPrefetch(pagePath) {
    // Skip prefetching if we know user is on slow or constrained connection
    if (!doesConnectionSupportPrefetch()) {
      return false;
    }

    // Don't prefetch if this is a crawler bot
    if (navigator.userAgent && BOT_REGEX.test(navigator.userAgent)) {
      return false;
    }

    // Check if the page exists.
    if (this.pageDb.has(pagePath)) {
      return false;
    }
    return true;
  }
  prefetch(pagePath) {
    if (!this.shouldPrefetch(pagePath)) {
      return {
        then: resolve => resolve(false),
        abort: () => {}
      };
    }
    if (this.prefetchTriggered.has(pagePath)) {
      return {
        then: resolve => resolve(true),
        abort: () => {}
      };
    }
    const defer = {
      resolve: null,
      reject: null,
      promise: null
    };
    defer.promise = new Promise((resolve, reject) => {
      defer.resolve = resolve;
      defer.reject = reject;
    });
    this.prefetchQueued.push([pagePath, defer]);
    const abortC = new AbortController();
    abortC.signal.addEventListener(`abort`, () => {
      const index = this.prefetchQueued.findIndex(([p]) => p === pagePath);
      // remove from the queue
      if (index !== -1) {
        this.prefetchQueued.splice(index, 1);
      }
    });
    if (!this.isPrefetchQueueRunning) {
      this.isPrefetchQueueRunning = true;
      setTimeout(() => {
        this._processNextPrefetchBatch();
      }, 3000);
    }
    return {
      then: (resolve, reject) => defer.promise.then(resolve, reject),
      abort: abortC.abort.bind(abortC)
    };
  }
  _processNextPrefetchBatch() {
    const idleCallback = window.requestIdleCallback || (cb => setTimeout(cb, 0));
    idleCallback(() => {
      const toPrefetch = this.prefetchQueued.splice(0, 4);
      const prefetches = Promise.all(toPrefetch.map(([pagePath, dPromise]) => {
        // Tell plugins with custom prefetching logic that they should start
        // prefetching this path.
        if (!this.prefetchTriggered.has(pagePath)) {
          this.apiRunner(`onPrefetchPathname`, {
            pathname: pagePath
          });
          this.prefetchTriggered.add(pagePath);
        }

        // If a plugin has disabled core prefetching, stop now.
        if (this.prefetchDisabled) {
          return dPromise.resolve(false);
        }
        return this.doPrefetch((0,_find_path__WEBPACK_IMPORTED_MODULE_2__.findPath)(pagePath)).then(() => {
          if (!this.prefetchCompleted.has(pagePath)) {
            this.apiRunner(`onPostPrefetchPathname`, {
              pathname: pagePath
            });
            this.prefetchCompleted.add(pagePath);
          }
          dPromise.resolve(true);
        });
      }));
      if (this.prefetchQueued.length) {
        prefetches.then(() => {
          setTimeout(() => {
            this._processNextPrefetchBatch();
          }, 3000);
        });
      } else {
        this.isPrefetchQueueRunning = false;
      }
    });
  }
  doPrefetch(pagePath) {
    const pageDataUrl = createPageDataUrl(pagePath);
    if (false) {} else {
      return (0,_prefetch__WEBPACK_IMPORTED_MODULE_0__["default"])(pageDataUrl, {
        crossOrigin: `anonymous`,
        as: `fetch`
      }).then(() =>
      // This was just prefetched, so will return a response from
      // the cache instead of making another request to the server
      this.loadPageDataJson(pagePath));
    }
  }
  hovering(rawPath) {
    this.loadPage(rawPath);
  }
  getResourceURLsForPathname(rawPath) {
    const pagePath = (0,_find_path__WEBPACK_IMPORTED_MODULE_2__.findPath)(rawPath);
    const page = this.pageDataDb.get(pagePath);
    if (page) {
      const pageResources = toPageResources(page.payload);
      return [...createComponentUrls(pageResources.page.componentChunkName), createPageDataUrl(pagePath)];
    } else {
      return null;
    }
  }
  isPageNotFound(rawPath) {
    const pagePath = (0,_find_path__WEBPACK_IMPORTED_MODULE_2__.findPath)(rawPath);
    const page = this.pageDb.get(pagePath);
    return !page || page.notFound;
  }
  loadAppData(retries = 0) {
    return this.memoizedGet(`${""}/page-data/app-data.json`).then(req => {
      const {
        status,
        responseText
      } = req;
      let appData;
      if (status !== 200 && retries < 3) {
        // Retry 3 times incase of non-200 responses
        return this.loadAppData(retries + 1);
      }

      // Handle 200
      if (status === 200) {
        try {
          const jsonPayload = JSON.parse(responseText);
          if (jsonPayload.webpackCompilationHash === undefined) {
            throw new Error(`not a valid app-data response`);
          }
          appData = jsonPayload;
        } catch (err) {
          // continue regardless of error
        }
      }
      return appData;
    });
  }
}
const createComponentUrls = componentChunkName => (window.___chunkMapping[componentChunkName] || []).map(chunk => "" + chunk);
class ProdLoader extends BaseLoader {
  constructor(asyncRequires, matchPaths, pageData) {
    const loadComponent = (chunkName, exportType = `components`) => {
      if (true) {
        exportType = `components`;
      }
      if (!asyncRequires[exportType][chunkName]) {
        throw new Error(`We couldn't find the correct component chunk with the name "${chunkName}"`);
      }
      return asyncRequires[exportType][chunkName]()
      // loader will handle the case when component is error
      .catch(err => err);
    };
    super(loadComponent, matchPaths);
    if (pageData) {
      this.pageDataDb.set((0,_find_path__WEBPACK_IMPORTED_MODULE_2__.findPath)(pageData.path), {
        pagePath: pageData.path,
        payload: pageData,
        status: `success`
      });
    }
  }
  doPrefetch(pagePath) {
    return super.doPrefetch(pagePath).then(result => {
      if (result.status !== PageResourceStatus.Success) {
        return Promise.resolve();
      }
      const pageData = result.payload;
      const chunkName = pageData.componentChunkName;
      const componentUrls = createComponentUrls(chunkName);
      return Promise.all(componentUrls.map(_prefetch__WEBPACK_IMPORTED_MODULE_0__["default"])).then(() => pageData);
    });
  }
  loadPageDataJson(rawPath) {
    return super.loadPageDataJson(rawPath).then(data => {
      if (data.notFound) {
        if (shouldAbortFetch(rawPath)) {
          return data;
        }
        // check if html file exist using HEAD request:
        // if it does we should navigate to it instead of showing 404
        return doFetch(rawPath, `HEAD`).then(req => {
          if (req.status === 200) {
            // page (.html file) actually exist (or we asked for 404 )
            // returning page resources status as errored to trigger
            // regular browser navigation to given page
            return {
              status: PageResourceStatus.Error
            };
          }

          // if HEAD request wasn't 200, return notFound result
          // and show 404 page
          return data;
        });
      }
      return data;
    });
  }
  loadPartialHydrationJson(rawPath) {
    return super.loadPartialHydrationJson(rawPath).then(data => {
      if (data.notFound) {
        if (shouldAbortFetch(rawPath)) {
          return data;
        }
        // check if html file exist using HEAD request:
        // if it does we should navigate to it instead of showing 404
        return doFetch(rawPath, `HEAD`).then(req => {
          if (req.status === 200) {
            // page (.html file) actually exist (or we asked for 404 )
            // returning page resources status as errored to trigger
            // regular browser navigation to given page
            return {
              status: PageResourceStatus.Error
            };
          }

          // if HEAD request wasn't 200, return notFound result
          // and show 404 page
          return data;
        });
      }
      return data;
    });
  }
}
let instance;
const setLoader = _loader => {
  instance = _loader;
};
const publicLoader = {
  enqueue: rawPath => instance.prefetch(rawPath),
  // Real methods
  getResourceURLsForPathname: rawPath => instance.getResourceURLsForPathname(rawPath),
  loadPage: rawPath => instance.loadPage(rawPath),
  // TODO add deprecation to v4 so people use withErrorDetails and then we can remove in v5 and change default behaviour
  loadPageSync: (rawPath, options = {}) => instance.loadPageSync(rawPath, options),
  prefetch: rawPath => instance.prefetch(rawPath),
  isPageNotFound: rawPath => instance.isPageNotFound(rawPath),
  hovering: rawPath => instance.hovering(rawPath),
  loadAppData: () => instance.loadAppData()
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (publicLoader);
function getStaticQueryResults() {
  if (instance) {
    return instance.staticQueryDb;
  } else {
    return {};
  }
}
function getSliceResults() {
  if (instance) {
    return instance.slicesDb;
  } else {
    return {};
  }
}

/***/ }),

/***/ "./.cache/normalize-page-path.js":
/*!***************************************!*\
  !*** ./.cache/normalize-page-path.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (pathAndSearch => {
  if (pathAndSearch === undefined) {
    return pathAndSearch;
  }
  let [path, search = ``] = pathAndSearch.split(`?`);
  if (search) {
    search = `?` + search;
  }
  if (path === `/`) {
    return `/` + search;
  }
  if (path.charAt(path.length - 1) === `/`) {
    return path.slice(0, -1) + search;
  }
  return path + search;
});

/***/ }),

/***/ "./.cache/prefetch.js":
/*!****************************!*\
  !*** ./.cache/prefetch.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const support = function (feature) {
  if (typeof document === `undefined`) {
    return false;
  }
  const fakeLink = document.createElement(`link`);
  try {
    if (fakeLink.relList && typeof fakeLink.relList.supports === `function`) {
      return fakeLink.relList.supports(feature);
    }
  } catch (err) {
    return false;
  }
  return false;
};
const linkPrefetchStrategy = function (url, options) {
  return new Promise((resolve, reject) => {
    if (typeof document === `undefined`) {
      reject();
      return;
    }
    const link = document.createElement(`link`);
    link.setAttribute(`rel`, `prefetch`);
    link.setAttribute(`href`, url);
    Object.keys(options).forEach(key => {
      link.setAttribute(key, options[key]);
    });
    link.onload = resolve;
    link.onerror = reject;
    const parentElement = document.getElementsByTagName(`head`)[0] || document.getElementsByName(`script`)[0].parentNode;
    parentElement.appendChild(link);
  });
};
const xhrPrefetchStrategy = function (url) {
  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();
    req.open(`GET`, url, true);
    req.onload = () => {
      if (req.status === 200) {
        resolve();
      } else {
        reject();
      }
    };
    req.send(null);
  });
};
const supportedPrefetchStrategy = support(`prefetch`) ? linkPrefetchStrategy : xhrPrefetchStrategy;
const preFetched = {};
const prefetch = function (url, options) {
  return new Promise(resolve => {
    if (preFetched[url]) {
      resolve();
      return;
    }
    supportedPrefetchStrategy(url, options).then(() => {
      resolve();
      preFetched[url] = true;
    }).catch(() => {}); // 404s are logged to the console anyway
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (prefetch);

/***/ }),

/***/ "./.cache/public-page-renderer.js":
/*!****************************************!*\
  !*** ./.cache/public-page-renderer.js ***!
  \****************************************/
/***/ ((module) => {

const preferDefault = m => m && m.default || m;
if (false) {} else if (false) {} else {
  module.exports = () => null;
}

/***/ }),

/***/ "./.cache/redirect-utils.js":
/*!**********************************!*\
  !*** ./.cache/redirect-utils.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   maybeGetBrowserRedirect: () => (/* binding */ maybeGetBrowserRedirect)
/* harmony export */ });
/* harmony import */ var _redirects_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./redirects.json */ "./.cache/redirects.json");


// Convert to a map for faster lookup in maybeRedirect()

const redirectMap = new Map();
const redirectIgnoreCaseMap = new Map();
_redirects_json__WEBPACK_IMPORTED_MODULE_0__.forEach(redirect => {
  if (redirect.ignoreCase) {
    redirectIgnoreCaseMap.set(redirect.fromPath, redirect);
  } else {
    redirectMap.set(redirect.fromPath, redirect);
  }
});
function maybeGetBrowserRedirect(pathname) {
  let redirect = redirectMap.get(pathname);
  if (!redirect) {
    redirect = redirectIgnoreCaseMap.get(pathname.toLowerCase());
  }
  return redirect;
}

/***/ }),

/***/ "./.cache/redirects.json":
/*!*******************************!*\
  !*** ./.cache/redirects.json ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = [];

/***/ }),

/***/ "./.cache/slice.js":
/*!*************************!*\
  !*** ./.cache/slice.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Slice: () => (/* binding */ Slice)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _slice_server_slice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./slice/server-slice */ "./.cache/slice/server-slice.js");
/* harmony import */ var _slice_inline_slice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./slice/inline-slice */ "./.cache/slice/inline-slice.js");
/* harmony import */ var _slice_context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./slice/context */ "./.cache/slice/context.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
"use client";






function Slice(props) {
  if (true) {
    // we use sliceName internally, so remap alias to sliceName
    const internalProps = {
      ...props,
      sliceName: props.alias
    };
    delete internalProps.alias;
    delete internalProps.__renderedByLocation;
    const slicesContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_slice_context__WEBPACK_IMPORTED_MODULE_3__.SlicesContext);

    // validate props
    const propErrors = validateSliceProps(props);
    if (Object.keys(propErrors).length) {
      throw new SlicePropsError(slicesContext.renderEnvironment === `browser`, internalProps.sliceName, propErrors, props.__renderedByLocation);
    }
    if (slicesContext.renderEnvironment === `server`) {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_slice_server_slice__WEBPACK_IMPORTED_MODULE_1__.ServerSlice, {
        ...internalProps
      });
    } else if (slicesContext.renderEnvironment === `browser`) {
      // in the browser, we'll just render the component as is
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_slice_inline_slice__WEBPACK_IMPORTED_MODULE_2__.InlineSlice, {
        ...internalProps
      });
    } else if (slicesContext.renderEnvironment === `engines` || slicesContext.renderEnvironment === `dev-ssr`) {
      // if we're in SSR, we'll just render the component as is
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_slice_inline_slice__WEBPACK_IMPORTED_MODULE_2__.InlineSlice, {
        ...internalProps
      });
    } else if (slicesContext.renderEnvironment === `slices`) {
      // we are not yet supporting nested slices

      let additionalContextMessage = ``;

      // just in case generating additional contextual information fails, we still want the base message to show
      // and not show another cryptic error message
      try {
        additionalContextMessage = `\n\nSlice component "${slicesContext.sliceRoot.name}" (${slicesContext.sliceRoot.componentPath}) tried to render <Slice alias="${props.alias}"/>`;
      } catch {
        // don't need to handle it, we will just skip the additional context message if we fail to generate it
      }
      throw new Error(`Nested slices are not supported.${additionalContextMessage}\n\nSee https://gatsbyjs.com/docs/reference/built-in-components/gatsby-slice#nested-slices`);
    } else {
      throw new Error(`Slice context "${slicesContext.renderEnvironment}" is not supported.`);
    }
  } else {}
}
class SlicePropsError extends Error {
  constructor(inBrowser, sliceName, propErrors, renderedByLocation) {
    const errors = Object.entries(propErrors).map(([key, value]) => `not serializable "${value}" type passed to "${key}" prop`).join(`, `);
    const name = `SlicePropsError`;
    let stack = ``;
    let message = ``;
    if (inBrowser) {
      var _React$__SECRET_INTER, _React$__SECRET_INTER2;
      let fullStack = ``;

      // React 19+ uses captureOwnerStack, React 18 uses ReactDebugCurrentFrame.getCurrentStack
      if ((react__WEBPACK_IMPORTED_MODULE_0___default().captureOwnerStack)) {
        // React 19+ approach
        const ownerStack = react__WEBPACK_IMPORTED_MODULE_0___default().captureOwnerStack();
        const currentStack = new Error().stack || ``;
        fullStack = ownerStack ? `${currentStack}\n${ownerStack}` : currentStack;
      } else if ((_React$__SECRET_INTER = (react__WEBPACK_IMPORTED_MODULE_0___default().__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)) !== null && _React$__SECRET_INTER !== void 0 && (_React$__SECRET_INTER2 = _React$__SECRET_INTER.ReactDebugCurrentFrame) !== null && _React$__SECRET_INTER2 !== void 0 && _React$__SECRET_INTER2.getCurrentStack) {
        // React 18 approach
        fullStack = react__WEBPACK_IMPORTED_MODULE_0___default().__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactDebugCurrentFrame.getCurrentStack();
      } else {
        // Fallback if neither API is available
        fullStack = new Error().stack || ``;
      }

      // remove the first line of the stack trace
      const stackLines = fullStack.trim().split(`\n`).slice(1);
      if (stackLines.length > 0) {
        stackLines[0] = stackLines[0].trim();
        stack = `\n` + stackLines.join(`\n`);
      }
      message = `Slice "${sliceName}" was passed props that are not serializable (${errors}).`;
    } else {
      // we can't really grab any extra info outside of the browser, so just print what we can
      message = `${name}: Slice "${sliceName}" was passed props that are not serializable (${errors}).`;
      const stackLines = new Error().stack.trim().split(`\n`).slice(2);
      stack = `${message}\n${stackLines.join(`\n`)}`;
    }
    super(message);
    this.name = name;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, SlicePropsError);
    }
    if (renderedByLocation) {
      this.forcedLocation = {
        ...renderedByLocation,
        functionName: `Slice`
      };
    }
  }
}
const validateSliceProps = (props, errors = {}, seenObjects = [], path = null) => {
  // recursively validate all props
  for (const [name, value] of Object.entries(props)) {
    if (value === undefined || value === null || !path && name === `children`) {
      continue;
    }
    const propPath = path ? `${path}.${name}` : name;
    if (typeof value === `function`) {
      errors[propPath] = typeof value;
    } else if (typeof value === `object` && seenObjects.indexOf(value) <= 0) {
      seenObjects.push(value);
      validateSliceProps(value, errors, seenObjects, propPath);
    }
  }
  return errors;
};

/***/ }),

/***/ "./.cache/slice/context.js":
/*!*********************************!*\
  !*** ./.cache/slice/context.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SlicesContext: () => (/* binding */ SlicesContext),
/* harmony export */   SlicesMapContext: () => (/* binding */ SlicesMapContext),
/* harmony export */   SlicesPropsContext: () => (/* binding */ SlicesPropsContext),
/* harmony export */   SlicesResultsContext: () => (/* binding */ SlicesResultsContext)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const SlicesResultsContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createContext({});
const SlicesContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createContext({});
const SlicesMapContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createContext({});
const SlicesPropsContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createContext({});


/***/ }),

/***/ "./.cache/slice/inline-slice.js":
/*!**************************************!*\
  !*** ./.cache/slice/inline-slice.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InlineSlice: () => (/* binding */ InlineSlice)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./context */ "./.cache/slice/context.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");



const InlineSlice = ({
  sliceName,
  allowEmpty,
  children,
  ...sliceProps
}) => {
  const slicesMap = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context__WEBPACK_IMPORTED_MODULE_1__.SlicesMapContext);
  const slicesResultsMap = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context__WEBPACK_IMPORTED_MODULE_1__.SlicesResultsContext);
  const concreteSliceName = slicesMap[sliceName];
  const slice = slicesResultsMap.get(concreteSliceName);
  if (!slice) {
    if (allowEmpty) {
      return null;
    } else {
      throw new Error(`Slice "${concreteSliceName}" for "${sliceName}" slot not found`);
    }
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(slice.component, {
    sliceContext: slice.sliceContext,
    data: slice.data,
    ...sliceProps,
    children: children
  });
};

/***/ }),

/***/ "./.cache/slice/server-slice-renderer.js":
/*!***********************************************!*\
  !*** ./.cache/slice/server-slice-renderer.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ServerSliceRenderer: () => (/* binding */ ServerSliceRenderer)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const ServerSliceRenderer = ({
  sliceId,
  children
}) => {
  const contents = [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(`slice-start`, {
    id: `${sliceId}-1`
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(`slice-end`, {
    id: `${sliceId}-1`
  })];
  if (children) {
    // if children exist, we split the slice into a before and after piece
    // see renderSlices in render-html
    contents.push(children);
    contents.push(/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(`slice-start`, {
      id: `${sliceId}-2`
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(`slice-end`, {
      id: `${sliceId}-2`
    }));
  }
  return contents;
};

/***/ }),

/***/ "./.cache/slice/server-slice.js":
/*!**************************************!*\
  !*** ./.cache/slice/server-slice.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ServerSlice: () => (/* binding */ ServerSlice)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var gatsby_core_utils_create_content_digest__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! gatsby-core-utils/create-content-digest */ "./node_modules/gatsby-core-utils/dist/create-content-digest.mjs");
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./context */ "./.cache/slice/context.js");
/* harmony import */ var _server_slice_renderer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./server-slice-renderer */ "./.cache/slice/server-slice-renderer.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");





const getSliceId = (sliceName, sliceProps) => {
  if (!Object.keys(sliceProps).length) {
    return sliceName;
  }
  const propsString = (0,gatsby_core_utils_create_content_digest__WEBPACK_IMPORTED_MODULE_1__.createContentDigest)(sliceProps);
  return `${sliceName}-${propsString}`;
};
const ServerSlice = ({
  sliceName,
  allowEmpty,
  children,
  ...sliceProps
}) => {
  const slicesMap = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context__WEBPACK_IMPORTED_MODULE_2__.SlicesMapContext);
  const slicesProps = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context__WEBPACK_IMPORTED_MODULE_2__.SlicesPropsContext);
  const concreteSliceName = slicesMap[sliceName];
  if (!concreteSliceName) {
    if (allowEmpty) {
      return null;
    } else {
      throw new Error(`Slice "${concreteSliceName}" for "${sliceName}" slot not found`);
    }
  }
  const sliceId = getSliceId(concreteSliceName, sliceProps);

  // set props on context object for static-entry to return
  let sliceUsage = slicesProps[sliceId];
  if (!sliceUsage) {
    slicesProps[sliceId] = sliceUsage = {
      props: sliceProps,
      sliceName: concreteSliceName,
      hasChildren: !!children
    };
  } else {
    if (children) {
      sliceUsage.hasChildren = true;
    }
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_server_slice_renderer__WEBPACK_IMPORTED_MODULE_3__.ServerSliceRenderer, {
    sliceId: sliceId,
    children: children
  });
};

/***/ }),

/***/ "./.cache/static-query.js":
/*!********************************!*\
  !*** ./.cache/static-query.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StaticQuery: () => (/* binding */ StaticQuery),
/* harmony export */   StaticQueryContext: () => (/* binding */ StaticQueryContext),
/* harmony export */   useStaticQuery: () => (/* binding */ useStaticQuery)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _context_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./context-utils */ "./.cache/context-utils.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");




const StaticQueryContext = (0,_context_utils__WEBPACK_IMPORTED_MODULE_1__.createServerOrClientContext)(`StaticQuery`, {});
function StaticQueryDataRenderer({
  staticQueryData,
  data,
  query,
  render
}) {
  const finalData = data ? data.data : staticQueryData[query] && staticQueryData[query].data;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
    children: [finalData && render(finalData), !finalData && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
      children: "Loading (StaticQuery)"
    })]
  });
}
let warnedAboutStaticQuery = false;

// TODO(v6): Remove completely
const StaticQuery = props => {
  const {
    data,
    query,
    render,
    children
  } = props;
  if ( true && !warnedAboutStaticQuery) {
    console.warn(`The <StaticQuery /> component is deprecated and will be removed in Gatsby v6. Use useStaticQuery instead. Refer to the migration guide for more information: https://gatsby.dev/migrating-4-to-5/#staticquery--is-deprecated`);
    warnedAboutStaticQuery = true;
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(StaticQueryContext.Consumer, {
    children: staticQueryData => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(StaticQueryDataRenderer, {
      data: data,
      query: query,
      render: render || children,
      staticQueryData: staticQueryData
    })
  });
};
StaticQuery.propTypes = {
  data: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().object),
  query: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().string).isRequired,
  render: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().func),
  children: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().func)
};
const useStaticQuery = query => {
  var _context$query;
  if (typeof (react__WEBPACK_IMPORTED_MODULE_0___default().useContext) !== `function` && "development" === `development`) {
    // TODO(v5): Remove since we require React >= 18
    throw new Error(`You're likely using a version of React that doesn't support Hooks\n` + `Please update React and ReactDOM to 16.8.0 or later to use the useStaticQuery hook.`);
  }
  const context = react__WEBPACK_IMPORTED_MODULE_0___default().useContext(StaticQueryContext);

  // query is a stringified number like `3303882` when wrapped with graphql, If a user forgets
  // to wrap the query in a grqphql, then casting it to a Number results in `NaN` allowing us to
  // catch the misuse of the API and give proper direction
  if (isNaN(Number(query))) {
    throw new Error(`useStaticQuery was called with a string but expects to be called using \`graphql\`. Try this:

import { useStaticQuery, graphql } from 'gatsby';

useStaticQuery(graphql\`${query}\`);
`);
  }
  if ((_context$query = context[query]) !== null && _context$query !== void 0 && _context$query.data) {
    return context[query].data;
  } else {
    throw new Error(`The result of this StaticQuery could not be fetched.\n\n` + `This is likely a bug in Gatsby and if refreshing the page does not fix it, ` + `please open an issue in https://github.com/gatsbyjs/gatsby/issues`);
  }
};


/***/ }),

/***/ "./.cache/strip-prefix.js":
/*!********************************!*\
  !*** ./.cache/strip-prefix.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ stripPrefix)
/* harmony export */ });
/**
 * Remove a prefix from a string. Return the input string if the given prefix
 * isn't found.
 */

function stripPrefix(str, prefix = ``) {
  if (!prefix) {
    return str;
  }
  if (str === prefix) {
    return `/`;
  }
  if (str.startsWith(`${prefix}/`)) {
    return str.slice(prefix.length);
  }
  return str;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/assertThisInitialized.js ***!
  \**********************************************************************/
/***/ ((module) => {

function _assertThisInitialized(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
module.exports = _assertThisInitialized, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/inheritsLoose.js":
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/inheritsLoose.js ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf.js */ "./node_modules/@babel/runtime/helpers/setPrototypeOf.js");
function _inheritsLoose(t, o) {
  t.prototype = Object.create(o.prototype), t.prototype.constructor = t, setPrototypeOf(t, o);
}
module.exports = _inheritsLoose, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/setPrototypeOf.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/setPrototypeOf.js ***!
  \***************************************************************/
/***/ ((module) => {

function _setPrototypeOf(t, e) {
  return module.exports = _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
    return t.__proto__ = e, t;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports, _setPrototypeOf(t, e);
}
module.exports = _setPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/gatsby-core-utils/dist/create-content-digest.mjs":
/*!***********************************************************************!*\
  !*** ./node_modules/gatsby-core-utils/dist/create-content-digest.mjs ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createContentDigest: () => (/* binding */ createContentDigest)
/* harmony export */ });
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! crypto */ "crypto");
/* harmony import */ var node_object_hash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! node-object-hash */ "./node_modules/node-object-hash/dist/hasher.js");


const hasher = node_object_hash__WEBPACK_IMPORTED_MODULE_1__({
  coerce: false,
  alg: `md5`,
  enc: `hex`,
  sort: {
    map: true,
    object: true,
    array: false,
    set: false
  }
});
const hashPrimitive = input => crypto__WEBPACK_IMPORTED_MODULE_0__.createHash(`md5`).update(input).digest(`hex`);

/**
 * Hashes an input using md5 hash of hexadecimal digest.
 *
 * @param input The input to encrypt
 * @return The content digest
 */

const createContentDigest = input => {
  if (typeof input === `object` && !Buffer.isBuffer(input)) {
    return hasher.hash(input);
  }
  return hashPrimitive(input);
};

/***/ }),

/***/ "./node_modules/gatsby-link/dist/index.modern.mjs":
/*!********************************************************!*\
  !*** ./node_modules/gatsby-link/dist/index.modern.mjs ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Link: () => (/* binding */ E),
/* harmony export */   navigate: () => (/* binding */ g),
/* harmony export */   parsePath: () => (/* binding */ a),
/* harmony export */   withAssetPrefix: () => (/* binding */ v),
/* harmony export */   withPrefix: () => (/* binding */ f)
/* harmony export */ });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _gatsbyjs_reach_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @gatsbyjs/reach-router */ "./node_modules/@gatsbyjs/reach-router/dist/index.modern.mjs");
/* harmony import */ var gatsby_page_utils_apply_trailing_slash_option__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! gatsby-page-utils/apply-trailing-slash-option */ "./node_modules/gatsby-page-utils/dist/apply-trailing-slash-option.js");
"use client"
;function i(){return i=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},i.apply(this,arguments)}function a(t){let e=t||"/",n="",r="";const o=e.indexOf("#");-1!==o&&(r=e.slice(o),e=e.slice(0,o));const s=e.indexOf("?");return-1!==s&&(n=e.slice(s),e=e.slice(0,s)),{pathname:e,search:"?"===n?"":n,hash:"#"===r?"":r}}const c=/^[a-zA-Z][a-zA-Z\d+\-.]*?:/,l=t=>{if("string"==typeof t)return!(t=>c.test(t))(t)},p=()=> true? true?"":0:0,h=()=> true? true?"":0:0;function f(t,e=p()){var n;if(!l(t))return t;if(t.startsWith("./")||t.startsWith("../"))return t;const r=null!=(n=null!=e?e:h())?n:"/";return`${null!=r&&r.endsWith("/")?r.slice(0,-1):r}${t.startsWith("/")?t:`/${t}`}`}const u=t=>null==t?void 0:t.startsWith("/"),_=()=> true?"always":0;function d(t,e){const{pathname:n,search:r,hash:o}=a(t);return`${(0,gatsby_page_utils_apply_trailing_slash_option__WEBPACK_IMPORTED_MODULE_2__.applyTrailingSlashOption)(n,e)}${r}${o}`}const m=(t,e)=>"number"==typeof t?t:l(t)?u(t)?function(t){const e=f(t),n=_();return"always"===n||"never"===n?d(e,n):e}(t):function(t,e){if(u(t))return t;const r=_(),o=(0,_gatsbyjs_reach_router__WEBPACK_IMPORTED_MODULE_1__.resolve)(t,e);return"always"===r||"never"===r?d(o,r):o}(t,e):t,y=["to","getProps","onClick","onMouseEnter","activeClassName","activeStyle","innerRef","partiallyActive","state","replace","_location"];function v(t){return f(t,h())}const b={activeClassName:prop_types__WEBPACK_IMPORTED_MODULE_3__.string,activeStyle:prop_types__WEBPACK_IMPORTED_MODULE_3__.object,partiallyActive:prop_types__WEBPACK_IMPORTED_MODULE_3__.bool};function w(t){/*#__PURE__*/return react__WEBPACK_IMPORTED_MODULE_0__.createElement(_gatsbyjs_reach_router__WEBPACK_IMPORTED_MODULE_1__.Location,null,({location:n})=>/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(P,i({},t,{_location:n})))}class P extends react__WEBPACK_IMPORTED_MODULE_0__.Component{constructor(t){super(t),this.defaultGetProps=({isPartiallyCurrent:t,isCurrent:e})=>(this.props.partiallyActive?t:e)?{className:[this.props.className,this.props.activeClassName].filter(Boolean).join(" "),style:i({},this.props.style,this.props.activeStyle)}:null;let e=!1;"undefined"!=typeof window&&window.IntersectionObserver&&(e=!0),this.state={IOSupported:e},this.abortPrefetch=null,this.handleRef=this.handleRef.bind(this)}_prefetch(){let t=window.location.pathname+window.location.search;this.props._location&&this.props._location.pathname&&(t=this.props._location.pathname+this.props._location.search);const e=a(m(this.props.to,t)),n=e.pathname+e.search;if(t!==n)return ___loader.enqueue(n)}componentWillUnmount(){if(!this.io)return;const{instance:t,el:e}=this.io;this.abortPrefetch&&this.abortPrefetch.abort(),t.unobserve(e),t.disconnect()}handleRef(t){this.props.innerRef&&Object.prototype.hasOwnProperty.call(this.props.innerRef,"current")?this.props.innerRef.current=t:this.props.innerRef&&this.props.innerRef(t),this.state.IOSupported&&t&&(this.io=((t,e)=>{const n=new window.IntersectionObserver(n=>{n.forEach(n=>{t===n.target&&e(n.isIntersecting||n.intersectionRatio>0)})});return n.observe(t),{instance:n,el:t}})(t,t=>{t?this.abortPrefetch=this._prefetch():this.abortPrefetch&&this.abortPrefetch.abort()}))}render(){const t=this.props,{to:n,getProps:r=this.defaultGetProps,onClick:s,onMouseEnter:c,state:p,replace:h,_location:f}=t,u=function(t,e){if(null==t)return{};var n,r,o={},s=Object.keys(t);for(r=0;r<s.length;r++)e.indexOf(n=s[r])>=0||(o[n]=t[n]);return o}(t,y); false||l(n)||console.warn(`External link ${n} was detected in a Link component. Use the Link component only for internal links. See: https://gatsby.dev/internal-links`);const _=m(n,f.pathname);return l(_)?/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_gatsbyjs_reach_router__WEBPACK_IMPORTED_MODULE_1__.Link,i({to:_,state:p,getProps:r,innerRef:this.handleRef,onMouseEnter:t=>{c&&c(t);const e=a(_);___loader.hovering(e.pathname+e.search)},onClick:t=>{if(s&&s(t),!(0!==t.button||this.props.target||t.defaultPrevented||t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)){t.preventDefault();let e=h;const n=encodeURI(_)===f.pathname;"boolean"!=typeof h&&n&&(e=!0),window.___navigate(_,{state:p,replace:e})}return!0}},u)):/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("a",i({href:_},u))}}P.propTypes=i({},b,{onClick:prop_types__WEBPACK_IMPORTED_MODULE_3__.func,to:prop_types__WEBPACK_IMPORTED_MODULE_3__.string.isRequired,replace:prop_types__WEBPACK_IMPORTED_MODULE_3__.bool,state:prop_types__WEBPACK_IMPORTED_MODULE_3__.object});const E=react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((t,n)=>/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(w,i({innerRef:n},t))),g=(t,e)=>{window.___navigate(m(t,window.location.pathname),e)};
//# sourceMappingURL=index.modern.mjs.map


/***/ }),

/***/ "./node_modules/gatsby-page-utils/dist/apply-trailing-slash-option.js":
/*!****************************************************************************!*\
  !*** ./node_modules/gatsby-page-utils/dist/apply-trailing-slash-option.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


exports.__esModule = true;
exports.applyTrailingSlashOption = void 0;
const endsWithSuffixes = (suffixes, input) => {
  for (const suffix of suffixes) {
    if (input.endsWith(suffix)) return true;
  }
  return false;
};
const suffixes = [`.html`, `.json`, `.js`, `.map`, `.txt`, `.xml`, `.pdf`];
const applyTrailingSlashOption = (input, option = `always`) => {
  if (input === `/`) return input;
  const hasTrailingSlash = input.endsWith(`/`);
  if (endsWithSuffixes(suffixes, input)) {
    return input;
  }
  if (option === `always`) {
    return hasTrailingSlash ? input : `${input}/`;
  }
  if (option === `never`) {
    return hasTrailingSlash ? input.slice(0, -1) : input;
  }
  return input;
};
exports.applyTrailingSlashOption = applyTrailingSlashOption;

/***/ }),

/***/ "./node_modules/gatsby-react-router-scroll/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/gatsby-react-router-scroll/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports.useScrollRestoration = exports.ScrollContext = void 0;
var _scrollHandler = __webpack_require__(/*! ./scroll-handler */ "./node_modules/gatsby-react-router-scroll/scroll-handler.js");
exports.ScrollContext = _scrollHandler.ScrollHandler;
var _useScrollRestoration = __webpack_require__(/*! ./use-scroll-restoration */ "./node_modules/gatsby-react-router-scroll/use-scroll-restoration.js");
exports.useScrollRestoration = _useScrollRestoration.useScrollRestoration;

/***/ }),

/***/ "./node_modules/gatsby-react-router-scroll/scroll-handler.js":
/*!*******************************************************************!*\
  !*** ./node_modules/gatsby-react-router-scroll/scroll-handler.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");
exports.__esModule = true;
exports.ScrollHandler = exports.ScrollContext = void 0;
var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js"));
var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inheritsLoose */ "./node_modules/@babel/runtime/helpers/inheritsLoose.js"));
var React = _interopRequireWildcard(__webpack_require__(/*! react */ "react"));
var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js"));
var _sessionStorage = __webpack_require__(/*! ./session-storage */ "./node_modules/gatsby-react-router-scroll/session-storage.js");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var ScrollContext = /*#__PURE__*/React.createContext(new _sessionStorage.SessionStorage());
exports.ScrollContext = ScrollContext;
ScrollContext.displayName = "GatsbyScrollContext";
var ScrollHandler = /*#__PURE__*/function (_React$Component) {
  (0, _inheritsLoose2.default)(ScrollHandler, _React$Component);
  function ScrollHandler() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this._stateStorage = new _sessionStorage.SessionStorage();
    _this._isTicking = false;
    _this._latestKnownScrollY = 0;
    _this.scrollListener = function () {
      _this._latestKnownScrollY = window.scrollY;
      if (!_this._isTicking) {
        _this._isTicking = true;
        requestAnimationFrame(_this._saveScroll.bind((0, _assertThisInitialized2.default)(_this)));
      }
    };
    _this.windowScroll = function (position, prevProps) {
      if (_this.shouldUpdateScroll(prevProps, _this.props)) {
        window.scrollTo(0, position);
      }
    };
    _this.scrollToHash = function (hash, prevProps) {
      var node = document.getElementById(hash.substring(1));
      if (node && _this.shouldUpdateScroll(prevProps, _this.props)) {
        node.scrollIntoView();
      }
    };
    _this.shouldUpdateScroll = function (prevRouterProps, routerProps) {
      var shouldUpdateScroll = _this.props.shouldUpdateScroll;
      if (!shouldUpdateScroll) {
        return true;
      }

      // Hack to allow accessing this._stateStorage.
      return shouldUpdateScroll.call((0, _assertThisInitialized2.default)(_this), prevRouterProps, routerProps);
    };
    return _this;
  }
  var _proto = ScrollHandler.prototype;
  _proto._saveScroll = function _saveScroll() {
    var key = this.props.location.key || null;
    if (key) {
      this._stateStorage.save(this.props.location, key, this._latestKnownScrollY);
    }
    this._isTicking = false;
  };
  _proto.componentDidMount = function componentDidMount() {
    window.addEventListener("scroll", this.scrollListener);
    var scrollPosition;
    var _this$props$location = this.props.location,
      key = _this$props$location.key,
      hash = _this$props$location.hash;
    if (key) {
      scrollPosition = this._stateStorage.read(this.props.location, key);
    }

    /** If a hash is present in the browser url as the component mounts (i.e. the user is navigating
     * from an external website) then scroll to the hash instead of any previously stored scroll
     * position. */
    if (hash) {
      this.scrollToHash(decodeURI(hash), undefined);
    } else if (scrollPosition) {
      this.windowScroll(scrollPosition, undefined);
    }
  };
  _proto.componentWillUnmount = function componentWillUnmount() {
    window.removeEventListener("scroll", this.scrollListener);
  };
  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var _this$props$location2 = this.props.location,
      hash = _this$props$location2.hash,
      key = _this$props$location2.key;
    var scrollPosition;
    if (key) {
      scrollPosition = this._stateStorage.read(this.props.location, key);
    }

    /**  There are two pieces of state: the browser url and
     * history state which keeps track of scroll position
     * Native behaviour prescribes that we ought to restore scroll position
     * when a user navigates back in their browser (this is the `POP` action)
     * Currently, reach router has a bug that prevents this at https://github.com/reach/router/issues/228
     * So we _always_ stick to the url as a source of truth — if the url
     * contains a hash, we scroll to it
     */

    if (hash) {
      this.scrollToHash(decodeURI(hash), prevProps);
    } else {
      this.windowScroll(scrollPosition, prevProps);
    }
  };
  _proto.render = function render() {
    return /*#__PURE__*/React.createElement(ScrollContext.Provider, {
      value: this._stateStorage
    }, this.props.children);
  };
  return ScrollHandler;
}(React.Component);
exports.ScrollHandler = ScrollHandler;
ScrollHandler.propTypes = {
  shouldUpdateScroll: _propTypes.default.func,
  children: _propTypes.default.element.isRequired,
  location: _propTypes.default.object.isRequired
};

/***/ }),

/***/ "./node_modules/gatsby-react-router-scroll/session-storage.js":
/*!********************************************************************!*\
  !*** ./node_modules/gatsby-react-router-scroll/session-storage.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


exports.__esModule = true;
exports.SessionStorage = void 0;
var STATE_KEY_PREFIX = "@@scroll|";
var GATSBY_ROUTER_SCROLL_STATE = "___GATSBY_REACT_ROUTER_SCROLL";
var SessionStorage = /*#__PURE__*/function () {
  function SessionStorage() {}
  var _proto = SessionStorage.prototype;
  _proto.read = function read(location, key) {
    var stateKey = this.getStateKey(location, key);
    try {
      var value = window.sessionStorage.getItem(stateKey);
      return value ? JSON.parse(value) : 0;
    } catch (e) {
      if (true) {
        console.warn("[gatsby-react-router-scroll] Unable to access sessionStorage; sessionStorage is not available.");
      }
      if (window && window[GATSBY_ROUTER_SCROLL_STATE] && window[GATSBY_ROUTER_SCROLL_STATE][stateKey]) {
        return window[GATSBY_ROUTER_SCROLL_STATE][stateKey];
      }
      return 0;
    }
  };
  _proto.save = function save(location, key, value) {
    var stateKey = this.getStateKey(location, key);
    var storedValue = JSON.stringify(value);
    try {
      window.sessionStorage.setItem(stateKey, storedValue);
    } catch (e) {
      if (window && window[GATSBY_ROUTER_SCROLL_STATE]) {
        window[GATSBY_ROUTER_SCROLL_STATE][stateKey] = JSON.parse(storedValue);
      } else {
        window[GATSBY_ROUTER_SCROLL_STATE] = {};
        window[GATSBY_ROUTER_SCROLL_STATE][stateKey] = JSON.parse(storedValue);
      }
      if (true) {
        console.warn("[gatsby-react-router-scroll] Unable to save state in sessionStorage; sessionStorage is not available.");
      }
    }
  };
  _proto.getStateKey = function getStateKey(location, key) {
    var stateKeyBase = "" + STATE_KEY_PREFIX + location.pathname;
    return key === null || typeof key === "undefined" ? stateKeyBase : stateKeyBase + "|" + key;
  };
  return SessionStorage;
}();
exports.SessionStorage = SessionStorage;

/***/ }),

/***/ "./node_modules/gatsby-react-router-scroll/use-scroll-restoration.js":
/*!***************************************************************************!*\
  !*** ./node_modules/gatsby-react-router-scroll/use-scroll-restoration.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports.useScrollRestoration = useScrollRestoration;
var _scrollHandler = __webpack_require__(/*! ./scroll-handler */ "./node_modules/gatsby-react-router-scroll/scroll-handler.js");
var _react = __webpack_require__(/*! react */ "react");
var _reachRouter = __webpack_require__(/*! @gatsbyjs/reach-router */ "./node_modules/@gatsbyjs/reach-router/dist/index.modern.mjs");
function useScrollRestoration(identifier) {
  var location = (0, _reachRouter.useLocation)();
  var state = (0, _react.useContext)(_scrollHandler.ScrollContext);
  var ref = (0, _react.useRef)(null);
  (0, _react.useLayoutEffect)(function () {
    if (ref.current) {
      var position = state.read(location, identifier);
      ref.current.scrollTo(0, position || 0);
    }
  }, [location.key]);
  return {
    ref: ref,
    onScroll: function onScroll() {
      if (ref.current) {
        state.save(location, identifier, ref.current.scrollTop);
      }
    }
  };
}

/***/ }),

/***/ "./node_modules/mitt/dist/mitt.es.js":
/*!*******************************************!*\
  !*** ./node_modules/mitt/dist/mitt.es.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//      
// An event handler can take an optional event argument
// and should not return a value
                                          
                                                               

// An array of all currently registered event handlers for a type
                                            
                                                            
// A map of event types and their corresponding event handlers.
                        
                                 
                                   
  

/** Mitt: Tiny (~200b) functional event emitter / pubsub.
 *  @name mitt
 *  @returns {Mitt}
 */
function mitt(all                 ) {
	all = all || Object.create(null);

	return {
		/**
		 * Register an event handler for the given type.
		 *
		 * @param  {String} type	Type of event to listen for, or `"*"` for all events
		 * @param  {Function} handler Function to call in response to given event
		 * @memberOf mitt
		 */
		on: function on(type        , handler              ) {
			(all[type] || (all[type] = [])).push(handler);
		},

		/**
		 * Remove an event handler for the given type.
		 *
		 * @param  {String} type	Type of event to unregister `handler` from, or `"*"`
		 * @param  {Function} handler Handler function to remove
		 * @memberOf mitt
		 */
		off: function off(type        , handler              ) {
			if (all[type]) {
				all[type].splice(all[type].indexOf(handler) >>> 0, 1);
			}
		},

		/**
		 * Invoke all handlers for the given type.
		 * If present, `"*"` handlers are invoked after type-matched handlers.
		 *
		 * @param {String} type  The event type to invoke
		 * @param {Any} [evt]  Any value (object is recommended and powerful), passed to each handler
		 * @memberOf mitt
		 */
		emit: function emit(type        , evt     ) {
			(all[type] || []).slice().map(function (handler) { handler(evt); });
			(all['*'] || []).slice().map(function (handler) { handler(type, evt); });
		}
	};
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mitt);
//# sourceMappingURL=mitt.es.js.map


/***/ }),

/***/ "./node_modules/node-object-hash/dist/hasher.js":
/*!******************************************************!*\
  !*** ./node_modules/node-object-hash/dist/hasher.js ***!
  \******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var objectSorter_1 = __importDefault(__webpack_require__(/*! ./objectSorter */ "./node_modules/node-object-hash/dist/objectSorter.js"));
var crypto_1 = __importDefault(__webpack_require__(/*! crypto */ "crypto"));
/**
 * Default hash algorithm
 */
var DEFAULT_ALG = 'sha256';
/**
 * Default hash string enoding
 */
var DEFAULT_ENC = 'hex';
/**
 * Hasher constructor
 * @param options hasher options
 * @return hasher instance
 */
function hasher(options) {
    if (options === void 0) { options = {}; }
    var sortObject = (0, objectSorter_1.default)(options);
    /**
     * Object hash function
     * @param obj object to hash
     * @param opts hasher options
     * @returns hash string
     */
    function hashObject(obj, opts) {
        if (opts === void 0) { opts = {}; }
        var alg = opts.alg || options.alg || DEFAULT_ALG;
        var enc = opts.enc || options.enc || DEFAULT_ENC;
        var sorted = sortObject(obj);
        return crypto_1.default.createHash(alg).update(sorted).digest(enc);
    }
    return {
        hash: hashObject,
        sort: sortObject,
        sortObject: sortObject,
    };
}
module.exports = hasher;
//# sourceMappingURL=hasher.js.map

/***/ }),

/***/ "./node_modules/node-object-hash/dist/objectSorter.js":
/*!************************************************************!*\
  !*** ./node_modules/node-object-hash/dist/objectSorter.js ***!
  \************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var typeGuess_1 = __webpack_require__(/*! ./typeGuess */ "./node_modules/node-object-hash/dist/typeGuess.js");
var str = __importStar(__webpack_require__(/*! ./stringifiers */ "./node_modules/node-object-hash/dist/stringifiers.js"));
/**
 * Object sorter consturctor
 * @param options object transformation options
 * @return function that transforms object to strings
 */
function objectSorter(options) {
    if (options === void 0) { options = {}; }
    var _a = __assign({ sort: true, coerce: true, trim: false }, options), sort = _a.sort, coerce = _a.coerce, trim = _a.trim;
    var stringifiers = {
        unknown: function _unknown(obj) {
            var _a, _b;
            // `unknonw` - is a typo, saved for backward compatibility
            var constructorName = (_b = (_a = obj.constructor) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : 'unknonw';
            var objectName = typeof obj.toString === 'function' ? obj.toString() : 'unknown';
            return "<:" + constructorName + ">:" + objectName;
        },
    };
    var sortOptions = {
        array: typeof sort === 'boolean' ? sort : sort.array,
        typedArray: typeof sort === 'boolean' ? false : sort.typedArray,
        object: typeof sort === 'boolean' ? sort : sort.object,
        set: typeof sort === 'boolean' ? sort : sort.set,
        map: typeof sort === 'boolean' ? sort : sort.map,
    };
    var coerceOptions = {
        boolean: typeof coerce === 'boolean' ? coerce : coerce.boolean,
        number: typeof coerce === 'boolean' ? coerce : coerce.number,
        bigint: typeof coerce === 'boolean' ? coerce : coerce.bigint,
        string: typeof coerce === 'boolean' ? coerce : coerce.string,
        undefined: typeof coerce === 'boolean' ? coerce : coerce.undefined,
        null: typeof coerce === 'boolean' ? coerce : coerce.null,
        symbol: typeof coerce === 'boolean' ? coerce : coerce.symbol,
        function: typeof coerce === 'boolean' ? coerce : coerce.function,
        date: typeof coerce === 'boolean' ? coerce : coerce.date,
        set: typeof coerce === 'boolean' ? coerce : coerce.set,
    };
    var trimOptions = {
        string: typeof trim === 'boolean' ? trim : trim.string,
        function: typeof trim === 'boolean' ? trim : trim.function,
    };
    stringifiers.hashable = str._hashable.bind(stringifiers);
    if (trimOptions.string) {
        stringifiers.string = coerceOptions.string
            ? str._stringTrimCoerce.bind(stringifiers)
            : str._stringTrim.bind(stringifiers);
    }
    else {
        stringifiers.string = coerceOptions.string
            ? str._stringCoerce.bind(stringifiers)
            : str._string.bind(stringifiers);
    }
    stringifiers.number = coerceOptions.number
        ? str._numberCoerce.bind(stringifiers)
        : str._number.bind(stringifiers);
    stringifiers.bigint = coerceOptions.bigint
        ? str._bigIntCoerce.bind(stringifiers)
        : str._bigInt.bind(stringifiers);
    stringifiers.boolean = coerceOptions.boolean
        ? str._booleanCoerce.bind(stringifiers)
        : str._boolean.bind(stringifiers);
    stringifiers.symbol = coerceOptions.symbol
        ? str._symbolCoerce.bind(stringifiers)
        : str._symbol.bind(stringifiers);
    stringifiers.undefined = coerceOptions.undefined
        ? str._undefinedCoerce.bind(stringifiers)
        : str._undefined.bind(stringifiers);
    stringifiers.null = coerceOptions.null
        ? str._nullCoerce.bind(stringifiers)
        : str._null.bind(stringifiers);
    if (trimOptions.function) {
        stringifiers.function = coerceOptions.function
            ? str._functionTrimCoerce.bind(stringifiers)
            : str._functionTrim.bind(stringifiers);
    }
    else {
        stringifiers.function = coerceOptions.function
            ? str._functionCoerce.bind(stringifiers)
            : str._function.bind(stringifiers);
    }
    stringifiers.date = coerceOptions.date
        ? str._dateCoerce.bind(stringifiers)
        : str._date.bind(stringifiers);
    stringifiers.array = sortOptions.array
        ? str._arraySort.bind(stringifiers)
        : str._array.bind(stringifiers);
    stringifiers.typedarray = sortOptions.typedArray
        ? str._typedArraySort.bind(stringifiers)
        : str._typedArray.bind(stringifiers);
    if (sortOptions.set) {
        stringifiers.set = coerceOptions.set
            ? str._setSortCoerce.bind(stringifiers)
            : str._setSort.bind(stringifiers);
    }
    else {
        stringifiers.set = coerceOptions.set
            ? str._setCoerce.bind(stringifiers)
            : str._set.bind(stringifiers);
    }
    stringifiers.object = sortOptions.object
        ? str._objectSort.bind(stringifiers)
        : str._object.bind(stringifiers);
    stringifiers.map = sortOptions.map
        ? str._mapSort.bind(stringifiers)
        : str._map.bind(stringifiers);
    /**
     * Serializes object to string
     * @param obj object
     */
    function objectToString(obj) {
        return stringifiers[(0, typeGuess_1.guessType)(obj)](obj);
    }
    return objectToString;
}
module.exports = objectSorter;
//# sourceMappingURL=objectSorter.js.map

/***/ }),

/***/ "./node_modules/node-object-hash/dist/stringifiers.js":
/*!************************************************************!*\
  !*** ./node_modules/node-object-hash/dist/stringifiers.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

/**
 * @private
 * @inner
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports._mapSort = exports._map = exports._objectSort = exports._object = exports._setCoerce = exports._set = exports._setSort = exports._setSortCoerce = exports._typedArray = exports._typedArraySort = exports._array = exports._arraySort = exports._date = exports._dateCoerce = exports._functionTrim = exports._functionTrimCoerce = exports._function = exports._functionCoerce = exports._null = exports._nullCoerce = exports._undefined = exports._undefinedCoerce = exports._symbol = exports._symbolCoerce = exports._boolean = exports._booleanCoerce = exports._bigInt = exports._bigIntCoerce = exports._number = exports._numberCoerce = exports._stringTrim = exports._stringTrimCoerce = exports._string = exports._stringCoerce = exports._hashable = exports.PREFIX = void 0;
var typeGuess_1 = __webpack_require__(/*! ./typeGuess */ "./node_modules/node-object-hash/dist/typeGuess.js");
/**
 * Prefixes that used when type coercion is disabled
 */
exports.PREFIX = {
    string: '<:s>',
    number: '<:n>',
    bigint: '<:bi>',
    boolean: '<:b>',
    symbol: '<:smbl>',
    undefined: '<:undf>',
    null: '<:null>',
    function: '<:func>',
    array: '',
    date: '<:date>',
    set: '<:set>',
    map: '<:map>',
};
/**
 * Converts Hashable to string
 * @private
 * @param obj object to convert
 * @returns object string representation
 */
function _hashable(obj) {
    return obj.toHashableString();
}
exports._hashable = _hashable;
/**
 * Converts string to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _stringCoerce(obj) {
    return obj;
}
exports._stringCoerce = _stringCoerce;
/**
 * Converts string to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _string(obj) {
    return exports.PREFIX.string + ':' + obj;
}
exports._string = _string;
/**
 * Converts string to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _stringTrimCoerce(obj) {
    return obj.replace(/(\s+|\t|\r\n|\n|\r)/gm, ' ').trim();
}
exports._stringTrimCoerce = _stringTrimCoerce;
/**
 * Converts string to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _stringTrim(obj) {
    return exports.PREFIX.string + ':' + obj.replace(/(\s+|\t|\r\n|\n|\r)/gm, ' ').trim();
}
exports._stringTrim = _stringTrim;
/**
 * Converts number to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _numberCoerce(obj) {
    return obj.toString();
}
exports._numberCoerce = _numberCoerce;
/**
 * Converts number to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _number(obj) {
    return exports.PREFIX.number + ":" + obj;
}
exports._number = _number;
/**
 * Converts BigInt to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _bigIntCoerce(obj) {
    return obj.toString();
}
exports._bigIntCoerce = _bigIntCoerce;
/**
 * Converts BigInt to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _bigInt(obj) {
    return exports.PREFIX.bigint + ":" + obj.toString();
}
exports._bigInt = _bigInt;
/**
 * Converts boolean to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _booleanCoerce(obj) {
    return obj ? '1' : '0';
}
exports._booleanCoerce = _booleanCoerce;
/**
 * Converts boolean to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _boolean(obj) {
    return exports.PREFIX.boolean + ':' + obj.toString();
}
exports._boolean = _boolean;
/**
 * Converts symbol to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _symbolCoerce() {
    return exports.PREFIX.symbol;
}
exports._symbolCoerce = _symbolCoerce;
/**
 * Converts symbol to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _symbol(obj) {
    return exports.PREFIX.symbol + ':' + obj.toString();
}
exports._symbol = _symbol;
/**
 * Converts undefined to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _undefinedCoerce() {
    return '';
}
exports._undefinedCoerce = _undefinedCoerce;
/**
 * Converts undefined to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _undefined() {
    return exports.PREFIX.undefined;
}
exports._undefined = _undefined;
/**
 * Converts null to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _nullCoerce() {
    return '';
}
exports._nullCoerce = _nullCoerce;
/**
 * Converts null to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _null() {
    return exports.PREFIX.null;
}
exports._null = _null;
/**
 * Converts function to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _functionCoerce(obj) {
    return obj.name + '=>' + obj.toString();
}
exports._functionCoerce = _functionCoerce;
/**
 * Converts function to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _function(obj) {
    return exports.PREFIX.function + ':' + obj.name + '=>' + obj.toString();
}
exports._function = _function;
/**
 * Converts function to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _functionTrimCoerce(obj) {
    return (obj.name +
        '=>' +
        obj
            .toString()
            .replace(/(\s+|\t|\r\n|\n|\r)/gm, ' ')
            .trim());
}
exports._functionTrimCoerce = _functionTrimCoerce;
/**
 * Converts function to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _functionTrim(obj) {
    return (exports.PREFIX.function +
        ':' +
        obj.name +
        '=>' +
        obj
            .toString()
            .replace(/(\s+|\t|\r\n|\n|\r)/gm, ' ')
            .trim());
}
exports._functionTrim = _functionTrim;
/**
 * Converts date to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _dateCoerce(obj) {
    return obj.toISOString();
}
exports._dateCoerce = _dateCoerce;
/**
 * Converts date to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _date(obj) {
    return exports.PREFIX.date + ':' + obj.toISOString();
}
exports._date = _date;
/**
 * Converts array to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _arraySort(obj) {
    var stringifiers = this;
    return ('[' +
        obj
            .map(function (item) {
            return stringifiers[(0, typeGuess_1.guessType)(item)](item);
        })
            .sort()
            .toString() +
        ']');
}
exports._arraySort = _arraySort;
/**
 * Converts array to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _array(obj) {
    var stringifiers = this;
    return ('[' +
        obj
            .map(function (item) {
            return stringifiers[(0, typeGuess_1.guessType)(item)](item);
        })
            .toString() +
        ']');
}
exports._array = _array;
/**
 * Converts TypedArray to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _typedArraySort(obj) {
    var stringifiers = this;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    var values = Array.prototype.slice.call(obj);
    return ('[' +
        values
            .map(function (num) {
            return stringifiers[(0, typeGuess_1.guessType)(num)](num);
        })
            .sort()
            .toString() +
        ']');
}
exports._typedArraySort = _typedArraySort;
/**
 * Converts TypedArray to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _typedArray(obj) {
    var stringifiers = this;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    var values = Array.prototype.slice.call(obj);
    return ('[' +
        values
            .map(function (num) {
            return stringifiers[(0, typeGuess_1.guessType)(num)](num);
        })
            .toString() +
        ']');
}
exports._typedArray = _typedArray;
/**
 * Converts set to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _setSortCoerce(obj) {
    return _arraySort.call(this, Array.from(obj));
}
exports._setSortCoerce = _setSortCoerce;
/**
 * Converts set to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _setSort(obj) {
    return exports.PREFIX.set + ":" + _arraySort.call(this, Array.from(obj));
}
exports._setSort = _setSort;
/**
 * Converts set to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _set(obj) {
    return exports.PREFIX.set + ":" + _array.call(this, Array.from(obj));
}
exports._set = _set;
/**
 * Converts set to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _setCoerce(obj) {
    return _array.call(this, Array.from(obj));
}
exports._setCoerce = _setCoerce;
/**
 * Converts object to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _object(obj) {
    var stringifiers = this;
    var keys = Object.keys(obj);
    var objArray = [];
    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
        var key = keys_1[_i];
        var val = obj[key];
        var valT = (0, typeGuess_1.guessType)(val);
        objArray.push(key + ':' + stringifiers[valT](val));
    }
    return '{' + objArray.toString() + '}';
}
exports._object = _object;
/**
 * Converts object to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _objectSort(obj) {
    var stringifiers = this;
    var keys = Object.keys(obj).sort();
    var objArray = [];
    for (var _i = 0, keys_2 = keys; _i < keys_2.length; _i++) {
        var key = keys_2[_i];
        var val = obj[key];
        var valT = (0, typeGuess_1.guessType)(val);
        objArray.push(key + ':' + stringifiers[valT](val));
    }
    return '{' + objArray.toString() + '}';
}
exports._objectSort = _objectSort;
/**
 * Converts map to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _map(obj) {
    var stringifiers = this;
    var arr = Array.from(obj);
    var mapped = [];
    for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
        var item = arr_1[_i];
        var _a = item, key = _a[0], value = _a[1];
        mapped.push([
            stringifiers[(0, typeGuess_1.guessType)(key)](key),
            stringifiers[(0, typeGuess_1.guessType)(value)](value),
        ]);
    }
    return '[' + mapped.join(';') + ']';
}
exports._map = _map;
/**
 * Converts map to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _mapSort(obj) {
    var stringifiers = this;
    var arr = Array.from(obj);
    var mapped = [];
    for (var _i = 0, arr_2 = arr; _i < arr_2.length; _i++) {
        var item = arr_2[_i];
        var _a = item, key = _a[0], value = _a[1];
        mapped.push([
            stringifiers[(0, typeGuess_1.guessType)(key)](key),
            stringifiers[(0, typeGuess_1.guessType)(value)](value),
        ]);
    }
    return '[' + mapped.sort().join(';') + ']';
}
exports._mapSort = _mapSort;
//# sourceMappingURL=stringifiers.js.map

/***/ }),

/***/ "./node_modules/node-object-hash/dist/typeGuess.js":
/*!*********************************************************!*\
  !*** ./node_modules/node-object-hash/dist/typeGuess.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.guessType = exports.guessObjectType = exports.TYPE_MAP = void 0;
/**
 * Type mapping rules.
 */
exports.TYPE_MAP = {
    Array: 'array',
    Int8Array: 'typedarray',
    Uint8Array: 'typedarray',
    Uint8ClampedArray: 'typedarray',
    Int16Array: 'typedarray',
    Uint16Array: 'typedarray',
    Int32Array: 'typedarray',
    Uint32Array: 'typedarray',
    Float32Array: 'typedarray',
    Float64Array: 'typedarray',
    BigUint64Array: 'typedarray',
    BigInt64Array: 'typedarray',
    Buffer: 'typedarray',
    Map: 'map',
    Set: 'set',
    Date: 'date',
    String: 'string',
    Number: 'number',
    BigInt: 'bigint',
    Boolean: 'boolean',
    Object: 'object',
};
/**
 * Guess object type
 * @param obj analyzed object
 * @return object type
 */
function guessObjectType(obj) {
    var _a, _b;
    if (obj === null) {
        return 'null';
    }
    if (instanceOfHashable(obj)) {
        return 'hashable';
    }
    var type = (_b = (_a = obj.constructor) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : 'unknown';
    return exports.TYPE_MAP[type] || 'unknown';
}
exports.guessObjectType = guessObjectType;
/**
 * Guess variable type
 * @param obj analyzed variable
 * @return variable type
 */
function guessType(obj) {
    var type = typeof obj;
    return type !== 'object' ? type : guessObjectType(obj);
}
exports.guessType = guessType;
/**
 * Identify if object is instance of Hashable interface
 * @param object analyzed variable
 * @return true if object has toHashableString property and this property is function
 * otherwise return false
 */
function instanceOfHashable(object) {
    return typeof object.toHashableString === 'function';
}
//# sourceMappingURL=typeGuess.js.map

/***/ }),

/***/ "./public/page-data/sq/d/173916137.json":
/*!**********************************************!*\
  !*** ./public/page-data/sq/d/173916137.json ***!
  \**********************************************/
/***/ ((module) => {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"data":{"site":{"siteMetadata":{"title":"Andrel Karunia Sitanggang - Software Engineer","description":"Personal website and portfolio of Andrel Karunia Sitanggang, an experienced Software Engineer specializing in React, React Native, and modern web technologies.","author":"Andrel Karunia Sitanggang","siteUrl":"https://genuineswe.github.io","social":{"github":"https://github.com/genuineswe","linkedin":"https://www.linkedin.com/in/sitanggangandrel"}}}}}');

/***/ }),

/***/ "./src/components/Header.jsx":
/*!***********************************!*\
  !*** ./src/components/Header.jsx ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Header)
/* harmony export */ });
/* harmony import */ var gatsby__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! gatsby */ "./.cache/gatsby-browser-entry.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Contact__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Contact */ "./src/components/Contact.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");




function Header() {
  const {
    0: mobileMenuOpen,
    1: setMobileMenuOpen
  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const {
    openContact
  } = (0,_Contact__WEBPACK_IMPORTED_MODULE_2__.useContact)();
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("header", {
    className: "fixed top-0 left-0 right-0 z-50 bg-dark-bg/90 backdrop-blur-md border-b border-dark-bg-tertiary/50",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("nav", {
      className: "container mx-auto px-4 py-4",
      "aria-label": "Main navigation",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
        className: "flex items-center justify-between",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(gatsby__WEBPACK_IMPORTED_MODULE_0__.Link, {
          to: "/",
          className: "text-2xl font-bold font-mono hover:scale-105 transition-transform",
          "aria-label": "Andrel Karunia Sitanggang - Home",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
            className: "text-accent-cyan",
            children: "<"
          }), "AKS", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
            className: "text-accent-cyan",
            children: "/>"
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("ul", {
          className: "hidden md:flex items-center space-x-8",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("li", {
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(gatsby__WEBPACK_IMPORTED_MODULE_0__.Link, {
              to: "/",
              className: "hover:text-accent-cyan transition-colors focus:outline-2 focus:outline-accent-cyan",
              activeClassName: "text-accent-cyan",
              children: "Home"
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("li", {
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(gatsby__WEBPACK_IMPORTED_MODULE_0__.Link, {
              to: "/profile",
              className: "hover:text-accent-cyan transition-colors focus:outline-2 focus:outline-accent-cyan",
              activeClassName: "text-accent-cyan",
              children: "About"
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("li", {
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(gatsby__WEBPACK_IMPORTED_MODULE_0__.Link, {
              to: "/projects",
              className: "hover:text-accent-cyan transition-colors focus:outline-2 focus:outline-accent-cyan",
              activeClassName: "text-accent-cyan",
              children: "Projects"
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("li", {
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(gatsby__WEBPACK_IMPORTED_MODULE_0__.Link, {
              to: "/blog",
              className: "hover:text-accent-cyan transition-colors focus:outline-2 focus:outline-accent-cyan",
              activeClassName: "text-accent-cyan",
              children: "Blog"
            })
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("button", {
          className: "md:hidden p-2 hover:bg-dark-bg-secondary rounded-lg transition-colors",
          onClick: () => setMobileMenuOpen(!mobileMenuOpen),
          "aria-expanded": mobileMenuOpen,
          "aria-label": "Toggle mobile menu",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("svg", {
            className: "w-6 h-6",
            fill: "none",
            stroke: "currentColor",
            viewBox: "0 0 24 24",
            children: mobileMenuOpen ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("path", {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: 2,
              d: "M6 18L18 6M6 6l12 12"
            }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("path", {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: 2,
              d: "M4 6h16M4 12h16M4 18h16"
            })
          })
        })]
      }), mobileMenuOpen && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("ul", {
        className: "md:hidden mt-4 space-y-2 pb-4",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("li", {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(gatsby__WEBPACK_IMPORTED_MODULE_0__.Link, {
            to: "/",
            className: "block py-2 hover:text-accent-cyan transition-colors",
            activeClassName: "text-accent-cyan",
            children: "Home"
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("li", {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(gatsby__WEBPACK_IMPORTED_MODULE_0__.Link, {
            to: "/profile",
            className: "block py-2 hover:text-accent-cyan transition-colors",
            activeClassName: "text-accent-cyan",
            children: "About"
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("li", {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(gatsby__WEBPACK_IMPORTED_MODULE_0__.Link, {
            to: "/projects",
            className: "block py-2 hover:text-accent-cyan transition-colors",
            activeClassName: "text-accent-cyan",
            children: "Projects"
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("li", {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(gatsby__WEBPACK_IMPORTED_MODULE_0__.Link, {
            to: "/blog",
            className: "block py-2 hover:text-accent-cyan transition-colors",
            activeClassName: "text-accent-cyan",
            children: "Blog"
          })
        })]
      })]
    })
  });
}

/***/ }),

/***/ "./src/components/Layout.jsx":
/*!***********************************!*\
  !*** ./src/components/Layout.jsx ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Layout)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _styles_design_system_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/design-system.css */ "./src/styles/design-system.css");
/* harmony import */ var _styles_design_system_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_design_system_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _styles_mobile_optimization_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../styles/mobile-optimization.css */ "./src/styles/mobile-optimization.css");
/* harmony import */ var _styles_mobile_optimization_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_mobile_optimization_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _styles_page_transition_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../styles/page-transition.css */ "./src/styles/page-transition.css");
/* harmony import */ var _styles_page_transition_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_styles_page_transition_css__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _utils_animations__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/animations */ "./src/utils/animations.js");
/* harmony import */ var _Contact__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Contact */ "./src/components/Contact.jsx");
/* harmony import */ var _footer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./footer */ "./src/components/footer.jsx");
/* harmony import */ var _Header__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Header */ "./src/components/Header.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");









function Layout({
  children
}) {
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    // Initialize animations on mount
    (0,_utils_animations__WEBPACK_IMPORTED_MODULE_4__.initAllAnimations)();
  }, []);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
    className: "min-h-screen flex flex-col",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_Header__WEBPACK_IMPORTED_MODULE_7__["default"], {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("main", {
      className: "flex-1 pt-16",
      children: children
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_footer__WEBPACK_IMPORTED_MODULE_6__["default"], {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_Contact__WEBPACK_IMPORTED_MODULE_5__["default"], {})]
  });
}

/***/ }),

/***/ "./src/components/SEO.jsx":
/*!********************************!*\
  !*** ./src/components/SEO.jsx ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SEO)
/* harmony export */ });
/* harmony import */ var _public_page_data_sq_d_173916137_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../public/page-data/sq/d/173916137.json */ "./public/page-data/sq/d/173916137.json");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");


function SEO({
  title,
  description,
  pathname,
  children
}) {
  const {
    site
  } = _public_page_data_sq_d_173916137_json__WEBPACK_IMPORTED_MODULE_0__.data;
  const seo = {
    title: title || site.siteMetadata.title,
    description: description || site.siteMetadata.description,
    url: `${site.siteMetadata.siteUrl}${pathname || '/'}`,
    author: site.siteMetadata.author
  };

  // Structured data for Person schema
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Andrel Karunia Sitanggang',
    jobTitle: 'Software Engineer',
    url: site.siteMetadata.siteUrl,
    sameAs: [site.siteMetadata.social.github, site.siteMetadata.social.linkedin],
    knowsAbout: ['React', 'React Native', 'TypeScript', 'Next.js', 'Frontend Development', 'Web Performance', 'SEO']
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("html", {
      lang: "id"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("title", {
      children: seo.title
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("meta", {
      name: "description",
      content: seo.description
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("meta", {
      name: "author",
      content: seo.author
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("meta", {
      property: "og:type",
      content: "website"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("meta", {
      property: "og:title",
      content: seo.title
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("meta", {
      property: "og:description",
      content: seo.description
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("meta", {
      property: "og:url",
      content: seo.url
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("meta", {
      property: "og:site_name",
      content: site.siteMetadata.title
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("meta", {
      name: "twitter:card",
      content: "summary_large_image"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("meta", {
      name: "twitter:title",
      content: seo.title
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("meta", {
      name: "twitter:description",
      content: seo.description
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("meta", {
      name: "twitter:url",
      content: seo.url
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("link", {
      rel: "canonical",
      href: seo.url
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("link", {
      rel: "icon",
      type: "image/png",
      href: "/favicon.png"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("link", {
      rel: "apple-touch-icon",
      href: "/icon.png"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("script", {
      type: "application/ld+json",
      children: JSON.stringify(personSchema)
    }), children]
  });
}

/***/ }),

/***/ "./src/components/footer.jsx":
/*!***********************************!*\
  !*** ./src/components/footer.jsx ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Footer)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");

function Footer() {
  const currentYear = new Date().getFullYear();
  const socialLinks = [{
    name: 'GitHub',
    url: 'https://github.com/genuineswe',
    icon: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", {
      className: "w-6 h-6",
      fill: "currentColor",
      viewBox: "0 0 24 24",
      "aria-hidden": "true",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
        fillRule: "evenodd",
        d: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z",
        clipRule: "evenodd"
      })
    })
  }, {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/sitanggangandrel',
    icon: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", {
      className: "w-6 h-6",
      fill: "currentColor",
      viewBox: "0 0 24 24",
      "aria-hidden": "true",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
        d: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
      })
    })
  }];
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("footer", {
    className: "bg-dark-bg-secondary border-t border-dark-bg-tertiary/50 mt-20",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "container mx-auto px-4 py-8",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex flex-col md:flex-row justify-between items-center gap-6",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: "text-center md:text-left",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h3", {
            className: "text-xl font-bold font-mono mb-2",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
              className: "text-accent-cyan",
              children: "<"
            }), "Andrel Karunia Sitanggang", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
              className: "text-accent-cyan",
              children: "/>"
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
            className: "text-text-secondary text-sm",
            children: "Software Engineer | React Specialist"
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
          className: "flex items-center gap-4",
          children: socialLinks.map(link => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("a", {
            href: link.url,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "p-2 hover:bg-dark-bg-tertiary rounded-lg transition-colors hover:text-accent-cyan focus:outline-2 focus:outline-accent-cyan",
            "aria-label": `Visit ${link.name} profile`,
            children: link.icon
          }, link.name))
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "mt-6 pt-6 border-t border-dark-bg-tertiary/50 text-center",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
          className: "text-text-muted text-sm",
          children: ["\xA9 ", currentYear, " Andrel Karunia Sitanggang. All rights reserved."]
        })
      })]
    })
  });
}

/***/ }),

/***/ "./src/pages/index.jsx?export=head":
/*!*****************************************!*\
  !*** ./src/pages/index.jsx?export=head ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Head: () => (/* binding */ Head),
/* harmony export */   "default": () => (/* binding */ HomePage)
/* harmony export */ });
/* harmony import */ var _components_Contact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/Contact */ "./src/components/Contact.jsx");
/* harmony import */ var _components_Layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/Layout */ "./src/components/Layout.jsx");
/* harmony import */ var _components_SEO__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/SEO */ "./src/components/SEO.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");




function HomePage() {
  const {
    openContact
  } = (0,_components_Contact__WEBPACK_IMPORTED_MODULE_0__.useContact)();
  const skills = [{
    name: 'React.js',
    icon: '⚛️',
    level: 'Expert'
  }, {
    name: 'React Native',
    icon: '📱',
    level: 'Expert'
  }, {
    name: 'TypeScript',
    icon: '📘',
    level: 'Advanced'
  }, {
    name: 'Next.js',
    icon: '▲',
    level: 'Advanced'
  }, {
    name: 'Tailwind CSS',
    icon: '🎨',
    level: 'Expert'
  }, {
    name: 'React Query',
    icon: '📡',
    level: 'Advanced'
  }];
  const featuredProjects = [{
    title: 'UangCermat Mobile App',
    description: 'Finance service mobile application built with React Native for PT Gajicermat Mandiri Digital Indonesia',
    tech: ['React Native', 'TypeScript', 'React Query'],
    category: 'Mobile App'
  }, {
    title: 'KerjaCermat Mobile App',
    description: 'HRIS service mobile application for employee management and payroll',
    tech: ['React Native', 'TypeScript', 'Formik'],
    category: 'Mobile App'
  }];
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_components_Layout__WEBPACK_IMPORTED_MODULE_1__["default"], {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_components_SEO__WEBPACK_IMPORTED_MODULE_2__["default"], {
      title: "Andrel Karunia Sitanggang - Software Engineer",
      description: "Experienced Software Engineer specializing in React, React Native, and modern web technologies. Building high-performance web and mobile applications."
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("section", {
      className: "min-h-screen flex items-center justify-center px-4 relative overflow-hidden",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("video", {
        autoPlay: true,
        loop: true,
        muted: true,
        playsInline: true,
        className: "absolute inset-0 w-full h-full object-cover z-0 opacity-40",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("source", {
          src: "/Dark_Navy_Blue_Gradient_Video.mp4",
          type: "video/mp4"
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
        className: "absolute inset-0 bg-gradient-to-b from-dark-bg/20 via-transparent to-dark-bg z-[1] pointer-events-none"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
        className: "absolute inset-0 bg-dark-bg/30 z-[1] pointer-events-none"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
        className: "container mx-auto text-center relative z-10 animate-fade-in",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("p", {
          className: "text-accent-cyan font-mono mb-4 text-lg animate-slide-down",
          children: "Hi, my name is"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("h1", {
          className: "text-5xl md:text-7xl font-bold mb-6 animate-slide-up py-2 leading-snug",
          children: "Andrel Karunia Sitanggang"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("p", {
          className: "text-3xl md:text-5xl text-text-secondary mb-8 animate-slide-up",
          style: {
            animationDelay: '0.1s'
          },
          children: "Architecting High-Performance Digital Solutions"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("p", {
          className: "text-xl text-text-muted max-w-3xl mx-auto mb-12 animate-slide-up",
          style: {
            animationDelay: '0.2s'
          },
          children: ["Specialist Software Engineer focused on building resilient, enterprise-grade applications with", ' ', /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
            className: "text-accent-cyan",
            children: "React"
          }), " and", ' ', /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
            className: "text-accent-cyan",
            children: "React Native"
          }), ". I help organizations scale their digital infrastructure through performant, accessible, and strategically-engineered software."]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
          className: "flex gap-4 justify-center flex-wrap animate-slide-up",
          style: {
            animationDelay: '0.3s'
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("a", {
            href: "#projects",
            className: "px-8 py-3 bg-accent-cyan text-dark-bg rounded-lg hover:bg-accent-blue hover:shadow-glow-cyan transition-all font-medium",
            children: "View My Work"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("button", {
            onClick: openContact,
            className: "px-8 py-3 border border-accent-cyan text-accent-cyan rounded-lg hover:bg-accent-cyan/10 transition-all font-medium",
            children: "Get In Touch"
          })]
        })]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("section", {
      id: "about",
      className: "py-20 px-4 bg-dark-bg-secondary",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
        className: "container mx-auto max-w-4xl",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("h2", {
          className: "text-4xl font-bold mb-8 fade-in-on-scroll",
          children: "About Me"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
          className: "fade-in-on-scroll",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("p", {
            className: "text-lg text-text-secondary mb-6",
            children: ["I'm a Software Engineer with over ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("strong", {
              className: "text-accent-cyan",
              children: "3 years of experience"
            }), " at", ' ', /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("strong", {
              className: "text-text-primary",
              children: "PT Gajicermat Mandiri Digital Indonesia"
            }), ", where I've built multiple mobile apps and web applications for finance and HRIS services."]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("p", {
            className: "text-lg text-text-secondary mb-6",
            children: ["Previously, I spent 2+ years at ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("strong", {
              className: "text-text-primary",
              children: "Tokodistributor"
            }), ", a B2B marketplace, where I significantly improved web performance, increasing PageSpeed scores from 35 to 90 points and implementing comprehensive SEO optimizations."]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("p", {
            className: "text-lg text-text-secondary",
            children: ["I hold a degree in ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("strong", {
              className: "text-text-primary",
              children: "Electronics and Instrumentation"
            }), " from", ' ', /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("strong", {
              className: "text-text-primary",
              children: "Universitas Gadjah Mada (UGM)"
            }), " and have contributed to various open-source projects."]
          })]
        })]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("section", {
      id: "skills",
      className: "py-20 px-4",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
        className: "container mx-auto max-w-6xl",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("h2", {
          className: "text-4xl font-bold mb-12 text-center fade-in-on-scroll",
          children: "Skills & Technologies"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
          className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
          children: skills.map((skill, index) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
            className: "p-6 bg-dark-bg-secondary rounded-lg border border-dark-bg-tertiary hover:border-accent-cyan hover:shadow-glow-cyan transition-all stagger-item",
            style: {
              animationDelay: `${index * 0.1}s`
            },
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
              className: "text-4xl mb-3",
              children: skill.icon
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("h3", {
              className: "text-xl font-semibold mb-2",
              children: skill.name
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("p", {
              className: "text-accent-cyan text-sm",
              children: skill.level
            })]
          }, skill.name))
        })]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("section", {
      id: "projects",
      className: "py-20 px-4 bg-dark-bg-secondary",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
        className: "container mx-auto max-w-6xl",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("h2", {
          className: "text-4xl font-bold mb-12 text-center fade-in-on-scroll",
          children: "Featured Projects"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
          className: "grid grid-cols-1 lg:grid-cols-2 gap-8",
          children: featuredProjects.map((project, index) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
            className: "p-6 bg-dark-bg rounded-lg border border-dark-bg-tertiary hover:border-accent-cyan hover:shadow-glow-cyan transition-all fade-in-on-scroll",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
              className: "text-sm text-accent-cyan font-mono",
              children: project.category
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("h3", {
              className: "text-2xl font-bold mt-2 mb-3",
              children: project.title
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("p", {
              className: "text-text-secondary mb-4",
              children: project.description
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
              className: "flex flex-wrap gap-2",
              children: project.tech.map(tech => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
                className: "px-3 py-1 bg-dark-bg-tertiary text-accent-cyan text-sm rounded-full",
                children: tech
              }, tech))
            })]
          }, project.title))
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
          className: "text-center mt-12",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("a", {
            href: "/projects",
            className: "inline-block px-8 py-3 border border-accent-cyan text-accent-cyan rounded-lg hover:bg-accent-cyan/10 transition-all font-medium",
            children: "View All Projects"
          })
        })]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("section", {
      className: "py-20 px-4",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
        className: "container mx-auto max-w-3xl text-center",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("h2", {
          className: "text-4xl font-bold mb-6 fade-in-on-scroll",
          children: "Let's Work Together"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("p", {
          className: "text-xl text-text-secondary mb-8 fade-in-on-scroll",
          children: "I'm always interested in hearing about new projects and opportunities."
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("button", {
          onClick: openContact,
          className: "inline-block px-8 py-3 bg-accent-cyan text-dark-bg rounded-lg hover:bg-accent-blue hover:shadow-glow-cyan transition-all font-medium fade-in-on-scroll",
          children: "Get In Touch"
        })]
      })
    })]
  });
}
function Head() {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_components_SEO__WEBPACK_IMPORTED_MODULE_2__["default"], {});
}

/***/ }),

/***/ "./src/styles/design-system.css":
/*!**************************************!*\
  !*** ./src/styles/design-system.css ***!
  \**************************************/
/***/ (() => {



/***/ }),

/***/ "./src/styles/mobile-optimization.css":
/*!********************************************!*\
  !*** ./src/styles/mobile-optimization.css ***!
  \********************************************/
/***/ (() => {



/***/ }),

/***/ "./src/styles/page-transition.css":
/*!****************************************!*\
  !*** ./src/styles/page-transition.css ***!
  \****************************************/
/***/ (() => {



/***/ }),

/***/ "./src/utils/animations.js":
/*!*********************************!*\
  !*** ./src/utils/animations.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initAllAnimations: () => (/* binding */ initAllAnimations),
/* harmony export */   initPageTransitions: () => (/* binding */ initPageTransitions),
/* harmony export */   initParallaxEffect: () => (/* binding */ initParallaxEffect),
/* harmony export */   initScrollAnimations: () => (/* binding */ initScrollAnimations),
/* harmony export */   smoothScrollTo: () => (/* binding */ smoothScrollTo),
/* harmony export */   staggerAnimation: () => (/* binding */ staggerAnimation)
/* harmony export */ });
// Animation utilities for sophisticated interactions

// Intersection Observer for scroll-triggered animations
function initScrollAnimations() {
  if (typeof window === 'undefined') return;
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Observe all elements with fade-in class
  document.querySelectorAll('.fade-in-on-scroll').forEach(el => {
    observer.observe(el);
  });
}

// Mouse tracking parallax effect for hero section
function initParallaxEffect(selector) {
  if (typeof window === 'undefined') return;
  const hero = document.querySelector(selector);
  if (!hero) return;
  hero.addEventListener('mousemove', e => {
    const {
      clientX,
      clientY
    } = e;
    const {
      innerWidth,
      innerHeight
    } = window;
    const xPercent = (clientX / innerWidth - 0.5) * 2;
    const yPercent = (clientY / innerHeight - 0.5) * 2;
    hero.style.transform = `perspective(1000px) rotateY(${xPercent * 2}deg) rotateX(${-yPercent * 2}deg)`;
  });
  hero.addEventListener('mouseleave', () => {
    hero.style.transform = '';
  });
}

// Smooth scroll to anchor
function smoothScrollTo(target, duration = 800) {
  if (typeof window === 'undefined') return;
  const targetElement = document.querySelector(target);
  if (!targetElement) return;
  const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime = null;
  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }
  function ease(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }
  requestAnimationFrame(animation);
}

// Page transition animation
function initPageTransitions() {
  if (typeof window === 'undefined') return;

  // Add page wrapper class on load
  document.addEventListener('DOMContentLoaded', () => {
    const main = document.querySelector('main');
    if (main) {
      main.classList.add('page-transition-wrapper');
    }
  });
}

// Stagger animation for list items
function staggerAnimation(selector, delay = 100) {
  if (typeof window === 'undefined') return;
  const items = document.querySelectorAll(selector);
  items.forEach((item, index) => {
    item.style.animationDelay = `${index * delay}ms`;
    item.classList.add('stagger-item');
  });
}

// Initialize all animations
function initAllAnimations() {
  if (typeof window === 'undefined') return;
  initScrollAnimations();
  initPageTransitions();

  // Setup smooth scroll for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = this.getAttribute('href');
      if (target && target !== '#') {
        smoothScrollTo(target);
      }
    });
  });
}

/***/ })

};
;
//# sourceMappingURL=component---src-pages-index-jsxhead.js.map