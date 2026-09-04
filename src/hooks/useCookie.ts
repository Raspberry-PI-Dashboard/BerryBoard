import { useState, type Dispatch, type SetStateAction } from "react";

type CookieOptions<T> = {
  serialize?: (value: T) => string;
  deserialize?: (value: string) => T;
  maxAge?: number;
};

function readCookie<T>(
  name: string,
  fallback: T,
  deserialize: (value: string) => T,
) {
  const cookie = document.cookie
    .split("; ")
    .find((entry) => entry.startsWith(`${name}=`));

  if (!cookie) return fallback;

  try {
    return deserialize(decodeURIComponent(cookie.slice(name.length + 1)));
  } catch {
    return fallback;
  }
}

export function useCookie<T>(
  name: string,
  fallback: T,
  options: CookieOptions<T> = {},
): [T, Dispatch<SetStateAction<T>>] {
  const serialize = options.serialize ?? JSON.stringify;
  const deserialize = options.deserialize ?? JSON.parse;
  const [value, setValue] = useState<T>(() =>
    readCookie(name, fallback, deserialize),
  );

  function setCookie(nextValue: SetStateAction<T>) {
    setValue((currentValue) => {
      const next =
        typeof nextValue === "function"
          ? (nextValue as (current: T) => T)(currentValue)
          : nextValue;
      const maxAge = options.maxAge ?? 31536000;
      document.cookie = `${name}=${encodeURIComponent(serialize(next))}; max-age=${maxAge}; path=/`;
      return next;
    });
  }

  return [value, setCookie];
}