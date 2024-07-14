import Cookies from 'js-cookie';
import { parseCookies, destroyCookie } from 'nookies';
import { IncomingMessage, ServerResponse } from 'http';

export const setCookie = (key: string, value: string) => {
  if (typeof window !== "undefined") {
    Cookies.set(key, value);
  }
};

export const getCookie = (key: string, context: { req?: IncomingMessage, res?: ServerResponse } = {}) => {
  if (typeof window !== "undefined") {
    return Cookies.get(key);
  } else if (context.req && context.res) {
    const cookies = parseCookies(context);
    return cookies[key] || null;
  }
  return null;
};

export const removeCookie = (key: string) => {
  if (typeof window !== "undefined") {
    Cookies.remove(key);
  } else {
    // server-side cookie removal
    destroyCookie(null, key);
  }
};