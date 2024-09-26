import { setCookie, getCookie, deleteCookie } from "cookies-next";

export const AUTH_TOKEN = "token";

export const setAuthCookie = (token: string, name: string) => {
  const toBase64 = Buffer.from(token).toString("base64");

  setCookie(name, toBase64, {
    maxAge: 30 * 24 * 60 * 60, // 30 days
    path: "/",
    // Additional security options
    // sameSite: 'strict',
    // httpOnly: true,
    // secure: process.env.NODE_ENV === 'production',
  });
};

export const getAuthCookie = (name: string) => {
  const cookie = getCookie(name);

  console.log("Cookies", cookie);

  if (!cookie) return undefined;

  try {
    console.log("try block");
    return Buffer.from(cookie as string, "base64").toString("ascii");
  } catch (error) {
    console.error("Error decoding cookie:", error);
    return undefined;
  }
};

// export const removeCookies = (cookies: string[]) => {
//   cookies.forEach((cookie) => {
//     deleteCookie(cookie);
//     console.log(`Removed cookie: ${cookie}`);
//   });
// };

export const removeCookies = (cookies: string[]) => {
  cookies.forEach((cookie) => {
    deleteCookie(cookie, { path: "/" });
    console.log(`Removed cookie: ${cookie}`);
  });
};

export const expireCookies = (cookies: string[]) => {
  cookies.forEach((cookie) => {
    setCookie(cookie, "", {
      maxAge: 0,
      path: "/",
    });
    console.log(`Expired cookie: ${cookie}`);
  });
};

export const getValidAuthToken = (t?: string) => {
  const token = t || getAuthCookie(AUTH_TOKEN);

  const now = new Date();
  const tokenDate = new Date(token || 0);

  return {
    token: now < tokenDate ? token : undefined,
  };
};

export const isTokenExpired = (expiryDate?: string) => {
  if (!expiryDate) return true;

  const now = new Date();
  const expiry = new Date(expiryDate);

  return now.getTime() > expiry.getTime();
};
