import Cookies from "js-cookie";

type CookieAttributes = {
  expires?: number;
  secure?: boolean;
  sameSite?: string;
  path?: string;
  domain?: string;
};

const setCookie = (key: string, value: string, options?: CookieAttributes) => {
  let cookieAttribute: Cookies.CookieAttributes = {
    expires: 86400, // one day
    path: "/",
  };
  if ("https:" === window.location.protocol) {
    cookieAttribute = {
      secure: true,
      sameSite: "none",
    };
  }

  if (options?.expires) {
    cookieAttribute.expires = options?.expires;
  }

  if (options?.path) {
    cookieAttribute.path = options?.path;
  }

  Cookies.set(key, value, cookieAttribute);
};

export { setCookie };
