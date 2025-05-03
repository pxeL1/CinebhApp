package com.atlantbh.internship.cinebh_app.utility;

import java.util.Collection;

public class StringUtils {

    private StringUtils() {}

    public static boolean isNullOrEmpty(String string) {
        return string == null || string.isEmpty();
    }

    public static boolean isNullOrEmpty(Collection<String> collection) {
        return collection == null || collection.isEmpty();
    }
}
