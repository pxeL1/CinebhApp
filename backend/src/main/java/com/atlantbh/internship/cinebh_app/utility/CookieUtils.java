package com.atlantbh.internship.cinebh_app.utility;

import jakarta.servlet.http.Cookie;

public class CookieUtils {
    private CookieUtils() {}

    public static String TOKEN_COOKIE = "token";

    public static Cookie createCookie(String name, String content) {
        Cookie cookie = new Cookie(name, content);
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        cookie.setSecure(false);

        return cookie;
    }
}
