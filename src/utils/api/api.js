import axios from "axios";
import ApiError from "./ApiError";
import {v4 as getUUID} from "uuid";
import hash from "crypto-js/hmac-sha256";


const now = 111// Date.now();

const prefix = "/api/v1";

function isAbsolute(str) {
  return /^(\w+:)?\/\//.test(str);
}

function hasPrefix(method, prefix) {
  return prefix && method.indexOf(prefix) === 0;
}

function getURL(method) {
  if (isAbsolute(method) || hasPrefix(method, prefix)) {
    return method;
  }

  return `${prefix}${method}`;
}

function initMethod(method) {
  return (apiMethod, data = {}, generateIdempotencyKey) => {
    return send({method, apiMethod, data, sign: generateIdempotencyKey})
  };
}

let globalHeaders = {};
export function addHeaders(_headers) {
  Object.keys(_headers)
    .forEach(key => {
      if (key === false) {
        delete globalHeaders[key];
      } else {
        globalHeaders[key] = _headers[key];
      }
    })
}

export const get = initMethod("get");
export const post = initMethod("post");

export function send({apiMethod, sign, data, ...params}) {
  let props = {
    ...params,
    data,
    headers: {
      ...globalHeaders,
      ...params?.headers,
    },
    url: getURL(apiMethod)
  };

  if (sign) {
    props = addSign(props);
  }

  return axios(props)
    .then(onSuccess, onFail);
}

/**
 *
 * @param {{data, status, statusText, headers, config}} response
 * @return {*}
 */
function onSuccess(response) {
  const {data} = response;

  return data;
}

function onFail(error) {
  if (error.response && typeof error.response.data === "object") {
    throw ApiError.fromApiResponse(error.response.data);
  } else if (error.request) {
    throw ApiError.fromHttpError(error.request);
  } else {
    throw new ApiError({});
  }
}

const KEY = "ZDIzOGR4cmgydGM0MzJt";
const decode = atob;
function addSign(params) {
  const timestamp = Math.round(Date.now() / 1000);
  const id = getUUID();
  const body = JSON.stringify(params.data);
  params.data = body;
  params.headers = {
    ...params.headers,
    "content-type": "application/json",
    "X-Timestamp": timestamp,
    "X-Request-Id": id,
    "X-Sign": hash(`${body}.${timestamp}.${id}`, decode(KEY)),
  }
  return params;
}
